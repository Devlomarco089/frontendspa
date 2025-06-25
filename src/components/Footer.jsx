import { FaInstagram, FaFacebook } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="bg-pink-100 text-gray-700 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Derechos Reservados */}
                    <div className="text-center md:text-left">
                        <p className="text-sm text-gray-600">&copy; 2025 Spa Sentirse Bien. Todos los derechos reservados.</p>
                    </div>

                    {/* Redes Sociales */}
                    <div className="flex gap-6">
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-400 hover:text-green-500 transition duration-300"
                        >
                            <FaInstagram size={24} />
                        </a>
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-400 hover:text-green-500 transition duration-300"
                        >
                            <FaFacebook size={24} />
                        </a>
                    </div>

                    {/* Contacto */}
                    <div className="text-center md:text-right text-gray-600">
                        <p className="text-sm">Teléfono: +123 456 789</p>
                        <p className="text-sm">Dirección: 123 Calle Principal, Ciudad, País</p>
                        <p className="text-sm">Email: contacto@spa.com</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}