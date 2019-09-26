import React from "react";
import processString from "react-process-string";
import { Link } from "react-router-dom";
import { EmbedTask } from "features/stream";

export function processDiscussionString(text) {
    const mentionsConfig = {
        regex: /(^| )@[a-z0-9_-]+/gi,
        fn: (key, result) => {
            const username = result[0];

            return (
                <Link
                    to={`/${username.trim()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={key}
                >
                    {username}
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
