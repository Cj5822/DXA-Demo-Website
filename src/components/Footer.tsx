import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDXA } from "../context/DXAContext";

const Footer = () => {
  const { events, sessionActive, clearEvents } = useDXA();

  const getEventColor = (type: string) => {
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: "divider",
        bgcolor: "grey.900",
        color: "grey.100",
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          px: 2,
          py: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography
            variant="caption"
            sx={{
              fontFamily: "monospace",
              fontWeight: 600,
              color: sessionActive ? "#4caf50" : "grey.400",
            }}
          >
            DXA Console {sessionActive && "● ACTIVE"} {events.length > 0 && `(${events.length})`}
          </Typography>
          {events.length > 0 && (
            <Tooltip title="Clear Console">
              <IconButton
                size="small"
                onClick={clearEvents}
                sx={{ color: "grey.400", "&:hover": { color: "grey.100" } }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box
          sx={{
            bgcolor: "grey.950",
            borderRadius: 1,
            p: 2,
            height: 150,
            overflowY: "auto",
            fontFamily: "monospace",
            fontSize: "0.75rem",
            color: "grey.300",
            border: 1,
            borderColor: sessionActive ? "#4caf50" : "grey.800",
          }}
        >
          {!sessionActive ? (
            <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "monospace", color: "grey.500" }}
            >
              // Call decibelInsight('startSession') to begin tracking
            </Typography>
          ) : events.length === 0 ? (
            <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "monospace", color: "grey.500" }}
            >
              // Waiting for DXA events...
            </Typography>
          ) : (
            <Box>
              {events.map((event) => (
                <Typography
                  key={event.id}
                  variant="caption"
                  component="div"
                  sx={{
                    fontFamily: "monospace",
                    color: getEventColor(event.type),
                    mb: 0.5,
                  }}
                >
                  <span style={{ color: "#999" }}>[{formatTime(event.timestamp)}]</span> [
                  <span style={{ fontWeight: 600 }}>{event.type.toUpperCase()}</span>] {event.name}
                  {event.value && <span> (${event.value.toFixed(2)})</span>}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;