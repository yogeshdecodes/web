import React from "react";
import PropTypes from "prop-types";
import { Link } from "~/routes";
import ProductTooltip from "../../../ProductTooltip";
import ProductIcon from "../../../ProductIcon";

const ProductThumbnail = ({ product, ...props }) => {
    return (
        <Link route="product-page" params={{ slug: product.slug }}>
            <ProductTooltip product={product}>
                <ProductIcon product={product} {...props} />
            </ProductTooltip>
        </Link>
    );
};

ProductThumbnail.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductThumbnail;
