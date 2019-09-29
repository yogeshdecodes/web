import React from "react";
import ClimbingBoxLoader from "~/vendor/ClimbingBoxLoader";
import PropTypes from "prop-types";
import styled from "styled-components";

const SmallSpinner = styled.div`
    div {
        border: 1.5px solid ${props => props.color};
        border-color: ${props => props.color} transparent transparent
            transparent;
    }
`;

const Spinner = ({ color = "#2F2F2F", small = false, text = null }) => {
    if (small) {
        return (
            <div className={"center"}>
                <SmallSpinner className={"spinner"} color={color}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </SmallSpinner>
            </div>
        );
    } else {
        return (
            <div className={"center"}>
                <ClimbingBoxLoader color={color} />
                <p style={{ color: color }}>{text}</p>
            </div>
        );
    }
};

Spinner.propTypes = {
    color: PropTypes.string,
    small: PropTypes.bool
};

export default Spinner;
