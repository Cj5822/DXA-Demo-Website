// src/components/Navbar.tsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import shoppingCartIcon from "../assets/Shoppingcart.png";

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ backgroundColor: "#fff", color: "#000" }}
    >
      <Toolbar>
        {/* Left side: App name */}
        <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
          <Button component={Link} to="/" color="inherit" sx={{ fontSize: "1.5rem", padding: "12px 20px" }}>
            DXA
          </Button>
        </Box>

        {/* Center section */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Button component={Link} to="/" color="inherit" sx={{ fontSize: "1.1rem", padding: "12px 20px" }}>Home</Button>
          <Button component={Link} to="/products" color="inherit" sx={{ fontSize: "1.1rem", padding: "12px 20px" }}>Products</Button>
        </Box>

        {/* Right side */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button color="inherit" sx={{ minWidth: "auto", padding: "8px" }}>
            <img src={shoppingCartIcon} alt="Cart" style={{ width: "24px", height: "24px" }} />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;