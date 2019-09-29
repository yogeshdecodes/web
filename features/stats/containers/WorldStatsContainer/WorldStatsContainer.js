import React from "react";
import { getWorldStats } from "../../../../lib/stats";
import PropTypes from "prop-types";
import Spinner from "../../../../components/Spinner";

class WorldStatsContainer extends React.Component {
    state = {
        isLoading: true,
        ready: false,
        failed: false,
        stats: null
    };

    componentDidMount() {
        this.fetchStats();
    }

    fetchStats = async () => {
        try {
            let stats = await getWorldStats();
            if (this.props.onlyKey) {
                stats = stats[this.props.onlyKey];
            }
            this.setState({
                isLoading: false,
                ready: true,
                failed: false,
                stats: stats
            });
        } catch (e) {
            this.setState({ isLoading: false, failed: true });
        }
    };

    render() {
        if (this.state.ready && this.state.stats && !this.state.failed) {
            let Component = this.props.component;
            let propName = this.props.propName
                ? this.props.propName
                : "worldStats";
            let props = {};
            props[propName] = this.state.users;
            return <Component {...props} />;
        } else if (this.state.failed) {
            return (
                <div>
                    Failed to load stats.{" "}
                    <button onClick={this.fetchUsers}>Retry</button>
                </div>
            );
        } else {
            // todo: login to do follow cta?
            return <Spinner small={true} text={"Loading..."} />;
        }
    }
}

WorldStatsContainer.propTypes = {
    onlyKey: PropTypes.string
};

export default WorldStatsContainer;
