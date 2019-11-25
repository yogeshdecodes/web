import React from "react";
import CarbonAd from "~/vendor/CarbonAd";
import Emoji from "../Emoji";
import GoldIcon from "~/components/icons/GoldIcon";
import { connect } from "react-redux";
import { mapStateToProps } from "~/ducks/user";

// Disable ads for gold users.

export default connect(mapStateToProps)(props =>
    props.user && props.user.gold ? (
        <div className="card">
            <div className={"card-content"}>
                <div className={"note"}>
                    No ads here! Thanks for buying Makerlog Gold. <GoldIcon />{" "}
                    <Emoji emoji={"✌️"} />
                </div>
            </div>
        </div>
    ) : (
        <CarbonAd />
    )
);
