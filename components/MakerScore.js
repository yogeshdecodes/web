import React from "react";
import PropTypes from "prop-types";
import Emoji from "./Emoji";
import abbreviate from "number-abbreviate";

const MakerScore = ({ score }) => (
    <>
        <Emoji emoji={"🏆"} />
        &nbsp;{score ? abbreviate(score, 1) : 0}
    </>
);

MakerScore.propTypes = {
    score: PropTypes.number.isRequired
};

export default MakerScore;
