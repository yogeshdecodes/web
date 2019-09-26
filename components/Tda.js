import React from "react";
import PropTypes from "prop-types";
import Emoji from "components/Emoji";

const Tda = ({ tda }) => (
    <>
        <Emoji emoji={"🏁"} /> {tda ? tda : 0}
    </>
);

Tda.propTypes = {
    tda: PropTypes.number.isRequired
};

export default Tda;
