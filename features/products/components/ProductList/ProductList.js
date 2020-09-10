import React from "react";
import PropTypes from "prop-types";
import Product from "../Product";
import ProductGrid from "../ProductGrid";

class ProductList extends React.Component {
    render() {
        const products = this.props.products;
        let elems = null;

        if (this.props.products.length === 0) {
            return <h3>None yet. </h3>;
        }

        if (this.props.media) {
            elems = products.map(p => (
                <Product
                    key={p.id}
                    media
                    product={p}
                    medium={this.props.medium}
                />
            ));
        }

        if (this.props.card) {
            elems = products.map(p => (
                <Product
                    key={p.id}
                    card
                    product={p}
                    onEdit={this.props.onEdit ? this.props.onEdit : undefined}
                    onDelete={
                        this.props.onDelete ? this.props.onDelete : undefined
                    }
                />
            ));
        }

        if (this.props.thumbnail) {
            elems = products.map(p => (
                <Product key={p.id} thumbnail product={p} {...this.props} />
            ));
        }

        if (this.props.grid) {
            return <ProductGrid>{elems}</ProductGrid>;
        } else if (this.props.thumbnail) {
            return <div className="ProductList grid-thumbnails">{elems}</div>;
        } else {
            return elems;
        }
    }
}

ProductList.propTypes = {
    grid: PropTypes.bool,
    media: PropTypes.bool,
    thumbnail: PropTypes.bool,
    card: PropTypes.bool
};

export default ProductList;
