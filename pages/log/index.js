import React from "react";
import { connect } from "react-redux";
import NoActivityCard from "~/features/stream/components/NoActivityCard";
import { requireAuthed } from "../../lib/auth";
import ExploreSidebar, { prefetchData } from "~/components/sidebar/explore";
import GlobalStream, { prefetch as prefetchStream } from "~/features/stream/containers/GlobalStream";

class StreamPage extends React.Component {
    static async getInitialProps() {
        return {
            ...(await prefetchData()),
            streamPrefetch: await prefetchStream()
        };
    }

    isNewUser = () =>
        (this.props.tasks.length === 0 &&
            this.props.initialLoaded &&
            !this.props.isSyncing) ||
        this.props.isNewUser;

    render() {
        return (
            <>
                <section className={"container"}>
                    <div className={"grid-c-s"}>
                        <div>
                            <h3 className="mb-em">Today's log</h3>
                            {this.isNewUser() ? (
                                <NoActivityCard />
                            ) : (
                                <GlobalStream {...this.props.streamPrefetch} />
                            )}
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
        isSyncing: state.stream.isSyncing,
        tasks: state.stream.tasks,
        initialLoaded: state.stream.initialLoaded
    };
};

export default requireAuthed(connect(mapStateToProps)(StreamPage));
