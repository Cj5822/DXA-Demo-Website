import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link, useLocation, useNavigate } from "react-router-dom";

declare global {
	interface Window {
		decibelInsight?: (action: string, eventName: string, value?: number) => void;
	}
}

type CartItem = {
	id: string;
	name: string;
	price: number;
	image?: string;
	size?: string;
	color?: string;
	qty: number;
};

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

const LAST_ORDER_KEY = "dxa_last_order";

const loadLastOrder = (): OrderRecord | null => {
	try {
		const raw = localStorage.getItem(LAST_ORDER_KEY);
		if (!raw) return null;
		return JSON.parse(raw) as OrderRecord;
	} catch (e) {
		return null;
	}
};

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

const Success: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const stateOrder = (location.state as OrderRecord | undefined) ?? null;
	const [order, setOrder] = useState<OrderRecord | null>(stateOrder);

	useEffect(() => {
		if (stateOrder) {
			try {
				localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(stateOrder));
				// Track the order placement in Decibel Medallia
				if (window.decibelInsight) {
					window.decibelInsight("sendTrackedEvent", "DXA Demo Order Placed", stateOrder.total);
				}
			} catch (e) {}
		} else {
			setOrder(loadLastOrder());
		}
	}, [stateOrder]);

	const summary = useMemo(() => {
		if (!order) return null;
		const itemCount = order.items.reduce((sum, item) => sum + item.qty, 0);
		return { itemCount };
	}, [order]);

	const handleDownloadReceipt = () => {
		if (!order) return;
		const lines = [
			"DXA - Order Receipt",
			`Order Number: ${order.orderNumber}`,
			order.email ? `Email: ${order.email}` : null,
			order.createdAt ? `Date: ${new Date(order.createdAt).toLocaleString()}` : null,
			`Shipping Address: ${order.shippingAddress ?? "Not provided"}`,
			"",
			"Items:",
			...order.items.map((it) => `- ${it.name} x ${it.qty} = ${formatCurrency(it.price * it.qty)}`),
			"",
			`Subtotal: ${formatCurrency(order.subtotal)}`,
			`Tax: ${formatCurrency(order.tax)}`,
			`Shipping: ${formatCurrency(order.shipping)}`,
			`Total: ${formatCurrency(order.total)}`,
		];

		const blob = new Blob([lines.filter(Boolean).join("\n")], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${order.orderNumber}_receipt.txt`;
		a.click();
		URL.revokeObjectURL(url);
	};

	if (!order) {
		return (
			<Box sx={{ bgcolor: "#f5f5f5", minHeight: "70vh", display: "flex", alignItems: "center" }}>
				<Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
					<Typography variant="h5" fontWeight={700} gutterBottom>
						We could not find your order
					</Typography>
					<Typography color="text.secondary" sx={{ mb: 3 }}>
						Please place an order first. If you already did, try refreshing this page.
					</Typography>
					<Button variant="contained" sx={{ bgcolor: "#000" }} onClick={() => navigate("/products") }>
						Shop Products
					</Button>
				</Container>
			</Box>
		);
	}

	return (
		<Box sx={{ bgcolor: "#f5f5f5", py: 6 }}>
			<Container maxWidth="md" sx={{ display: "flex", justifyContent: "center" }}>
				<Paper
					elevation={0}
					sx={{
						maxWidth: 560,
						width: "100%",
						borderRadius: 2,
						px: { xs: 2.5, sm: 4 },
						py: 4,
						border: "1px solid #e0e0e0",
						boxShadow: "0px 6px 24px rgba(0,0,0,0.04)",
						background: "#fff",
					}}
				>
					<Stack spacing={2.5}>
						<Box sx={{ textAlign: "center" }}>
							<Typography variant="h6" fontWeight={700} sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
								Order Confirmed!
								<CheckCircleOutlineIcon color="success" fontSize="small" />
							</Typography>
						</Box>

						<Stack spacing={1.5}>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography color="text.secondary">Order Number:</Typography>
								<Typography fontWeight={600}>{order.orderNumber}</Typography>
							</Box>

							<Divider />

							<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
								<Box>
									<Typography color="text.secondary">Order Items</Typography>
									<Typography fontWeight={600} variant="body2">
										{order.items[0]?.name ?? "Items"} × {summary?.itemCount ?? order.items.length}
									</Typography>
								</Box>
								<Stack spacing={0.5} sx={{ textAlign: "right" }}>
									<Typography color="text.secondary">Total Amount</Typography>
									<Typography fontWeight={600}>{formatCurrency(order.subtotal)}</Typography>
								</Stack>
							</Box>

							<Divider />

							<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
								<Box>
									<Typography color="text.secondary">Shipping Address</Typography>
									<Typography fontWeight={600} variant="body2">{order.shippingAddress ?? "Not provided"}</Typography>
								</Box>
								<Stack spacing={0.5} sx={{ textAlign: "right" }}>
									<Typography color="text.secondary">Tax</Typography>
									<Typography fontWeight={600}>{formatCurrency(order.tax)}</Typography>
								</Stack>
							</Box>

							<Divider />

							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography color="text.secondary">Total (including tax):</Typography>
								<Typography fontWeight={700}>{formatCurrency(order.total)}</Typography>
							</Box>
						</Stack>

						<Stack spacing={1.5} sx={{ pt: 1 }}>
							<Button variant="contained" fullWidth sx={{ bgcolor: "#000", color: "#fff", py: 1.2 }} onClick={handleDownloadReceipt}>
								Download Receipt
							</Button>
							<Button component={Link} to="/products" variant="outlined" fullWidth sx={{ py: 1.2 }}>
								Continue Shopping
							</Button>
						</Stack>
					</Stack>
				</Paper>
			</Container>
		</Box>
	);
};

export default Success;
