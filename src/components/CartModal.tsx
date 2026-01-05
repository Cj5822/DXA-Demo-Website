import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  productName?: string;
}

const CartModal: React.FC<CartModalProps> = ({
  open,
  onClose,
  productName = "Item",
}) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    onClose();
  };

  const handleGoToCart = () => {
    onClose();
    navigate("/cart");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ pb: 2, pt: 3, textAlign: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <CheckCircleIcon
            sx={{ fontSize: 48, color: "#4caf50", fontWeight: 600 }}
          />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Added to Cart!
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center", pb: 1 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          <strong>{productName}</strong> has been successfully added to your
          cart.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1, justifyContent: "center" }}>
        <Button
          onClick={handleContinueShopping}
          variant="outlined"
          sx={{
            borderColor: "#000",
            color: "#000",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#f5f5f5",
              borderColor: "#000",
            },
          }}
        >
          Continue Shopping
        </Button>
        <Button
          onClick={handleGoToCart}
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "white",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Go to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartModal;
