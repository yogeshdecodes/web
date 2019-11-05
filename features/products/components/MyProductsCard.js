import React from "react";
import Spinner from "~/components/Spinner";
import {getMyProducts} from "~/lib/products";
import {Link} from "~/routes";
import {ProductList} from "~/features/products";
import Emoji from "~/components/Emoji";

const ProductsCardContainer = props => (
    <div className={"card"}>
        <div className={"card-content"}>
            <h3 className={"heading mt0"}>
                <Emoji emoji={"💻"} /> Your Products
            </h3>
            {props.children}
        </div>
    </div>
);

class MyProductsCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            failed: false,
            products: []
        };
    }

    getProducts = async () => {
        try {
            let products = await getMyProducts();
            this.setState({
                loading: false,
                failed: false,
                products: products
            });
        } catch (e) {
            this.setState({ loading: false, failed: true, products: [] });
        }
    };

    async componentDidMount() {
        this.getProducts();
    }

    render() {
        if (this.state.loading) {
            return (
                <ProductsCardContainer>
                    <Spinner text={"Loading products..."} small={true} />
                </ProductsCardContainer>
            );
        } else if (this.state.failed) {
            return (
                <ProductsCardContainer>
                    Failed to load your products.{" "}
                    <button className={"btn"} onClick={this.getProducts}>
                        Retry.
                    </button>
                </ProductsCardContainer>
            );
        }

        return (
            <ProductsCardContainer>
                {this.state.products.length === 0 && (
                    <div>
                        <h3>You haven't added any products yet.</h3>
                        <Link route="products">
                            <a className="btn-small btn-gray">Add a product</a>
                        </Link>
                    </div>
                )}
                {this.state.products.length > 0 && (
                    <div style={{ marginTop: 10 }}>
                        <ProductList products={this.state.products} thumbnail />
                    </div>
                )}
            </ProductsCardContainer>
        );
    }
}

MyProductsCard.propTypes = {};

export default MyProductsCard;
