import { useState } from "react";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navbar } from "./NavBar";
import { useUser } from "../context/UserContext";

export function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const { setUser } = useUser();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        try {
            const data = await login(formData);
            // Si "Recuérdame" está marcado, guardamos en localStorage, si no, en sessionStorage
            const storage = formData.rememberMe ? localStorage : sessionStorage;
            storage.setItem("accessToken", data.access);
            storage.setItem("refreshToken", data.refresh);
            window.dispatchEvent(new Event("storage"));
            toast.success("¡Inicio de sesión exitoso!");
            // Obtener el tipo de usuario desde userData
            const userData = JSON.parse(localStorage.getItem("userData"));
            setUser(userData); // Actualiza el contexto global inmediatamente
            if (userData && userData.tipo_usuario === "profesional") {
                navigate("/profesional/panel");
            } else {
                navigate("/Servicios");
            }
        } catch (error) {
            toast.error("Error al iniciar sesión: " + error.message);
        }
    };

    return (
        <>
        <Navbar />
        <div className="login-form-container bg-pink-50 min-h-screen flex items-center justify-center">
            <div className="bg-white text-gray-700 p-8 rounded-lg shadow-xl w-full max-w-md border border-pink-100">
                <h1 className="text-3xl font-bold mb-6 text-center text-pink-400">Iniciar Sesión</h1>
                <form className="login-form space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="error-message text-red-400">{error}</p>}
                    {success && <p className="success-message text-green-400">¡Inicio de sesión exitoso!</p>}
                    <div className="form-group">
                        <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-700">
                            Correo Electrónico:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 \
                            border border-pink-200 focus:outline-none focus:ring-2 \
                            focus:ring-pink-400 focus:border-transparent \
                            placeholder-pink-300"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="block text-lg font-medium mb-2 text-gray-700">
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 \
                            border border-pink-200 focus:outline-none focus:ring-2 \
                            focus:ring-pink-400 focus:border-transparent \
                            placeholder-pink-300"
                        />
                    </div>
                    <div className="form-group flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="w-5 h-5 text-pink-400 bg-pink-50 \
                            border-pink-200 rounded focus:ring-2 focus:ring-pink-400"
                        />
                        <label htmlFor="rememberMe" className="text-sm text-gray-700">
                            Recuérdame
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-white font-bold rounded-lg \
                        hover:bg-green-600 transition-all duration-300 \
                        transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Iniciar Sesión
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-gray-700">
                            ¿No tienes cuenta?{" "}
                            <a 
                                href="/Register" 
                                className="text-pink-400 hover:text-pink-600 underline font-medium"
                            >
                                Regístrate
                            </a>
                        </p>
                    </div>
                </form>
                <div className="text-center mt-6">
                    <button
                        className="py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                        onClick={() => window.location.href = 'http://localhost:8000/admin/'}
                    >
                        ¿Eres admin? Ir al panel de Django
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}