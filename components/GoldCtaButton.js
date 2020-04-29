import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutboundLink from "./OutboundLink";

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
