import React from "react";
import { getProjects } from "~/lib/projects";
import Spinner from "~/components/Spinner";

class ProjectsContainer extends React.Component {
    state = {
        loading: true,
        data: null,
        failed: false
    };

    async fetchProjects() {
        this.setState({ loading: true, failed: false });
        try {
            const data = await getProjects();
            this.setState({ data: data, loading: false, failed: false });
        } catch (e) {
            this.setState({ data: null, loading: false, failed: true });
        }
    }

    componentDidMount() {
        this.fetchProjects();
    }

    render() {
        const Component = this.props.component;

        if (this.state.loading) {
            return <Spinner small={true} />;
        }

        if (this.state.failed && this.state.loading === false) {
            return (
                <div className={"center"}>
                    <h3>
                        Failed to load projects.{" "}
                        <button onClick={() => this.fetchProjects()}>
                            Try again &raquo;
                        </button>
                    </h3>
                </div>
            );
        } else if (!this.state.loading && !this.state.failed) {
            return <Component projects={this.state.data} />;
        }
    }
}

ProjectsContainer.propTypes = {};

export default ProjectsContainer;
