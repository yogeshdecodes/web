import React, { Component } from "react";
import { Link } from "~/routes";
import "./index.scss";
import CompanyPageLayout from "../../layouts/CompanyPage";
import StdPageSidebar from "~/components/sidebar/std-page";
import { OutboundLink } from "react-ga";

class ContactPage extends Component {
    static async getInitialProps(ctx) {
        return {
            layout: {
                className: "ContactPage"
            }
        };
    }

    render() {
        return (
            <CompanyPageLayout>
                <div className="hero">
                    <div className="container">
                        <h1>Contact us</h1>
                        <p>We're very reachable people!</p>
                    </div>
                </div>
                <div className="container">
                    <div className="grid-c-s mtGap">
                        <div>
                            <div className="card">
                                <div className="card-content">
                                    <p>
                                        <strong>
                                            You can reach us quite easily via
                                            Twitter, Telegram, or email.
                                        </strong>
                                    </p>
                                    <br />
                                    <p>
                                        <ul>
                                            <li>
                                                <strong>Sergio Mattei: </strong>
                                                <OutboundLink href="https://twitter.com/matteing">
                                                    Twitter
                                                </OutboundLink>
                                                ,{" "}
                                                <OutboundLink href="https://t.me/matteing">
                                                    Telegram
                                                </OutboundLink>
                                                ,{" "}
                                                <OutboundLink href="mailto:sergio@getmakerlog.com">
                                                    email
                                                </OutboundLink>
                                            </li>
                                            <li>
                                                <strong>Hector: </strong>
                                                <OutboundLink href="https://twitter.com/hsotofortuno">
                                                    Twitter
                                                </OutboundLink>
                                                ,{" "}
                                                <OutboundLink href="mailto:hector@getmakerlog.com">
                                                    email
                                                </OutboundLink>
                                            </li>
                                            <li>
                                                <strong>
                                                    Jose Carlos Wharton:{" "}
                                                </strong>
                                                <OutboundLink href="mailto:jose@getmakerlog.com">
                                                    email
                                                </OutboundLink>
                                            </li>
                                            <li>
                                                <strong>Kerr Travers: </strong>
                                                <OutboundLink href="https://twitter.com/kerrtrvs">
                                                    Twitter
                                                </OutboundLink>
                                                ,{" "}
                                                <OutboundLink href="mailto:me@kerrtravers.com">
                                                    email
                                                </OutboundLink>
                                            </li>
                                        </ul>
                                    </p>
                                    <br />
                                    <p>
                                        You can also schedule a call with me,
                                        Sergio, to discuss maker-related matters
                                        or ideas.
                                        <br />
                                        <OutboundLink
                                            style={{
                                                marginTop: 10,
                                                marginBottom: 10
                                            }}
                                            className="btn btn-light btn-small"
                                            href="https://calendly.com/matteing"
                                        >
                                            Schedule a call
                                        </OutboundLink>
                                        <br />
                                        <small>
                                            Just don't try to sell me anything,
                                            please!
                                        </small>
                                    </p>
                                    <br />
                                    <p>
                                        Alternatively, just use the chat button
                                        on this page. I'll be happy to assist!
                                        <br />
                                        <br />
                                        <img
                                            style={{ height: 50 }}
                                            src="https://i.imgur.com/5WY22Q1.png"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <StdPageSidebar footer={false} />
                        </div>
                    </div>
                </div>
            </CompanyPageLayout>
        );
    }
}

export default ContactPage;
