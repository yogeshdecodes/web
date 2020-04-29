import React, { Component } from "react";
import Ad from "~/components/Ad";
import "./index.scss";
import OutboundLink from "~/components/OutboundLink";
import GoldIcon from "~/components/icons/GoldIcon";

class AdIntersitial extends Component {
    render() {
        return (
            <div className="AdIntersitial">
                <div className="title">Indie ad</div>
                <div className="x-intra">
                    <Ad />
                </div>
                <div className="title">
                    <OutboundLink
                        to="https://gold.getmakerlog.com"
                        className="unstyled"
                    >
                        <GoldIcon /> Get rid of ads with Makerlog Gold &raquo;
                    </OutboundLink>
                </div>
            </div>
        );
    }
}

export default AdIntersitial;
