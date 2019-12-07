import React, { Component } from "react";
import Emoji from "~/components/Emoji";
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import { connect } from "react-redux";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class QuickPost extends Component {
    state = {
        body: ""
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const open = this.state.body.length > 0;

        return (
            <div className={"QuickPost card " + (open ? "is-active" : "")}>
                <header>
                    <button className="is-active">
                        <Emoji emoji="✅" /> Task
                    </button>
                    <button>
                        <Emoji emoji="🤔" /> Question
                    </button>
                    <button>
                        <Emoji emoji="🎉" /> Milestone
                    </button>
                    <button>
                        <Emoji emoji="🔥" /> Feedback request
                    </button>
                </header>
                <div className="input-container">
                    <input
                        name="body"
                        onChange={this.handleChange}
                        value={this.state.body}
                        placeholder="Start typing a task..."
                    ></input>
                </div>

                <footer className="flex flex-gap">
                    <div>
                        <button className="btn-small btn-light">
                            <FontAwesomeIcon icon="check-circle" /> Done
                        </button>
                    </div>
                    <div>
                        <button className="btn-small btn-gray">
                            + Add tags
                        </button>
                    </div>
                    <div className="flex-grow"></div>
                    <div>
                        <button className="btn-small">Post</button>
                    </div>
                </footer>
            </div>
        );
    }
}

export default connect(mapUserToProps)(QuickPost);
