import React, { useEffect, useMemo, useState } from "react";
import {
	Box,
	Container,
	Typography,
	Paper,
	Grid,
	Stack,
	TextField,
	Divider,
	Button,
} from "@mui/material";
import { Link } from "react-router-dom";

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

const Checkout: React.FC = () => {
	const [items, setItems] = useState<CartItem[]>([]);

	useEffect(() => {
		setItems(loadCart());
	}, []);

	const summary = useMemo(() => {
		const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
		const shipping = items.length ? 0 : 0;
		const tax = items.length ? 3 : 0;
		const total = subtotal + shipping + tax;
		return { subtotal, shipping, tax, total };
	}, [items]);

	const handlePlaceOrder = (e: React.FormEvent) => {
		e.preventDefault();
		alert("Order placed (demo)");
	};

	if (!items.length) {
		return (
			<Box sx={{ bgcolor: "#f5f5f4", py: 8 }}>
				<Container maxWidth="xl" sx={{ py: 8, px: { xs: 2, md: 4 } }}>
					<Typography variant="h5" sx={{ mb: 2 }}>
						Your cart is empty
					</Typography>
					<Button component={Link} to="/products" variant="contained" sx={{ bgcolor: "#000" }}>
						Browse products
					</Button>
				</Container>
			</Box>
		);
	}

	return (
		<Box sx={{ bgcolor: "#f5f5f5", py: 4 }}>
			<Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
				<Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
					Checkout
				</Typography>

				<Grid container spacing={3} alignItems="flex-start">
					<Grid size={{ xs: 12, md: 8 }}>
						<form onSubmit={handlePlaceOrder}>
							<Stack spacing={2.5}>
								<Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid #e0e0e0" }}>
									<Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
										Contact Information
									</Typography>
									<Stack spacing={2}>
										<TextField label="Email address" placeholder="email@gmail.com" fullWidth size="small" required />
										<TextField label="Phone Number" fullWidth size="small" />
									</Stack>
								</Paper>

								<Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid #e0e0e0" }}>
									<Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
										Shipping Address
									</Typography>
									<Grid container spacing={2}>
										<Grid size={{ xs: 12, sm: 6 }}>
											<TextField label="First name" required placeholder="Jane" fullWidth size="small" />
										</Grid>
										<Grid size={{ xs: 12, sm: 6 }}>
											<TextField label="Last name" required placeholder="Doe" fullWidth size="small" />
										</Grid>
										<Grid size={{ xs: 12 }}>
											<TextField label="Address Line 1" required fullWidth size="small" />
										</Grid>
										<Grid size={{ xs: 12 }}>
											<TextField label="Address Line 2" fullWidth size="small" />
										</Grid>
										<Grid size={{ xs: 12, sm: 8 }}>
											<TextField label="City" required fullWidth size="small" />
										</Grid>
										<Grid size={{ xs: 12, sm: 4 }}>
											<TextField label="Post Code" required placeholder="1234" fullWidth size="small" />
										</Grid>
									</Grid>
								</Paper>

								<Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid #e0e0e0" }}>
									<Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
										Payment Information
									</Typography>
									<Grid container spacing={2}>
										<Grid size={{ xs: 12 }}>
											<TextField
												label="Card Number"
												placeholder="1234 5678 9012 3456"
												fullWidth
												size="small"
												required
											/>
										</Grid>
										<Grid size={{ xs: 12, sm: 6 }}>
											<TextField label="Expiry Date" placeholder="MM/YY" fullWidth size="small" required />
										</Grid>
										<Grid size={{ xs: 12, sm: 6 }}>
											<TextField label="CVV" placeholder="123" fullWidth size="small" required />
										</Grid>
									</Grid>
								</Paper>

								<Button
									type="submit"
									variant="contained"
									fullWidth
									sx={{ bgcolor: "#000", color: "#fff", py: 1.3, fontWeight: 600 }}
								>
									Place Order
								</Button>
							</Stack>
						</form>
					</Grid>

					<Grid size={{ xs: 12, md: 4 }}>
						<Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid #e0e0e0" }}>
							<Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
								Order Summary
							</Typography>

							<Stack spacing={1.5} sx={{ mb: 2 }}>
								{items.map((item) => (
									<Box key={`${item.id}-${item.size ?? "_"}`} sx={{ display: "flex", justifyContent: "space-between" }}>
										<Typography variant="body2" color="text.secondary">
											{item.name} × {item.qty}
										</Typography>
										<Typography variant="body2" color="text.primary">
											${(item.price * item.qty).toFixed(2)}
										</Typography>
									</Box>
								))}
							</Stack>

							<Divider sx={{ mb: 2 }} />

							<Stack spacing={1.2}>
								<Box sx={{ display: "flex", justifyContent: "space-between" }}>
									<Typography variant="body2">Subtotal:</Typography>
									<Typography variant="body2">${summary.subtotal.toFixed(2)}</Typography>
								</Box>
								<Box sx={{ display: "flex", justifyContent: "space-between" }}>
									<Typography variant="body2">Shipping:</Typography>
									<Typography variant="body2">{summary.shipping === 0 ? "Free" : `$${summary.shipping.toFixed(2)}`}</Typography>
								</Box>
								<Box sx={{ display: "flex", justifyContent: "space-between" }}>
									<Typography variant="body2">Tax:</Typography>
									<Typography variant="body2">${summary.tax.toFixed(2)}</Typography>
								</Box>
								<Divider />
								<Box sx={{ display: "flex", justifyContent: "space-between" }}>
									<Typography variant="body1" fontWeight={600}>
										Total:
									</Typography>
									<Typography variant="body1" fontWeight={600}>
										${summary.total.toFixed(2)}
									</Typography>
								</Box>
							</Stack>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Checkout;
