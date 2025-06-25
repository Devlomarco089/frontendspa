import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LoginNavbarCarouselApp from "./Navigator";

export function Panel() {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/ordenes/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setOrdenes(response.data);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };

    fetchOrdenes();
  }, []);

  const renderOrden = (orden) => (
    <div key={orden.id} className="p-4 bg-pink-50 rounded-lg shadow-md mb-4">
      <h3 className="font-bold">Orden #{orden.id}</h3>
      <p>Fecha: {new Date(orden.fecha_creacion).toLocaleDateString()}</p>
      <p>Total: ${orden.total}</p>
      <p>Estado: {orden.pagado ? "Pagado" : "Pendiente"}</p>

      {orden.turnos.map((turno) => (
        <div key={turno.id} className="mt-2 pl-4 border-l-2 border-pink-200">
          <p>Servicio: {turno.servicio.nombre}</p>
          <p>Fecha: {turno.horario.fecha}</p>
          <p>Hora: {turno.horario.hora}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-pink-50 min-h-screen font-serif">
      <LoginNavbarCarouselApp videoSrc="https://spa-sentirse-feliz.vercel.app/assets/panel.mp4">
        <h1 className="text-6xl mb-6 tracking-wide text-[#DCD7C9]">
          Tu Panel de Control
        </h1>
      </LoginNavbarCarouselApp>

      <div className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-pink-400">
          Mis Órdenes y Turnos
        </h2>

        {/* Sección de órdenes */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Órdenes Recientes
          </h3>
          {ordenes.length === 0 ? (
            <p className="text-gray-600">
              No tienes órdenes recientes. ¡Explora nuestros servicios y realiza
              una compra!
            </p>
          ) : (
            ordenes.map(renderOrden)
          )}
        </div>

        {/* Sección de turnos (appointments) */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Mis Turnos
          </h3>
          {/* Aquí puedes agregar el código para mostrar los turnos del usuario */}
        </div>
      </div>
    </div>
  );
}