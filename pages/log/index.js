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

class StreamPage extends React.Component {
    static async getInitialProps() {
        return {
            ...(await prefetchData()),
            streamPrefetch: await prefetchStream(),
            discussionPrefetch: await prefetchThreads()
        };
    }

    componentDidMount() {
        if (this.props.isNewUser) {
            Router.pushRoute("welcome");
        }
    }

    hasNoTasks = () => this.props.tasks.length === 0 && !this.props.isSyncing;

    render() {
        return (
            <>
                <section className={"container"}>
                    <div className={"grid-c-s"}>
                        <div>
                            {this.hasNoTasks() ? <NoActivityCard /> : null}
                            <h3 className="mb-em">Latest threads</h3>
                            <div className="card">
                                <div className="card-content">
                                    <DiscussionSection
                                        {...this.props.discussionPrefetch}
                                    />
                                </div>
                            </div>
                            <ActivityFeed />
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
