import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import OutboundLink from "../OutboundLink";

const MarkdownHelpText = () => {
    return (
        <p className="MarkdownHelpText help">
            <FontAwesomeIcon icon={["fab", "markdown"]} /> &nbsp; Markdown is
            supported.{" "}
            <OutboundLink to="https://www.markdownguide.org/cheat-sheet/">
                What’s this?
            </OutboundLink>
        </p>
    );
};

export default MarkdownHelpText;
