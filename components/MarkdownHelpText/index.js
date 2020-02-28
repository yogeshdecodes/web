import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import OutboundLink from "../OutboundLink";

const MarkdownHelpText = ({ className = "" }) => {
    return (
        <p className={"MarkdownHelpText help " + className}>
            <FontAwesomeIcon icon={["fab", "markdown"]} /> Markdown is
            supported.{" "}
            <OutboundLink to="https://www.markdownguide.org/cheat-sheet/">
                What’s this?
            </OutboundLink>
        </p>
    );
};

export default MarkdownHelpText;
