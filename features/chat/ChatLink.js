import React, { Component } from "react";
import ChatView from "./ChatView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isServer } from "~/config";
import { Track } from "../../vendor/ga";

export default class ChatLink extends Component {
    state = {
        open: false,
        dot: false
    };

    componentDidMount() {
        this.setState({
            dot: this.shouldShowDot()
        });
    }

    toggle = () => {
        if (isServer) return false;
        new Track().event(
            `chat-toggled-${!this.state.open ? "open" : "close"}`
        );
        localStorage.setItem("telegram-link-opened", "true");
        this.setState({ open: !this.state.open, dot: false });
    };

    shouldShowDot = () => {
        if (isServer) return false;
        return localStorage.getItem("telegram-link-opened") !== "true";
    };

    render() {
        return (
            <>
                <a
                    className={"ChatLink navbar-item is-icon"}
                    onClick={this.toggle}
                >
                    <FontAwesomeIcon size="lg" icon={["fas", "comments"]} />

                    {this.state.dot && <span className="new-dot"></span>}
                </a>
                <ChatView open={this.state.open} closeHandler={this.toggle} />
            </>
        );
    }
}
