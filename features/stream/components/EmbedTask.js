import React from "react";
import {getTask} from "~/lib/tasks";
import Spinner from "~/components/Spinner";
import Entry from "./Task";

class EmbedTask extends React.Component {
    state = {
        loading: true,
        data: null,
        failed: false
    };

    async fetchTask() {
        this.setState({ loading: true, failed: false });
        try {
            const data = await getTask(this.props.id);
            this.setState({ data: data, loading: false, failed: false });
        } catch (e) {
            this.setState({ data: null, loading: false, failed: true });
        }
    }

    componentDidMount() {
        this.fetchTask();
    }

    render() {
        if (this.state.loading) {
            return <Spinner small={true} />;
        }

        if (this.state.failed && this.state.loading === false) {
            return (
                <small className={"has-text-danger"}>
                    Failed to load this task.
                </small>
            );
        } else if (!this.state.loading && !this.state.failed) {
            return <Entry task={this.state.data} />;
        }
    }
}

EmbedTask.propTypes = {};

export default EmbedTask;
