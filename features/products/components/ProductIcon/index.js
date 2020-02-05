import React, { Component } from "react";
import { imageUrl } from "~/lib/utils/img";
import "./index.scss";

class ProductIcon extends Component {
    render() {
        const { product } = this.props;
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
