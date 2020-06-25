import React from "react";
import PropTypes from "prop-types";
import Emoji from "./Emoji";

const RestDays = ({ days, endingSoon = false }) => (
    <>
        <Emoji emoji={"🛌"} />
        &nbsp;{days}
    </>
);

RestDays.propTypes = {
    days: PropTypes.number.isRequired
};

export default RestDays;
