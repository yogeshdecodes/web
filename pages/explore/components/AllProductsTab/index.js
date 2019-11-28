import React from "react";
import LoggedOutMessage from "~/components/LoggedOutMessage";
import ProductsContainer from "~/features/products/containers/ProductsContainer";
import { ProductList } from "~features/products";
import InfiniteResults from "~/components/InfiniteResults";
import "./index.scss";

const LaunchedProductsList = props => <ProductList grid card {...props} />;

class AllProductsTab extends React.Component {
    render() {
        return (
            <div className="AllProductsTab">
                <div className={"container"}>
                    <h2 className={"mtGap"}>Recently launched</h2>
                    <ProductsContainer
                        recentlyLaunched
                        component={LaunchedProductsList}
                    />

                    <LoggedOutMessage />
                    <br />
                    <h2>All products</h2>
                    <div className={"card"}>
                        <div className={"card-content"}>
                            <InfiniteResults
                                url={"/products/"}
                                component={({ items }) => (
                                    <ProductList
                                        media
                                        medium
                                        products={items}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AllProductsTab.propTypes = {};

export default AllProductsTab;
