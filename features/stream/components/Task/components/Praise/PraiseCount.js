import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Emoji from "~/components/Emoji";

const PraiseCount = ({ amount, button = false }) => {
    if (button) {
        return (
            <button disabled="true" className={"btn-praise btn-gray"}>
                <span className="mr-qt">
                    <FontAwesomeIcon icon={"star"} />
                </span>
                {amount}
            </button>
        );
    } else if (!amount) return null;

    return (
        <span className={"PraiseCount has-text-grey-light"}>
            <span className="mr-qt">
                <FontAwesomeIcon icon={"star"} />
            </span>
            {amount}
        </span>
    );
};

PraiseCount.propTypes = {
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
};

export default PraiseCount;
