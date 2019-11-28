import "./index.scss";
import "react-datepicker/dist/react-datepicker.css";

import React, { Component } from "react";

import DatePicker from "react-datepicker";
import ErrorMessageList from "~/components/forms/ErrorMessageList";
import { createEvent } from "~/lib/events";

class EventHostPage extends Component {
    state = {
        done: false,
        loading: false,
        title: "",
        description: "",
        details: "",
        type: "MEETUP",
        closesAt: null,
        startsAt: null,
        endsAt: null,
        errorMessages: null,
        header: null,
        icon: null,
        failed: false
    };

    onIconUpload = e => {
        this.setState({
            icon: e.target.files[0]
        });
    };

    onHeaderUpload = e => {
        this.setState({
            header: e.target.files[0]
        });
    };

    onSubmit = async e => {
        e.preventDefault();
        this.setState({
            loading: true,
            failed: false
        });
        try {
            await createEvent({
                title: this.state.title,
                description: this.state.description,
                details: this.state.details,
                type: this.state.type,
                closes_at: this.state.closesAt.toISOString(),
                starts_at: this.state.startsAt.toISOString(),
                ends_at: this.state.endsAt.toISOString(),
                icon: this.state.icon,
                header: this.state.header
            });
            this.setState({
                loading: false,
                done: true
            });
        } catch (e) {
            if (e.field_errors) {
                this.setState({
                    errorMessages: e.field_errors
                });
            }
            this.setState({
                failed: true,
                loading: false
            });
        }
    };

    onDatePick = (date, name) => {
        this.setState({
            [name]: date
        });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    isValid = () => {
        return (
            this.state.title.length > 0 &&
            this.state.description.length > 0 &&
            this.state.details.length > 0 &&
            this.state.closesAt !== null &&
            this.state.endsAt !== null &&
            this.state.startsAt !== null &&
            this.state.icon !== null &&
            this.state.header !== null
        );
    };

    renderForm = () => (
        <form onSubmit={this.onSubmit}>
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        className="input"
                        type="text"
                        placeholder="Name of the event"
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Tagline</label>
                <div className="control">
                    <input
                        name="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                        className="input"
                        type="text"
                        placeholder="Quickly pitch your event"
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Type</label>
                <div className="control">
                    <div className="select">
                        <select
                            name="type"
                            value={this.state.type}
                            onChange={this.handleChange}
                        >
                            <option value="MEETUP">Meetup</option>
                            <option value="HACKATHON">Hackathon</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="field">
                <label className="label">Details</label>
                <div className="control">
                    <textarea
                        name="details"
                        onChange={this.handleChange}
                        value={this.state.details}
                        className="textarea"
                        placeholder="This is the details of the event. You can use Markdown here."
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Registrations close at...</label>
                <div className="control">
                    <DatePicker
                        selected={this.state.closesAt}
                        onChange={d => this.onDatePick(d, "closesAt")}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Starts at...</label>
                <div className="control">
                    <DatePicker
                        selected={this.state.startsAt}
                        onChange={d => this.onDatePick(d, "startsAt")}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Ends at...</label>
                <div className="control">
                    <DatePicker
                        selected={this.state.endsAt}
                        onChange={d => this.onDatePick(d, "endsAt")}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Icon</label>
                <div className="control">
                    <input
                        type="file"
                        name="icon"
                        onChange={this.onIconUpload}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Background image</label>
                <div className="control">
                    <input
                        type="file"
                        name="header"
                        onChange={this.onHeaderUpload}
                    />
                </div>
            </div>

            <hr />

            <div className="field is-grouped">
                <div className="control">
                    <button
                        disabled={!this.isValid()}
                        className={
                            "button is-link is-rounded" +
                            (this.state.loading ? " is-loading" : "")
                        }
                    >
                        Submit
                    </button>
                </div>
            </div>
            <p className="help">
                Do note we review all submissions and approve them manually.
            </p>
        </form>
    );

    render() {
        return (
            <div className="EventHostPage brand-background-page">
                <div className="columns">
                    <div className="column is-half is-offset-one-quarter">
                        <h3 className="title is-3">Host an event</h3>
                        <h3 className="subtitle is-6">
                            Hosting a Makerlog event is a great way to connect
                            entrepreneurs and grow your network.
                        </h3>

                        <div className="card">
                            <div className="card-content">
                                {this.state.errorMessages && (
                                    <ErrorMessageList
                                        fieldErrors={this.state.errorMessages}
                                    />
                                )}
                                {this.state.failed && (
                                    <div className="message is-danger">
                                        <div className="message-body">
                                            Oops! Something went wrong.
                                        </div>
                                    </div>
                                )}
                                {this.state.done
                                    ? "Done! We'll let you know when it's approved."
                                    : this.renderForm()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventHostPage;
