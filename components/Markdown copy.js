import React, {Component} from "react";
import ReactDOMServer from "react-dom/server";
import MDit from "~/vendor/remarkable-regexp/MarkdownIt";
import Plugin from "~/vendor/remarkable-regexp";

const mentions = new Plugin(
    // regexp to match
    /(^| )@[a-z0-9_-]+/gi,

    // this function will be called when something matches
    function(match, utils) {
        return ReactDOMServer.renderToStaticMarkup(
            <a
                href={`/${utils
                    .escape(match[0])
                    .trim()
                    .toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
                key={match[0]}
            >
                {utils.escape(match[0])}
            </a>
        );
    }
);

/*
const tasks = new Plugin(
    // regexp to match
    /.*(\/tasks)\/(\d+)/,
  
    // this function will be called when something matches
    function(match, utils) {
        let taskId = null;
        try {
            const url = new URL(match[0]);
            taskId = url.pathname.replace(/[^0-9]/g,'');
        } catch (_) {
            taskId = match[0].replace(/[^0-9]/g,'');
        }

        return `<div style={{padding: 10}}><EmbedTask id={${taskId}} /></div>`
    }
) */

/*
function processTaskString(task) {
    const mentionsConfig = {
        fn: (key, result) => {
            const username = result[0];

            return (
                <Link to={`/${username.trim()}`} target="_blank" rel="noopener noreferrer" key={key}>{username}</Link>
            )
        }
    }

    const hashtagConfig = {
        regex: /#(\w+)/g,
        fn: (key, result) => {
            if (!result[1]) return result[0];
            const projectName = result[1];
            let foundProjects = task.project_set.filter(project => project.name.toUpperCase() === projectName.toUpperCase());

            if (!foundProjects.length)
                return result[0]; //#username

            return (
                <ProjectLink project={foundProjects[0]} key={key}>#{projectName}</ProjectLink>
            )
        }
    }

    return processString([mentionsConfig, hashtagConfig])(task.content);
} */

class Markdown extends Component {
    render() {
        return <MDit source={this.props.body} plugins={[mentions]} />;
    }
}

export default Markdown;
