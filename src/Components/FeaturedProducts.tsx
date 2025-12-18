// src/components/FeaturedProducts.tsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

import shortsImg from "../assets/classic-shorts.png";
import dressImg from "../assets/green-dress.png";
import tshirtImg from "../assets/black-tshirt.png";

const products = [
  { name: "Classic Shorts", price: "$79.99", image: shortsImg },
  { name: "Green Dress", price: "$89.99", image: dressImg },
  { name: "Black T-Shirt", price: "$39.99", image: tshirtImg },
];

const FeaturedProducts: React.FC = () => {
  return (
    <Box sx={{ mt: 6, px: 4, pb: 6 }}>
      <Box sx={{ maxWidth: "1000px", mx: "auto" }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          Featured Products
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 4 }}>
          {products.map((product) => (
            <Card key={product.name} sx={{ boxShadow: 3, cursor: "pointer" }}>
              <CardMedia
                component="img"
                height="250"
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ pt: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {product.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedProducts;