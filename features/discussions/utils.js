import React from "react";
import ReplyFaces from "~/features/discussions/ReplyFaces";
import TimeAgo from "react-timeago";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "~/routes";

/*
<div>20 points</div>
*/

export function getThreadInfoBar(thread) {
    return (
        <small className={"h-list flex center spaced v-center"}>
            {thread.pinned && (
                <div className={"is-brand-green"}>
                    <strong>
                        <FontAwesomeIcon size="xs" icon={"thumbtack"} /> Pinned
                    </strong>
                </div>
            )}

            {thread.gold && (
                <div className={"has-text-gold"}>
                    <strong>
                        <FontAwesomeIcon icon="check-circle" /> Gold only
                    </strong>
                </div>
            )}

            <div>
                <Link route={"discussion-page"} params={{ slug: thread.slug }}>
                    <a>{thread.reply_count} comments</a>
                </Link>
            </div>
            <div>
                <ReplyFaces threadSlug={thread.slug} withOwner={false} />
            </div>

            <div className="is-hidden-mobile">
                <TimeAgo date={thread.created_at} />
            </div>
            <div className="is-hidden-mobile">by @{thread.owner.username}</div>
        </small>
    );
}
