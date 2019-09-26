import React from 'react';
import Switch from 'react-switch';
import Emoji from "../../../components/Emoji";

const WeekendModeToggle = (props) => (
    <Switch
        onClick={props.onChange}
        checkedIcon={
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 15,
                    paddingRight: 2
                }}
            >
                <Emoji emoji="🧘‍♂️" />
            </div>}
        uncheckedIcon={
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 15,
                    paddingRight: 2
                }}
            >
                <Emoji emoji="🔥" />
            </div>}
        onColor="#47E0A0"
        height={30}
        width={60}
        handleDiameter={20}
        checked={props.checked}
        onChange={props.onChange}
    />
)

export default WeekendModeToggle;