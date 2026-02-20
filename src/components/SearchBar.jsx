import React from 'react';
import { Link } from "react-router-dom";

import "../styles/components/searchbar.css";

const SearchBar = ({ search, setSearch }) => {
    return (
        <div className="search">
            <div className="search__wrapper">
            <input
                className="search__input"
                placeholder="Procurar produtos, ex.: blush, bronzer, lipstick, ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <i className="bi bi-search search__icon"></i>
            </div>
        </div>
    );
};

export default SearchBar;
