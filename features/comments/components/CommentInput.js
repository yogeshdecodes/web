import React from "react";
import { Media, SubTitle } from "~/vendor/bulma";
import { Link } from "~/routes";
import { postComment } from "~/lib/comments";
import { Avatar, withCurrentUser } from "~/features/users";
import Spinner from "~/components/Spinner";
import AutoTextarea from "react-textarea-autosize";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { Selector } from "react-giphy-selector";
import "./CommentInput.scss";

const GifPicker = styled.div``;

class CommentInput extends React.Component {
    state = {
        loading: false,
        content: "",
        failed: false,
        gifOpen: false
    };

    toggleGif = () => {
        this.setState({
            gifOpen: !this.state.gifOpen
        });
    };

    onGifSelect = async gif => {
        if (
            gif.type === "gif" &&
            gif.images &&
            gif.images.original &&
            gif.images.original.gif_url
        ) {
            await this.setState({
                content:
                    this.state.content +
                    ` ![gif](${gif.images.original.gif_url})`,
                gifOpen: false
            });
            await this.onSubmit({ preventDefault: () => {} });
        }
    };

    onSubmit = async e => {
        e.preventDefault();
        this.setState({ loading: true });
        try {
            let comment = await postComment(
                this.props.indexUrl,
                this.state.content
            );
            this.setState({ loading: false, content: "", failed: false });
            if (this.props.onCreate) {
                this.props.onCreate(comment);
            }
        } catch (e) {
            this.setState({ loading: false, failed: true });
        }
    };

    keydownHandler = e => {
        // if (e.keyCode===13 && (e.ctrlKey || e.metaKey)) this.onSubmit(e)
        if (e.keyCode === 13 && !e.shiftKey) this.onSubmit(e);
    };

    render() {
        if (!this.props.isLoggedIn) {
            return (
                <h3>
                    <Link to={"/begin"}>Sign in or join</Link> to post a
                    comment.
                </h3>
            );
        }

        return (
            <div className={"stretch"}>
                <div className={"flex"}>
                    <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
                        <div className={"flex CommentInput"}>
                            <div>
                                <Link to={`/@${this.props.user.username}`}>
                                    <Avatar is={24} user={this.props.user} />
                                </Link>
                            </div>
                            <div>
                                <textarea
                                    onKeyDown={this.keydownHandler}
                                    placeholder={"Write a comment..."}
                                    value={this.state.content}
                                    onChange={e =>
                                        this.setState({
                                            content: e.target.value
                                        })
                                    }
                                />
                                {this.state.content.length > 0 && (
                                    <div className={"help"}>
                                        <FontAwesomeIcon
                                            icon={["fab", "markdown"]}
                                        />{" "}
                                        Shift+Enter to add a new line. Enter to
                                        finish.{" "}
                                    </div>
                                )}
                            </div>
                            {this.state.loading || this.props.isLoading ? (
                                <div>
                                    <Spinner small />
                                </div>
                            ) : null}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

/*


                    <div>
                        <button
                            className={"btn-small"}
                            onClick={this.toggleGif}
                        >
                            GIF
                        </button>
                    </div>
                {this.state.gifOpen && (
                    <GifPicker>
                        <Selector
                            apiKey={"x1uFeisfpQoHzLea5vVZ0myZ9R43RmIY"}
                            onGifSelected={this.onGifSelect}
                            queryInputPlaceholder={"Search a topic..."}
                            queryFormInputClassName={"input"}
                            queryFormSubmitClassName={"button is-primary"}
                            queryFormInputStyle={{
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }}
                            queryFormSubmitStyle={{
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0
                            }}
                        />
                    </GifPicker>
                )}
*/

CommentInput = withCurrentUser(CommentInput);

export default CommentInput;
