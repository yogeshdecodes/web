import React from "react";
import { connect } from "react-redux";
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import Avatar from "~/features/users/components/Avatar";
import MarkdownHelpText from "~/components/MarkdownHelpText";
import { postReply } from "~/lib/discussions";

export default connect(mapUserToProps)(
    class ReplyForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isCreating: false,
                body: props.prefillText ? props.prefillText : "",
                failed: false
            };
        }

        onSubmit = async () => {
            try {
                await this.setState({
                    isCreating: true,
                    failed: false
                });

                const reply = await postReply(
                    this.props.thread.slug,
                    this.state.body,
                    this.props.parentReply ? this.props.parentReply : null
                );

                if (this.props.onCreateReply) {
                    this.props.onCreateReply(reply);
                }

                this.setState({
                    isCreating: false,
                    body: "",
                    failed: false
                });
            } catch (e) {
                this.setState({
                    isCreating: false,
                    failed: true
                });
            }
        };

        render() {
            if (!this.props.isLoggedIn) {
                return (
                    <div className={"alert is-info"} id={"ReplyForm"}>
                        <div className="alert-body">
                            <h4>You must be signed in to reply.</h4>
                            <Link route="begin">
                                <a className="btn btn-light btn-small is-rounded">
                                    Get started
                                </a>
                            </Link>
                        </div>
                    </div>
                );
            }

            return (
                <div className={"flex flex-gap ReplyForm"} id={"ReplyForm"}>
                    <div>
                        <Avatar user={this.props.me} is={32} />
                    </div>
                    <div className="form-row mb0">
                        <div className="control">
                            <textarea
                                rows={"3"}
                                innerRef={input =>
                                    input && this.props.focused && input.focus()
                                }
                                value={this.state.body}
                                onKeyDown={e => {
                                    if (
                                        e.keyCode === 13 &&
                                        (e.ctrlKey || e.metaKey)
                                    ) {
                                        e.preventDefault();

                                        this.onSubmit(e);
                                    }
                                }}
                                onChange={e => {
                                    this.setState({ body: e.target.value });
                                }}
                                placeholder={"Write a reply..."}
                            />
                            {this.state.failed && (
                                <p className="help has-text-danger">
                                    Something went wrong. Please try again
                                    later.
                                </p>
                            )}
                        </div>
                        <div className={"action-container flex v-center"}>
                            <div>
                                <MarkdownHelpText />
                            </div>
                            <div className="flex-grow"></div>
                            <div>
                                <button
                                    className={
                                        "btn btn-light " +
                                        (this.state.isCreating
                                            ? "is-loading"
                                            : "")
                                    }
                                    disabled={this.state.isCreating}
                                    onClick={this.onSubmit}
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
);
