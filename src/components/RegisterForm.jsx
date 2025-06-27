import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navbar } from "./NavBar";
import { useUser } from "../context/UserContext";
import { registerClient, registerProfessional } from "../api/apiService";

export function RegisterForm() {
    const { isAdmin } = useUser();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        tipo_usuario: "cliente",
        acceptTerms: false,
        // Campos específicos para profesionales
        especiality: [],
        experience: "",
        certificaciones: "",
        disponibilidad_horaria: {
            lunes: "",
            martes: "",
            miercoles: "",
            jueves: "",
            viernes: "",
        },
        profile_picture: null
    });

    useEffect(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userData");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("userData");
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith('disponibilidad_')) {
            const dia = name.split('_')[1];
            setFormData(prev => ({
                ...prev,
                disponibilidad_horaria: {
                    ...prev.disponibilidad_horaria,
                    [dia]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.acceptTerms) {
            toast.error("Debes aceptar los términos y condiciones.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return;
        }

        try {
            let result;
            const userData = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password,
                tipo_usuario: formData.tipo_usuario
            };

            if (formData.tipo_usuario === 'profesional') {
                userData.datos_profesional = {
                    especiality: formData.especiality,
                    experience: parseInt(formData.experience),
                    certificaciones: formData.certificaciones,
                    disponibilidad_horaria: formData.disponibilidad_horaria,
                    profile_picture: formData.profile_picture
                };
                result = await registerProfessional(userData);
            } else {
                result = await registerClient(userData);
            }

            toast.success("¡Registro exitoso! Por favor verifica tu correo electrónico.");
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                confirmPassword: "",
                tipo_usuario: "cliente",
                acceptTerms: false,
                especiality: [],
                experience: "",
                certificaciones: "",
                disponibilidad_horaria: {
                    lunes: "",
                    martes: "",
                    miercoles: "",
                    jueves: "",
                    viernes: "",
                },
                profile_picture: null
            });
            setTimeout(() => navigate("/verify-email"), 3000);
        } catch (error) {
            toast.error("Error: " + (error.message || "Ha ocurrido un error en el registro"));
        }
    };

    return (
        <>
            <Navbar />
            <div className="register-form-container bg-pink-50 min-h-screen flex items-center justify-center pt-24 pb-24">
                <div className="bg-white text-gray-700 p-8 rounded-lg shadow-xl w-full max-w-xl border border-pink-100">
                    <h1 className="text-3xl font-bold mb-6 text-center text-pink-400">Registrarse</h1>
                    <form className="register-form space-y-6" onSubmit={handleSubmit}>
                        {/* Contenedor para nombre y apellido */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label htmlFor="first_name" className="block text-lg font-medium mb-2 text-gray-700">
                                    Nombre:
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                    border border-pink-200 focus:outline-none focus:ring-2 
                                    focus:ring-pink-400 focus:border-transparent 
                                    placeholder-gray-400"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name" className="block text-lg font-medium mb-2 text-gray-700">
                                    Apellido:
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                    border border-pink-200 focus:outline-none focus:ring-2 
                                    focus:ring-pink-400 focus:border-transparent 
                                    placeholder-gray-400"
                                />
                            </div>
                        </div>
                        
                        {/* Email field */}
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
                                className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                border border-pink-200 focus:outline-none focus:ring-2 
                                focus:ring-pink-400 focus:border-transparent 
                                placeholder-gray-400"
                            />
                        </div>

                        {/* Password fields */}
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
                                className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                border border-pink-200 focus:outline-none focus:ring-2 
                                focus:ring-pink-400 focus:border-transparent 
                                placeholder-gray-400"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="block text-lg font-medium mb-2 text-gray-700">
                                Confirmar Contraseña:
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                border border-pink-200 focus:outline-none focus:ring-2 
                                focus:ring-pink-400 focus:border-transparent 
                                placeholder-gray-400"
                            />
                        </div>

                        {/* Tipo de Usuario - Solo visible para administradores */}
                        {isAdmin && (
                            <div className="form-group">
                                <label className="block text-lg font-medium mb-2 text-gray-700">
                                    Tipo de Usuario:
                                </label>
                                <select
                                    name="tipo_usuario"
                                    value={formData.tipo_usuario}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                    border border-pink-200 focus:outline-none focus:ring-2 
                                    focus:ring-pink-400 focus:border-transparent"
                                >
                                    <option value="cliente">Cliente</option>
                                    <option value="profesional">Profesional</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>
                        )}

                        {/* Campos específicos para profesionales */}
                        {formData.tipo_usuario === 'profesional' && (
                            <div className="space-y-4">
                                <div className="form-group">
                                    <label htmlFor="especiality" className="block text-lg font-medium mb-2 text-gray-700">
                                        Especialidad:
                                    </label>
                                    <input
                                        type="text"
                                        id="especiality"
                                        name="especiality"
                                        value={formData.especiality}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                        border border-pink-200 focus:outline-none focus:ring-2 
                                        focus:ring-pink-400 focus:border-transparent 
                                        placeholder-gray-400"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="experience" className="block text-lg font-medium mb-2 text-gray-700">
                                        Experiencia (años):
                                    </label>
                                    <input
                                        type="number"
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                        border border-pink-200 focus:outline-none focus:ring-2 
                                        focus:ring-pink-400 focus:border-transparent 
                                        placeholder-gray-400"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="certificaciones" className="block text-lg font-medium mb-2 text-gray-700">
                                        Certificaciones:
                                    </label>
                                    <input
                                        type="text"
                                        id="certificaciones"
                                        name="certificaciones"
                                        value={formData.certificaciones}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                        border border-pink-200 focus:outline-none focus:ring-2 
                                        focus:ring-pink-400 focus:border-transparent 
                                        placeholder-gray-400"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="block text-lg font-medium mb-2 text-gray-700">
                                        Disponibilidad Horaria:
                                    </label>
                                    <div className="grid grid-cols-5 gap-2">
                                        {["lunes", "martes", "miercoles", "jueves", "viernes"].map((dia) => (
                                            <div key={dia} className="flex flex-col">
                                                <span className="text-sm text-gray-600 capitalize">{dia}:</span>
                                                <input
                                                    type="text"
                                                    id={`disponibilidad_${dia}`}
                                                    name={`disponibilidad_${dia}`}
                                                    value={formData.disponibilidad_horaria[dia]}
                                                    onChange={handleChange}
                                                    className="px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                                    border border-pink-200 focus:outline-none focus:ring-2 
                                                    focus:ring-pink-400 focus:border-transparent 
                                                    placeholder-gray-400"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="profile_picture" className="block text-lg font-medium mb-2 text-gray-700">
                                        Foto de Perfil:
                                    </label>
                                    <input
                                        type="file"
                                        id="profile_picture"
                                        name="profile_picture"
                                        onChange={(e) => setFormData({ ...formData, profile_picture: e.target.files[0] })}
                                        className="w-full px-4 py-2 rounded-lg bg-pink-50 text-gray-700 
                                        border border-pink-200 focus:outline-none focus:ring-2 
                                        focus:ring-pink-400 focus:border-transparent 
                                        placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Terms checkbox */}
                        <div className="form-group flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                required
                                className="w-5 h-5 text-pink-400 bg-pink-50 
                                border-pink-200 rounded focus:ring-2 focus:ring-pink-400"
                            />
                            <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                                Acepto los <a href="/Terminos" className="text-pink-400 hover:text-pink-600 underline">
                                términos y condiciones</a>
                            </label>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-500 text-white font-bold rounded-lg 
                            hover:bg-green-600 transition-all duration-300 
                            transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Registrarse
                        </button>

                        {/* Login link */}
                        <div className="text-center mt-4">
                            <p className="text-gray-700">
                                ¿Ya tienes cuenta?{" "}
                                <a 
                                    href="/Login" 
                                    className="text-pink-400 hover:text-pink-600 underline font-medium"
                                >
                                    Inicia sesión
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}