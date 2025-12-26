import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Box, Badge, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import shoppingCartIcon from "../assets/Shoppingcart.png";

const Navbar: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const readCount = () => {
    try {
      const raw = localStorage.getItem("dxa_cart");
      if (!raw) return 0;
      const arr = JSON.parse(raw) as Array<{ qty?: number }>;
      return arr.reduce((s, it) => s + (it.qty || 0), 0);
    } catch (e) {
      return 0;
    }
  };

  useEffect(() => {
    setCount(readCount());

    const onCartUpdated = () => setCount(readCount());
    const onStorage = (e: StorageEvent) => {
      if (e.key === "dxa_cart") setCount(readCount());
    };

    window.addEventListener("cart:updated", onCartUpdated);
    window.addEventListener("storage", onStorage as EventListener);
    return () => {
      window.removeEventListener("cart:updated", onCartUpdated);
      window.removeEventListener("storage", onStorage as EventListener);
    };
  }, []);

  return (
    <>
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{ backgroundColor: "#fff", color: "#000", top: 0, left: 0, right: 0, zIndex: 1400, pointerEvents: "auto" }}
    >
      <Toolbar>
        {/* Left side: App name */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
          <IconButton component={Link} to="/cart" color="inherit" sx={{ p: 1 }}>
            <Badge badgeContent={count} color="primary">
              <img src={shoppingCartIcon} alt="Cart" style={{ width: 24, height: 24 }} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    <Toolbar />
    </>
  );
};

export default Navbar;