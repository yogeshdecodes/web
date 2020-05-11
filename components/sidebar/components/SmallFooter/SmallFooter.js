import React from "react";
import FooterLinks from "~/layouts/Footer/links";
import Sticky from "react-stickynode";
import { isServer } from "../../../../config";

const SmallFooter = props => (
    <Sticky enabled={!isServer ? window.innerWidth >= 728 : false} top={20}>
        <ul className={"LinksFooter is-hidden-mobile flex"}>
            <FooterLinks />
        </ul>
    </Sticky>
);

export default SmallFooter;
