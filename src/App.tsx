import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Footer from "./components/Footer";
import { DXAProvider } from "./context/DXAContext";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <DXAProvider>
      <BrowserRouter>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />

          <Box component="main" sx={{ flex: 1, paddingBottom: "220px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </BrowserRouter>
    </DXAProvider>
  );
}

export default App;