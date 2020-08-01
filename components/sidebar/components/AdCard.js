import React from "react";
import Ad from "~/components/Ad";
import OutboundLink from "~/components/OutboundLink";

const AdCard = () => {
    return (
        <div className="AdCard sidebar-item">
            <h3>Indie ad</h3>
            <h4 className="subtitle has-text-grey">
                <OutboundLink to="https://makerlog.io/intravert">
                    Advertise on Makerlog &raquo;
                </OutboundLink>
            </h4>
            <div className="card">
                <div className="card-content">
                    <Ad />
                </div>
            </div>
        </div>
    );
};


export default AdCard