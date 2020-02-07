import React from "react";
import Navigation from "../../features/tasks/components/Navigation";
import { connect } from "react-redux";
import { actions as tasksActions } from "~/ducks/tasks";
import { applySearchTerms } from "~/lib/utils/tasks";
import { ListView, KanbanView, TodayView } from "~/features/projects";
import Spinner from "~/components/Spinner";
import TasksPageLayout from "~/layouts/TasksPage";
import GoldAlert from "../../components/GoldAlert";

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
