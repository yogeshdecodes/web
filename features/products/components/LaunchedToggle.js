import React from "react";
import ToggleButton from "react-toggle-button";

const LaunchedToggle = props => (
    <ToggleButton
        value={props.launched}
        onToggle={props.onLaunchedChange}
        activeLabel="🚀"
        inactiveLabel="🚧"
    />
);

export default LaunchedToggle;
