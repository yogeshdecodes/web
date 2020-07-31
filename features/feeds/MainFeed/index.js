import React from "react";
import { connect } from "react-redux";
import KeyActivityFeed from "../KeyActivityFeed";
import DiscussionSection from "~/features/discussions/DiscussionSection";
import TodayList from "../../tasks/components/TodayList";
import DoneTodayCount from "../../tasks/DoneTodayCount";
import Spinner from "~/components/Spinner";

const MainFeed = ({
    currentFeed,
    discussionPrefetch,
    activitiesPrefetch,
    ...props
}) => {
    switch (currentFeed) {
        /*case "discussions": {
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
        }*/

        default: {
            return (
                <>
                    <h3>Today</h3>
                    <h4 className="subtitle has-text-grey mb-em">
                        <DoneTodayCount /> tasks completed today
                    </h4>
                    <div className="card">
                        <div className="card-content">
                            {!props.ready && !props.failed ? (
                                <center>
                                    <Spinner
                                        small
                                        text="Loading your tasks..."
                                    />
                                </center>
                            ) : (
                                <TodayList />
                            )}
                        </div>
                    </div>
                    <h3 className="mb-em">Latest discussions</h3>
                    <div className="card">
                        <div className="card-content">
                            <DiscussionSection {...discussionPrefetch} />
                        </div>
                    </div>
                    <h3 className="mb-em">Log</h3>
                    <KeyActivityFeed
                        prefetchData={activitiesPrefetch}
                        userId={-1}
                        feed="timeline"
                    />
                </>
            );
        }
    }
};

export default connect(state => {
    return {
        ready: state.tasks.ready,
        failed: state.tasks.failed,
        currentFeed: state.app.currentFeed
    };
})(MainFeed);
