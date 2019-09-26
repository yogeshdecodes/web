import React from "react";
import PropTypes from "prop-types";
import Emoji from "./Emoji";

const Streak = ({ days, endingSoon = false }) => (
    <>
        <Emoji emoji={"🔥"} /> {days}
        {endingSoon ? <Emoji emoji="⌛" /> : null}
    </>
);

Streak.propTypes = {
    days: PropTypes.number.isRequired,
    endingSoon: PropTypes.bool
};

export default Streak;
