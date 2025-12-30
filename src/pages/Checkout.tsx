import React, { useEffect, useMemo, useState } from "react";
import { Box, Container, Typography, Paper, Grid, Stack, TextField, Divider, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

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
const LAST_ORDER_KEY = "dxa_last_order";

type OrderRecord = {
	orderNumber: string;
	items: CartItem[];
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
	shippingAddress?: string;
	email?: string;
	createdAt?: string;
};

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
	const navigate = useNavigate();
	const [items, setItems] = useState<CartItem[]>([]);
	const [emailError, setEmailError] = useState<string>("");
	const [emailTouched, setEmailTouched] = useState(false);
	const [emailFocused, setEmailFocused] = useState(false);

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

	const validateEmail = (email: string): string => {
		if (!email) return "Email is required";
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(email)) {
			return "Please enter a valid email address (e.g., user@example.com)";
		}
		return "";
	};

	const handleEmailFocus = () => {
		setEmailFocused(true);
	};

	const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setEmailFocused(false);
		setEmailTouched(true);
		const error = validateEmail(e.target.value);
		setEmailError(error);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (emailTouched && !emailFocused) {
			const error = validateEmail(e.target.value);
			setEmailError(error);
		}
	};

	const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!items.length) return;

		const data = new FormData(e.currentTarget);
		const firstName = (data.get("firstName") as string) ?? "";
		const lastName = (data.get("lastName") as string) ?? "";
		const address1 = (data.get("address1") as string) ?? "";
		const address2 = (data.get("address2") as string) ?? "";
		const city = (data.get("city") as string) ?? "";
		const postCode = (data.get("postCode") as string) ?? "";
		const email = (data.get("email") as string) ?? "";

		const recipient = [firstName, lastName].filter(Boolean).join(" ");
		const shippingAddress = [recipient, address1, address2, city, postCode].filter(Boolean).join(", ");
		const orderNumber = `ORDER-${Math.floor(100000000 + Math.random() * 900000000)}`;
		const order: OrderRecord = {
			orderNumber,
			items,
			subtotal: summary.subtotal,
			shipping: summary.shipping,
			tax: summary.tax,
			total: summary.total,
			shippingAddress: shippingAddress || undefined,
			email: email || undefined,
			createdAt: new Date().toISOString(),
		};

		try {
			localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
			localStorage.removeItem(STORAGE_KEY);
		} catch (err) {}

		setItems([]);
		setTimeout(() => {
			try {
				window.dispatchEvent(new CustomEvent("cart:updated", { detail: { origin: "checkout" } }));
			} catch (err) {}
		}, 0);

		navigate("/success", { state: order });
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
										<TextField
											name="email"
											type="email"
											label="Email address"
											placeholder="email@gmail.com"
											fullWidth
											size="small"
											required
											error={emailTouched && !emailFocused && !!emailError}
											helperText={emailTouched && !emailFocused && emailError}
											onFocus={handleEmailFocus}
											onBlur={handleEmailBlur}
											onChange={handleEmailChange}
										/>
										<TextField
											name="phone"
											label="Phone Number"
											placeholder="123456789"
											defaultValue="123456789"
											fullWidth
											size="small"
										/>
									</Stack>
								</Paper>

								<Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid #e0e0e0" }}>
									<Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
										Shipping Address
									</Typography>
									<Grid container spacing={2}>
										<Grid size={{ xs: 12, sm: 6 }}>
											<TextField
												name="firstName"
												label="First name"
												required
												placeholder="Jane"
												defaultValue="Jane"
												fullWidth
												size="small"
											/>
										</Grid>
										<Grid size={{ xs: 12, sm: 6 }}>
											<TextField
												name="lastName"
												label="Last name"
												required
												placeholder="Doe"
												defaultValue="Doe"
												fullWidth
												size="small"
											/>
										</Grid>
										<Grid size={{ xs: 12 }}>
											<TextField
												name="address1"
												label="Address Line 1"
												required
												placeholder="123 Main St"
												defaultValue="123 Main St"
												fullWidth
												size="small"
											/>
										</Grid>
										<Grid size={{ xs: 12 }}>
											<TextField
												name="address2"
												label="Address Line 2"
												placeholder="Apt 4B"
												defaultValue="Apt 4B"
												fullWidth
												size="small"
											/>
										</Grid>
										<Grid size={{ xs: 12, sm: 8 }}>
											<TextField
												name="city"
												label="City"
												required
												placeholder="Springfield"
												defaultValue="Springfield"
												fullWidth
												size="small"
											/>
										</Grid>
										<Grid size={{ xs: 12, sm: 4 }}>
											<TextField
												name="postCode"
												label="Post Code"
												required
												placeholder="1234"
												defaultValue="12345"
												fullWidth
												size="small"
											/>
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
												defaultValue="1212 1212 1212 1212"
												fullWidth
												size="small"
												required
											/>
										</Grid>
										<Grid size={{ xs: 12, sm: 6 }}>
											<TextField label="Expiry Date" placeholder="MM/YY" defaultValue="12/28" fullWidth size="small" required />
										</Grid>
										<Grid size={{ xs: 12, sm: 6 }}>
											<TextField label="CVV" placeholder="123" defaultValue="123" fullWidth size="small" required />
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
