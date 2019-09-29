import Nav from "./Nav";
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
    <div className={"Page " + className + (gradient ? " hero-gradient" : "")}>
        {nav && (
            <Nav
                transparent={transparent}
                inverted={invertedNav || gradient}
                showItems={showNavItems}
            />
        )}

        {props.children}
    </div>
);
