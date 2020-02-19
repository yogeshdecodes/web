import React from "react";

const InstallCard = props => (
    <div className={"flex flex-column flex-v-gap has-text-centered"}>
        <div>
            <h3 className="has-text-grey">
                {props.header ? (
                    props.header
                ) : (
                    <span>{props.app} is not installed yet.</span>
                )}
            </h3>
            <h3 className="has-text-grey-light">
                Click the button below to begin.
            </h3>
        </div>
        <div>{props.children}</div>
    </div>
);

export default InstallCard;
