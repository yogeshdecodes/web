import React from "react";
import { Link } from "~/routes";
import ReplyFaces from "./ReplyFaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoldIcon from "~/components/icons/GoldIcon";

function ThreadMediaLine({ thread }) {
    return (
        <div className=" ThreadMediaLine flex flex-gap">
            {thread.gold && (
                <div>
                    <GoldIcon />
                </div>
            )}
            {thread.pinned && (
                <div>
                    <FontAwesomeIcon size="xs" icon={"thumbtack"} />
                </div>
            )}
            <div>
                <Link route={"discussion-page"} params={{ slug: thread.slug }}>
                    <a>
                        <h4>{thread.title}</h4>
                    </a>
                </Link>
            </div>
            <div>
                <Link route={"discussion-page"} params={{ slug: thread.slug }}>
                    <a className="has-text-grey-light is-hidden-mobile">
                        <>{thread.reply_count} replies</>
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
