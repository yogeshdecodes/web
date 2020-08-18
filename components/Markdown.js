import React, { Component } from "react";

import MDit from "~/vendor/remarkable-regexp/MarkdownIt";
import Plugin from "~/vendor/remarkable-regexp";
import ReactDOMServer from "react-dom/server";

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

class Markdown extends Component {
    render() {
        return (
            <div className="markdown-body">
                <MDit source={this.props.body} plugins={[mentions]} />
            </div>
        );
    }
}

export default Markdown;
