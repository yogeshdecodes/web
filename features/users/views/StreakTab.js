import React, { Component } from "react";
import Emoji from "~/components/Emoji";
import RestDaySettings from "~/features/wellness/components/RestDaySettings";
import RestDayList from "~/features/wellness/components/RestDayList";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";

export default connect(mapStateToProps)(
    class StreakSettings extends Component {
        render() {
            return (
                <div>
                    <h3>
                        <Emoji emoji={"🔥️"} /> Hardcore mode
                    </h3>
                    <p>
                        For details about rest days, see the info box in "Rest
                        days taken" section below.
                    </p>

                    <div className={"panel-message info"}>
                        <div className={"message-body"}>
                            If active, your rest days won't be automatically
                            applied.
                        </div>
                    </div>

                    <RestDaySettings />

                    <hr />

                    <h3>
                        <Emoji emoji={"😸️"} /> Weekend mode (soon!)
                    </h3>

                    <p>Weekend mode blocks Makerlog for you on weekends.</p>
                    <br />

                    <hr />

                    <h3>
                        <Emoji emoji={"😴"} /> Rest days taken
                    </h3>

                    <p>Below is the history of the rest days you've taken.</p>

                    <div className={"panel-message info"}>
                        <div className={"message-body"}>
                            Rest days are vacation days that apply automatically
                            when you don't log (unless Hardcore Mode is on). You
                            earn one rest day for every 10 streak days.
                        </div>
                    </div>

                    <RestDayList />
                </div>
            );
        }
    }
);
