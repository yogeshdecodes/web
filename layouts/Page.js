import Nav from "./Navbar";
import React from "react";
//import Reactor from "../components/Reactor";
//import ToastList from "~/features/toasts/ToastList";

export default ({
    nav = true,
    transparent = false,
    invertedNav = false,
    gradient = false,
    className = "",
    showNavItems = true,
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
    </div>
);
