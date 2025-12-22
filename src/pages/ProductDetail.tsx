import React, { useState } from "react";
import { Box, Typography, Button, Stack, Grid, Chip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { productById } from "../data/products";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>("");

  const product = id ? productById[id] : undefined;

  if (!product) {
    return (
      <Box sx={{ maxWidth: 1280, mx: "auto", px: 2, py: 4, minHeight: "400px" }}>
        <Typography variant="h6">Product not found</Typography>
        <Button onClick={() => navigate("/products")} sx={{ mt: 2 }}>
          Back to Products
        </Button>
      </Box>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    // Add to cart logic here
    console.log(`Added ${product.name} in size ${selectedSize} to cart`);
  };

  return (
    <Box sx={{ maxWidth: 1280, mx: "auto", px: 2, py: 4 }}>
      {/* Back button */}
      <Button
        onClick={() => navigate("/products")}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, color: "text.secondary" }}
      >
        Back to Products
      </Button>

      {/* Product details grid */}
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              display: "block",
              width: "100%",
              maxWidth: 520,
              height: { xs: 320, sm: 440, md: 520 },
              objectFit: "cover",
              borderRadius: 2,
              mx: "auto",
            }}
          />
          {/* Thumbnail images */}
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: 96,
                height: 96,
                borderRadius: 1,
                border: "2px solid #000",
                cursor: "pointer",
                objectFit: "cover",
              }}
            />
          </Stack>
        </Grid>

        {/* Product Info */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {product.category}
          </Typography>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
            {product.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            ${product.price.toFixed(2)}
          </Typography>

          {/* Size Selection */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>
              Select Size
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {product.sizes.map((size: string) => (
                <Chip
                  key={size}
                  label={size}
                  onClick={() => setSelectedSize(size)}
                  variant={selectedSize === size ? "filled" : "outlined"}
                  sx={{
                    backgroundColor: selectedSize === size ? "#000" : "white",
                    color: selectedSize === size ? "white" : "black",
                    border: selectedSize === size ? "none" : "1px solid #ccc",
                    cursor: "pointer",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: selectedSize === size ? "#000" : "#f0f0f0",
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Add to Cart Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "white",
              py: 1.5,
              mb: 2,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>

          {/* Shipping Info */}
          <Typography variant="body2" color="text.secondary">
            {product.shippingReturn || "FREE Shipping"}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, maxWidth: 960 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Product story
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {product.longDescription || product.description}
        </Typography>

        {product.features?.length ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              Features
            </Typography>
            <Stack component="ul" spacing={1} sx={{ pl: 2, m: 0 }}>
              {product.features.map((item: string) => (
                <Box component="li" key={item} sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                  {item}
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null}

        {(product.materials?.length || product.care?.length) ? (
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {product.materials?.length ? (
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  Materials
                </Typography>
                <Stack component="ul" spacing={1} sx={{ pl: 2, m: 0 }}>
                  {product.materials.map((item: string) => (
                    <Box component="li" key={item} sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                      {item}
                    </Box>
                  ))}
                </Stack>
              </Grid>
            ) : null}

            {product.care?.length ? (
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  Care
                </Typography>
                <Stack component="ul" spacing={1} sx={{ pl: 2, m: 0 }}>
                  {product.care.map((item: string) => (
                    <Box component="li" key={item} sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                      {item}
                    </Box>
                  ))}
                </Stack>
              </Grid>
            ) : null}
          </Grid>
        ) : null}

        {product.fitNotes?.length ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              Fit & sizing
            </Typography>
            <Stack component="ul" spacing={1} sx={{ pl: 2, m: 0 }}>
              {product.fitNotes.map((item: string) => (
                <Box component="li" key={item} sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                  {item}
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null}

        {product.shippingReturn ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              Shipping & returns
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {product.shippingReturn}
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default ProductDetail;
