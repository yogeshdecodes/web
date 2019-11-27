import React from 'react';
import {Button} from "vendor/bulma";
import Spinner from "components/Spinner";
import {getProjects} from 'lib/user';
import {createWebhook} from 'lib/apps';

class AppWebhookCreator extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            ready: false,
            linked: false,
            projects: [],
            hook: null,
            selectedProject: null,
            redirecting: false,
            failed: false,
        }

        this.state = this.initialState;

        this.onSubmit = this.onSubmit.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    async componentDidMount() {
        await this.loadData();
    }

    async loadData() {
        try {
            const projects = await getProjects();
            const ready = true;
            const failed = false;
            this.setState({ projects, ready, failed });
        } catch (e) {
            this.setState({
                ready: false,
                failed: true,
                projects: [],
                linked: false,
            })
        }
    }

    async onSubmit() {
        try {
            const hook = await createWebhook(this.props.identifier, this.state.selectedProject);
            if (this.props.sendKeyTo) {
                var root = window.location.protocol + '//' + window.location.hostname;
                this.setState({ redirecting: true });
                window.location.replace(`${this.props.sendKeyTo}?key=${hook.token}&url=${root}/tasks/apps/nodehost?success=true`);
            }
            this.setState({ linked: true, hook: hook, failed: false, })
        } catch (e) {
            this.setState({ failed: true })
        }
    }

	render() {
		if (this.state.ready && this.state.projects.length === 0 && this.state.hook === null) {
			return (
				<div className={"has-text-centered"}>
                    No projects available. <button className={"btn-small"} onClick={this.onSubmit}>Make a non-linked webhook</button>
				</div>
			)
		} else if (this.state.failed) {
			return (
				<div className={"has-text-centered"}>
					That didn't work. <button onClick={async () => await this.loadData()}>Try again.</button>
				</div>
			)
		} else if (this.state.redirecting) {
			return (
				<h3>Redirecting you to the application. This may take a few moments.</h3>
			)
		} else if (this.state.ready && !this.state.linked) {
			return (
				<div className={"has-text-centered"}>
					<div className="field">
						<label class="label">Select a project to create a linked webhook:</label>
					</div>
					<div className="field">
						<div className="select is-medium">
							<select value={this.state.selectedProject} onChange={e => this.setState({selectedProject: e.target.value})}>
								<option>Choose a project...</option>
								{this.state.projects.map(
									project => <option value={project.id}>#{project.name}</option>
								)}
							</select>
						</div>
					</div>

					<div className="field">
						<Button disabled={!this.state.selectedProject} link onClick={this.onSubmit}>Create linked webhook</Button>
					</div>
					<div className="field">
						<button className={"btn-small"} onClick={this.onSubmit}>...or make a non-linked webhook</button>
					</div>
				</div>
			)
		} else if (this.state.linked && this.state.ready) {
			return (
				<div className={"has-text-centered"}>
						<div className="field">
                            <label class="label">Here's your webhook for {this.props.appName}. Keep it secret; we won't show it to you again.</label>
						</div>
						<div className="field">
							<pre>{this.state.hook.url}</pre>
						</div>
				</div>
			)
		} else {
			return <Spinner/>
		}
	}
}

export default AppWebhookCreator;