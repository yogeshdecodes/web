import React from "react";
import { connect } from "react-redux";
import { KanbanView } from "~/features/projects";
import Spinner from "~/components/Spinner";
import TasksPageLayout from "~/layouts/TasksPage";

class TasksKanbanView extends React.Component {
    renderCurrentRoute = () => {
        if (!this.props.ready && !this.props.failed) {
            return (
                <div className="container">
                    <Spinner text="Loading your tasks..." />
                </div>
            );
        }

        return (
            <div className="container">
                <KanbanView />
            </div>
        );
    };

    render() {
        return <TasksPageLayout>{this.renderCurrentRoute()}</TasksPageLayout>;
    }
}

const mapStateToProps = state => ({
    failed: state.tasks.failed,
    ready: state.tasks.ready && state.projects.ready
});

export default connect(mapStateToProps)(TasksKanbanView);
