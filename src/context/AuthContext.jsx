import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [username, setUsername] = useState(localStorage.getItem("username") || null);
    
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [favorites, setFavorites] = useState(() => {
        const savedFavs = localStorage.getItem("favorites");
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const login = (name) => {
        localStorage.setItem("username", name);
        setUsername(name);
    };

    const logout = () => {
        localStorage.clear();
        setUsername(null);
        setCart([]);
        setFavorites([]);
    };

    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter(item => item.id !== productId));
    };

    const toggleFavorite = (product) => {
        setFavorites((prev) => {
            const isAlreadyFav = prev.some(item => item.id === product.id);
            if (isAlreadyFav) {
                return prev.filter(item => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    return (
        <AuthContext.Provider value={{ 
            username, 
            login, 
            logout,
            cart, 
            addToCart, 
            removeFromCart,
            favorites, 
            toggleFavorite 
        }}>
            {children}
        </AuthContext.Provider>
    );
}