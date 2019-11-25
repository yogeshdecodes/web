import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { actions as appActions } from "~/ducks/app";
import { socketUrl } from "../../../lib/utils/random";
import ReconnectingWebSocket from "reconnecting-websocket/dist/reconnecting-websocket";
import Router from "next/router";

class NotificationsLink extends React.Component {
    state = {
        unreadCount: 0,
        initialTitle: null
    };

    async componentDidMount() {
        if (!this.state.initialTitle) {
            this.setInitialTitle();
        }

        if (this.props.token) {
            this.connect();
        }

        Router.events.on("routeChangeComplete", this.forceTitleRefresh);
    }

    forceTitleRefresh = () => {
        alert("test");
        this.setInitialTitle(() => this.setCount(this.state.unreadCount));
    };

    setInitialTitle = (callback = () => {}) => {
        this.setState({ initialTitle: document.title }, callback);
    };

    componentWillUnmount() {
        this.disconnect();
        Router.events.off("routeChangeComplete", this.forceTitleRefresh);
    }

    connect = () => {
        this.socket = new ReconnectingWebSocket(
            socketUrl(`/notifications/?token=${this.props.token}`)
        );
        this.socket.onopen = () => {
            console.log(
                `Makerlog: Established connection to ${socketUrl(
                    "/notifications/"
                )}.`
            );
        };
        this.socket.onmessage = this.onWsEvent;
        this.socket.onclose = () => {
            console.log(
                `Makerlog: Closed connection to ${socketUrl(
                    "/notifications/"
                )}.`
            );
        };
    };

    onWsEvent = event => {
        const data = JSON.parse(event.data);
        console.log(
            `Makerlog: Received event from WS. (${data.type})`,
            data.payload
        );
        switch (data.type) {
            case "notification.counts":
                this.setCount(data.payload.unread_count);
                break;

            default:
                return;
        }
    };

    disconnect = () => {
        if (this.socket) {
            this.socket.close();
        }
    };

    setCount = count => {
        if (count !== this.state.unreadCount) {
            if (count > 0) {
                document.title = `(${count}) ${this.state.initialTitle}`;
            } else {
                document.title = this.state.initialTitle;
            }
            this.setState({
                unreadCount: count
            });
        }
    };

    toggleNotifications = () => {
        this.props.closeHandler();
    };

    render() {
        if (this.props.mobile) {
            return (
                <a onClick={this.toggleNotifications} className="item">
                    <span className={"icon"}>
                        <FontAwesomeIcon icon={"bell"} />
                    </span>
                    <span>Alerts</span>
                </a>
            );
        }

        return (
            <React.Fragment>
                {
                    // eslint-disable-next-line
                }{" "}
                <a className="navbar-item" onClick={this.toggleNotifications}>
                    <FontAwesomeIcon
                        size="lg"
                        icon={[
                            this.state.unreadCount > 0 ? "fas" : "far",
                            "bell"
                        ]}
                    />
                    {this.state.unreadCount > 0 && (
                        <div className={"tag"}>{this.state.unreadCount}</div>
                    )}
                </a>
            </React.Fragment>
        );
    }
}

NotificationsLink.propTypes = {
    closeHandler: PropTypes.func
};

const mapStateToProps = state => ({
    isLoggedIn: state.auth.loggedIn,
    open: state.app.notificationsOpen,
    token: state.auth.token,
    user: state.user.me
});

const mapDispatchToProps = dispatch => ({
    closeHandler: () => dispatch(appActions.toggleNotifications())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsLink);
