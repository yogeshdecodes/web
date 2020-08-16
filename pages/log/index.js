import React from "react";
import { connect } from "react-redux";
import NoActivityCard from "~/features/stream/components/NoActivityCard";
import { requireAuthed } from "../../lib/auth";
import ExploreSidebar, { prefetchData } from "~/components/sidebar/explore";
import GlobalStream, {
    prefetch as prefetchStream
} from "~/features/stream/containers/GlobalStream";
import DiscussionSection, {
    prefetchData as prefetchThreads
} from "~/features/discussions/DiscussionSection";
import { Router } from "~/routes";
import ActivityFeed from "../../features/feeds/ActivityFeed";
import KeyActivityFeed, {
    prefetchActivity
} from "../../features/feeds/KeyActivityFeed";
import FeedSwitcher from "../../features/feeds/FeedSwitcher";
import MainFeed from "../../features/feeds/MainFeed";
import { CardEditor } from "../../features/editor";
import TodayCard from "../../features/tasks/components/TodayCard";

class StreamPage extends React.Component {
    static async getInitialProps() {
        return {
            layout: {
                footer: false
            },
            ...(await prefetchData()),
            activitiesPrefetch: await prefetchActivity("timeline", "-1"),
            discussionPrefetch: await prefetchThreads()
        };
    }

    componentDidMount() {
        if (this.props.isNewUser) {
            Router.pushRoute("/start/setup/");
        }
    }

    hasNoTasks = () => this.props.tasks.length === 0 && !this.props.isSyncing;

    render() {
        return (
            <>
                <section className={"container"}>
                    <div className={"grid-c-s"}>
                        <div>
                            {this.hasNoTasks() ? (
                                <>
                                    <NoActivityCard />
                                    <CardEditor />
                                </>
                            ) : (
                                <CardEditor />
                            )}
                            <TodayCard />
                            <MainFeed
                                activitiesPrefetch={
                                    this.props.activitiesPrefetch
                                }
                                discussionPrefetch={
                                    this.props.discussionPrefetch
                                }
                            />
                        </div>

                        <div className={"sidebar is-hidden-mobile"}>
                            <ExploreSidebar data={this.props.data} />
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

// Pass a few props from state simply because we need to detect new user-hood
const mapStateToProps = state => {
    return {
        isNewUser: state.app.isNewUser,
        isSyncing: state.tasks.isSyncing,
        tasks: state.tasks.tasks
    };
};

export default requireAuthed(connect(mapStateToProps)(StreamPage));
