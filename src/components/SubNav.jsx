import React from 'react';
import { Link } from "react-router-dom";

import { navBanners } from "../data/categories";

import "../styles/components/subnav.css";

const SubNav = () => {
    return (
        <nav className="subnav">
            {navBanners.map((item, i) => (
            <a
                key={item}
                className={`subnav__link ${
                i === 10 ? "subnav__link--active" : ""
                }`}
            >
                {item}
            </a>
            ))}
        </nav>
    );
};

export default SubNav;