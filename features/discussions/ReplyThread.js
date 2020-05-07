import React from "react";
import orderBy from "lodash/orderBy";
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";

export default class extends React.Component {
    state = {
        replying: false,
        prefillText: ""
    };

    onClickReply = () => {
        this.setState({
            replying: true
        });
    };

    onCreateReply = reply => {
        this.setState({
            replying: false
        });

        if (this.props.onCreateReply) {
            this.props.onCreateReply(reply);
        }
    };

    onClickChildReply = reply => {
        this.setState({
            replying: true,
            prefillText: `@${reply.owner.username} `
        });
    };

    render() {
        const { thread, reply, childrenReplies } = this.props;
        return (
            <Reply reply={reply} onClickReply={this.onClickReply}>
                <div className="reply-children">
                    {orderBy(childrenReplies, "created_at", "asc").map(
                        ch =>
                            console.log(ch.id) || (
                                <Reply
                                    key={ch.id}
                                    child={true}
                                    onClickReply={this.onClickChildReply}
                                    reply={ch}
                                />
                            )
                    )}
                </div>
                {this.state.replying && (
                    <ReplyForm
                        focused
                        prefillText={this.state.prefillText}
                        parentReply={reply.id}
                        thread={thread}
                        onCreateReply={this.onCreateReply}
                    />
                )}
            </Reply>
        );
    }
}
