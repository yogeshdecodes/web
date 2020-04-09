import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import Router from "next/router"; // yes this is correct
import { notificationsActions } from "../../../ducks/notifications";

class NotificationsLink extends React.Component {
    async componentDidMount() {
        Router.events.on("routeChangeComplete", this.forceTitleRefresh);
    }

    forceTitleRefresh = () => {
        // https://github.com/zeit/next.js/issues/6025
        this.timeout = setTimeout(() => {
            this.setCount(this.props.unreadCount, true);
        }, 0);
    };

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        Router.events.off("routeChangeComplete", this.forceTitleRefresh);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.unreadCount !== this.props.unreadCount) {
            this.setCount(this.props.unreadCount);
        }
    }

    setCount = (count, force = false) => {
        let initialTitle = document.title
            .substring(document.title.indexOf(")") + 1)
            .trim();
        if (count > 0) {
            // remove any previous parentheses. still a hack.
            document.title = `(${count}) ${initialTitle}`;
        } else {
            document.title = initialTitle;
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
                    (this.props.unreadCount > 0 && " unread")
                }
                onClick={this.toggleNotifications}
            >
                <FontAwesomeIcon size="lg" icon={["fas", "bell"]} />
                {this.props.unreadCount > 0 && (
                    <div className={"count"}>{this.props.unreadCount}</div>
                )}
            </a>
        );
    }
}

NotificationsLink.propTypes = {
    closeHandler: PropTypes.func
};

const mapStateToProps = state => ({
    unreadCount: state.notifications.unreadCount
});

const mapDispatchToProps = dispatch => ({
    closeHandler: () => dispatch(notificationsActions.toggleView())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsLink);
