import { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { user } = useAuth();
    const [cartIds, setCartIds] = useState(new Set());

    useEffect(() => {
        if (!user) { setCartIds(new Set()); return; }
        api.get('/wishlist')
            .then(res => {
                const ids = (res.data.data || []).map(rt => rt.id);
                setCartIds(new Set(ids));
            })
            .catch(() => {});
    }, [user]);

    const addToCart = async (roomTypeId) => {
        await api.post(`/wishlist/${roomTypeId}`);
        setCartIds(prev => new Set([...prev, roomTypeId]));
    };

    const removeFromCart = async (roomTypeId) => {
        await api.delete(`/wishlist/${roomTypeId}`);
        setCartIds(prev => { const s = new Set(prev); s.delete(roomTypeId); return s; });
    };

    const toggleCart = async (roomTypeId) => {
        if (cartIds.has(roomTypeId)) await removeFromCart(roomTypeId);
        else await addToCart(roomTypeId);
    };

    return (
        <CartContext.Provider value={{ cartIds, toggleCart, count: cartIds.size }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
