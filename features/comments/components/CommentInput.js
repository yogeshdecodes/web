import React from "react";
import { Link } from "~/routes";
import { postComment } from "~/lib/comments";
import Avatar from "~/features/users/components/Avatar";
import Spinner from "~/components/Spinner";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";
import dynamic from "next/dynamic";

const GiphyPane = dynamic(
    () => {
        return import("react-giphy-selector").then(mod => mod.Selector);
    },
    {
        ssr: false,
        loading: () => (
            <center>
                <Spinner small />
            </center>
        )
    }
);

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
                <div className="input-container">
                    <Link route={"begin"}>
                        <a>Join to post a comment.</a>
                    </Link>
                </div>
            );
        }

        return (
            <>
                <form
                    className="CommentInput"
                    onSubmit={this.onSubmit}
                    style={{ width: "100%" }}
                >
                    <div className="input-container flex">
                        <div>
                            <Avatar is={24} user={this.props.me} />
                        </div>
                        <div className="flex-grow">
                            <textarea
                                rows={1}
                                onKeyDown={this.keydownHandler}
                                placeholder={"Write a comment..."}
                                value={this.state.content}
                                onChange={e =>
                                    this.setState({
                                        content: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div>
                            <a
                                className={"gray-link-with-icon"}
                                onClick={this.toggleGif}
                            >
                                GIF
                            </a>
                        </div>
                        {this.state.loading || this.props.isLoading ? (
                            <div className="spinner-container">
                                <Spinner small />
                            </div>
                        ) : null}
                    </div>
                </form>

                {this.state.gifOpen && (
                    <div className="GiphyPane">
                        <GiphyPane
                            apiKey={"x1uFeisfpQoHzLea5vVZ0myZ9R43RmIY"}
                            onGifSelected={this.onGifSelect}
                            queryInputPlaceholder={"Search GIFs..."}
                            queryFormInputClassName={"input"}
                            queryFormSubmitClassName={"btn btn-light btn-small"}
                            queryFormSubmitStyle={{
                                marginLeft: 10,
                                height: 40
                            }}
                            suggestions={[
                                "yay 🎉",
                                "ship 🚢",
                                "productive ✅",
                                "sad 😔"
                            ]}
                        />
                    </div>
                )}
            </>
        );
    }
}

/*


                
                )}
*/

CommentInput = connect(mapStateToProps)(CommentInput);

export default CommentInput;
