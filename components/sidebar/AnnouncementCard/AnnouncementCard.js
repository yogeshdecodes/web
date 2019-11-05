import React from "react";

export default props => (
    <div className={"card AnnouncementCard"}>
        <div className={"card-content"}>
            <h3>{props.title}</h3>
            {props.children}
        </div>
    </div>
);
