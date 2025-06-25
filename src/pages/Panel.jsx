import React, { useState, useEffect } from "react";
import { Navbar } from "../components/NavBar";
import { getTurnos } from "../api/turno.api";

const Panel = () => {
  const [activeTab, setActiveTab] = useState("misReservas"); // Estado para manejar la pestaña activa
  const [turnos, setTurnos] = useState([]); // Estado para almacenar los turnos
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        setLoading(true);
        const data = await getTurnos(); // Llama a la API para obtener los turnos
        setTurnos(data); // Almacena los turnos en el estado
      } catch (err) {
        setError("Error al obtener los turnos. Por favor, inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchTurnos();
  }, []); // Se ejecuta una vez al montar el componente

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-pink-50 text-gray-700 pt-24">
        <div className="container mx-auto grid grid-cols-5 gap-6 p-10">
          {/* Sidebar */}
          <div className="col-span-1 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-green-600">Mi Panel</h2>
            <ul className="space-y-4">
              <li
                className={`cursor-pointer ${
                  activeTab === "misReservas" ? "text-pink-400" : "text-gray-600"
                } hover:text-pink-400 transition duration-300`}
                onClick={() => setActiveTab("misReservas")}
              >
                Mis Reservas
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "historial" ? "text-pink-400" : "text-gray-600"
                } hover:text-pink-400 transition duration-300`}
                onClick={() => setActiveTab("historial")}
              >
                Historial
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "miPerfil" ? "text-pink-400" : "text-gray-600"
                } hover:text-pink-400 transition duration-300`}
                onClick={() => setActiveTab("miPerfil")}
              >
                Mi Perfil
              </li>
              <li
                className="cursor-pointer text-gray-600 hover:text-pink-400 transition duration-300"
                onClick={() => {
                  // Eliminar el token de acceso del almacenamiento local
                  localStorage.removeItem("accessToken");

                  // Redirigir a la página principal
                  window.location.href = "/";
                }}
              >
                Cerrar Sesión
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-span-4 bg-white p-10 rounded-lg shadow-lg">
            {activeTab === "misReservas" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Mis Reservas</h2>
                {loading ? (
                  <p className="text-center text-yellow-500">Cargando...</p>
                ) : error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : turnos.length > 0 ? (
                  <ul className="space-y-4">
                    {turnos.map((turno) => (
                      <li
                        key={turno.id}
                        className="p-4 bg-pink-50 rounded-lg shadow-md"
                      >
                        <p className="text-lg font-bold">Servicio: {turno.servicio_nombre}</p>
                        <p>Fecha: {new Date(turno.fecha).toLocaleDateString()}</p>
                        <p>Hora: {turno.hora}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-red-500">
                    No tienes reservas disponibles.
                  </p>
                )}
              </div>
            )}

            {activeTab === "historial" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Historial</h2>
                <p className="text-center text-red-500">No hay historial disponible.</p>
              </div>
            )}

            {activeTab === "miPerfil" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="nombre"
                      className="block text-lg font-bold mb-2"
                    >
                      Nombre:
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="w-full p-3 rounded-lg bg-[#4A5759] text-[#DCD7C9]"
                      defaultValue="Prueba Prueba"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-lg font-bold mb-2"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-3 rounded-lg bg-[#4A5759] text-[#DCD7C9]"
                      defaultValue="prueba@example.com"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="telefono"
                      className="block text-lg font-bold mb-2"
                    >
                      Teléfono:
                    </label>
                    <input
                      type="text"
                      id="telefono"
                      name="telefono"
                      className="w-full p-3 rounded-lg bg-[#4A5759] text-[#DCD7C9]"
                      defaultValue="+123456789"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-md transition duration-300"
                  >
                    Guardar Cambios
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Panel;