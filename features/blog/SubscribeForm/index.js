import React, { Component } from "react";
import { isServer } from "../../../config";
import { StdErrorCollection } from "../../../lib/utils/error";
import { loadingClass } from "~/lib/utils/random";
import { subscribe } from "../../../vendor/ghost";
import Emoji from "~/components/Emoji";
import { Track } from "../../../vendor/ga";

function getLocation() {
    if (isServer) return null;
    return window.location.href;
}

function getReferrer() {
    if (isServer) return null;
    return document.referrer;
}

class SubscribeForm extends Component {
    state = {
        subscribed: false,
        loading: false,
        email: "",
        failed: false,
        errorMessages: null
    };

    submit = async e => {
        e.preventDefault();
        try {
            this.setState({
                failed: false,
                errorMessages: null,
                loading: true
            });
            await subscribe(this.state.email);
            new Track().event("newsletter-subscribe");
            this.setState({
                subscribed: true,
                failed: false,
                errorMessages: null,
                loading: false
            });
        } catch (e) {
            this.setState({
                loading: false,
                failed: true,
                errorMessages: new StdErrorCollection(e)
            });
        }
    };

    render() {
        if (this.state.subscribed) {
            return (
                <div className="alert is-success">
                    <div className="alert-body">
                        Subscribed! <Emoji emoji="💌" />
                    </div>
                </div>
            );
        }
        return (
            <form
                method="post"
                action="https://blog.getmakerlog.com/subscribe/"
                id=""
                className="gh-signin"
                onSubmit={this.submit}
            >
                <div className="flex flex-gap">
                    <div>
                        <input className="confirm" type="hidden" name="confirm" />
                        <input
                            className="location"
                            type="hidden"
                            name="location"
                            value={getLocation()}
                        />
                        <input
                            className="referrer"
                            type="hidden"
                            name="referrer"
                            value={getReferrer()}
                        />
                        <input
                            type="email"
                            value={this.state.email}
                            onChange={e =>
                                this.setState({ email: e.target.value })
                            }
                            name="email"
                            placeholder="Your email address"
                            className="input"
                        />
                    </div>
                    <div>
                        <button
                            className={loadingClass(
                                "btn btn-secondary",
                                this.state.loading
                            )}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default SubscribeForm;
