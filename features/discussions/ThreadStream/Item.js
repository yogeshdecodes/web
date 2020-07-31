import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "~/routes";
import { truncate } from "~/lib/utils/random";
import { getThreadInfoBar } from "../utils";

/**
                <div className="upvote-arrows">
                    <div className="up">
                        <FontAwesomeIcon icon="arrow-up" />
                    </div>
                    <div className="down">
                        <FontAwesomeIcon icon="arrow-down" />
                    </div>
                </div>
 */

export default class extends React.Component {
    renderActions = () => (
        <footer>
            <Link
                route={"discussion-page"}
                params={{ slug: this.props.thread.slug }}
            >
                <a className={"has-text-grey"}>
                    <FontAwesomeIcon icon={"reply"} />
                    <strong>Discuss</strong>
                    <span className={"has-text-grey-light"}>
                        {this.props.thread.reply_count} replies
                    </span>
                </a>
            </Link>
            {this.props.thread.reply_count > 0 && (
                <div className={"has-text-grey "}>
                    <ReplyFaces size={32} threadSlug={this.props.thread.slug} />
                </div>
            )}
        </footer>
    );

    renderThread = () => {
        let thread = this.props.thread;
        return (
            <div className={"flex v-center flex-gap"}>
                <div>
                    <Link
                        route={"discussion-page"}
                        params={{ slug: thread.slug }}
                    >
                        <a>
                            <h4>{thread.title}</h4>
                        </a>
                    </Link>

                    <div className="note">
                        {truncate(thread.body, 15, "...")}
                    </div>
                    <span className={"has-text-grey-light"}>
                        {getThreadInfoBar(thread)}
                    </span>
                </div>
            </div>
        );
    };

    render() {
        let thread = this.props.thread;

        return <div className={"ThreadStreamItem"}>{this.renderThread()}</div>;
    }
}
