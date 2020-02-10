import React from "react";
import Ad from "~/components/Ad";
import OutboundLink from "~/components/OutboundLink";

export default () => {
    return (
        <div className="AdCard sidebar-item">
            <h3>Indie ad</h3>
            <h4 className="subtitle has-text-grey">
                <OutboundLink to="https://makerlog.io/intravert">
                    Put your product here!
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
