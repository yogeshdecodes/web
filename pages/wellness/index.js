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
                <div className={"has-text-centered"}>
                    <h3 className={"has-text-white"}>
                        You have a <Emoji emoji={"🔥"} /> {props.user.streak}{" "}
                        day streak.
                    </h3>
                    <h4 className={"has-text-white"}>
                        Remember to take breaks! Streaks should keep you
                        productive, not burn you out.
                    </h4>
                </div>

                <div className={"streak-content"}>
                    <div className={"columns"}>
                        <div className={"column is-6 is-offset-3"}>
                            <div className="card">
                                <div className={"card-content"}>
                                    <h3>
                                        <Emoji emoji={"🔥️"} /> Hardcore mode
                                    </h3>
                                    <h4>
                                        Hardcore mode means rest days won't be
                                        automatically applied if you forget to
                                        post or take a break. Rest days are
                                        vacation days you can spend! You earn
                                        one day for every 10 streak days.
                                    </h4>

                                    <RestDaySettings />

                                    <hr />

                                    <h3>
                                        <Emoji emoji={"😸️"} /> Weekend mode
                                    </h3>
                                    <h4>
                                        Weekend mode allows you to take breaks
                                        on weekends. They won't count in your
                                        streak, but they won't break it either!
                                    </h4>

                                    <WeekendModeSettings />

                                    <hr />

                                    <h3>
                                        <Emoji emoji={"🥰"} /> Rest days taken
                                    </h3>
                                    <h4>Here's a history of your breaks.</h4>

                                    <RestDayList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
);
