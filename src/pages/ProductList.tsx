import { Box, Typography, Button, Stack, Select, MenuItem} from "@mui/material";

const ProductList = () => {
    const productCount = 0; // Replace with actual number
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
                        sx={{ textTransform: "none", fontWeight: 500, 
                        backgroundColor: index === 0 ? "#000000" : "white",}}>
                    {category}
                    </Button>
                    ))}
                </Stack>

                {/* Sort dropdown */}
                <Select
                    size="small"
                    defaultValue="featured"
                    sx={{
                        minWidth: 185,
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
        </Box>
    )
};

export default ProductList;