// src/components/Hero.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import heroImage from "../assets/hero.png";

const Hero: React.FC = () => {
  const navigate = useNavigate();

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
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 4, px: 4, py: 1.5, fontSize: "1rem" }}
        endIcon={<ArrowForwardIcon />}
        onClick={() => navigate("/products")}
      >
        Shop Now
      </Button>
    </Box>
  );
};

export default Hero;