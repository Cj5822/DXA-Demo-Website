import { Box, Typography, Button, Stack, Select, MenuItem, Grid } from "@mui/material";
import shortsImg from "/src/assets/classicshort.png";
import dressImg from "/src/assets/greendress.png";
import tshirtImg from "/src/assets/blacktshirt.png";
import shoesImg from "/src/assets/redshoes.png";
import jeansImg from "/src/assets/jeans.png";
import shirtImg from "/src/assets/dotshirt.png";

const ProductList = () => {
    const products = [
    { name: "Classic Shorts", price: "$39.99", image: shortsImg },
    { name: "Green Dress", price: "$89.99", image: dressImg },
    { name: "Black T-Shirt", price: "$39.99", image: tshirtImg },
    { name: "Red Shoes", price: "$99.99", image: shoesImg },
    { name: "Jeans", price: "$49.99", image: jeansImg },
    { name: "Shirt", price: "$59.99", image: shirtImg },
    ];
    const productCount = products.length; // Replace with actual number
    const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Shoes"];

    return (
        <Box sx={{ maxWidth: 1280, mx: "auto", px: 2, py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" 
                    fontWeight={600}>
                    All Products
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mt: 0.5 }}>
                    Showing {productCount} products
                </Typography>
            </Box>
            <Box
                sx={{
                    mb: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                }}
                >
                {/* Category buttons */}
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {categories.map((category, index) => (
                    <Button
                        key={category}
                        variant={index ===0 ? "contained" : "text"}
                        size="small"
                        sx={{ textTransform: "none",  
                        backgroundColor: index === 0 ? "#000000" : "white",}}>
                    {category}
                    </Button>
                    ))}
                </Stack>

                {/* Sort dropdown */}
                <Select
                    defaultValue="featured"
                    sx={{
                        minWidth: 185,
                        maxHeight: 35,
                        bgcolor: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                        },
                    }}>
                    <MenuItem value="featured">Featured</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                </Select>
            </Box>
            {/* Product Grid */}
            <Grid container spacing={4}>
                {products.map((product, index) => (
                <Grid size={4} key={index}>
                    <Box sx={{ textAlign: "left" }}>
                        <Box
                        component="img"
                        src={product.image}
                        alt={product.name}
                        sx={{
                            width: "100%",
                            height: 250,
                            objectFit: "cover",
                            cursor: "pointer",
                            borderRadius: 1,
                            mx: "auto", 
                        }}/>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                        {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {product.price}
                        </Typography>
                    </Box>
                </Grid>
                ))}
            </Grid>
        </Box>
    )
};

export default ProductList;