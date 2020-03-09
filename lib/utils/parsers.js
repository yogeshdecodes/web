import React from "react";
import processString from "react-process-string";
import ProjectLink from "../../components/ProjectLink";
import { Link } from "~/routes";

export function processTaskString(task) {
    const mentionsConfig = {
        regex: /(?:^|\s)(?:@)([a-zA-Z\d]+)/gm,
        fn: (key, result) => {
            const username = result[0];
            console.log(username);

            return (
                <Link
                    route="profile-page"
                    params={{ username: username.trim().replace("@", "") }}
                >
                    <a>{username}</a>
                </Link>
            );
        }
    };

    // to get rid of whitespace span, just use regex:
    //         regex: /#(\w+)/g,
    const hashtagConfig = {
        regex: /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm,
        fn: (key, result) => {
            if (!result[1]) return result[0];
            const projectName = result[1];
            let foundProjects = task.project_set.filter(
                project =>
                    project.name.toUpperCase() === projectName.toUpperCase()
            );

            if (!foundProjects.length) return result[0]; //#username

            return (
                <span>
                    {" "}
                    <ProjectLink project={foundProjects[0]} key={key}>
                        #{projectName}
                    </ProjectLink>
                </span>
            );
        }
    };

    return processString([mentionsConfig, hashtagConfig])(task.content);
}
