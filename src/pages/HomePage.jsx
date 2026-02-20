import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

import "../styles/pages/home.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SubNav from "../components/SubNav";
import Hero from "../components/Hero";
import CategoriesMenu from "../components/CategoriesMenu";

import { fetchMakeupProducts } from "../data/makeupApi";

export default function HomePage() {
    const { cart, addToCart, favorites, toggleFavorite } = useContext(AuthContext);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [addedId, setAddedId] = useState(null);

    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            setError(null);

            try {
                const query = search.trim() || "all";
                const data = await fetchMakeupProducts(query, "nyx");
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        const timer = setTimeout(() => {
            loadProducts();
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1200);
    };

    return (
        <div className="home">
            <Header cart={cart.length} />
            <SearchBar search={search} setSearch={setSearch} />
            <SubNav />
            <Hero />
            <CategoriesMenu />

            <section className="products">
                <div className="products__title">
                    {search ? `Resultados da pesquisa: ${search}` : "Produtos em Destaque"}
                </div>

                <div className="products__grid">
                    {loading && <p>Carregando produtos...</p>}
                    {error && <p>{error}</p>}

                    {!loading && !error && products.map((p) => {
                        const isFav = favorites.some(fav => fav.id === p.id);

                        return (
                            <div key={p.id} className="product">
                                <Link to={`/product/${p.id}`} className="product__link">
                                    <div className="product__img">
                                        <img src={p.img} alt={p.name} />
                                    </div>
                                </Link>
                                
                                <button 
                                    className={`product__favorite ${isFav ? 'product__favorite--active' : ''}`}
                                    onClick={() => toggleFavorite(p)}
                                >
                                    {isFav ? "Favoritado" : "Favoritar"} 
                                    <i className={`bi bi-heart${isFav ? '-fill' : ''}`}></i>
                                </button>

                                <div className="product__info">
                                    <div className="product__brand">{p.brand}</div>
                                    <div className="product__name">{p.name}</div>
                                    <div className="product__prices">
                                        <span className="product__price">€ {p.price}</span>
                                    </div>

                                    <button
                                        className={`product__btn ${addedId === p.id ? "product__btn--added" : ""}`}
                                        onClick={() => handleAddToCart(p)}
                                    >
                                        {addedId === p.id ? "✓ ADICIONADO" : "COMPRAR"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}