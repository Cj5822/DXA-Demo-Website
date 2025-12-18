import { Box, Typography, Button, Stack} from "@mui/material";

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
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {categories.map((category, index) => (
                    <Button
                        key={category}
                        variant={index === 0 ? "contained" : "outlined"}
                        size="small"
                        sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        bgcolor: index === 0 ? "primary.main" : "white",
                        }}>
                        {category}
                    </Button>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
};

export default ProductList;