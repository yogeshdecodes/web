import React from "react";
import DonationButton from "./DonationButton/index";

const DonationCard = props => (
    <div className={"DonationCard"}>
        <div className={"card"}>
            <div className={"card-content"}>
                <DonationButton />
                <p className={"note"}>
                    <span className="has-text-grey">
                        Donations help keep Makerlog free and open.
                    </span>
                </p>
            </div>
        </div>
    </div>
);

DonationCard.propTypes = {};

export default DonationCard;
