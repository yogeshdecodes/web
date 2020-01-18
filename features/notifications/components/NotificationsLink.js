import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { actions as appActions } from "~/ducks/app";
import { socketUrl } from "../../../lib/utils/random";
import ReconnectingWebSocket from "reconnecting-websocket/dist/reconnecting-websocket";
import Router from "next/router"; // yes this is correct

class NotificationsLink extends React.Component {
    state = {
        unreadCount: 0
    };

    async componentDidMount() {
        if (this.props.token) {
            this.connect();
        }

        Router.events.on("routeChangeComplete", this.forceTitleRefresh);
    }

    forceTitleRefresh = () => {
        // https://github.com/zeit/next.js/issues/6025
        this.timeout = setTimeout(() => {
            this.setCount(this.state.unreadCount, true);
        }, 0);
    };

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
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

    setCount = (count, force = false) => {
        let initialTitle = document.title
            .substring(document.title.indexOf(")") + 1)
            .trim();
        if (count !== this.state.unreadCount || force) {
            if (count > 0) {
                // remove any previous parentheses. still a hack.
                document.title = `(${count}) ${initialTitle}`;
            } else {
                document.title = initialTitle;
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
            <a
                className={
                    "NotificationsLink navbar-item is-icon" +
                    (this.state.unreadCount > 0 && " unread")
                }
                onClick={this.toggleNotifications}
            >
                <FontAwesomeIcon size="lg" icon={["fas", "bell"]} />
                {this.state.unreadCount > 0 && (
                    <div className={"count"}>{this.state.unreadCount}</div>
                )}
            </a>
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
