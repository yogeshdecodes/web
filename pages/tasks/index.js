import React from "react";
import { connect } from "react-redux";
import { actions as tasksActions } from "~/ducks/tasks";
import { applySearchTerms } from "~/lib/utils/tasks";
import { KanbanView, ListView, TodayView } from "~/features/projects";
import Spinner from "~/components/Spinner";
import TasksPageLayout from "~/layouts/TasksPage";
import { requireAuthed } from "~/lib/auth";

class TasksPage extends React.Component {
    static async getInitialProps({ query }) {
        return {
            layout: {
                contained: false,
                footer: false
            },
            view: query.view ? query.view : null
        };
    }

    renderCurrentRoute = () => {
        if (!this.props.ready && !this.props.failed) {
            return (
                <div className="container">
                    <Spinner text="Loading your tasks..." />
                </div>
            );
        }

        switch (this.props.view) {
            case "list":
                return <ListView />;

            case "kanban":
                return (
                    <section className={"container"}>
                        <KanbanView tasks={this.props.tasks} />
                    </section>
                );

            default:
                return <TodayView tasks={this.props.tasks} />;
        }
    };

    render() {
        return <TasksPageLayout>{this.renderCurrentRoute()}</TasksPageLayout>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadTasks: () => dispatch(tasksActions.loadTasks())
    };
};

const mapStateToProps = state => ({
    tasks: applySearchTerms(state.tasks.tasks, state.tasks.searchTerms),
    projects: state.projects.projects,
    isSyncing: state.tasks.isSyncing || state.projects.isSyncing,
    isSilentlySyncing: state.tasks.ready && state.tasks.isSyncing,
    failed: state.tasks.failed,
    errorMessages: state.tasks.errorMessages,
    ready: state.tasks.ready && state.projects.ready,
    searchTerms: state.tasks.searchTerms
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(requireAuthed(TasksPage));
