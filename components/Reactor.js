import { connect } from "react-redux";
import axios from "axios/index";

import { actions as statsActions } from "~/ducks/stats";
import { actions as tasksActions } from "~/ducks/tasks";

const RehydrateToken = props => {
    if (props.token) {
        console.log("Makerlog: Rehydrating auth token store...");
        axios.defaults.headers.common["Authorization"] = `Token ${props.token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }

    return null;
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        statsAlreadyLoaded: state.stats.ready,
        tasksAlreadyLoaded: state.tasks.ready
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadStats: (silently = false) =>
            dispatch(statsActions.fetchStats(silently)),
        loadTasks: () => dispatch(tasksActions.loadTasks())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RehydrateToken);
