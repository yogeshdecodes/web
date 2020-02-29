import React from "react";
import ClimbingBoxLoader from "~/vendor/ClimbingBoxLoader";
import PropTypes from "prop-types";
import { ClassicSpinner } from "react-spinners-kit";
import "./index.scss";

const Spinner = ({ color = null, small = false, text = null, size = 15 }) => {
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
            <center>
                <ClassicSpinner
                    color={color ? color : "gray"}
                    size={parseInt(size ? size : "50")}
                />
            </center>
        );
    } else {
        return (
            <div className={"flex flex-column v-center"}>
                <ClimbingBoxLoader color={color ? color : "#2F2F2F"} />
                <p
                    style={{
                        color: color ? color : "#2F2F2F",
                        fontWeight: "bold"
                    }}
                >
                    {text}
                </p>
            </div>
        );
    }
};

Spinner.propTypes = {
    color: PropTypes.string,
    small: PropTypes.bool
};

export default Spinner;
