import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCartItems, addToCart, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart } from '../api/apiService';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadCartItems();
    }, []);

    const loadCartItems = async () => {
        try {
            setIsLoading(true);
            const items = await getCartItems();
            setCartItems(items);
        } catch (error) {
            setCartItems([]); // Si hay error, deja el carrito vacío
        } finally {
            setIsLoading(false);
        }
    };

    // Nuevo: permite pasar horarioId y profesionalId
    const addItemToCart = async (serviceId, note = "", horarioId = null, profesionalId = null) => {
        try {
            const payload = { servicio: serviceId, nota: note };
            if (horarioId) payload.horario = horarioId;
            if (profesionalId) payload.profesional = profesionalId;
            const response = await addToCart(payload);
            setCartItems(prev => [...prev, response]);
            toast.success('Servicio agregado al carrito');
        } catch (error) {
            toast.error('Error al agregar al carrito');
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await apiRemoveFromCart(itemId);
            setCartItems(prev => prev.filter(item => item.id !== itemId));
            toast.success('Servicio eliminado del carrito');
        } catch (error) {
            toast.error('Error al eliminar del carrito');
        }
    };

    const clearCart = async () => {
        try {
            await apiClearCart();
            setCartItems([]);
            toast.success('Carrito vaciado');
        } catch (error) {
            toast.error('Error al vaciar el carrito');
        }
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + parseFloat(item.servicio_detalle?.precio || 0);
        }, 0).toFixed(2);
    };

    const value = {
        cartItems,
        setCartItems,
        addItemToCart,
        removeFromCart,
        clearCart,
        getTotal,
        isLoading
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};