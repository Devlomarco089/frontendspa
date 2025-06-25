import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { Cart } from "./Cart";
import { useCart } from "../context/CartContext";

const InteractiveMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { cartItems } = useCart();

  // Verificar si el usuario está autenticado al cargar el componente
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken"); // Verifica si el token existe
      setIsAuthenticated(!!token); // Si hay un token, el usuario está autenticado
    };

    checkAuth();
  }, []);

  // Manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Elimina el token del localStorage
    setIsAuthenticated(false); // Actualiza el estado
    setIsOpen(false); // Cierra el menú
    window.location.href = "/"; // Redirige a la página principal
  };

  return (
    <div className="relative flex items-center gap-4">
      {/* Botón del carrito */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="p-2 text-gray-700 hover:text-pink-400 transition-colors relative flex items-center"
      >
        <FaShoppingCart size={24} />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Botón del menú */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-green-500 text-white shadow-lg focus:outline-none hover:bg-green-600 transition duration-300"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menú deslizante */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`fixed top-0 right-0 w-72 max-h-screen bg-white text-gray-700 shadow-lg p-8 z-40 overflow-y-auto rounded-l-lg border-l border-pink-100 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {/* Botón para cerrar el menú */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-700 hover:text-pink-400 transition duration-300"
        >
          <X size={28} />
        </button>

        {/* Sección de cuenta */}
        <h2 className="text-xl font-bold border-b border-pink-100 pb-4 mb-4 text-pink-400">Cuenta</h2>
        <ul className="space-y-4">
          {isAuthenticated ? (
            <>
              <li
                className="hover:text-pink-400 transition duration-300 cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = "/panel";
                }}
              >
                Mi Panel
              </li>
              <li
                className="hover:text-pink-400 transition duration-300 cursor-pointer"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </li>
            </>
          ) : (
            <>
              <li
                className="hover:text-pink-400 transition duration-300 cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = "/Login";
                }}
              >
                Inicio de sesión
              </li>
              <li
                className="hover:text-pink-400 transition duration-300 cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = "/Register";
                }}
              >
                Registro
              </li>
            </>
          )}
        </ul>

        {/* Sección de categorías */}
        <h2 className="text-xl font-bold border-b border-pink-100 pb-4 mb-4 mt-8 text-pink-400">Categorías</h2>
        <ul className="space-y-4">
          <li
            className="hover:text-pink-400 transition duration-300 cursor-pointer"
            onClick={() => {
              setIsOpen(false);
              window.location.href = "/";
            }}
          >
            Inicio
          </li>
          <li
            className="hover:text-pink-400 transition duration-300 cursor-pointer"
            onClick={() => {
              setIsOpen(false);
              window.location.href = "/SobreNosotros"; // Redirige a la página de "Nosotros"
            }}
          >
            Nosotros
          </li>
          <li
            className="hover:text-pink-400 transition duration-300 cursor-pointer"
            onClick={() => {
              setIsOpen(false);
              window.location.href = "/Servicios"; // Redirige a la página de servicios
            }}
          >
            Servicios
          </li>
        </ul>
      </motion.div>

      {/* Carrito Modal */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default InteractiveMenu;
