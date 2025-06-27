import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { getCartItems } from '../api/apiService';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function Cart({ isOpen, onClose }) {
    const { cartItems, setCartItems, removeFromCart, getTotal } = useCart();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoading(true);
                const items = await getCartItems();
                setCartItems(items);
            } catch (error) {
                toast.error('Error al cargar el carrito');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchCartItems();
        }
    }, [isOpen]);

    const handleProceedToPayment = () => {
        navigate('/panel-pago'); // Redirige al panel de pago
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="w-96 bg-[#3F4E4F] h-full p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#DCD7C9] flex items-center">
                        <FaShoppingCart className="mr-2" />
                        Carrito
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-[#DCD7C9] hover:text-[#A27B5C] transition-colors"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                {loading ? (
                    <p className="text-[#DCD7C9] text-center">Cargando...</p>
                ) : cartItems.length === 0 ? (
                    <p className="text-[#DCD7C9] text-center">No hay servicios en el carrito</p>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="bg-[#2C3639] p-4 rounded-lg shadow-md"
                                >
                                    <h3 className="text-[#DCD7C9] font-bold">
                                        {item.servicio_detalle.nombre}
                                    </h3>
                                    <p className="text-[#A27B5C]">
                                        ${item.servicio_detalle.precio}
                                    </p>
                                    {item.nota && (
                                        <p className="text-[#DCD7C9] text-sm mt-1">
                                            Nota: {item.nota}
                                        </p>
                                    )}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded
                                        hover:bg-red-600 transition-colors"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 border-t border-[#4A5759] pt-4">
                            <p className="text-[#DCD7C9] text-xl font-bold">
                                Total: ${getTotal()}
                            </p>
                            {cartItems.length > 0 && (
                                <button
                                    onClick={handleProceedToPayment}
                                    className="w-full mt-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all duration-300"
                                >
                                    Proceder al Pago
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
