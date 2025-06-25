import { useState, useEffect } from "react";
import { FaSpa, FaLeaf, FaSmile, FaHandsHelping, FaUsers } from "react-icons/fa";
import LoginNavbarCarouselApp from "../components/Navigator";
import { motion } from "framer-motion";
import { getServicios } from "../api/servicios.api";
import axios from "axios";
import Modal from "../components/Modal"; // Importa el componente Modal
import ReservaModal from "../components/ReservaModal"; // Importa el componente ReservaModal
import ModalInfoServicio from "../components/ModalInfoServicio"; // Importa el componente ModalInfoServicio
import ModalPago from "../components/ModalPago"; // Importa el componente ModalPago

export function ServicesPage() {
  const [services, setServices] = useState([]); // Estado para los servicios
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar si el usuario está autenticado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal de reserva
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // Estado para controlar el modal de autenticación
  const [selectedService, setSelectedService] = useState(null); // Servicio seleccionado para reservar
  const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // Estado para controlar el modal de información
  const [selectedServiceInfo, setSelectedServiceInfo] = useState(null); // Servicio seleccionado para información
  const [isPagoModalOpen, setIsPagoModalOpen] = useState(false); // Estado para controlar el modal de pago

  // Verifica si el usuario está autenticado al cargar el componente
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken"); // Verifica si el token existe
      setIsAuthenticated(!!token); // Si hay un token, el usuario está autenticado
    };

    checkAuth();
  }, []);

  // Cargar servicios desde el backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServicios(); // Llama a la API
        setServices(response.data); // Guarda los datos en el estado
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
      }
    };

    fetchServices();
  }, []);

  // Abrir el modal para reservar un turno
  const handleReserve = (serviceId) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true); // Abre el modal de autenticación
      return;
    }
    setSelectedService(serviceId);
    setIsModalOpen(true); // Abre el modal de reserva
  };

  // Abrir el modal de información
  const handleViewInfo = (service) => {
    setSelectedServiceInfo(service);
    setIsInfoModalOpen(true);
  };

  // Redirigir al login
  const handleLoginRedirect = () => {
    window.location.href = "/login"; // Redirige a la página de inicio de sesión
  };

  const handleCloseReservaModal = () => {
    setIsModalOpen(false);
  };

  const handleReservaSuccess = () => {
    console.log("Reserva confirmada");
    setIsModalOpen(false);
    setIsPagoModalOpen(true); // Abre el modal de pago
  };

  const handleClosePagoModal = () => {
    setIsPagoModalOpen(false);
  };

  const handleMercadoPago = () => {
    console.log("Pago con Mercado Pago seleccionado");
    setIsPagoModalOpen(false);
    // Redirigir al flujo de pago de Mercado Pago
  };

  const handleEfectivo = () => {
    console.log("Pago en efectivo seleccionado");
    setIsPagoModalOpen(false);
    // Manejar la lógica para pagos en efectivo
  };

  return (
    <div className="services-page bg-pink-50 min-h-screen">
      <LoginNavbarCarouselApp videoSrc="https://spa-sentirse-feliz.vercel.app/assets/servicios.mp4">
        <motion.h1
          className="text-6xl font-bold mb-6 tracking-wide text-white"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Nuestros Servicios
        </motion.h1>
        <p className="text-lg text-white mt-4">
          Descubre nuestras opciones para relajarte y sentirte bien.
        </p>
      </LoginNavbarCarouselApp>

      {/* Header */}
      <div className="text-center py-16 bg-white text-gray-700">
        <h1 className="text-4xl font-bold mb-4 text-pink-400">Servicios Disponibles</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Buscamos atraer la atención de nuestros clientes a través de experiencias inspiradas en la seducción de los sentidos. 
          Adaptamos las propuestas con el objetivo de que logren desconectarse completamente de la rutina y disfruten de un 
          momento de bienestar, en total armonía con la naturaleza.
        </p>
      </div>

      {/* Filter Icons */}
      <div className="flex justify-center gap-6 py-8 bg-pink-50 text-gray-700">
        <button
          onClick={() => setSelectedCategory("")}
          className={`flex flex-col items-center text-center rounded-full p-4 ${
            selectedCategory === "" ? "text-white bg-green-500" : "text-gray-600 bg-white"
          } hover:text-white hover:bg-green-600 hover:scale-110 transition-all duration-300`}
        >
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full ${
              selectedCategory === "" ? "bg-[#3F4E4F]" : "bg-[#A27B5C]"
            } hover:bg-[#4A5759] transition-colors duration-300`}
          >
            <FaSpa size={32} />
          </div>
          <span className="mt-2 text-sm">Todos</span>
        </button>
        <button
          onClick={() => setSelectedCategory("corporales")}
          className={`flex flex-col items-center text-center rounded-full p-4 ${
            selectedCategory === "corporales" ? "text-white bg-green-500" : "text-gray-600 bg-white"
          } hover:text-white hover:bg-green-600 hover:scale-110 transition-all duration-300`}
        >
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full ${
              selectedCategory === "corporales" ? "bg-[#3F4E4F]" : "bg-[#A27B5C]"
            } hover:bg-[#4A5759] transition-colors duration-300`}
          >
            <FaLeaf size={32} />
          </div>
          <span className="mt-2 text-sm">Corporales</span>
        </button>
        <button
          onClick={() => setSelectedCategory("masajes")}
          className={`flex flex-col items-center text-center rounded-full p-4 ${
            selectedCategory === "masajes" ? "text-white bg-green-500" : "text-gray-600 bg-white"
          } hover:text-white hover:bg-green-600 hover:scale-110 transition-all duration-300`}
        >
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full ${
              selectedCategory === "masajes" ? "bg-[#3F4E4F]" : "bg-[#A27B5C]"
            } hover:bg-[#4A5759] transition-colors duration-300`}
          >
            <FaHandsHelping size={32} />
          </div>
          <span className="mt-2 text-sm">Masajes</span>
        </button>
        <button
          onClick={() => setSelectedCategory("faciales")}
          className={`flex flex-col items-center text-center rounded-full p-4 ${
            selectedCategory === "faciales" ? "text-white bg-green-500" : "text-gray-600 bg-white"
          } hover:text-white hover:bg-green-600 hover:scale-110 transition-all duration-300`}
        >
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full ${
              selectedCategory === "faciales" ? "bg-[#3F4E4F]" : "bg-[#A27B5C]"
            } hover:bg-[#4A5759] transition-colors duration-300`}
          >
            <FaSmile size={32} />
          </div>
          <span className="mt-2 text-sm">Faciales</span>
        </button>
        <button
          onClick={() => setSelectedCategory("grupales")}
          className={`flex flex-col items-center text-center rounded-full p-4 ${
            selectedCategory === "grupales" ? "text-white bg-green-500" : "text-gray-600 bg-white"
          } hover:text-white hover:bg-green-600 hover:scale-110 transition-all duration-300`}
        >
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full ${
              selectedCategory === "grupales" ? "bg-[#3F4E4F]" : "bg-[#A27B5C]"
            } hover:bg-[#4A5759] transition-colors duration-300`}
          >
            <FaUsers size={32} />
          </div>
          <span className="mt-2 text-sm">Grupales</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-16 bg-pink-50">
        {services
          .filter((service) => 
            selectedCategory === "" || service.categoria === selectedCategory
          )
          .map((service) => (
            <div
              key={service.id}
              className="bg-white text-gray-700 rounded-lg shadow-lg overflow-hidden 
              hover:shadow-xl transition-all duration-300 hover:scale-105 border border-pink-100"
            >
              <img
                src={`https://web-production-5825.up.railway.app/${service.imagen}`} // Asegúrate de usar la URL completa
                alt={service.titulo}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-pink-400">{service.titulo}</h2>
                <p className="text-lg mb-4">{service.descripcion}</p>
                <p className="text-lg font-semibold mb-2">Precio: ${service.precio}</p>
                <p className="text-lg font-semibold mb-4">Duración: {service.duracion} minutos</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleReserve(service.id)}
                    className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg 
                      hover:bg-green-600 transition-all duration-300 transform hover:scale-105 
                      shadow-lg hover:shadow-xl"
                  >
                    Reservar
                  </button>
                  <button
                    onClick={() => handleViewInfo(service)}
                    className="px-4 py-2 bg-pink-200 text-pink-600 font-bold rounded-lg hover:bg-pink-300 transition duration-300"
                  >
                    Ver Información
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal para reservar turno */}
      <ReservaModal
        isOpen={isModalOpen}
        onClose={handleCloseReservaModal}
        serviceId={selectedService}
        serviceDetails={services.find((service) => service.id === selectedService)} // Detalles del servicio
        onSuccess={handleReservaSuccess}
        accessToken={localStorage.getItem("accessToken")}
      />

      {/* Modal para autenticación */}
      <Modal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLoginRedirect}
      />

      {/* Modal para información del servicio */}
      <ModalInfoServicio
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        service={selectedServiceInfo}
        onReserve={() => {
          setIsInfoModalOpen(false); // Cierra el modal de información
          handleReserve(selectedServiceInfo.id); // Abre el modal de reserva
        }}
      />

      {/* Modal de pago */}
      <ModalPago
        isOpen={isPagoModalOpen}
        onClose={handleClosePagoModal}
        onMercadoPago={handleMercadoPago}
        onEfectivo={handleEfectivo}
      />
    </div>
  );
}