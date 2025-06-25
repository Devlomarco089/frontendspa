import React, { useState } from 'react';
import { Navbar } from './NavBar';
import { toast } from 'react-toastify';

export function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        subject: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Here you would typically send the form data to your backend
            console.log('Form submitted:', formData);
            toast.success('Mensaje enviado con éxito');
            setFormData({
                fullName: '',
                subject: '',
                email: '',
                phone: '',
                message: ''
            });
        } catch (error) {
            toast.error('Error al enviar el mensaje');
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-pink-50 py-16 px-4 sm:px-6 lg:px-8 pt-24">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-pink-100">
                    <h1 className="text-3xl font-bold text-center mb-8 text-pink-400">
                        Contáctanos
                    </h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nombre Completo */}
                        <div>
                            <label 
                                htmlFor="fullName" 
                                className="block text-lg font-medium mb-2 text-gray-700"
                            >
                                Nombre Completo *
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                border border-pink-200 focus:outline-none focus:ring-2 
                                focus:ring-pink-400 focus:border-transparent 
                                placeholder-gray-400"
                                placeholder="Ingresa tu nombre completo"
                            />
                        </div>

                        {/* Asunto */}
                        <div>
                            <label 
                                htmlFor="subject" 
                                className="block text-lg font-medium mb-2 text-gray-700"
                            >
                                Asunto *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                border border-pink-200 focus:outline-none focus:ring-2 
                                focus:ring-pink-400 focus:border-transparent 
                                placeholder-gray-400"
                                placeholder="Asunto del mensaje"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-lg font-medium mb-2 text-gray-700"
                            >
                                Correo Electrónico *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                border border-pink-200 focus:outline-none focus:ring-2 
                                focus:ring-pink-400 focus:border-transparent 
                                placeholder-gray-400"
                                placeholder="tu@email.com"
                            />
                        </div>

                        {/* Teléfono (opcional) */}
                        <div>
                            <label 
                                htmlFor="phone" 
                                className="block text-lg font-medium mb-2 text-gray-700"
                            >
                                Teléfono (opcional)
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                border border-pink-200 focus:outline-none focus:ring-2 
                                focus:ring-pink-400 focus:border-transparent 
                                placeholder-gray-400"
                                placeholder="+1234567890"
                            />
                        </div>

                        {/* Mensaje */}
                        <div>
                            <label 
                                htmlFor="message" 
                                className="block text-lg font-medium mb-2 text-gray-700"
                            >
                                Mensaje *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                border border-pink-200 focus:outline-none focus:ring-2 
                                focus:ring-pink-400 focus:border-transparent 
                                placeholder-gray-400 resize-none"
                                placeholder="Escribe tu mensaje aquí..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-500 text-white font-bold rounded-lg 
                            hover:bg-green-600 transition-all duration-300 
                            transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}