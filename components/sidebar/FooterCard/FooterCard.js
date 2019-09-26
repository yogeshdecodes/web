import React from "react";
import { withTheme } from "styled-components";
import { Link } from "react-router-dom";
import OutboundLink from "../../OutboundLink";

const FooterCard = props => (
    <ul className={"LinksFooter flex"}>
        <li className={"has-text-grey"}>&copy; Makerlog</li>
        <li>
            <Link to={"/about"}>About</Link>
        </li>
        <li>
            <OutboundLink to={"https://gold.getmakerlog.com"}>
                Gold
            </OutboundLink>
        </li>
        <li>
            <OutboundLink href={"https://intravert.co/book/0359e0d7b3/3/"}>
                Advertise
            </OutboundLink>
        </li>
        <li>
            <OutboundLink href={"https://api.getmakerlog.com/"}>
                API
            </OutboundLink>
        </li>
        <li>
            <OutboundLink href={"https://twitter.com/getmakerlog/"}>
                Twitter
            </OutboundLink>
        </li>
        <li>
            <OutboundLink href={"https://status.getmakerlog.com/"}>
                Status
            </OutboundLink>
        </li>
        <li>
            <OutboundLink href={"https://pm.mattei.dev/"}>Bugs</OutboundLink>
        </li>
    </ul>
);

export default withTheme(FooterCard);
