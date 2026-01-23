import { Box, Typography, Button, Stack, Select, MenuItem, Grid } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { products } from "../data/products";
import { useDXA } from "../context/DXAContext";

const ProductList = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { trackEvent } = useDXA();
    const lastTrackedCategory = useRef<string | null>(null);

    useEffect(() => {
        // Only fire when a category filter is present and changes
        const currentCategory = searchParams.get("category");
        if (!currentCategory) {
            lastTrackedCategory.current = null;
            return;
        }

        if (lastTrackedCategory.current === currentCategory) return;
        lastTrackedCategory.current = currentCategory;

        const pathWithSearch = window.location.pathname + window.location.search.replace("?", "/");
        if (window.decibelInsight) {
            window.decibelInsight("trackPageView", pathWithSearch);
            trackEvent("Decibel trackPageView", undefined, { path: pathWithSearch, category: currentCategory });
        }
    }, [searchParams, trackEvent]);

    const selectedCategory = searchParams.get("category") ?? "All";
    const sortOption = searchParams.get("sort") ?? "featured";
    const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Shoes"];

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter((p) => p.category === selectedCategory);

    // create a new array to avoid mutating the original `products` array
    const displayedProducts = [...filteredProducts];
    if (sortOption === "price-low") {
        displayedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
        displayedProducts.sort((a, b) => b.price - a.price);
    }

    const productCount = displayedProducts.length;

    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "All") params.delete("category");
        else params.set("category", category);
        setSearchParams(params);
    };

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "featured") params.delete("sort");
        else params.set("sort", value);
        setSearchParams(params);
    };

    const handleProductClick = (productId: string) => {
        navigate(`/product/${productId}`);
    };

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
                    {categories.map((category) => (
                    <Button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        variant={selectedCategory === category ? "contained" : "text"}
                        size="small"
                        sx={{
                            textTransform: "none",
                            backgroundColor: selectedCategory === category ? "#000000" : "white",
                            color: selectedCategory === category ? "white" : "inherit",
                        }}
                    >
                    {category}
                    </Button>
                    ))}
                </Stack>

                {/* Sort dropdown */}
                <Select
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value as string)}
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
                {displayedProducts.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                    <Box 
                        sx={{ textAlign: "left", cursor: "pointer" }}
                        onClick={() => handleProductClick(product.id)}
                    >
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
                            "&:hover": {
                                opacity: 0.8,
                            }
                        }}/>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                        {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        ${product.price.toFixed(2)}
                        </Typography>
                    </Box>
                </Grid>
                ))}
            </Grid>
        </Box>
    )
};

export default ProductList;