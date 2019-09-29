import React from "react";
import { getWorldStats } from "../../../../lib/stats";
import PropTypes from "prop-types";
import Spinner from "../../../../components/Spinner";

class TopUsersContainer extends React.Component {
    state = {
        isLoading: true,
        ready: false,
        failed: false,
        users: null
    };

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const stats = await getWorldStats();
            this.setState({
                isLoading: false,
                ready: true,
                failed: false,
                users: stats.top_users
            });
        } catch (e) {
            this.setState({ isLoading: false, failed: true });
        }
    };

    render() {
        if (this.state.ready && this.state.users && !this.state.failed) {
            let Component = this.props.component;
            let propName = this.props.propName
                ? this.props.propName
                : "topUsers";
            let props = {};
            props[propName] = this.state.users;
            return <Component {...props} />;
        } else if (this.state.failed) {
            return (
                <div>
                    Failed to load top users.{" "}
                    <button onClick={this.fetchUsers}>Retry</button>
                </div>
            );
        } else {
            // todo: login to do follow cta?
            return <Spinner small={true} text={"Loading..."} />;
        }
    }
}

TopUsersContainer.propTypes = {
    propName: PropTypes.string
};

export default TopUsersContainer;
