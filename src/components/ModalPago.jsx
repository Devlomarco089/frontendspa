import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ModalPago = ({ isOpen, onClose, onMercadoPago, onEfectivo }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handlePayment = async (method) => {
    try {
      const pagoData = {
        metodo_pago: method,
        tipo_tarjeta: method === "web" ? "credito" : null,
      };

      await procesarPago(ordenId, pagoData);

      toast.success(`Turno pagado correctamente. Método: ${method}`);

      setTimeout(() => {
        navigate("/panel");
      }, 3000);
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      toast.error("Error al procesar el pago. Por favor intente nuevamente.");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#3F4E4F] text-[#DCD7C9] rounded-lg shadow-lg w-11/12 max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#A27B5C] text-center">
          Selecciona tu método de pago
        </h2>
        <p className="text-lg mb-6 text-center">
          Elige cómo deseas realizar el pago para completar tu reserva.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              handlePayment("Mercado Pago");
              onMercadoPago();
            }}
            className="w-full px-4 py-2 bg-[#A27B5C] text-[#DCD7C9] font-bold rounded-lg shadow-md hover:bg-[#4A5759] transition duration-300"
          >
            Pagar con Mercado Pago
          </button>
          <button
            onClick={() => {
              handlePayment("Efectivo");
              onEfectivo();
            }}
            className="w-full px-4 py-2 bg-[#4A5759] text-[#DCD7C9] font-bold rounded-lg shadow-md hover:bg-[#A27B5C] transition duration-300"
          >
            Pagar en Efectivo
          </button>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4A5759] text-[#DCD7C9] font-bold rounded-lg hover:bg-[#A27B5C] transition duration-300"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPago;