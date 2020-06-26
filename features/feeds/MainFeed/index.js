import React from "react";
import { connect } from "react-redux";
import KeyActivityFeed from "../KeyActivityFeed";
import DiscussionSection, {
    prefetchData as prefetchThreads
} from "~/features/discussions/DiscussionSection";
import TodayList from "../../tasks/components/TodayList";
import DoneTodayCount from "../../tasks/DoneTodayCount";
import { Experiment, Variant } from "react-optimize";
import experiments from "../../../experiments";

const MainFeed = ({ currentFeed, discussionPrefetch, activitiesPrefetch }) => {
    switch (currentFeed) {
        case "discussions": {
            return (
                <>
                    <h3 className="mb-em">Latest discussions</h3>
                    <div className="card">
                        <div className="card-content">
                            <DiscussionSection {...discussionPrefetch} />
                        </div>
                    </div>

                    <h3 className="mb-em">Log</h3>
                    <KeyActivityFeed
                        key={"discussions:normal"}
                        feedKey="discussions:normal"
                    />
                </>
            );
        }

        case "tasks": {
            return (
                <>
                    <h3 className="mb-em">Today's tasks</h3>
                    <KeyActivityFeed
                        key={"tasks:aggregated"}
                        feedKey="tasks:aggregated"
                    />
                </>
            );
        }

        default: {
            return (
                <>
                    <Experiment id={experiments.NEW_TASK_EXPERIENCE.id}>
                        <Variant id="0"></Variant>
                        <Variant id="1">
                            <>
                                <h3>Today</h3>
                                <h4 className="subtitle has-text-grey mb-em">
                                    <DoneTodayCount /> tasks completed today
                                </h4>
                                <div className="card">
                                    <div className="card-content">
                                        <TodayList />
                                    </div>
                                </div>
                            </>
                        </Variant>
                    </Experiment>
                    <h3 className="mb-em">Latest discussions</h3>
                    <div className="card">
                        <div className="card-content">
                            <DiscussionSection {...discussionPrefetch} />
                        </div>
                    </div>
                    <h3 className="mb-em">Log</h3>
                    <KeyActivityFeed
                        prefetchData={activitiesPrefetch}
                        key="site:aggregated"
                        feedKey="site:aggregated"
                    />
                </>
            );
        }
    }
};

export default connect(state => {
    return {
        currentFeed: state.app.currentFeed
    };
})(MainFeed);
