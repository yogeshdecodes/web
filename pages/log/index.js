import React from "react";
import { connect } from "react-redux";
import NoActivityCard from "~/features/stream/components/NoActivityCard";
import { FollowingStream } from "~/features/stream";
import StreamHeader from "../../features/stream/components/StreamHeader";
import Sidebar from "../../features/stream/components/Sidebar";
import { requireAuthed } from "../../lib/auth";
import QuickPost from "~/features/tasks/components/QuickPost";

class StreamPage extends React.Component {
    isNewUser = () =>
        (this.props.tasks.length === 0 &&
            this.props.initialLoaded &&
            !this.props.isSyncing) ||
        this.props.isNewUser;

    render() {
        return (
            <>
                <StreamHeader />
                <section className={"container"}>
                    <div className={"grid-c-s"}>
                        <div>
                            <QuickPost />

                            {this.isNewUser() ? (
                                <NoActivityCard />
                            ) : (
                                <FollowingStream />
                            )}
                        </div>

                        <div className={"sidebar is-hidden-mobile"}>
                            <Sidebar />
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
