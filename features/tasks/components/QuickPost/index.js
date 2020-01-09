import React, { Component } from "react";
import Emoji from "~/components/Emoji";
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import { connect } from "react-redux";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import findHashtags from "find-hashtags";
import debounce from "lodash/debounce";

const PostTypes = {
    TASK: 1,
    QUESTION: 2,
    MILESTONE: 3,
    RFF: 4
};

const Hashtag = (tag, inText = false) => {
    return {
        tag,
        inText
    };
};

class QuickPost extends Component {
    state = {
        type: PostTypes.TASK,
        body: "",
        hashtags: []
    };

    handleChange = e => {
        if (e.target.name === "body" && this.state.type === PostTypes.TASK) {
            this.onTaskInput(e.target.value);
        }

        this.setState({ [e.target.name]: e.target.value });
    };

    doesHashtagExist = value => {
        return this.state.hashtags.find(tag => tag.tag === value);
    };

    onTaskInput = debounce(value => {
        this.setState({
            hashtags: [
                ...findHashtags(value).map(x => Hashtag(x, true)),
                ...this.state.hashtags.filter(tag => !tag.inText)
            ]
        });
    }, 300);

    changeType = type => {
        this.setState({ type });
    };

    render() {
        const open = this.state.body.length > 0;

        return (
            <div className={"QuickPost card " + (open ? "is-active" : "")}>
                <header>
                    <button
                        className={
                            this.state.type === PostTypes.TASK && "is-active"
                        }
                        onClick={() => this.changeType(PostTypes.TASK)}
                    >
                        <Emoji emoji="✅" /> Task
                    </button>
                    <button
                        className={
                            this.state.type === PostTypes.QUESTION &&
                            "is-active"
                        }
                        onClick={() => this.changeType(PostTypes.QUESTION)}
                    >
                        <Emoji emoji="🤔" /> Question
                    </button>
                    <button
                        className={
                            this.state.type === PostTypes.MILESTONE &&
                            "is-active"
                        }
                        onClick={() => this.changeType(PostTypes.MILESTONE)}
                    >
                        <Emoji emoji="🎉" /> Milestone
                    </button>
                    <button
                        className={
                            this.state.type === PostTypes.RFF && "is-active"
                        }
                        onClick={() => this.changeType(PostTypes.RFF)}
                    >
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
                            <FontAwesomeIcon icon="check-circle" /> Completed
                        </button>
                    </div>
                    {this.state.hashtags.length > 0 ? (
                        this.state.hashtags.map(t => (
                            <div>
                                <button className="btn-small btn-gray">
                                    #{t.tag}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div>
                            <button className="btn-small btn-gray">
                                + Add tags
                            </button>
                        </div>
                    )}
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
