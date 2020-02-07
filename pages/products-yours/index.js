import React, { Component } from "react";
import ProductList from "~/features/products/components/ProductList";
import "./index.scss";
import ProductsPageLayout from "../../layouts/ProductsPage";
import Spinner from "~/components/Spinner";
import { requireAuthed } from "~/lib/auth";
import { getMyProducts } from "~/lib/products";

export default requireAuthed(
    class ProductsYoursPage extends Component {
        static async getInitialProps() {
            let layout = { className: "ProductsYoursPage" };
            let products = null;
            try {
                products = await getMyProducts();
                return {
                    layout,
                    products
                };
            } catch (e) {
                return {
                    layout,
                    statusCode: 500
                };
            }
        }

        renderProducts = () => {
            if (!this.props.products) return <div>No products found.</div>;

            return <ProductList media products={this.props.products} />;
        };

        render() {
            return (
                <ProductsPageLayout>
                    <div className={"flex col-right v-center mbGap"}>
                        <div>
                            <h2>Your products</h2>
                        </div>
                        <button className="btn btn-secondary">
                            Add product
                        </button>
                    </div>
                    <div className="LaunchStream card">
                        <div className="card-content">
                            {this.renderProducts()}
                        </div>
                    </div>
                </ProductsPageLayout>
            );
        }
    }
);
