import React from "react";
import { connect } from "react-redux";
import { ListView } from "~/features/projects";
import Spinner from "~/components/Spinner";
import TasksPageLayout from "~/layouts/TasksPage";

class TasksListPage extends React.Component {
    renderCurrentRoute = () => {
        if (!this.props.ready && !this.props.failed) {
            return (
                <div className="container">
                    <Spinner text="Loading your tasks..." />
                </div>
            );
        }

        return <ListView />;
    };

    render() {
        return <TasksPageLayout>{this.renderCurrentRoute()}</TasksPageLayout>;
    }
}

const mapStateToProps = state => ({
    failed: state.tasks.failed,
    ready: state.tasks.ready && state.projects.ready
});

export default connect(mapStateToProps)(TasksListPage);
