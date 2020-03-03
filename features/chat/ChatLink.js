import React, { Component } from "react";
import ChatView from "./ChatView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ChatLink extends Component {
    state = {
        open: false
    };

    toggle = () => {
        this.setState({ open: !this.state.open });
    };
    render() {
        return (
            <>
                <a
                    className={"ChatLink navbar-item is-icon"}
                    onClick={this.toggle}
                >
                    <FontAwesomeIcon size="lg" icon={["fas", "comments"]} />

                    <span className="new-dot"></span>
                </a>
                <ChatView open={this.state.open} closeHandler={this.toggle} />
            </>
        );
    }
}
