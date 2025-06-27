import { useCart } from '../context/CartContext';

export function ServiceCard({ service }) {
    const { addItemToCart } = useCart();

    return (
        <div className="service-card">
            
            <button
                onClick={() => addItemToCart(service.id)}
                className="mt-4 px-4 py-2 bg-[#A27B5C] text-[#DCD7C9] rounded-lg
                    hover:bg-[#4A5759] transition-all duration-300"
            >
                Agregar al Carrito
            </button>
        </div>
    );
}