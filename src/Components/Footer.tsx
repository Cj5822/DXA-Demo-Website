import { Box, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

const socialLinks = [
  { label: "facebook", icon: <FacebookIcon fontSize="small" />, href: "#" },
  { label: "linkedin", icon: <LinkedInIcon fontSize="small" />, href: "#" },
  { label: "youtube", icon: <YouTubeIcon fontSize="small" />, href: "#" },
  { label: "instagram", icon: <InstagramIcon fontSize="small" />, href: "#" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: "divider",
        py: 3,
        mt: 6,
        bgcolor: "common.white",
      }}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
            gap: 1,
          }}
        >
          {socialLinks.map(({ label, icon, href }) => (
            <IconButton
              key={label}
              component="a"
              href={href}
              aria-label={label}
              size="small"
              sx={{
                width: 32,
                height: 32,
                bgcolor: "common.white",
                color: "text.primary",
                borderRadius: 1,
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          © {year} DXA
        </Typography>
        <Box />
      </Box>
    </Box>
  );
};

export default Footer;