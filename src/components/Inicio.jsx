import { Link } from "react-router-dom";
import LoginNavbarCarouselApp from "./Navigator";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { logout } from "../api/auth.api"; // Importa la función de logout

export function Inicio() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para manejar la autenticación

    // Verifica si el usuario está autenticado al cargar el componente
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("accessToken"); // Verifica si el token existe
            setIsAuthenticated(!!token); // Si hay un token, el usuario está autenticado
        };

        checkAuth();
    }, []);

    const handleLogout = () => {
        logout(); // Elimina los tokens del localStorage
        setIsAuthenticated(false); // Actualiza el estado
    };

    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    return (
        <div className="bg-pink-50 min-h-screen font-serif">
            {/* Navbar */}
            <LoginNavbarCarouselApp videoSrc="https://spa-sentirse-feliz.vercel.app/assets/inicio.mp4">
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-6xl mb-6 tracking-wide text-[#DCD7C9]">
                        Spa Sentirse Bien
                    </h1>
                </motion.div>

                {/* Botones dinámicos según el estado de autenticación */}
                {!isAuthenticated ? (
                    <div className="flex gap-4 mb-8">
                        <Link
                            to="/login"
                            className="text-lg px-8 py-3 bg-green-500 text-white rounded-lg 
                            shadow-xl hover:bg-green-600 hover:shadow-2xl hover:scale-105 
                            transition-all duration-300"
                        >
                            Iniciar Sesión
                        </Link>
                        <Link
                            to="/register"
                            className="text-lg px-8 py-3 bg-pink-400 text-white rounded-lg 
                            shadow-xl hover:bg-pink-500 hover:shadow-2xl hover:scale-105 
                            transition-all duration-300"
                        >
                            Registrarse
                        </Link>
                    </div>
                ) : (
                    <div className="flex gap-4 mb-8">
                        <p className="text-lg text-white">¡Bienvenido de nuevo!</p>
                    </div>
                )}

                <motion.p
                    className="text-lg text-gray-300 mt-4 animate-bounce"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    Desliza hacia abajo
                </motion.p>
            </LoginNavbarCarouselApp>

            {/* Hero Section */}
            <div className="inicio-page text-center py-16 bg-white text-gray-800">
                <h1 className="text-4xl font-bold mb-4">Bienvenido a Spa Sentirse Bien</h1>
                <p className="text-lg mb-2">Tu bienestar es nuestra prioridad.</p>
                <p className="text-lg">Explora nuestros servicios y agenda tu turno hoy mismo.</p>
            </div>

            {/* Services Section */}
            <div className="py-16 bg-pink-50 text-center">
                <h1 className="services-title text-2xl font-bold text-gray-800 mb-6">
                    Servicios Disponibles
                </h1>
                <p className="services-description text-lg text-gray-700 mb-8">
                    Ofrecemos una variedad de tratamientos diseñados para relajarte y rejuvenecerte. Desde
                    <br />
                    masajes relajantes hasta tratamientos faciales, tenemos algo para todos.
                </p>
                <Link
                    to="/servicios"
                    className="inline-block px-6 py-3 bg-green-500 text-white font-bold rounded-lg 
                    shadow-md hover:bg-green-600 transition-all duration-300 hover:scale-105"
                >
                    Ver Servicios
                </Link>
            </div>

            {/* About Section */}
            <div className="py-16 px-8 bg-white text-gray-800">
                <h1 className="text-3xl font-bold text-center mb-6">Acerca de Nosotros</h1>
                <p className="services-description text-lg leading-relaxed max-w-4xl mx-auto text-gray-700">
                    Buscamos atraer la atención de nuestros clientes a través de experiencias inspiradas en la seducción de los sentidos. Adaptamos las propuestas con el objetivo de que logren desconectarse completamente de la rutina y disfruten de un momento de bienestar, en total armonía con la naturaleza.
                </p>
            </div>

            {/* FAQ Section */}
            <div className="py-16 px-8 bg-pink-50 text-gray-800">
                <h1 className="text-3xl font-bold text-center mb-6">Preguntas Frecuentes</h1>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
                    {/* Preguntas Frecuentes */}
                    <div className="flex-1">
                        <ul className="space-y-4">
                            {[
                                {
                                    question: "¿Qué servicios ofrecen?",
                                    answer: "Ofrecemos masajes relajantes, tratamientos faciales, terapias corporales y más.",
                                },
                                {
                                    question: "¿Cómo puedo reservar un turno?",
                                    answer: "Puedes reservar un turno directamente en nuestra página de servicios o contactándonos.",
                                },
                                {
                                    question: "¿Cuáles son los horarios de atención?",
                                    answer: "Estamos abiertos de lunes a sábado, de 9:00 AM a 8:00 PM.",
                                },
                            ].map((faq, index) => (
                                <li key={index} className="border-b border-[#4A5759] pb-4">
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleQuestion(index)}
                                    >
                                        <h2 className="text-lg font-bold text-gray-800">{faq.question}</h2>
                                        <span
                                            className={`transform transition-transform duration-300 text-[#A27B5C] ${
                                                openQuestion === index ? "rotate-180" : ""
                                            }`}
                                        >
                                            ▼
                                        </span>
                                    </div>
                                    {openQuestion === index && (
                                        <p className="text-sm mt-2 text-gray-700">{faq.answer}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Necesitas más ayuda */}
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-lg font-bold mb-4 text-gray-800">¿Necesitas más ayuda?</h2>
                        <p className="text-sm mb-4 text-gray-700">
                            Si no encuentras la respuesta que buscas, contáctanos para obtener más información.
                        </p>
                        <Link
                            to="/contacto"
                            className="inline-block px-6 py-3 bg-[#A27B5C] text-[#DCD7C9] font-bold rounded-lg shadow-md hover:bg-[#4A5759] transition duration-300"
                        >
                            Contáctanos
                        </Link>
                    </div>
                </div>
            </div>

            {/* Nuestra Ubicación */}
            <div className="py-16 px-8 bg-[#2C3639] text-[#DCD7C9]">
                <h1 className="text-3xl font-bold text-center mb-6">Nuestra Ubicación</h1>
                <div className="mb-8">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.366633506986!2d-58.98546068493559!3d-27.45133312267271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450c1f8e9f4c8f%3A0x7b1e6c6e8b8b8b8b!2sPlaza%2025%20de%20Mayo%2C%20Resistencia%2C%20Chaco!5e0!3m2!1ses!2sar!4v1680000000000!5m2!1ses!2sar"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Mapa de ubicación"
                        className="rounded-lg shadow-xl"
                    ></iframe>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-[#3F4E4F] text-[#DCD7C9] p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-2 text-[#A27B5C]">Dirección</h2>
                        <p>Plaza 25 de Mayo, Resistencia, Chaco, Argentina</p>
                    </div>
                    <div className="bg-[#3F4E4F] text-[#DCD7C9] p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-2 text-[#A27B5C]">Contacto</h2>
                        <p>Teléfono: +123 456 789</p>
                        <p>Email: contacto@spa.com</p>
                    </div>
                    <div className="bg-[#3F4E4F] text-[#DCD7C9] p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-2 text-[#A27B5C]">Horarios</h2>
                        <p>Lunes a Sábado: 9:00 AM - 8:00 PM</p>
                        <p>Domingo: Cerrado</p>
                    </div>
                </div>
            </div>
        </div>
    );
}