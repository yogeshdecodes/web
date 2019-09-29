import React from "react";
import capitalize from "capitalize";

const ProjectTag = ({ name }) => (
    <div className={"tag"}>
        <strong>{capitalize(name).replace(/_/g, " ")}</strong> &nbsp; #
        {name.toLowerCase()}
    </div>
);

export default ProjectTag;
