import React from "react";
import {connect} from "react-redux";
import {actions as streamActions} from "~/ducks/stream";
import Stream from "../../components/Stream";

class FollowingStream extends React.Component {
    componentDidMount() {
        // initially load stream
        if (!this.props.initialLoaded) {
            this.props.init();
            this.props.connect();
        } else {
            this.props.connect();
            this.props.sync();
        }

        /* this.props.init();
        this.props.connect(); */
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (
            this.props.initialLoaded === false &&
            prevProps.initialLoaded === true
        ) {
            this.props.disconnect();
            this.props.init();
            this.props.connect();
        }
    }

    componentWillUnmount() {
        this.props.disconnect();
    }

    render() {
        return (
            <Stream
                isSyncing={this.props.isSyncing}
                loadMore={this.props.loadMore}
                hasMore={this.props.hasMore}
                tasks={this.props.tasks}
                milestones={this.props.milestones}
                canSwitchType={true}
                isFollowingFeed={this.props.isFollowingFeed}
                onSwitch={this.props.toggleStreamType}
            />
        );
    }
}

FollowingStream.propTypes = {};

const mapStateToProps = state => {
    console.info(state.stream.nextUrl);
    return {
        isNewUser: state.app.isNewUser,
        isFollowingFeed: state.stream.isFollowingFeed,
        isSyncing: state.stream.isSyncing,
        errorMessages: state.stream.errorMessages,
        tasks: state.stream.tasks,
        milestones: state.stream.milestones,
        fetchFailed: state.stream.fetchFailed,
        initialLoaded: state.stream.initialLoaded,
        allLoaded: state.stream.allLoaded,
        hasMore: state.stream.initialLoaded ? !state.stream.allLoaded : false // rely on the nextUrl being truthy
    };
};

const mapDispatchToProps = dispatch => {
    return {
        init: () => dispatch(streamActions.init()),
        connect: () => dispatch(streamActions.connect()),
        sync: () => {
            dispatch(streamActions.sync());
        },
        disconnect: () => dispatch(streamActions.disconnect()),
        loadMore: () => dispatch(streamActions.loadMore()),
        toggleStreamType: () => dispatch(streamActions.toggleStreamType())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FollowingStream);
