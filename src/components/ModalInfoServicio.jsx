import React from "react";

const ModalInfoServicio = ({ isOpen, onClose, service, onReserve }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#3F4E4F] text-[#DCD7C9] rounded-lg shadow-lg w-11/12 max-w-lg p-6">
        <h2 className="text-3xl font-bold mb-4 text-[#A27B5C]">{service.titulo}</h2>
        <img
          src={`http://localhost:8000${service.imagen}`}
          alt={service.titulo}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-lg mb-4">{service.descripcion}</p>
        <p className="text-lg font-semibold mb-2">Precio: ${service.precio}</p>
        <p className="text-lg font-semibold mb-4">Duración: {service.duracion} minutos</p>
        <p className="text-lg font-semibold mb-4">Categoría: {service.categoria}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4A5759] text-[#DCD7C9] font-bold rounded-lg hover:bg-[#A27B5C] transition duration-300"
          >
            Cerrar
          </button>
          <button
            onClick={onReserve}
            className="px-4 py-2 bg-[#A27B5C] text-[#DCD7C9] font-bold rounded-lg hover:bg-[#4A5759] transition duration-300"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInfoServicio;