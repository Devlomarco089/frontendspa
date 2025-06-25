import React from "react";

const Modal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo semitransparente claro
      }}
    >
      <div className="bg-[#3F4E4F] text-[#DCD7C9] rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#A27B5C]">
          Iniciar Sesión
        </h2>
        <p className="text-lg text-center mb-6">
          Debes iniciar sesión para reservar este servicio.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onLogin}
            className="px-4 py-2 bg-[#A27B5C] text-[#DCD7C9] font-bold rounded-lg 
              hover:bg-[#4A5759] transition-all duration-300 transform hover:scale-105 
              shadow-lg hover:shadow-xl"
          >
            Ir a Login
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4A5759] text-[#DCD7C9] font-bold rounded-lg 
              hover:bg-[#A27B5C] transition-all duration-300 transform hover:scale-105 
              shadow-lg hover:shadow-xl"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;