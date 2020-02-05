import React from "react";
import { getProductBySlug, getProductPeople } from "~/lib/products";
import { Product } from "~/features/products";
import { ProductStream } from "~/features/stream";
import "./index.scss";
import Head from "next/head";
import ProductPageLayout from "~/layouts/ProductPage";

class ProductPage extends React.Component {
    static async getInitialProps({ query: { slug } }) {
        let layout = { className: "ProductPage" };
        try {
            const product = await getProductBySlug(slug);
            const people = await getProductPeople(slug);
            return {
                product,
                people,
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
        const { product, people } = this.props;

        return (
            <ProductPageLayout product={product} people={people}>
                <ProductStream productSlug={product.slug} />
            </ProductPageLayout>
        );
    }
}

ProductPage.propTypes = {};

export default ProductPage;
