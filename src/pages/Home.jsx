import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/carrito" className="font-semibold cursor-pointer border-2">
        {" "}
        Haceme click y vamos al carrito pa
      </Link>
      <br />
      <Link to="/pedido" className="font-semibold cursor-pointer border-2">
        {" "}
        Haceme click y vamos al pedido viejo lobo
      </Link>
    </div>
  );
}

export default Home;
