import React from "react";
import CarbonAd from "~/vendor/CarbonAd";
import withCurrentUser from "~/features/users/containers/withCurrentUser";
import Emoji from "../Emoji";
import GoldIcon from "~/components/icons/GoldIcon";

// Disable ads for gold users.

export default withCurrentUser(props =>
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
