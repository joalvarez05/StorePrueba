import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

// import empresa from "@/data/empresa.json";
// import productos from "@/data/productos.json";
function App() {
  // const infoEmpresa = empresa;
  // const infoProductos = productos;
  // console.log(infoEmpresa);
  // console.log(infoProductos);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
