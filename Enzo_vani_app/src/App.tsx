import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Cart from "./pages/cart";
import Login from "./pages/login";
import AdminPanel from "./pages/admin";

const App: React.FC = () => {

   const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">Acerca de nosotros</Link>
          <Link to="/contact">Contacto</Link>
        </div>
        <div className="space-x-4">
          {role === "admin" && (
            <Link to="/admin" className="hover:underline">
              🛠️ Panel Admin
            </Link>
          )}
          <Link to="/login" className="hover:underline">
           🔑 Login
          </Link>
          <Link to="/cart" className="hover:underline">
            🛒 Carrito
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login/>} /> 
      </Routes>
    </Router>
  );
};

export default App;