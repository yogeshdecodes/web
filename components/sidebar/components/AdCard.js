import React from "react";
import Ad from "~/components/Ad";

export default () => {
    return (
        <div className="AdCard sidebar-item">
            <h3>Indie ad</h3>
            <h4 className="subtitle has-text-grey">
                <a>Put your product here!</a>
            </h4>
            <div className="card">
                <div className="card-content">
                    <Ad />
                </div>
            </div>
        </div>
    );
};
