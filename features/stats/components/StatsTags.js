import React from "react";
import Sadness from "../../../components/Sadness/index";
import Tda from "../../../components/Tda";
import Streak from "../../../components/Streak";

const StatsTags = props => (
    <div>
        {!props.user.streak || !props.user.week_tda ? <Sadness /> : null}
        <div className={"tag"}>
            <Streak days={props.user.streak} />
        </div>
        <div className={"tag"}>
            <Tda tda={props.user.week_tda} />
        </div>
    </div>
);

export default StatsTags;
