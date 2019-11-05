import React from "react";
import processString from "react-process-string";
import {Link} from "~/routes";
import {EmbedTask} from "~/features/stream";

export function processDiscussionString(text) {
    const mentionsConfig = {
        regex: /(^| )@[a-z0-9_-]+/gi,
        fn: (key, result) => {
            const username = result[0];

            return (
                <Link
                    route="profile-page"
                    params={{ username: username.trim() }}
                >
                    <a key={key}>{username}</a>
                </Link>
            );
        }
    };

    const embedTaskConfig = {
        regex: /.*(\/tasks)\/(\d+)/,
        fn: (key, result) => {
            let taskId = null;
            try {
                const url = new URL(result[0]);
                taskId = url.pathname.replace(/[^0-9]/g, "");
            } catch (_) {
                taskId = result[0].replace(/[^0-9]/g, "");
            }

            return <EmbedTask id={taskId} key={key} />;
        }
    };

    return processString([mentionsConfig, embedTaskConfig])(text);
}
