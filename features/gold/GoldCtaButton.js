import React from "react";
import OutboundLink from "../../components/OutboundLink";

export default props => (
    <OutboundLink
        className={
            "btn btn-big is-gold " + (props.className ? props.className : "")
        }
        to={"https://makerlog.io/gold"}
        target={"_blank"}
    >
        <strong>Get Gold</strong>
    </OutboundLink>
);
