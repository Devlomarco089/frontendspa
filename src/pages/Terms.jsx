import React from 'react';
import { Navbar } from '../components/NavBar';

export function Terms() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#2C3639] py-16 px-4 sm:px-6 lg:px-8 pt-32 ">
                <div className="max-w-4xl mx-auto bg-[#3F4E4F] p-8 rounded-lg shadow-xl border border-[#4A5759]">
                    <h1 className="text-3xl font-bold text-center mb-8 text-[#A27B5C]">
                        Términos y Condiciones
                    </h1>
                    
                    <div className="space-y-6 text-[#DCD7C9]">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-[#A27B5C]">1. Aceptación de los Términos</h2>
                            <p className="mb-4">
                                Al acceder y utilizar los servicios de Spa Sentirse Bien, usted acepta estos términos y condiciones en su totalidad.
                                Si no está de acuerdo con estos términos, por favor no utilice nuestros servicios.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-[#A27B5C]">2. Reservas y Cancelaciones</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Las reservas deben realizarse con al menos 24 horas de anticipación.</li>
                                <li>Las cancelaciones deben notificarse con un mínimo de 12 horas de anticipación.</li>
                                <li>Las cancelaciones tardías o inasistencias pueden estar sujetas a cargos.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-[#A27B5C]">3. Condiciones de Salud</h2>
                            <p className="mb-4">
                                Los clientes deben informar sobre cualquier condición médica relevante antes de recibir los tratamientos.
                                Nos reservamos el derecho de rechazar el servicio si consideramos que puede ser perjudicial para la salud del cliente.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-[#A27B5C]">4. Política de Privacidad</h2>
                            <p className="mb-4">
                                Protegemos su información personal de acuerdo con las leyes de privacidad vigentes.
                                No compartiremos su información con terceros sin su consentimiento expreso.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-[#A27B5C]">5. Comportamiento</h2>
                            <p className="mb-4">
                                Esperamos un comportamiento respetuoso hacia nuestro personal y otros clientes.
                                Nos reservamos el derecho de rechazar el servicio a cualquier persona que muestre un comportamiento inadecuado.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-[#A27B5C]">6. Modificaciones</h2>
                            <p className="mb-4">
                                Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento.
                                Los cambios entrarán en vigor inmediatamente después de su publicación en nuestro sitio web.
                            </p>
                        </section>

                        <div className="text-sm text-[#DCD7C9] mt-8 pt-4 border-t border-[#4A5759]">
                            <p>
                                Última actualización: Mayo 2024
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}