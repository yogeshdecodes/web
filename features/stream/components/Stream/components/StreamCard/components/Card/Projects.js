import React from "react";
import PropTypes from "prop-types";
import { ProjectTag } from "~/features/projects";

const Projects = ({ projects }) => (
    <div className={"projects"}>
        <ul>
            {projects.map(project => (
                <li key={project.name}>
                    <ProjectTag name={project.name} />
                </li>
            ))}
        </ul>
    </div>
);

Projects.propTypes = {
    projects: PropTypes.array
};

export default Projects;
