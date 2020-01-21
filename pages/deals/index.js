import "./index.scss";
import React, { Component } from "react";
import OutboundLink from "../../components/OutboundLink";
import { requireAuthed } from "~/lib/auth";
import LoggedInOnly from "~/features/users/containers/LoggedInOnly";
import LoggedOutOnly from "~/features/users/containers/LoggedOutOnly";
import { Link } from "~/routes";

// disable buttons , dont redirect

export default class DealsPage extends Component {
    render() {
        return (
            <div className="DealsPage">
                <section className="container">
                    <h1>Deals</h1>
                    <h3 className="subtitle">
                        Exclusive deals from the community, only for Makerlog
                        members.
                    </h3>
                </section>
                <section className={"container"}>
                    <LoggedOutOnly>
                        <div className="alert is-info">
                            <div className="alert-body">
                                <h4>You're not signed in</h4>
                                Become a Makerlog member to get access to these
                                exclusive perks. <br />
                                <Link route="begin">
                                    <a className="btn btn-light btn-small">
                                        Get started
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </LoggedOutOnly>
                    <div className="card">
                        <div className="card-content">
                            <div className="flex">
                                <div className="icon">
                                    <figure className="img-48">
                                        <img src="https://pbs.twimg.com/profile_images/1156323007737946115/Z3ZYe2T__400x400.jpg"></img>
                                    </figure>
                                </div>
                                <div className="flex-grow">
                                    <h4>Divjoy</h4>
                                    <p>
                                        Get 50% off Divjoy, the React codebase
                                        generator.
                                    </p>
                                    <LoggedInOnly>
                                        <OutboundLink
                                            href="https://divjoy.com?promo=makerlog"
                                            className="btn btn-light"
                                        >
                                            Grab this deal
                                        </OutboundLink>
                                    </LoggedInOnly>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="has-text-grey">
                        Got an offer for the community?{" "}
                        <a href="https://t.me/matteing">Contact me!</a>
                    </div>
                </section>
            </div>
        );
    }
}
