import React from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { actions as tasksActions } from "~/ducks/tasks";

let taskInput = {};

const SearchBar = props => (
    <div className="task-input" style={{ padding: 0 }}>
        <input
            type={"search"}
            onChange={e => props.searchTasks(e.target.value)}
            style={taskInput}
            placeholder={"Search tasks.."}
        />
    </div>
);

SearchBar.propTypes = {};

const mapStateToProps = state => {
    return {
        isCreating: state.tasks.isCreating,
        errorMessages: state.tasks.errorMessages,
        searchTerms: state.tasks.searchTerms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createTask: content => dispatch(tasksActions.createTask(content)),
        searchTasks: debounce(
            terms => dispatch(tasksActions.searchTasks(terms)),
            500
        ),
        clearSearch: () => dispatch(tasksActions.clearSearch())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);
