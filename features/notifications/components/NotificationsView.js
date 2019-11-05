import React from "react";
import PropTypes from "prop-types";
import Spinner from "~/components/Spinner";
import {getNotifications, markAllRead} from "~/lib/notifications";
import {actions as appActions} from "~/ducks/app";
import Notification from "./Notification";
import {connect} from "react-redux";

class NotificationsView extends React.Component {
    state = {
        isLoading: false,
        notifications: null,
        failed: false
    };

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.fetchNotifications();
        }
    }

    fetchNotifications = async () => {
        try {
            this.setState({ isLoading: true });
            const notifications = await getNotifications();
            this.setState({
                notifications: notifications,
                failed: false,
                isLoading: false
            });
        } catch (e) {
            this.setState({
                failed: true
            });
        }
    };

    renderNotifications = () => {
        let notifications = this.state.notifications;
        notifications = notifications.filter(n => n.target !== null);
        let praiseNotifications = notifications.filter(
            n => n.key === "received_praise"
        );
        if (praiseNotifications.length >= 2) {
            notifications = notifications.filter(
                n => n.key !== "received_praise"
            );
        }

        console.log(notifications, praiseNotifications);

        return (
            <>
                {praiseNotifications.length >= 2 && (
                    <Notification grouped notification={praiseNotifications} />
                )}
                {notifications.map(n => (
                    <Notification notification={n} />
                ))}
            </>
        );
    };

    async componentDidUpdate(prevProps) {
        if (prevProps.open === false && this.props.open === true) {
            await this.fetchNotifications();
            this.markAllAsRead();
        }
    }

    markAllAsRead = async () => {
        try {
            await markAllRead();
            /*
            let notifications = [...this.state.notifications];
            notifications.map((n, i) => notifications[i].read = true);

            this.setState({
                notifications
            }); */
        } catch (e) {}
    };

    render() {
        return (
            <div
                className={
                    this.props.open
                        ? "notifications-quickview quickview is-active"
                        : "quickview"
                }
            >
                <header className="notifications-header">
                    <h1>Notifications</h1>
                    <span
                        className="delete"
                        onClick={this.props.closeHandler}
                    />
                </header>

                <div className="quickview-body">
                    {this.state.isLoading && <Spinner small />}

                    {this.state.failed && (
                        <div className={"panel-message danger"}>
                            Failed to load notifications.{" "}
                            <button
                                className={"btn"}
                                onClick={this.fetchNotifications}
                            >
                                Retry.
                            </button>
                        </div>
                    )}

                    {!this.state.isLoading &&
                        this.state.notifications &&
                        this.renderNotifications()}
                </div>

                <footer className="quickview-footer">
                    <button
                        className={"btn rounded"}
                        onClick={this.props.closeHandler}
                    >
                        Close
                    </button>
                </footer>
            </div>
        );
    }
}

NotificationsView.propTypes = {
    open: PropTypes.bool,
    closeHandler: PropTypes.func
};

const mapStateToProps = state => ({
    isLoggedIn: state.auth.loggedIn,
    open: state.app.notificationsOpen
});

const mapDispatchToProps = dispatch => ({
    closeHandler: () => dispatch(appActions.toggleNotifications())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationsView);
