import React, { Component } from "react";
import ProductSettingsPage from "../../layouts/ProductSettingsPage";
import { getProductBySlug } from "../../lib/products";

export default class ProductEditPage extends Component {
    static async getInitialProps({ query: { slug } }) {
        let layout = { className: "ProductEditPage" };
        try {
            const product = await getProductBySlug(slug);
            return {
                product,
                layout: { ...layout }
            };
        } catch (e) {
            if (e.status_code && e.status_code === 404) {
                return {
                    statusCode: 404,
                    ...layout
                };
            } else {
                return {
                    statusCode: 500,
                    ...layout
                };
            }
        }
    }

    render() {
        const { product } = this.props;
        return <ProductSettingsPage product={product}>Hi</ProductSettingsPage>;
    }
}
