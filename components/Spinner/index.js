import React from "react";
import ClimbingBoxLoader from "~/vendor/ClimbingBoxLoader";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ClassicSpinner } from "react-spinners-kit";
import "./index.scss";

const Spinner = ({
    color = "#2F2F2F",
    small = false,
    text = null,
    size = 15
}) => {
    if (small) {
        if (text)
            return (
                <span className="Spinner with-text">
                    <span>
                        <ClassicSpinner
                            size={parseInt(size ? size : "15")}
                            color={color ? color : "gray"}
                        />
                    </span>
                    <span style={color ? { color: color } : {}}>{text}</span>
                </span>
            );
        return (
            <ClassicSpinner
                color={color ? color : "gray"}
                size={parseInt(size ? size : "50")}
            />
        );
    } else {
        return (
            <div className={"flex flex-column v-center"}>
                <ClimbingBoxLoader color={color} />
                <p style={{ color: color, fontWeight: "bold" }}>{text}</p>
            </div>
        );
    }
};

Spinner.propTypes = {
    color: PropTypes.string,
    small: PropTypes.bool
};

export default Spinner;
