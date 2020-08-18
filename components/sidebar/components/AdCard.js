import React from "react";
import Ad from "~/components/Ad";
import OutboundLink from "~/components/OutboundLink";
import { Link } from "~/routes";

const AdCard = () => {
    return (
        <div className="AdCard sidebar-item">
            <h3>Indie ad</h3>
            <h4 className="subtitle has-text-grey">
                <Link route="ads">Advertise on Makerlog &raquo;</Link>
            </h4>
            <div className="card">
                <div className="card-content">
                    <Ad />
                </div>
            </div>
        </div>
    );
};

export default AdCard;
