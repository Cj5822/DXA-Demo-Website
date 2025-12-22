import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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

  useEffect(() => {
    setItems(loadCart());
  }, []);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const changeQty = (index: number, delta: number) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], qty: Math.max(1, copy[index].qty + delta) };
      return copy;
    });
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const tax = items.length > 0 ? 3.0 : 0;
  const shipping = items.length > 0 ? "Free" : "$0.00";
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <Container sx={{ py: 8 }}>
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
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2h12l-1 6H7L6 2z" stroke="#BDBDBD" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 8h18l-1.5 9h-13L3 8z" stroke="#E0E0E0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid>
          <Paper sx={{ p: 2 }}>
            {items.map((it, idx) => (
              <Box key={it.id} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Box sx={{ width: 80, height: 80, bgcolor: "background.default", borderRadius: 1 }}>
                  {it.image ? (
                    <img src={it.image} alt={it.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : null}
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 600 }}>{it.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {it.size ? `Size: ${it.size}` : null} {it.color ? ` • Color: ${it.color}` : null}
                  </Typography>
                  <Typography sx={{ mt: 1, fontWeight: 700 }}>${it.price.toFixed(2)}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton size="small" onClick={() => changeQty(idx, -1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{it.qty}</Typography>
                  <IconButton size="small" onClick={() => changeQty(idx, 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>

                <Box>
                  <IconButton onClick={() => removeItem(idx)} aria-label="remove">
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Summary
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography color="text.secondary">Subtotal:</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
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
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>

            <Button fullWidth variant="contained" sx={{ mb: 1 }}>
              Proceed to Checkout
            </Button>
            <Button component={Link} to="/products" fullWidth variant="outlined">
              Continue Shopping
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
