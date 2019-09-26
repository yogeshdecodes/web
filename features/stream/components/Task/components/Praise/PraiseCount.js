import React from "react";
import PropTypes from "prop-types";
import { Button } from "vendor/bulma";
import Emoji from "components/Emoji";

const PraiseCount = ({ amount, button = false }) => {
    if (amount) {
        if (button) {
            return (
                <Button disabled className={"btn-praise btn-gray"}>
                    <Emoji emoji={"👏"} />
                    &nbsp;{amount}
                </Button>
            );
        }
        return (
            <span className={"PraiseCount has-text-grey-light"}>
                <Emoji emoji={"👏"} />
                {amount}
            </span>
        );
    } else {
        return null;
    }
};

PraiseCount.propTypes = {
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
};

export default PraiseCount;
