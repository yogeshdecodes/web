import React from "react";
import PropTypes from 'prop-types';
import ProductThumbnail from "./components/ProductThumbnail/index";
import ProductMedia from "./components/ProductMedia/index";
import ProductCard from "./components/ProductCard";
import ProductHero from "./components/ProductHero";

const Product = ({
    product,
    media,
    thumbnail,
    card,
    hero,
    linked=true,
    ...props
}) => {
    let Component = ProductMedia;

    if (media) {
        Component = ProductMedia;
    }

    if (thumbnail) {
        Component = ProductThumbnail
    }

    if (card) {
        Component = ProductCard;
    }

    if (hero) {
        Component = ProductHero;
    }

    return <Component linked={linked} product={product} {...props} />
}

Product.propTypes = {
    media: PropTypes.bool,
    thumbnail: PropTypes.bool,
    card: PropTypes.bool,
    hero: PropTypes.bool,
}

Product.defaultProps = {
    media: true,
}

export default Product;