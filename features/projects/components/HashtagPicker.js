import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../../components/Spinner";
import { createProject } from "../../../lib/projects";
import uniqBy from "lodash/uniqBy";
import { handleChange, loadingClass } from "../../../lib/utils/random";
import { actions as projectsActions } from "~/ducks/projects";

class HashtagPicker extends Component {
    state = {
        value: "",
        loading: false,
        failed: false
    };

    onAddTag = async e => {
        e.preventDefault();
        const tag = this.state.value.replace("#", "");
        this.setState({ loading: true, failed: false });
        try {
            let project = null;
            if (this.findProject(tag)) {
                project = this.findProject(tag);
            } else {
                project = await createProject(tag);
                this.props.pushProject(project);
            }
            this.setState({ loading: false, value: "", failed: false });
            this.props.onChange(
                uniqBy([...this.props.projects, project], "name")
            );
        } catch (e) {
            console.log(e);
            this.setState({ loading: false, failed: true });
        }
    };

    onRemoveTag = pid => {
        this.props.onChange(this.props.projects.filter(p => p.id !== pid));
    };

    findProject = project => {
        return this.props.userProjects.find(p => p.name === project);
    };

    handleChange = e => handleChange(e, this);

    render() {
        const { props } = this;
        if (!props.projectsReady) {
            return <Spinner small text="Loading projects..." />;
        }

        return (
            <div>
                <div className="input-control flex flex-gap">
                    <div>
                        <input
                            value={this.state.value}
                            onChange={this.handleChange}
                            name="value"
                            type="text"
                            placeholder="#makerlog"
                        />
                    </div>
                    <div>
                        <button
                            onClick={this.onAddTag}
                            className={loadingClass(
                                "btn btn-light",
                                this.state.loading
                            )}
                        >
                            Add hashtag
                        </button>
                    </div>
                </div>
                <div className="hashtag-list flex flex-gap">
                    {this.props.projects.map(p => (
                        <div key={p.id} className="tag">
                            #{p.name}{" "}
                            <span
                                onClick={e => {
                                    this.onRemoveTag(p.id);
                                }}
                                className="delete ml"
                            >
                                x
                            </span>
                        </div>
                    ))}
                </div>
                {this.state.failed && (
                    <p className="help is-danger">
                        Something went wrong. Please try again later.
                    </p>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    projectsReady: state.projects.ready,
    userProjects: state.projects.projects
});

const mapDispatchToProps = dispatch => ({
    pushProject: project =>
        dispatch(projectsActions.fetchProjectsSuccess([project]))
});

export default connect(mapStateToProps, mapDispatchToProps)(HashtagPicker);
