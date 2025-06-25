import React, { useState } from "react";
import LoginNavbarCarouselApp from "../components/Navigator";
import { motion } from "framer-motion";

export function About() {
    const [activeTab, setActiveTab] = useState("historia");

    return (
        <>
            <LoginNavbarCarouselApp videoSrc="https://spa-sentirse-feliz.vercel.app/assets/about.mp4">
                <motion.h1
                    className="text-6xl font-bold mb-6 tracking-wide text-white"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Sobre Nosotros
                </motion.h1>
                <p className="text-lg text-white mt-4">
                    Conoce nuestra historia y compromiso con tu bienestar
                </p>
            </LoginNavbarCarouselApp>

            {/* Contenedor principal con fondo claro */}
            <div className="min-h-screen py-16 px-8 bg-pink-50">
                <h1 className="text-4xl font-bold text-center mb-12 text-pink-400">
                    Nuestra Historia
                </h1>

                {/* Navegación de pestañas */}
                <div className="tabs flex justify-center space-x-8 border-b border-pink-200 mb-12">
                    <button
                        className={`text-lg font-medium pb-2 transition-colors duration-300 ${
                            activeTab === "historia"
                                ? "text-pink-400 border-b-2 border-pink-400"
                                : "text-gray-600 hover:text-pink-400"
                        }`}
                        onClick={() => setActiveTab("historia")}
                    >
                        Nuestra Historia
                    </button>
                    <button
                        className={`text-lg font-medium pb-2 transition-colors duration-300 ${
                            activeTab === "mision"
                                ? "text-pink-400 border-b-2 border-pink-400"
                                : "text-gray-600 hover:text-pink-400"
                        }`}
                        onClick={() => setActiveTab("mision")}
                    >
                        Misión y Visión
                    </button>
                    <button
                        className={`text-lg font-medium pb-2 transition-colors duration-300 ${
                            activeTab === "elegirnos"
                                ? "text-pink-400 border-b-2 border-pink-400"
                                : "text-gray-600 hover:text-pink-400"
                        }`}
                        onClick={() => setActiveTab("elegirnos")}
                    >
                        Por Qué Elegirnos
                    </button>
                </div>

                {/* Contenido de las pestañas */}
                <div className="tab-content max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 border border-pink-100">
                    {activeTab === "historia" && (
                        <section>
                            <h2 className="text-3xl font-bold mb-4 text-pink-400">
                                Nuestra Historia
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-700">
                                Fundado en 2010 por la Doctora Felicidad, Sentirse Bien Spa nació con la misión de ofrecer un
                                enfoque integral del bienestar en un ambiente de lujo accesible. Desde entonces, nos hemos
                                convertido en el referente de tratamientos corporales y faciales en la región, combinando
                                técnicas tradicionales con las últimas innovaciones en estética y bienestar.
                            </p>
                        </section>
                    )}

                    {activeTab === "mision" && (
                        <section>
                            <h2 className="text-3xl font-bold mb-4 text-pink-400">
                                Misión y Visión
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-700">
                                Nuestra misión es mejorar la calidad de vida de nuestros clientes a través de servicios de
                                bienestar excepcionales. Nos esforzamos por ofrecer tratamientos personalizados que promuevan
                                la relajación, la salud y el equilibrio. Nuestra visión es ser reconocidos como el spa líder
                                en innovación, calidad y atención al cliente, creando experiencias inolvidables para todos
                                nuestros visitantes.
                            </p>
                        </section>
                    )}

                    {activeTab === "elegirnos" && (
                        <section>
                            <h2 className="text-3xl font-bold mb-4 text-pink-400">
                                ¿Por Qué Elegirnos?
                            </h2>
                            <ul className="space-y-4 text-lg leading-relaxed text-gray-700">
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-500">•</span>
                                    <div>
                                        <strong className="text-pink-400">Experiencia y profesionalismo:</strong> 
                                        <span className="text-gray-700">
                                            Contamos con un equipo altamente capacitado y comprometido con tu bienestar.
                                        </span>
                                    </div>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-500">•</span>
                                    <div>
                                        <strong className="text-pink-400">Ambiente relajante:</strong> 
                                        <span className="text-gray-700">
                                            Nuestras instalaciones están diseñadas para ofrecerte una experiencia de tranquilidad y confort.
                                        </span>
                                    </div>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-500">•</span>
                                    <div>
                                        <strong className="text-pink-400">Productos de calidad:</strong> 
                                        <span className="text-gray-700">
                                            Utilizamos productos naturales y de alta calidad para garantizar los mejores resultados.
                                        </span>
                                    </div>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-500">•</span>
                                    <div>
                                        <strong className="text-pink-400">Enfoque personalizado:</strong> 
                                        <span className="text-gray-700">
                                            Adaptamos nuestros servicios a tus necesidades específicas para que cada visita sea única.
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}