import React from "react";
import WeeklyStream from "./WeeklyStream";
import PropTypes from "prop-types";

class ProductStream extends React.Component {
    render() {
        return (
            <WeeklyStream
                tasksIndexUrl={`/products/${this.props.productSlug}/stream/`}
                milestonesIndexUrl={`/products/${this.props.productSlug}/stream/milestones/`}
            />
        );
    }
}

ProductStream.propTypes = {
    productSlug: PropTypes.string
};

export default ProductStream;
