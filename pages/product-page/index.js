import React from "react";
import { getProductBySlug } from "~/lib/products";
import { Product } from "~/features/products";
import { ProductStream } from "~/features/stream";
import "./index.scss";
import Head from "next/head";

class ProductPage extends React.Component {
    static async getInitialProps({ query: { slug } }) {
        let layout = { className: "ProductPage" };
        try {
            const product = await getProductBySlug(slug);
            return {
                product,
                ...layout
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

        return (
            <div>
                <Head
                    title={`${product.name} | Makerlog`}
                    description={`${product.name} is built on Makerlog, the world's most supportive community of makers shipping together.`}
                    ogImage={product.icon || null}
                />

                <Product hero product={product} />
                <div className={"container"}>
                    <ProductStream productSlug={product.slug} />
                </div>
            </div>
        );
    }
}

ProductPage.propTypes = {};

export default ProductPage;
