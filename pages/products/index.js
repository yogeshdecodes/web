import React from "react";
import Emoji from "~/components/Emoji";
import { getMyProducts } from "~/lib/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Product, ProductCreateModal, ProductGrid } from "~/features/products";
import Spinner from "~/components/Spinner";
import "./index.scss";
import { requireAuthed } from "../../lib/auth";

const NoProductsFound = props => (
    <div className={"card center"}>
        <div className={"card-content"}>
            <h2>You haven't created any products.</h2>
            <p className="note">
                Track your progress, unify your project logs, and showcase your
                creations all in one place.
            </p>
            <button className={"btn-add"} onClick={props.onClickCreate}>
                <Emoji emoji="✨" /> Add a product
            </button>
        </div>
    </div>
);

const CreateIconCard = props => (
    <div className="card CreateIconCard" onClick={props.onClick}>
        <div className={"card-content"}>
            <FontAwesomeIcon icon={"plus"} />
            <strong>Add a product</strong>
        </div>
    </div>
);

class MyProductsPage extends React.Component {
    state = {
        ready: false,
        products: [],
        failed: false,
        isCreateModalOpen: false,
        isEditModalOpen: false
    };

    static async getInitialProps() {
        return {
            layout: {
                className: "ProductsPage"
            }
        };
    }

    toggleCreateModal = () => {
        this.setState({
            isCreateModalOpen: !this.state.isCreateModalOpen
        });
    };

    toggleEditModal = () => {
        this.setState({
            isEditModalOpen: !this.state.isEditModalOpen
        });
    };

    fetchProducts = async () => {
        try {
            this.setState({ ready: false });
            const products = await getMyProducts();
            this.setState({ ready: true, products: products, failed: false });
        } catch (e) {
            this.setState({ ready: true, failed: true, products: [] });
        }
    };

    onCreateProduct = () => {
        this.toggleCreateModal();
        this.fetchProducts();
    };

    onEditProduct = () => {
        this.fetchProducts();
    };

    componentDidMount() {
        this.fetchProducts();
    }

    renderProducts = () => {
        if (!this.state.failed && this.state.products.length === 0) {
            return <NoProductsFound onClickCreate={this.toggleCreateModal} />;
        }

        return (
            <div className="container">
                <h1 className={"page-title"}>Your products</h1>
                <ProductGrid>
                    {this.state.products.map(product => (
                        <div>
                            <Product
                                card
                                product={product}
                                key={product.id}
                                onEdit={this.onEditProduct}
                                onDelete={this.onEditProduct}
                            />
                        </div>
                    ))}
                    <CreateIconCard onClick={this.toggleCreateModal} />
                </ProductGrid>
            </div>
        );
    };

    render() {
        if (!this.state.ready) {
            return <Spinner text="Loading products..." />;
        }

        return (
            <div>
                {this.renderProducts()}
                <ProductCreateModal
                    open={this.state.isCreateModalOpen}
                    onClose={this.toggleCreateModal}
                    onFinish={this.onCreateProduct}
                />
            </div>
        );
    }
}

export default requireAuthed(MyProductsPage);
