import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FiShoppingBag } from "react-icons/fi";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  size?: string;
  color?: string;
  qty: number;
};

const STORAGE_KEY = "dxa_cart";

const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch (e) {
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const mountedRef = useRef(false);
  const instanceId = useRef(`cart_${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    setItems(loadCart());
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    // persist only; do NOT dispatch here to avoid event loop with the "cart:updated" listener
    saveCart(items);
  }, [items]);

  useEffect(() => {
    const onCartUpdated = (e: Event) => {
      // ignore events originated from this Cart instance
      const ce = e as CustomEvent | Event;
      try {
        const origin = (ce as any).detail?.origin;
        if (origin && origin === instanceId.current) return;
      } catch (err) {}
      setItems(loadCart());
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(loadCart());
    };

    window.addEventListener("cart:updated", onCartUpdated as EventListener);
    window.addEventListener("storage", onStorage as EventListener);
    return () => {
      window.removeEventListener("cart:updated", onCartUpdated as EventListener);
      window.removeEventListener("storage", onStorage as EventListener);
    };
  }, []);

  const changeQty = (index: number, delta: number) => {
    const next = items.map((it, i) => (i === index ? { ...it, qty: Math.max(1, it.qty + delta) } : it));
    setItems(next);
    try {
      saveCart(next);
    } catch (e) {}
    // dispatch asynchronously so we don't trigger updates during render
    setTimeout(() => {
      try {
        window.dispatchEvent(new CustomEvent("cart:updated", { detail: { origin: instanceId.current } }));
      } catch (e) {}
    }, 0);
  };

  const removeItem = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    setItems(next);
    try {
      saveCart(next);
    } catch (e) {}
    setTimeout(() => {
      try {
        window.dispatchEvent(new CustomEvent("cart:updated", { detail: { origin: instanceId.current } }));
      } catch (e) {}
    }, 0);
  };

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const tax = items.length > 0 ? 3.0 : 0;
  const shipping = items.length > 0 ? "Free" : "$0.00";
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <Box sx={{ bgcolor: "#f5f5f4", py: 8 }}>
        <Container maxWidth="xl" sx={{ py: 8, px: { xs: 2, md: 4 } }}>
          <Box sx={{ textAlign: "center", pt: 6 }}>
          <Box
            component="div"
            sx={{
              width: 96,
              height: 96,
              mx: "auto",
              mb: 3,
              bgcolor: "background.paper",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 1,
            }}
          >
            <FiShoppingBag size={48} color="#BDBDBD" />
          </Box>

          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Add some items to get started
          </Typography>

          <Button component={Link} to="/products" variant="contained" size="large">
            Continue Shopping
          </Button>
        </Box>
      </Container>
    </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f4", py: 6 }}>
      <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Shopping Cart
        </Typography>

        <Box sx={{ display: "flex", gap: 6, alignItems: "flex-start", flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ flex: 1 }}>
          <Box>
            {items.map((it, idx) => (
              <Paper
                key={it.id}
                sx={{ p: 3, display: "flex", alignItems: "center", gap: 2, mb: 2, borderRadius: 2, boxShadow: 1, position: "relative" }}
              >
                <Box sx={{ width: 96, height: 96, flexShrink: 0, borderRadius: 1, overflow: "hidden", bgcolor: "background.default" }}>
                  {it.image ? (
                    <img src={it.image} alt={it.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : null}
                </Box>

                <Box sx={{ flex: 1, pr: 6 }}>
                  <Typography sx={{ fontWeight: 600 }}>{it.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {it.size ? `Size: ${it.size}` : null} {it.color ? ` • Color: ${it.color}` : null}
                  </Typography>
                  <Typography sx={{ mt: 1, fontWeight: 700 }}>${it.price.toFixed(2)}</Typography>
                </Box>

                {/* Delete icon top-right */}
                <Box sx={{ position: "absolute", top: 12, right: 12 }}>
                  <IconButton onClick={() => removeItem(idx)} aria-label="remove" color="error" size="small">
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>

                {/* Quantity controls bottom-right */}
                <Box sx={{ position: "absolute", bottom: 12, right: 12, display: "flex", alignItems: "center" }}>
                  <IconButton size="small" onClick={() => changeQty(idx, -1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{it.qty}</Typography>
                  <IconButton size="small" onClick={() => changeQty(idx, 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>

        <Box sx={{ width: { xs: "100%", md: 500 } }}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1, height: "fit-content", position: { md: "sticky" }, top: 120 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Summary
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography color="text.secondary">Subtotal:</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography color="text.secondary">Shipping:</Typography>
              <Typography>{shipping}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography color="text.secondary">Tax:</Typography>
              <Typography>${tax.toFixed(2)}</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Total:
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700  }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>

            <Button fullWidth variant="contained" sx={{ mb: 2 }}>
              Proceed to Checkout
            </Button>
            <Button component={Link} to="/products" fullWidth variant="outlined">
              Continue Shopping
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  </Box>
  );
};

export default Cart;
