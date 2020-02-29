import React, { Component } from "react";
import { Link } from "~/routes";
import ReplyFaces from "./ReplyFaces";

function ThreadMediaLine({ thread }) {
    return (
        <div className=" ThreadMediaLine flex flex-gap">
            <div>
                <Link route={"discussion-page"} params={{ slug: thread.slug }}>
                    <h4>{thread.title}</h4>
                </Link>
            </div>
            <div>
                <Link route={"discussion-page"} params={{ slug: thread.slug }}>
                    <a className="has-text-grey-light">
                        {thread.reply_count ? (
                            <>{thread.reply_count} replies</>
                        ) : (
                            <strong>Be the first to reply!</strong>
                        )}
                    </a>
                </Link>
            </div>{" "}
            <div>
                <ReplyFaces threadSlug={thread.slug} withOwner={false} />
            </div>
        </div>
    );
}

export default ThreadMediaLine;
