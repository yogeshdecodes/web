import React from "react";
import { connect } from "react-redux";
import sortBy from "lodash/sortBy";
import orderBy from "lodash/orderBy";
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import ReplyThread from "./ReplyThread";
import Emoji from "~/components/Emoji";

export default connect(mapUserToProps)(
    ({ replies, thread, onCreateReply = null, ...props }) => (
        <div className="ReplyList">
            {replies.length === 0 && (
                <div className="nothing-yet">
                    <Emoji emoji={"🤔"} /> Nothing yet. Start the conversation!
                </div>
            )}
            {sortBy(
                orderBy(
                    replies.filter(rep => !rep.parent_reply),
                    "created_at",
                    "asc"
                ),
                r => {
                    if (!props.isLoggedIn) return;
                    // sortby works by converting to 0, 1
                    return !(r.owner.id === props.me.id);
                }
            ).map(r => (
                <ReplyThread
                    reply={r}
                    thread={thread}
                    childrenReplies={replies.filter(
                        child => child.parent_reply === r.id
                    )}
                    onCreateReply={onCreateReply}
                />
            ))}
        </div>
    )
);
