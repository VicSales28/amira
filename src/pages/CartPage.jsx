import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SubNav from "../components/SubNav";

import "../styles/pages/cart.css";

const CartPage = () => {
    const { 
        cart, 
        removeFromCart, 
        favorites, 
        toggleFavorite, 
        addToCart 
    } = useContext(AuthContext);

    const totalCart = cart.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);

    const handleMoveToCart = (product) => {
        addToCart(product);
        toggleFavorite(product);
    };

    return (
        <>
            <Header cart={cart.length} />
            <SearchBar search="" setSearch={() => {}} />
            <SubNav />
            
            <div className="cart-page">
                <main className="cart-container">
                    
                    <section className="cart-section">
                        <h2 className="cart-title">
                            <i className="bi bi-bag-check"></i> Meu Carrinho <span>({cart.length})</span>
                        </h2>

                        {cart.length > 0 ? (
                            <div className="cart-list">
                                {cart.map((item, index) => (
                                    <div key={`cart-${item.id}-${index}`} className="cart-item">
                                        <img 
                                            src={item.api_featured_image || item.img} 
                                            alt={item.name} 
                                            className="cart-item__img" 
                                        />
                                        <div className="cart-item__info">
                                            <span className="cart-item__brand">{item.brand}</span>
                                            <Link to={`/product/${item.id}`} className="cart-item__name">
                                                {item.name}
                                            </Link>
                                            <p className="cart-item__price">€ {item.price}</p>
                                        </div>
                                        <button 
                                            className="btn-remove" 
                                            onClick={() => removeFromCart(item.id)}
                                            title="Remover item"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                ))}
                                
                                <div className="cart-summary">
                                    <div className="summary-row">
                                        <span>Total Estimado:</span>
                                        <span className="summary-total">€ {totalCart.toFixed(2)}</span>
                                    </div>
                                    <button className="btn-checkout">FINALIZAR COMPRA</button>
                                </div>
                            </div>
                        ) : (
                            <div className="empty-state">
                                <p>Seu carrinho está vazio.</p>
                                <Link to="/" className="btn-continue">Continuar Comprando</Link>
                            </div>
                        )}
                    </section>

                    <hr className="divider" />

                    <section className="cart-section favorites-section">
                        <h2 className="cart-title">
                            <i className="bi bi-heart"></i> Meus Favoritos <span>({favorites.length})</span>
                        </h2>

                        {favorites.length > 0 ? (
                            <div className="favorites-grid">
                                {favorites.map((item) => (
                                    <div key={`fav-${item.id}`} className="fav-card">
                                        <button 
                                            className="fav-remove" 
                                            onClick={() => toggleFavorite(item)}
                                            title="Remover dos favoritos"
                                        >
                                            <i className="bi bi-x-circle-fill"></i>
                                        </button>
                                        <img src={item.api_featured_image || item.img} alt={item.name} />
                                        <div className="fav-card__info">
                                            <p className="fav-card__name">{item.name}</p>
                                            <p className="fav-card__price">€ {item.price}</p>
                                            <button 
                                                className="btn-add-cart"
                                                onClick={() => handleMoveToCart(item)}
                                            >
                                                MOVER PARA O CARRINHO
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="empty-msg">Você ainda não salvou nenhum produto.</p>
                        )}
                    </section>
                </main>
            </div>
        </>
    );
};

export default CartPage;