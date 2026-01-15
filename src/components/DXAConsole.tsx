import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Collapse,
  Stack,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ClearIcon from "@mui/icons-material/Clear";
import { useDXA } from "../context/DXAContext";
import type { DXAEvent } from "../context/DXAContext";

const DXAConsole: React.FC = () => {
  const { events, clearEvents, customDimensions } = useDXA();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Debug log
  console.log("DXAConsole customDimensions:", customDimensions);

  const getEventColor = (type: DXAEvent["type"]) => {
    switch (type) {
      case "conversion":
        return "#4caf50";
      case "error":
        return "#f44336";
      case "event":
      default:
        return "#2196f3";
    }
  };

  const getEventBgColor = (type: DXAEvent["type"]) => {
    switch (type) {
      case "conversion":
        return "#e8f5e9";
      case "error":
        return "#ffebee";
      case "event":
      default:
        return "#e3f2fd";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 450,
        maxHeight: isOpen ? 500 : 50,
        zIndex: 1300,
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        borderRadius: 1,
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1.5,
          backgroundColor: "#1a1a1a",
          color: "#fff",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
          DXA CONSOLE {events.length > 0 && `(${events.length})`}
        </Typography>
        <Box>
          <Tooltip title={isOpen ? "Minimize" : "Maximize"}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              sx={{ color: "#fff" }}
            >
              {isOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear Console">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                clearEvents();
                setSelectedEvent(null);
              }}
              sx={{ color: "#fff" }}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Content */}
      <Collapse in={isOpen}>
        <Box
          sx={{
            p: 1.5,
            maxHeight: 430,
            overflow: "auto",
            backgroundColor: "#f5f5f5",
            fontFamily: "monospace",
            fontSize: "0.75rem",
          }}
        >
          {/* Custom Dimensions Section */}
          {Object.keys(customDimensions).length > 0 && (
            <Box
              sx={{
                backgroundColor: "#fff3cd",
                border: "1px solid #ffc107",
                borderRadius: 0.5,
                p: 1,
                mb: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: "#856404",
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                📊 CUSTOM DIMENSIONS
              </Typography>
              {Object.entries(customDimensions).map(([key, value]) => (
                <Typography
                  key={key}
                  variant="caption"
                  sx={{
                    display: "block",
                    color: "#333",
                    fontSize: "0.7rem",
                  }}
                >
                  {key}: <strong>{String(value)}</strong>
                </Typography>
              ))}
            </Box>
          )}

          {events.length === 0 ? (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "#999",
                textAlign: "center",
                py: 2,
              }}
            >
              Waiting for DXA events...
            </Typography>
          ) : (
            <Stack spacing={0.5}>
              {events.map((event) => (
                <Box
                  key={event.id}
                  sx={{
                    backgroundColor: getEventBgColor(event.type),
                    border: `1px solid ${getEventColor(event.type)}`,
                    borderRadius: 0.5,
                    p: 1,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: getEventColor(event.type),
                      "& .event-text": {
                        color: "#fff",
                      },
                      "& .event-time": {
                        color: "#fff",
                      },
                    },
                  }}
                  onClick={() =>
                    setSelectedEvent(
                      selectedEvent === event.id ? null : event.id
                    )
                  }
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 0.5 }}>
                    <Box sx={{ flex: 1 }}>
                      <Chip
                        label={event.type.toUpperCase()}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: "0.65rem",
                          backgroundColor: getEventColor(event.type),
                          color: "#fff",
                          fontWeight: 600,
                          mr: 0.5,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      className="event-time"
                      sx={{
                        color: "#666",
                        fontSize: "0.65rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatTime(event.timestamp)}
                    </Typography>
                  </Box>
                  <Typography
                    className="event-text"
                    sx={{
                      color: getEventColor(event.type),
                      fontWeight: 600,
                      mb: 0.25,
                      wordBreak: "break-word",
                    }}
                  >
                    {event.name}
                    {event.value && (
                      <span style={{ color: getEventColor(event.type) }}>
                        {" "}
                        (${event.value.toFixed(2)})
                      </span>
                    )}
                  </Typography>

                  {/* Expandable details */}
                  {event.details && selectedEvent === event.id && (
                    <Box
                      sx={{
                        mt: 1,
                        pt: 1,
                        borderTop: `1px solid ${getEventColor(event.type)}`,
                        backgroundColor: "#fff",
                        p: 0.75,
                        borderRadius: 0.5,
                        fontSize: "0.7rem",
                        maxHeight: 200,
                        overflow: "auto",
                      }}
                    >
                      <pre
                        style={{
                          margin: 0,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          color: "#333",
                        }}
                      >
                        {JSON.stringify(event.details, null, 2)}
                      </pre>
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default DXAConsole;
