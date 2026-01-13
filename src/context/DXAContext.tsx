import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dxa?: {
      setCustomDimension?: (dimension: string, value: number | string) => void;
    };
    decibelInsight?: (action: string, eventName: string, value?: number) => void;
  }
}

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
  const sessionActive = true; // Always allow tracking
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(location.search || window.location.search || "");
    const ageParam = params.get("age");
    const age = ageParam ? Number(ageParam) : undefined;

    const setCustomDimension = window.dxa?.setCustomDimension;
    if (setCustomDimension && age !== undefined && !Number.isNaN(age)) {
      setCustomDimension("age", age);
    }
  }, [location.search]);

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
