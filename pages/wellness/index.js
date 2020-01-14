import React from "react";
import "./index.scss";
import Emoji from "~/components/Emoji";
import WeekendModeSettings from "~/features/wellness/components/WeekendModeSettings";
import RestDaySettings from "~/features/wellness/components/RestDaySettings";
import Spinner from "~/components/Spinner";
import RestDayList from "~/features/wellness/components/RestDayList";
import { connect } from "react-redux";
import { requireAuthed } from "~/lib/auth";
import { mapStateToProps } from "~/ducks/user";

export default connect(mapStateToProps)(
    requireAuthed(props => {
        if (!props.user) return <Spinner />;
        return (
            <div className={"StreakPage grid"}>
                <div className={"container narrow"}>
                    <div className={"has-text-centered"}>
                        <h1>
                            You have a <Emoji emoji={"🔥"} /> {props.user.streak}{" "}
                            day streak.
                        </h1>
                        <h3>
                            Remember to take breaks.<br/>Stay productive, not burnout!
                        </h3>
                    </div>

                    <div className={"streak-content"}>
                        <div className="card">
                            <div className={"card-content"}>
                                <h3>
                                    <Emoji emoji={"🔥️"} /> Hardcore mode
                                </h3>
                                <p>
                                    For details about rest days, see the info box in "Rest days taken" section below.
                                </p>

                                <div className={"panel-message info"}>
                                    <div className={"message-body"}>
                                        If active, your rest days won't be
                                        automatically applied.
                                    </div>
                                </div>

                                <RestDaySettings />

                                <hr />

                                <h3>
                                    <Emoji emoji={"😸️"} /> Weekend mode
                                </h3>
                                <p>
                                    Weekend mode allows you to take breaks on
                                    weekends. They won't count in your streak,
                                    but they won't break it either!
                                </p>

                                <div className={"panel-message danger"}>
                                    <div className={"message-body"}>
                                        Note that weekend mode works
                                        retroactively, so ALL past weekends in
                                        your current streak will be subtracted.
                                    </div>
                                </div>

                                <WeekendModeSettings />

                                <hr />

                                <h3>
                                    <Emoji emoji={"😴"} /> Rest days taken
                                </h3>

                                <p>Below is the history of the rest days you've taken.</p>

                                <div className={"panel-message info"}>
                                    <div className={"message-body"}>
                                        Rest days are vacation days that apply
                                        automatically when you don't log (unless
                                        Hardcore Mode is on). You earn one rest
                                        day for every 10 streak days.
                                    </div>
                                </div>

                                <RestDayList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
);
