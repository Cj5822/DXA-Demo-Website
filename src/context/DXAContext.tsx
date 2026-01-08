import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface DXAEvent {
  id: string;
  timestamp: Date;
  type: "event" | "conversion" | "error";
  name: string;
  value?: number;
  details?: Record<string, any>;
}

interface DXAContextType {
  events: DXAEvent[];
  sessionActive: boolean;
  trackEvent: (name: string, value?: number, details?: Record<string, any>) => void;
  trackConversion: (name: string, value?: number, details?: Record<string, any>) => void;
  trackError: (name: string, details?: Record<string, any>) => void;
  clearEvents: () => void;
}

const DXAContext = createContext<DXAContextType | undefined>(undefined);

export const DXAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<DXAEvent[]>([]);
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    // Listen for DXA session start/end via decibelInsight
    const originalDecibelInsight = (window as any).decibelInsight;

    (window as any).decibelInsight = function (action: string, ...args: any[]) {
      if (action === "startSession") {
        setSessionActive(true);
        setEvents([]); // Clear previous events
        console.log("[DXA] Session started");
      } else if (action === "endSession") {
        setSessionActive(false);
        console.log("[DXA] Session ended");
      }
      return originalDecibelInsight?.(action, ...args);
    };

    return () => {
      // Restore original function on unmount
      if (originalDecibelInsight) (window as any).decibelInsight = originalDecibelInsight;
    };
  }, []);

  const trackEvent = useCallback(
    (name: string, value?: number, details?: Record<string, any>) => {
      if (!sessionActive) return; // Only track if session is active

      const event: DXAEvent = {
        id: `event-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        type: "event",
        name,
        value,
        details,
      };
      setEvents((prev) => [event, ...prev]);

      const logMessage = `[DXA Event] ${name}${value ? ` (${value})` : ""}`;
      console.log(logMessage, details || "");

      if (window.decibelInsight) {
        window.decibelInsight("sendTrackedEvent", name, value);
      }
    },
    [sessionActive]
  );

  const trackConversion = useCallback(
    (name: string, value?: number, details?: Record<string, any>) => {
      if (!sessionActive) return; // Only track if session is active

      const event: DXAEvent = {
        id: `conversion-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        type: "conversion",
        name,
        value,
        details,
      };
      setEvents((prev) => [event, ...prev]);

      const logMessage = `[DXA Conversion] ${name}${value ? ` ($${value.toFixed(2)})` : ""}`;
      console.log(logMessage, details || "");

      if (window.decibelInsight) {
        window.decibelInsight("sendTrackedEvent", name, value);
      }
    },
    [sessionActive]
  );

  const trackError = useCallback(
    (name: string, details?: Record<string, any>) => {
      if (!sessionActive) return; // Only track if session is active

      const event: DXAEvent = {
        id: `error-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        type: "error",
        name,
        details,
      };
      setEvents((prev) => [event, ...prev]);

      const logMessage = `[DXA Error] ${name}`;
      console.error(logMessage, details || "");
    },
    [sessionActive]
  );

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  return (
    <DXAContext.Provider value={{ events, sessionActive, trackEvent, trackConversion, trackError, clearEvents }}>
      {children}
    </DXAContext.Provider>
  );
};

export const useDXA = () => {
  const context = useContext(DXAContext);
  if (!context) {
    throw new Error("useDXA must be used within DXAProvider");
  }
  return context;
};
