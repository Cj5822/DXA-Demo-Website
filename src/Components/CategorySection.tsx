// src/components/CategorySection.tsx
import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import topsImg from "../assets/tops.png";
import bottomsImg from "../assets/bottoms.png";
import outerwearImg from "../assets/outerwear.png";

const categories = [
  { title: "Tops", image: topsImg },
  { title: "Bottoms", image: bottomsImg },
  { title: "Outerwear", image: outerwearImg },
];

const CategorySection: React.FC = () => {
  return (
    <Box sx={{ mt: 6 }}>
      <Box sx={{ maxWidth: "1000px", mx: "auto" }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          Shop by Category
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 5 }}>
        {categories.map((cat) => (
          <Card key={cat.title} sx={{ cursor: "pointer", boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="300"
              image={cat.image}
              alt={cat.title}
            />
            <CardContent>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: 600 }}
              >
                {cat.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
        </Box>
      </Box>
    </Box>
  );
};;

export default CategorySection;