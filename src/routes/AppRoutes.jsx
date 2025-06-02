import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "@/components/footer/Footer";
import Home from "@/pages/Home";
import Carrito from "@/pages/Carrito";
import Pedido from "@/pages/Pedido";
import { Toaster } from "react-hot-toast";
import Arrow from "@/components/home/Arrow";
import Error from "@/pages/Error";
import Navbar from "@/components/navbar/Navbar";
function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/:nombreEmpresa" element={<Home />} />
          <Route path="/:nombreEmpresa/carrito" element={<Carrito />} />
          <Route path="/:nombreEmpresa/pedido" element={<Pedido />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/error" replace />} />{" "}
        </Routes>
      </main>
      <Arrow />
      <Footer />
    </div>
  );
}

export default AppRoutes;
