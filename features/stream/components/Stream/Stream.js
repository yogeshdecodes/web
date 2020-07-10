import React from "react";
import PropTypes from "prop-types";
//import { CSSTransitionGroup } from "react-transition-group";
import InfiniteScroll from "react-infinite-scroll-component";
import StreamSection from "./components/StreamSection/index";
import NoActivityCard from "../NoActivityCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sortStreamByActivity } from "~/lib/utils/tasks";
import StreamFinished from "./components/StreamFinished/index";
import Spinner from "~/components/Spinner";
import { assignModelType } from "../../../../lib/utils/tasks";
import { isServer } from "../../../../config";

/**
 * Stream Component
 * @param tasks tasks to be displayed.
 * @param loadMore called on loadmore click or scroll.
 * @param isSyncing boolean indicating loading status.
 * @param hasMore boolean indicating if there is data to be loaded on server.
 */

class Stream extends React.Component {
    render() {
        let data = this.props.tasks;

        data = assignModelType({
            tasks: this.props.tasks ? this.props.tasks : [],
            milestones: this.props.milestones ? this.props.milestones : []
        });

        data = sortStreamByActivity(
            data,
            this.props.user ? this.props.user.timezone : null
        );

        if (
            Object.keys(data).length === 0 &&
            !this.props.hasMore &&
            !this.props.isSyncing
        ) {
            return this.props.noActivityComponent;
        }

        return (
            <InfiniteScroll
                dataLength={data.length}
                next={this.props.loadMore}
                hasMore={this.props.hasMore}
                style={{ overflow: "none" }}
                key={isServer}
            >
                <div className="card">
                    <div className="card-content">
                        {Object.keys(data).map(date => {
                            return (
                                <StreamSection
                                    key={date.toString()}
                                    position={Object.keys(data).indexOf(date)}
                                    canSwitchType={this.props.canSwitchType}
                                    isFollowingFeed={this.props.isFollowingFeed}
                                    onSwitch={this.props.onSwitch}
                                    date={date}
                                    activityData={data[date]}
                                />
                            );
                        })}

                        {this.props.hasMore && (
                            <div className={"center"}>
                                <button
                                    className={
                                        "btn btn-light" +
                                        (this.props.isSyncing
                                            ? " is-loading"
                                            : "")
                                    }
                                    onClick={this.props.loadMore}
                                >
                                    <FontAwesomeIcon
                                        icon={"arrow-circle-down"}
                                    />{" "}
                                    Load more tasks...
                                </button>
                            </div>
                        )}
                        {!this.props.hasMore && this.props.isSyncing && (
                            <Spinner text="Loading the makerness..." />
                        )}
                        {!this.props.hasMore && !this.props.isSyncing && (
                            <StreamFinished />
                        )}
                    </div>
                </div>
            </InfiniteScroll>
        );
    }
}

Stream.propTypes = {
    tasks: PropTypes.array.isRequired,
    milestones: PropTypes.array,
    loadMore: PropTypes.func.isRequired,
    isSyncing: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired
};

Stream.defaultProps = {
    noActivityComponent: <NoActivityCard />,
    canSwitchType: false,
    isFollowingFeed: false,
    onSwitch: null
};

export default Stream;
