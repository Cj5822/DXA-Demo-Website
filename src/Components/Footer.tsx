import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{ borderTop: 1, borderColor: "divider", py: 3, mt: 6, backgroundColor: "transparent" }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          px: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr auto 1fr" },
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", sm: "flex-start" } }}>
          <Box sx={{ mt: 1, display: "flex", gap: 1 }} aria-label="social links">
            <IconButton
              component="a"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="facebook"
              size="small"
              sx={{ width: 32, height: 32, bgcolor: "#f3f4f6", color: "text.primary", borderRadius: 1, '&:hover': { bgcolor: '#e5e7eb' } }}
            >
              <FaFacebookF size={12} />
            </IconButton>
            <IconButton
              component="a"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="linkedin"
              size="small"
              sx={{ width: 32, height: 32, bgcolor: "#f3f4f6", color: "text.primary", borderRadius: 1, '&:hover': { bgcolor: '#e5e7eb' } }}
            >
              <FaLinkedinIn size={12} />
            </IconButton>
            <IconButton
              component="a"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="youtube"
              size="small"
              sx={{ width: 32, height: 32, bgcolor: "#f3f4f6", color: "text.primary", borderRadius: 1, '&:hover': { bgcolor: '#e5e7eb' } }}
            >
              <FaYoutube size={12} />
            </IconButton>
            <IconButton
              component="a"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="instagram"
              size="small"
              sx={{ width: 32, height: 32, bgcolor: "#f3f4f6", color: "text.primary", borderRadius: 1, '&:hover': { bgcolor: '#e5e7eb' } }}
            >
              <FaInstagram size={12} />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
          © {year} DXA
        </Typography>

        <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-end" } }} />
      </Box>
    </Box>
  );
};

export default Footer;
