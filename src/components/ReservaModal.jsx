import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ReservaModal = ({
  isOpen,
  onClose,
  serviceId,
  serviceDetails, // Detalles del servicio seleccionado
  onSuccess,
  accessToken,
}) => {
  const [formData, setFormData] = useState({ fecha: "", horario: "", horarioId: "" });
  const [horarios, setHorarios] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { addItemToCart } = useCart();
  const [profesionales, setProfesionales] = useState([]);
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState("");

  // Cargar horarios disponibles cuando se selecciona una fecha
  useEffect(() => {
    const loadHorarios = async () => {
      if (serviceId && formData.fecha) {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/horarios-disponibles/",
            {
              params: {
                servicio: serviceId,
                fecha: formData.fecha,
              },
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.data) {
            setHorarios(response.data);
            setErrorMessage("");
          } else {
            setHorarios([]);
            setErrorMessage("No se encontraron horarios disponibles");
          }
        } catch (error) {
          setHorarios([]);
          setErrorMessage("Error al cargar los horarios. Por favor, intenta nuevamente");
        }
      }
    };
    loadHorarios();
  }, [serviceId, formData.fecha, accessToken]);

  // Adaptar selección de horario y profesional
  const handleHorarioProfesional = (hora, profesionalId, horarioId) => {
    setFormData((prevData) => ({ ...prevData, horario: hora, profesional: profesionalId, horarioId }));
    setProfesionalSeleccionado(profesionalId);
  };

  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Agregar al carrito con servicio, horario y profesional
  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!formData.horarioId || !formData.profesional) {
      setErrorMessage("Por favor, selecciona un horario y profesional.");
      return;
    }
    try {
      await addItemToCart(serviceId, "", formData.horarioId, formData.profesional); // nota vacía, horarioId, profesional
      setSuccessMessage("Servicio, horario y profesional agregados al carrito.");
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 1200);
    } catch (err) {
      setErrorMessage("Error al agregar al carrito. Intenta nuevamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="bg-white text-gray-700 rounded-lg shadow-lg p-8 w-[600px]">
        <h2 className="text-2xl font-bold mb-4 text-center text-pink-400">
          Reservar Turno
        </h2>
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {/* Resumen del servicio */}
        {serviceDetails && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Resumen del Servicio:</h3>
            <p className="text-sm mb-1">
              <strong>Nombre:</strong> {serviceDetails.nombre}
            </p>
            <p className="text-sm mb-1">
              <strong>Descripción:</strong> {serviceDetails.descripcion}
            </p>
            <p className="text-sm">
              <strong>Precio:</strong> ${serviceDetails.precio}
            </p>
          </div>
        )}
        <form onSubmit={handleAddToCart}>
          <div className="mb-4">
            <label htmlFor="fecha" className="block text-lg font-bold mb-2">
              Fecha:
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#3F4E4F] text-[#DCD7C9]"
              required
            />
          </div>
          {/* Horarios y profesionales disponibles juntos */}
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Horarios Disponibles:</h3>
            {horarios.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                {horarios.map((h, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleHorarioProfesional(h.hora, h.profesional_id, h.horario_id)}
                    className={`p-3 rounded-lg text-center font-bold ${
                      formData.horarioId === h.horario_id && formData.profesional === h.profesional_id
                        ? "bg-[#A27B5C] text-[#DCD7C9]"
                        : "bg-[#3F4E4F] text-[#DCD7C9]"
                    } hover:bg-[#4A5759] transition duration-300`}
                  >
                    {h.hora} - {h.profesional_nombre}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-red-500">No hay horarios disponibles.</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-yellow-400 text-white font-bold rounded-lg shadow-md hover:bg-yellow-500 transition duration-300"
            disabled={!formData.horarioId || !profesionalSeleccionado}
          >
            Agregar al Carrito
          </button>
          <button
            onClick={onClose}
            type="button"
            className="mt-4 w-full px-4 py-2 bg-pink-200 text-pink-600 font-bold rounded-lg shadow-md hover:bg-pink-300 transition duration-300"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservaModal;