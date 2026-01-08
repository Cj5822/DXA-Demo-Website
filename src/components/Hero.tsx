// src/components/Hero.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import heroImage from "../assets/hero.png";
import { useDXA } from "../context/DXAContext";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { trackEvent } = useDXA();

  const handleShopNow = () => {
    trackEvent("Shop Now Clicked", undefined, {
      page: "home",
      component: "hero",
      action: "navigation",
    });
    navigate("/products");
  };

  return (
    <Box
      sx={{
        height: "80vh",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        px: 50,
        color: "white",
      }}
    >
      <Typography variant="h3" fontWeight={700}>
        New Season Collection
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, maxWidth: 500 }}>
        Discover the latest trends in fashion. Premium quality, timeless style.
      </Typography>
      {/* tracking: data-track="shop-now" is present on this button for analytics */}
      <Button
        variant="contained"
        color="secondary"
        className="shop-now-btn"
        data-track="shop-now"
        sx={{ mt: 4, px: 4, py: 1.5, fontSize: "1rem" }}
        endIcon={<ArrowForwardIcon />}
        onClick={handleShopNow}
      >
        Shop Now
      </Button>
    </Box>
  );
};

export default Hero;