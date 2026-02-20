import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import "../styles/components/header.css";

const Header = ({ cart }) => {
    const { username } = useContext(AuthContext);

    return (
        <header className="header">
            <nav className="header__nav">
            <a className="header__link header__link--active">MULHER</a>
            <a className="header__link">HOMEM</a>
            <a className="header__link">MAMÃ & BEBÉ</a>
            </nav>

            <Link to="/" className="header__logo">
                Amira Beauty
            </Link>

            <div className="header__actions">
            <Link to="/login" className="header__login">
                {username ? (
                <span className="header__user">
                    Olá, <strong>{username}</strong>
                </span>
                ) : (
                <Link to="/login" className="header__login">
                    Iniciar sessão <i className="bi bi-person"></i>
                </Link>
                )}
            </Link>
            <span className="header__currency">
                <i className="bi bi-currency-euro"></i> EUR
            </span>
            <Link to="/shopping-cart" className="header__cart">
                    <i className="bi bi-cart"></i>
                    {cart > 0 && <span className="header__cart-count">{cart}</span>}
            </Link>
            </div>
        </header>
    );
};

export default Header;
