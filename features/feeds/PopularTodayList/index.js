import React, { Component } from "react";
import { Task } from "../../stream";
import Avatar from "../../users/components/Avatar";
import { Link } from "~/routes";
import DiscussionSection from "../../discussions/DiscussionSection";

class PopularTodayList extends Component {
    render() {
        return (
            <div className="PopularTodayList">
                <div>
                    {this.props.latestThreads.length > 0 && (
                        <div className="mbGap">
                            <div className="text-divider flex flex-gap mb-em">
                                <div>
                                    <p className="heading">Latest threads</p>
                                </div>
                                <div className="flex-grow">
                                    <hr />
                                </div>
                            </div>
                            <DiscussionSection
                                prefetchedThreads={this.props.latestThreads}
                            />
                        </div>
                    )}

                    {this.props.describedTasks.length > 0 && (
                        <div className="mbGap">
                            <div className="text-divider flex flex-gap mb-em">
                                <div>
                                    <p className="heading">Described tasks</p>
                                </div>
                                <div className="flex-grow">
                                    <hr />
                                </div>
                            </div>
                            {this.props.describedTasks.map(t => (
                                <div
                                    className={
                                        "flex flex-gap flex-v-gap mb-em mb-0-last "
                                    }
                                    key={t.id}
                                >
                                    <div>
                                        <Link
                                            route="profile-page"
                                            params={{
                                                username: t.user.username
                                            }}
                                        >
                                            <a>
                                                <Avatar user={t.user} is={32} />
                                            </a>
                                        </Link>
                                    </div>
                                    <div>
                                        <Task task={t} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {this.props.popularTasks.length > 0 && (
                        <div>
                            <div className="text-divider flex flex-gap mb-em">
                                <div>
                                    <p className="heading">Trending</p>
                                </div>
                                <div className="flex-grow">
                                    <hr />
                                </div>
                            </div>
                            {this.props.popularTasks.map(t => (
                                <div
                                    className={
                                        "flex flex-gap flex-v-gap mb-em mb-0-last "
                                    }
                                    key={t.id}
                                >
                                    <div>
                                        <Link
                                            route="profile-page"
                                            params={{
                                                username: t.user.username
                                            }}
                                        >
                                            <a>
                                                <Avatar user={t.user} is={32} />
                                            </a>
                                        </Link>
                                    </div>
                                    <div>
                                        <Task task={t} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default PopularTodayList;
