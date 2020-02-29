import React from "react";
import PropTypes from "prop-types";
import Emoji from "~/components/Emoji";

const PraiseCount = ({ amount, button = false }) => {
    if (button) {
        return (
            <button disabled="true" className={"btn-praise btn-gray"}>
                <Emoji emoji={"👏"} />
                &nbsp;{amount}
            </button>
        );
    } else if (!amount) return null;

    return (
        <span className={"PraiseCount has-text-grey-light"}>
            <Emoji emoji={"👏"} />
            {amount}
        </span>
    );
};

PraiseCount.propTypes = {
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
};

export default PraiseCount;
