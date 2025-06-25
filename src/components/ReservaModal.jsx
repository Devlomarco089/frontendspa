import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservaModal = ({
  isOpen,
  onClose,
  serviceId,
  serviceDetails, // Detalles del servicio seleccionado
  onSuccess,
  accessToken,
}) => {
  const [formData, setFormData] = useState({ fecha: "", horario: "" });
  const [horarios, setHorarios] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Cargar horarios disponibles cuando se selecciona una fecha
  useEffect(() => {
    const loadHorarios = async () => {
      if (serviceId && formData.fecha) {
        try {
          const response = await axios.get(
            "https://web-production-5825.up.railway.app/api/horarios-disponibles/", // Agregado /api/ al path
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
          console.error("Error al cargar los horarios disponibles:", error);
          setHorarios([]);
          
          if (error.response?.status === 404) {
            setErrorMessage("No se encontró el servicio de horarios disponibles");
          } else if (error.response?.status === 401) {
            setErrorMessage("Sesión expirada. Por favor, inicia sesión nuevamente");
          } else {
            setErrorMessage("Error al cargar los horarios. Por favor, intenta nuevamente");
          }
        }
      }
    };

    loadHorarios();
  }, [serviceId, formData.fecha, accessToken]);

  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Manejar la reserva de turno
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.horario) {
      setErrorMessage("Por favor, selecciona un horario.");
      return;
    }

    try {
      // Crear orden de turno
      const ordenData = {
        servicios: [{
          horario: formData.horario,
          servicio: serviceId
        }],
        metodo_pago: "web", // O esperar a que el usuario seleccione
      };

      const response = await axios.post(
        "http://localhost:8000/api/ordenes/",
        ordenData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSuccessMessage("¡Turno reservado con éxito!");
      setErrorMessage("");
      onSuccess(response.data); // Pasar la orden creada
      onClose();
    } catch (error) {
      console.error("Error al reservar el turno:", error);
      setErrorMessage("Hubo un error al reservar el turno. Inténtalo nuevamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backdropFilter: "blur(8px)", // Aplica el desenfoque al fondo
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo semitransparente claro
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

        <form onSubmit={handleSubmit}>
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

          {/* Horarios disponibles */}
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Horarios Disponibles:</h3>
            {horarios.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {horarios.map((horario) => (
                  <button
                    key={horario.id}
                    type="button"
                    onClick={() => setFormData((prevData) => ({ ...prevData, horario: horario.id }))}
                    className={`p-3 rounded-lg text-center font-bold ${
                      formData.horario === horario.id
                        ? "bg-[#A27B5C] text-[#DCD7C9]"
                        : "bg-[#3F4E4F] text-[#DCD7C9]"
                    } hover:bg-[#4A5759] transition duration-300`}
                  >
                    {horario.hora}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-red-500">No hay horarios disponibles.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Confirmar Reserva
          </button>
          <button
            onClick={onClose}
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