import React from "react";
import PropTypes from "prop-types";
import Spinner from "~/components/Spinner";
import Notification from "./Notification";
import { connect } from "react-redux";
import { notificationsActions } from "../../../ducks/notifications";

class NotificationsView extends React.Component {
    state = {
        isLoading: false,
        notifications: null,
        failed: false
    };

    isMalformedNotification(n) {
        if (!n.actor) return true;
        return false;
    }

    renderNotifications = () => {
        let notifications = this.props.notifications;
        notifications = notifications.filter(n => n.target !== null);
        let praiseNotifications = notifications.filter(
            n => n.key === "received_praise"
        );
        if (praiseNotifications.length >= 2) {
            notifications = notifications.filter(
                n => n.key !== "received_praise"
            );
        }

        return (
            <>
                {praiseNotifications.length >= 2 && (
                    <Notification
                        onClose={this.props.closeHandler}
                        grouped
                        notification={praiseNotifications}
                    />
                )}
                {notifications.map(n => (
                    <Notification
                        onClose={this.props.closeHandler}
                        notification={n}
                    />
                ))}
            </>
        );
    };

    async componentDidUpdate(prevProps) {
        if (prevProps.open === true && this.props.open === false) {
            this.markAllAsRead();
        }
    }

    markAllAsRead = async () => {
        try {
            this.props.markAllRead();
        } catch (e) {}
    };

    render() {
        return (
            <>
                {this.props.open && <div className="quickview-overlay"></div>}
                <div
                    className={
                        this.props.open
                            ? "notifications-quickview quickview is-active"
                            : "quickview"
                    }
                >
                    <header className="notifications-header">
                        <h1 className="page-heading">Notifications</h1>
                        <span
                            className="delete"
                            onClick={this.props.closeHandler}
                        />
                    </header>

                    <div className="quickview-body">
                        {!this.props.ready && <Spinner small />}

                        {this.props.failed && (
                            <div className={"panel-message danger"}>
                                Failed to load notifications.
                                <br />
                                <button
                                    className={"btn"}
                                    onClick={this.props.fetchNotifications}
                                >
                                    Retry.
                                </button>
                            </div>
                        )}

                        {this.props.ready &&
                            this.props.notifications &&
                            this.renderNotifications()}
                    </div>
                </div>
            </>
        );
    }
}

NotificationsView.propTypes = {
    open: PropTypes.bool,
    closeHandler: PropTypes.func
};

const mapStateToProps = state => ({
    open: state.notifications.open,
    ready: state.notifications.ready,
    notifications: state.notifications.notifications,
    failed: state.notifications.failed
});

const mapDispatchToProps = dispatch => ({
    fetchNotifications: () =>
        dispatch(notificationsActions.fetchNotifications()),
    closeHandler: () => dispatch(notificationsActions.toggleView()),
    markAllRead: () => dispatch(notificationsActions.markAllRead())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsView);
