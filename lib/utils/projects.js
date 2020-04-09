import { createProject } from "../projects";
import isFunction from "lodash/isFunction";

export const getOrCreateProject = async (text, props) => {
    // Errors are handled upstream
    const tagText = text.replace("#", "").trim();
    try {
        if (tagText.length === 0) return [];
        // Find in redux projects.
        // If it does not exist, then create it.
        // Finally, return the fucken array.
        const found = props.userProjects.find(
            p => p.name.toLowerCase() === tagText.toLowerCase()
        );
        if (found) {
            return [found.id];
        } else {
            let newProject = await createProject(tagText.toLowerCase());
            if (isFunction(props.pushProject)) {
                props.pushProject(newProject);
            }
            return [newProject.id];
        }
    } catch (e) {
        throw e;
    }
};
