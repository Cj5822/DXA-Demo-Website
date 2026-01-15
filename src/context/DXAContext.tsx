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
  customDimensions: Record<string, any>;
  trackEvent: (name: string, value?: number, details?: Record<string, any>) => void;
  trackConversion: (name: string, value?: number, details?: Record<string, any>) => void;
  trackError: (name: string, details?: Record<string, any>) => void;
  clearEvents: () => void;
}

const DXAContext = createContext<DXAContextType | undefined>(undefined);

export const DXAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<DXAEvent[]>([]);
  const [customDimensions, setCustomDimensions] = useState<Record<string, any>>({});
  const sessionActive = true; // Always allow tracking
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(location.search || window.location.search || "");
    const ageParam = params.get("age");
    const channelParam = params.get("channel");
    
    console.log("URL Search:", location.search);
    console.log("Age Param:", ageParam);
    console.log("Channel Param:", channelParam);
    
    const age = ageParam ? Number(ageParam) : undefined;
    const channel = channelParam || undefined;

    // Build custom dimensions object
    const newCustomDimensions: Record<string, any> = {};
    if (age !== undefined && !Number.isNaN(age)) {
      newCustomDimensions.age = age;
    }
    if (channel) {
      newCustomDimensions.channel = channel;
    }

    console.log("Custom Dimensions Object:", newCustomDimensions);
    setCustomDimensions(newCustomDimensions);

    if (Object.keys(newCustomDimensions).length > 0) {
      console.log("[DXA Custom Dimensions]", newCustomDimensions);
    }

    // Set custom dimensions in DXA
    const setCustomDimension = window.dxa?.setCustomDimension;
    if (setCustomDimension) {
      if (age !== undefined && !Number.isNaN(age)) {
        setCustomDimension("age", age);
      }
      if (channel) {
        setCustomDimension("channel", channel);
      }
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
    <DXAContext.Provider value={{ events, sessionActive, customDimensions, trackEvent, trackConversion, trackError, clearEvents }}>
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
