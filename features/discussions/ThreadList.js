import React from "react";
import { Link } from "~/routes";
import ReplyFaces from "./ReplyFaces";

export default props => {
    return (
        <div className={"RecentQuestionsList"}>
            {props.threads.map(thread => (
                <Link route={"discussion-page"} params={{ slug: thread.slug }}>
                    <div>
                        <h2 className={"topic-title"}>{thread.title}</h2>
                        <div className={"flex flex-gap"}>
                            <div className={"has-text-grey-light"}>
                                {thread.type === "QUESTION"
                                    ? `${thread.reply_count} answers`
                                    : `${thread.reply_count} replies`}
                            </div>
                            <div>
                                <ReplyFaces
                                    maxFaces={6}
                                    withOwner
                                    threadSlug={thread.slug}
                                />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};
