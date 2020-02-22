import React from "react";
import Switch from "react-switch";
import ToggleButton from "react-toggle-button";
import Emoji from "../../../components/Emoji";

const LaunchedToggle = props => (
    <ToggleButton
        value={props.launched}
        onToggle={props.onLaunchedChange}
        activeLabel="🚀"
        inactiveLabel="🚧"
    />
);

export default LaunchedToggle;
