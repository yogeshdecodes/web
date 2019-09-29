import React from "react";
import Switch from "react-switch";
import Emoji from "../../../components/Emoji";

const LaunchedToggle = props => (
    <Switch
        onClick={props.onLaunchedChange}
        checkedIcon={
            <div className={"launchToggle"}>
                <Emoji emoji="🚀" />
            </div>
        }
        uncheckedIcon={
            <div className={"launchToggle"}>
                <Emoji emoji="🕒" />
            </div>
        }
        onColor="#47e0a0"
        height={30}
        width={60}
        handleDiameter={20}
        checked={props.launched}
        onChange={props.onLaunchedChange}
    />
);

export default LaunchedToggle;
