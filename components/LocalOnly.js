import { isLocalEnv } from "../lib/utils/random";

const LocalOnly = ({ children }) => {
    if (isLocalEnv()) {
        return children;
    } else {
        return null;
    }
};

export default LocalOnly;
