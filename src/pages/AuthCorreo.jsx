import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import { Navbar } from '../components/NavBar';

export function AuthCorreo() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl text-center border border-pink-100">
                    <div className="mb-6">
                        <FaEnvelope className="mx-auto text-pink-400 text-5xl" />
                    </div>
                    
                    <h1 className="text-2xl font-bold text-green-600 mb-4">
                        ¡Verifica tu correo electrónico!
                    </h1>
                    
                    <p className="text-gray-600 mb-6">
                        Hemos enviado un enlace de verificación a tu correo electrónico. 
                        Por favor, revisa tu bandeja de entrada y sigue las instrucciones para completar el proceso.
                    </p>
                    
                    <div className="bg-pink-50 p-4 rounded-lg mb-6">
                        <p className="text-sm text-gray-600">
                            ¿No recibiste el correo? Revisa tu carpeta de spam o correo no deseado.
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <Link 
                            to="/login"
                            className="block w-full py-3 bg-green-500 text-white font-bold rounded-lg 
                            hover:bg-green-600 transition-all duration-300 
                            transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Volver al inicio de sesión
                        </Link>
                        
                        <button 
                            onClick={() => window.location.reload()}
                            className="w-full py-3 bg-transparent text-pink-400 border border-pink-400 
                            font-bold rounded-lg hover:bg-pink-400 hover:text-white 
                            transition-all duration-300"
                        >
                            Reenviar correo
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthCorreo;