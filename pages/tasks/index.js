import React from "react";
import Navigation from "./components/Navigation";
import { connect } from "react-redux";
import { actions as tasksActions } from "~/ducks/tasks";
import { applySearchTerms } from "~/lib/utils/tasks";
import { ListView, KanbanView, TodayView } from "~/features/projects";
import Spinner from "~/components/Spinner";

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

    componentDidMount() {
        this.props.connect();
    }

    componentWillUnmount() {
        this.props.disconnect();
    }

    renderCurrentRoute = () => {
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
        if (!this.props.ready && !this.props.failed) {
            return <Spinner text="Loading your tasks..." />;
        }

        return (
            <>
                <Navigation />
                {this.renderCurrentRoute()}
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        connect: () => dispatch(tasksActions.connect()),
        disconnect: () => dispatch(tasksActions.disconnect()),
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
)(TasksPage);
