import React from "react";
import Emoji from "~/components/Emoji";
import { Link } from "~/routes";
import OutboundLink from "~/components/OutboundLink";
import "./index.scss";

export default function Footer() {
    return (
        <div className="Footer">
            <div className="container">
                <div className="brand-column">
                    <img src="/img/logo.svg" />
                    <p className="mb-em">The home of the maker community.</p>
                    <small className="has-text-grey">
                        Crafted with love in Puerto Rico <Emoji emoji="🇵🇷" />
                        <br />
                        &copy; Makerlog, LLC
                    </small>
                </div>
                <div className="spacer"></div>
                <div className="link-list">
                    <h4>Makerlog</h4>
                    <ul>
                        <li>
                            <Link route={"about"}>
                                <a>About</a>
                            </Link>
                        </li>
                        <li>
                            <OutboundLink to={"https://gold.getmakerlog.com"}>
                                Makerlog Gold
                            </OutboundLink>
                        </li>
                        <li>
                            <Link route={"ads"}>Advertise</Link>
                        </li>
                    </ul>
                </div>
                <div className="link-list">
                    <h4>Social</h4>
                    <ul>
                        <li>
                            <OutboundLink
                                href={"https://twitter.com/getmakerlog/"}
                            >
                                Twitter
                            </OutboundLink>
                        </li>
                        <li>
                            <OutboundLink
                                href={"https://instagram.com/getmakerlog/"}
                            >
                                Instagram
                            </OutboundLink>
                        </li>
                        <li>
                            <OutboundLink
                                href={
                                    "https://www.linkedin.com/company/makerlog/"
                                }
                            >
                                LinkedIn
                            </OutboundLink>
                        </li>
                    </ul>
                </div>
                <div className="link-list">
                    <h4>Platform</h4>
                    <ul>
                        <li>
                            <OutboundLink href={"https://api.getmakerlog.com/"}>
                                Developers
                            </OutboundLink>
                        </li>
                        <li>
                            <OutboundLink
                                href={"https://twitter.com/getmakerlog/"}
                            >
                                Get help
                            </OutboundLink>
                        </li>
                        <li>
                            <Link route={"faq"}>
                                <a>FAQ</a>
                            </Link>
                        </li>
                        <li>
                            <OutboundLink
                                href={
                                    "https://pm.mattei.dev/projects/makerlog/issues/new"
                                }
                            >
                                Report a bug
                            </OutboundLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
