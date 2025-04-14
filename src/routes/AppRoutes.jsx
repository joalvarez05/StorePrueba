import { Routes, Route } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Home from "@/pages/Home";
import Carrito from "@/pages/Carrito";
import Pedido from "@/pages/Pedido";

function AppRoutes() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pedido" element={<Pedido />} />
        {/* <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" replace />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default AppRoutes;
