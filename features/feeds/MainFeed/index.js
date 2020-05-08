import React from "react";
import { connect } from "react-redux";
import KeyActivityFeed from "../KeyActivityFeed";

const MainFeed = ({ currentFeed, activitiesPrefetch }) => {
    switch (currentFeed) {
        case "discussions": {
            return (
                <KeyActivityFeed
                    key={"discussions:normal"}
                    feedKey="discussions:normal"
                />
            );
        }

        case "tasks": {
            return (
                <KeyActivityFeed
                    key={"tasks:aggregated"}
                    feedKey="tasks:aggregated"
                />
            );
        }

        default: {
            return (
                <KeyActivityFeed
                    prefetchData={activitiesPrefetch}
                    key="site:aggregated"
                    feedKey="site:aggregated"
                />
            );
        }
    }
};

export default connect(state => {
    return {
        currentFeed: state.app.currentFeed
    };
})(MainFeed);
