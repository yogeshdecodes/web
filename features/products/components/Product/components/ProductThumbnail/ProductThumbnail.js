import React from "react";
import PropTypes from "prop-types";
import { Link } from "~/routes";
import ProductTooltip from "../../../ProductTooltip";

const ProductThumbnail = ({ product }) => {
    return (
        <Link route="product-page" params={{ slug: product.slug }}>
            <ProductTooltip product={product}>
                <img
                    className={"img-48"}
                    src={
                        product.icon
                            ? product.icon
                            : "https://via.placeholder.com/200?text=No+icon"
                    }
                    alt="Thumbnail"
                />
            </ProductTooltip>
        </Link>
    );
};

ProductThumbnail.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductThumbnail;
