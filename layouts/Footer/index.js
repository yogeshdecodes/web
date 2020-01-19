import React from "react";
import FooterLinks from "~/layouts/Footer/links";
import Emoji from "~/components/Emoji";
import "./index.scss";

export default function Footer() {
    return (
        <div className="Footer container">
            <div className="flex">
                <div className="footer-links">
                    <ul>
                        <FooterLinks />
                    </ul>
                </div>
                <div className="flex-grow"></div>
                <div className="text">
                    <small>
                        Made with <Emoji emoji="💚" /> in Puerto Rico{" "}
                        <Emoji emoji="🇵🇷" />
                    </small>
                </div>
            </div>
        </div>
    );
}
