import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCartItems, addToCart } from '../api/apiService';
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
            console.error('Error loading cart items:', error);
            toast.error('Error al cargar el carrito');
        } finally {
            setIsLoading(false);
        }
    };

    const addItemToCart = async (serviceId, note = "") => {
        try {
            const response = await addToCart({
                servicio: serviceId,
                nota: note
            });
            setCartItems(prev => [...prev, response]);
            toast.success('Servicio agregado al carrito');
        } catch (error) {
            console.error('Error adding item to cart:', error);
            toast.error('Error al agregar al carrito');
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            // Filter out the removed item locally
            setCartItems(prev => prev.filter(item => item.id !== itemId));
            toast.success('Servicio eliminado del carrito');
        } catch (error) {
            console.error('Error removing item from cart:', error);
            toast.error('Error al eliminar del carrito');
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + parseFloat(item.servicio_detalle.precio);
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