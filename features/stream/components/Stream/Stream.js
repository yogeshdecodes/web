import React from "react";
import PropTypes from "prop-types";
import { Button } from "~/vendor/bulma";
//import { CSSTransitionGroup } from "react-transition-group";
import InfiniteScroll from "react-infinite-scroll-component";
import StreamSection from "./components/StreamSection/index";
import NoActivityCard from "../NoActivityCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sortStreamByActivity } from "~/lib/utils/tasks";
import StreamFinished from "./components/StreamFinished/index";
import Spinner from "~/components/Spinner";
import { assignModelType } from "../../../../lib/utils/tasks";
import shortid from "shortid";

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

        let lastDate = null;

        return (
            <InfiniteScroll
                next={this.props.loadMore}
                hasMore={this.props.hasMore}
                style={{ overflow: "none" }}
            >
                <div className="card">
                    <div className="card-content">
                        {Object.keys(data).map(date => {
                            return (
                                <StreamSection
                                    key={shortid.generate()}
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
                                <Button
                                    loading={this.props.isSyncing}
                                    className={"btn-loading"}
                                    onClick={this.props.loadMore}
                                >
                                    <FontAwesomeIcon
                                        icon={"arrow-circle-down"}
                                    />{" "}
                                    Load more tasks...
                                </Button>
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
