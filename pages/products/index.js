import React, { Component } from "react";
import InfiniteResults from "~/components/InfiniteResults";
import ProductList from "~/features/products/components/ProductList";
import "./index.scss";
import ProductsPageLayout from "../../layouts/ProductsPage";
import { Link } from "~/routes";

export default class ProductsPage extends Component {
    static async getInitialProps() {
        let layout = { className: "ProductsPage" };
        return {
            layout: { ...layout }
        };
    }

    render() {
        return (
            <ProductsPageLayout>
                <div className={"flex col-right v-center mbGap"}>
                    <div>
                        <h2>Recent launches</h2>
                    </div>
                    <Link route="products-add">
                        <a className="btn btn-secondary">Add product</a>
                    </Link>
                </div>
                <div className="LaunchStream card">
                    <div className="card-content">
                        <InfiniteResults
                            url={"/launches/"}
                            component={({ items }) => (
                                <ProductList media medium products={items} />
                            )}
                        />
                    </div>
                </div>
            </ProductsPageLayout>
        );
    }
}
