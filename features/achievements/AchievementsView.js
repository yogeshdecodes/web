import React from "react";
import PropTypes from "prop-types";
import Spinner from "~/components/Spinner";
import { connect } from "react-redux";
import { getErrorCodeString, getFirstErrorString } from "~/lib/utils/error";
import { achievementsActions } from "../../ducks/achievements";
import TrophyMedia, { TrophyIcon } from "./TrophyMedia";
import orderBy from "lodash/orderBy";
import uniqBy from "lodash/uniqBy";
import StdErrorBoundary from "~/components/error/StdErrorBoundary";
import { isServer } from "../../config";

class AchievementsView extends React.Component {
    renderAchievements = () => {
        return (
            <div>
                <h4>Up next</h4>
                <div className="flex flex-v-gap flex-column">
                    {orderBy(
                        this.props.trophies,
                        ["progress", "order"],
                        ["desc", "asc"]
                    ).map(trophy => (
                        <TrophyMedia trophy={trophy} />
                    ))}
                </div>
            </div>
        );
    };

    async componentDidUpdate(prevProps) {
        if (prevProps.open === true && this.props.open === false) {
            this.props.markAllRead();
        }
    }

    render() {
        // Achievements will always mean completion
        const orderedTrophies = orderBy(
            uniqBy(
                [
                    ...this.props.achievements
                        .filter(
                            a => a && a.kind === "TROPHY" && a.data !== null
                        )
                        .map(a => a.data)
                        .map(t => {
                            return { ...t, progress: 100 };
                        }),

                    ...this.props.trophies
                ],
                "key"
            ),
            "order",
            "asc"
        );
        const completed = orderedTrophies.filter(t => t.progress === 100);
        const remaining = orderedTrophies.filter(t => t.progress !== 100);
        const upNext = remaining[0];
        return (
            <StdErrorBoundary tag="achievements-view">
                {this.props.open && <div className="quickview-overlay"></div>}
                <div
                    className={
                        this.props.open
                            ? "achievements-quickview quickview is-active"
                            : "quickview"
                    }
                >
                    <header className="notifications-header">
                        <h1 className="page-heading">Achievements</h1>
                        <span
                            className="delete"
                            onClick={this.props.closeHandler}
                        />
                    </header>

                    {(!this.props.ready || this.props.failed) && (
                        <div className="full-quickview-body flex flex-column flex-v-gap has-text-centered">
                            {this.props.failed && (
                                <>
                                    <div>
                                        <h2>Failed to load achievements</h2>
                                        <h3 className="subtitle has-text-grey">
                                            {getFirstErrorString(
                                                this.props.errorMessages
                                            )}
                                            &nbsp;
                                            {getErrorCodeString(
                                                this.props.errorMessages
                                            )}
                                        </h3>
                                    </div>
                                    <div>
                                        <button
                                            className={"btn btn-light"}
                                            onClick={
                                                this.props.fetchNotifications
                                            }
                                        >
                                            Retry
                                        </button>
                                    </div>
                                </>
                            )}

                            {!this.props.ready && (
                                <div>
                                    <Spinner small />
                                </div>
                            )}
                        </div>
                    )}

                    {this.props.ready &&
                        !this.props.failed &&
                        this.props.achievements && (
                            <div className="quickview-body">
                                <div>
                                    <div className="flex flex-column flex-v-gap">
                                        {upNext && (
                                            <>
                                                <div>
                                                    <h4>Up next</h4>
                                                </div>
                                                <TrophyMedia
                                                    withProgress
                                                    verb
                                                    trophy={upNext}
                                                />
                                            </>
                                        )}
                                        {completed.length !== 0 && (
                                            <>
                                                <div>
                                                    <h4>Your trophy case</h4>
                                                </div>
                                                <div className="grid-thumbnails auto">
                                                    {completed.map(trophy => (
                                                        <TrophyIcon
                                                            trophy={trophy}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                        {remaining.length !== 0 && (
                                            <>
                                                <div>
                                                    <h4>Remaining trophies</h4>
                                                </div>
                                                {remaining.map(trophy => (
                                                    <TrophyMedia
                                                        verb
                                                        trophy={trophy}
                                                    />
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </StdErrorBoundary>
        );
    }
}

AchievementsView.propTypes = {
    open: PropTypes.bool,
    closeHandler: PropTypes.func
};

const mapStateToProps = state => ({
    open: state.achievements.open,
    ready: state.achievements.ready,
    achievements: state.achievements.achievements,
    trophies: state.achievements.trophies,
    failed: state.achievements.failed,
    errorMessages: state.achievements.errorMessages
});

const mapDispatchToProps = dispatch => ({
    fetchNotifications: () =>
        dispatch(achievementsActions.fetchNotifications()),
    closeHandler: () => dispatch(achievementsActions.toggleView()),
    markAllRead: () => dispatch(achievementsActions.markAllRead())
});

export default connect(mapStateToProps, mapDispatchToProps)(AchievementsView);
