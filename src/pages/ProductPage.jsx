import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SubNav from "../components/SubNav";

import "../styles/pages/product.css";

const ProductPage = () => {
    const { id } = useParams();
    const { cart, addToCart, favorites, toggleFavorite } = useContext(AuthContext);
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState(null);
    const [addedFeedback, setAddedFeedback] = useState(false);

    const isFavorite = favorites.some(fav => String(fav.id) === String(id));

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await fetch(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`);
                const data = await response.json();
                setProduct(data);
                
                if (data.product_colors?.length > 0) {
                    setSelectedColor(data.product_colors[0]);
                }
            } catch (error) {
                console.error("Erro ao carregar produto:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProductDetails();
    }, [id]);

    const handleAddToCart = () => {
        const productToAdd = {
            ...product,
            img: product.api_featured_image || product.image_link 
        };
        addToCart(productToAdd);
        
        setAddedFeedback(true);
        setTimeout(() => setAddedFeedback(null), 1500);
    };

    if (loading) return <div className="loading">Carregando detalhes...</div>;
    if (!product) return <div className="error">Produto não encontrado.</div>;

    return (
        <div className="product-page">
            <Header cart={cart.length} />
            <SearchBar search="" setSearch={() => {}} />
            <SubNav />

            <main className="product-detail">
                <div className="product-detail__container">
                    <div className="product-detail__image">
                        <img src={product.api_featured_image} alt={product.name} />
                    </div>

                    <div className="product-detail__content">
                        <span className="product-detail__brand">{product.brand}</span>
                        <h1 className="product-detail__title">{product.name}</h1>
                        <p className="product-detail__price">
                            {product.price_sign || "€"} {product.price}
                        </p>

                        {product.product_colors?.length > 0 && (
                            <div className="product-detail__colors">
                                <p>Cor selecionada: <strong>{selectedColor?.colour_name}</strong></p>
                                <div className="colors__grid">
                                    {product.product_colors.map((color, index) => (
                                        <button
                                            key={index}
                                            className={`color-dot ${selectedColor?.hex_value === color.hex_value ? 'active' : ''}`}
                                            style={{ backgroundColor: color.hex_value }}
                                            onClick={() => setSelectedColor(color)}
                                            title={color.colour_name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="product-detail__actions">
                            <button 
                                className={`btn-buy ${addedFeedback ? 'btn-buy--added' : ''}`} 
                                onClick={handleAddToCart}
                            >
                                {addedFeedback ? "✓ ADICIONADO" : "ADICIONAR AO CARRINHO"}
                            </button>
                            
                            <button 
                                className={`btn-fav-detail ${isFavorite ? 'active' : ''}`}
                                onClick={() => toggleFavorite(product)}
                            >
                                <i className={`bi bi-heart${isFavorite ? '-fill' : ''}`}></i>
                                {isFavorite ? "REMOVER DOS FAVORITOS" : "ADICIONAR AOS FAVORITOS"}
                            </button>

                            <a href={product.product_link} target="_blank" rel="noreferrer" className="btn-external">
                                VER NO SITE OFICIAL <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                        </div>

                        <div className="product-detail__description">
                            <h3>Descrição</h3>
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductPage;