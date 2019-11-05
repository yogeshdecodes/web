import {isLocalEnv} from "../lib/utils/local";

const LocalOnly = ({ children }) => {
    if (isLocalEnv()) {
        return children;
    } else {
        return null;
    }
};

export default LocalOnly;
