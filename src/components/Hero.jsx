import React, { useContext } from "react";
import DesktopHeroImg from "../assets/DESKTOP-PO-TRANSLUCIDO.png";
import MobileHeroImg from "../assets/MOBILE-PO-TRANSLUCIDO.webp";

import "../styles/components/hero.css";

const Hero = () => {
    return (
        <section className="hero">
            <picture>
                <source media="(max-width: 767px)" srcSet={MobileHeroImg} />
                <img src={DesktopHeroImg} alt="Banner Promocional" className="hero__img" />
            </picture>
        </section>
    );
};

export default Hero;
