import { Box, Typography } from "@mui/material";

const Footer = () => {
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
        <Typography
          variant="caption"
          sx={{
            fontFamily: "monospace",
            fontWeight: 600,
            mb: 1,
            display: "block",
            color: "grey.400",
          }}
        >
          DXA Console
        </Typography>
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
            borderColor: "grey.800",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{ fontFamily: "monospace", color: "grey.500" }}
          >
            // DXA events will appear here...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;