import React from "react";

import './hero.css';

const Hero = props => {
    return(
        <section className="hero-main text-center">
            <h1>{props.mainHeader}</h1>
            <p>{props.subHeader}</p>
        </section>
    );
}

export default Hero;