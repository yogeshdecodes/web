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
                        key={n.id}
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
                {this.props.open && (
                    <div
                        onClick={this.props.closeHandler}
                        className="quickview-overlay"
                    ></div>
                )}
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

                    {(!this.props.ready || this.props.failed) && (
                        <div className="full-quickview-body flex flex-column flex-v-gap has-text-centered">
                            {this.props.failed && (
                                <>
                                    <div>
                                        <h2>Failed to load notifications</h2>
                                        <h3 className="subtitle has-text-grey">
                                            {this.props.errorMessages.message}
                                            &nbsp;
                                            {this.props.errorMessages.code}
                                        </h3>
                                    </div>
                                    <div>
                                        <button
                                            className={"btn btn-light"}
                                            onClick={
                                                this.props.fetchNotifications
                                            }
                                        >
                                            Retry
                                        </button>
                                    </div>
                                </>
                            )}

                            {!this.props.ready && !this.props.failed && (
                                <div>
                                    <Spinner small />
                                </div>
                            )}
                        </div>
                    )}

                    {this.props.ready &&
                        !this.props.failed &&
                        this.props.notifications && (
                            <div className="quickview-body">
                                {this.renderNotifications()}
                            </div>
                        )}
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
    failed: state.notifications.failed,
    errorMessages: state.notifications.errorMessages
});

const mapDispatchToProps = dispatch => ({
    fetchNotifications: () =>
        dispatch(notificationsActions.fetchNotifications()),
    closeHandler: () => dispatch(notificationsActions.toggleView()),
    markAllRead: () => dispatch(notificationsActions.markAllRead())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsView);
