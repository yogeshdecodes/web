import React from "react";
import FooterLinks from "~/layouts/Footer/links";

const SmallFooter = props => (
    <ul className={"LinksFooter is-hidden-mobile flex"}>
        <FooterLinks />
    </ul>
);

export default SmallFooter;
