import React, { useState } from 'react';

import { categories } from "../data/categories";

import "../styles/components/categoriesmenu.css";

const CategoriesMenu = () => {
    return (
        <section className="categories">
            <div className="categories__grid">
                {categories.map((cat) => (
                    <div key={cat.label} className="categories__item">
                        <i className={`categories__icon bi ${cat.icon}`}></i>
                        <span className="categories__label">{cat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoriesMenu;
