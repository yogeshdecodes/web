import Nav from "./Navbar";
import React from "react";
import Footer from "~/layouts/Footer";

export default ({
    nav = true,
    transparent = false,
    invertedNav = false,
    gradient = false,
    className = "",
    showNavItems = true,
    footer = true,
    ...props
}) => (
    <div
        className={"Page " + className + (gradient ? " hero-gradient" : "")}
        id="page"
    >
        {nav && (
            <Nav
                transparent={transparent}
                inverted={invertedNav || gradient}
                showItems={showNavItems}
            />
        )}

        <div id="page-content">{props.children}</div>

        {footer && <Footer />}
    </div>
);
