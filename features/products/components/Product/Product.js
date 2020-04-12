import React from "react";
import PropTypes from "prop-types";
import ProductThumbnail from "./components/ProductThumbnail/index";
import ProductMedia from "./components/ProductMedia/index";

const Product = ({
    product,
    media,
    thumbnail,
    hero,
    card = false,
    linked = true,
    ...props
}) => {
    let Component = ProductMedia;

    if (media || card) {
        Component = ProductMedia;
    }

    if (thumbnail) {
        Component = ProductThumbnail;
    }

    if (hero) {
        Component = null;
    }

    return <Component linked={linked} product={product} {...props} />;
};

Product.propTypes = {
    media: PropTypes.bool,
    thumbnail: PropTypes.bool,
    hero: PropTypes.bool
};

Product.defaultProps = {
    media: true
};

export default Product;
