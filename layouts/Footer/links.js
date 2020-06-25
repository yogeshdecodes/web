import React from "react";
import { Link } from "~/routes";
import OutboundLink from "~/components/OutboundLink";

export default function FooterLinks() {
    return (
        <>
            <li className={"has-text-grey"}>&copy; Makerlog</li>
            <li>
                <Link route={"about"}>
                    <a>About</a>
                </Link>
            </li>

            <li>
                <OutboundLink to="https://makerlog.io/intravert">
                    Advertise
                </OutboundLink>
            </li>
            <li>
                <OutboundLink href={"https://status.getmakerlog.com/"}>
                    Status
                </OutboundLink>
            </li>
            <li>
                <OutboundLink to={"https://gold.getmakerlog.com"}>
                    Gold
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
                <OutboundLink
                    href={"https://pm.mattei.dev/projects/makerlog/issues/new"}
                >
                    Bugs
                </OutboundLink>
            </li>
        </>
    );
}
