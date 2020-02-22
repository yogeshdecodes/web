import React, { Component } from "react";
import { imageUrl } from "~/lib/utils/img";
import random from "lodash/random";
import "./index.scss";

function darken(color, amount) {
    return (
        "#" +
        color
            .replace(/^#/, "")
            .replace(/../g, color =>
                (
                    "0" +
                    Math.min(
                        255,
                        Math.max(0, parseInt(color, 16) + amount)
                    ).toString(16)
                ).substr(-2)
            )
    );
}

function getBackgroundStyle(product) {
    let { accent } = product;

    if (!accent) accent = "#00a676";

    return {
        background: `linear-gradient(120deg, ${darken(
            accent,
            -10
        )} 0%, ${darken(accent, -30)} 100%)`
    };
}

class ProductIcon extends Component {
    renderTextIcon = () => {
        const { product } = this.props;
        const gradientId = random(0, 5);

        return (
            <figure
                className={`ProductIcon text gradient-${gradientId} is-${this.props.is}`}
            >
                <div style={getBackgroundStyle(product)}>
                    {product.name.length ? product.name.charAt(0) : "P"}
                </div>
            </figure>
        );
    };

    render() {
        const { product } = this.props;
        if (!product.icon) return this.renderTextIcon();

        return (
            <figure className={`ProductIcon is-${this.props.is}`}>
                <img src={imageUrl(product.icon, this.props.is)} />
            </figure>
        );
    }
}

ProductIcon.defaultProps = {
    is: 128
};

export default ProductIcon;
