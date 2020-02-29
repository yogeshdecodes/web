import React from "react";
import { getHostname, normalizeUrl } from "../../../../../../lib/utils/products";
import isFunction from "lodash/isFunction";
import ProductEditModal from "../../../ProductEditModal";
import { Link } from "~/routes";
import { mapStateToProps } from "~/ducks/user";
import { connect } from "react-redux";
import Emoji from "../../../../../../components/Emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductPeople from "../../../ProductPeople";

class ProductCard extends React.Component {
    state = {
        isEditModalOpen: false
    };

    toggleEditModal = () =>
        this.setState({ isEditModalOpen: !this.state.isEditModalOpen });

    onFinishEditing = () => {
        this.toggleEditModal();

        if (isFunction(this.props.onEdit)) {
            this.props.onEdit();
        }
    };

    isMyProduct = () => {
        // Is logged in user in the team or is they the owner?
        return (
            this.props.me.id === this.props.product.user ||
            this.props.product.team.find(i => this.props.me.id === i)
        );
    };

    onDelete = () => {
        this.toggleEditModal();

        if (isFunction(this.props.onDelete)) {
            this.props.onDelete();
        }
    };

    render() {
        const product = this.props.product;

        return (
            <div className={"card ProductCard"}>
                <div className={"card-content"}>
                    {product.icon && (
                        <div>
                            <Link
                                route="product-page"
                                params={{ slug: product.slug }}
                            >
                                <img src={product.icon} alt={product.name} />
                            </Link>
                        </div>
                    )}
                    <div className={"flex col-right"}>
                        <div>
                            <Link
                                route="product-page"
                                params={{ slug: product.slug }}
                            >
                                <a>
                                    <h2>
                                        {product.name}
                                        {product.launched && (
                                            <span>
                                                <Emoji emoji={"🚀"} /> Launched
                                            </span>
                                        )}
                                    </h2>
                                    {product.description}
                                </a>
                            </Link>
                        </div>
                        {this.isMyProduct() && (
                            <div>
                                <button
                                    className={"btn"}
                                    onClick={this.toggleEditModal}
                                >
                                    <FontAwesomeIcon icon={"pencil-alt"} />
                                    <span>Edit</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <footer>
                    <div>
                        {product.website && (
                            <a
                                href={normalizeUrl(product.website)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={"gray-link-with-icon"}
                            >
                                <FontAwesomeIcon icon={"globe"} />
                                {getHostname(product.website)}
                            </a>
                        )}
                        {!product.website && (
                            <span className={"note"}>
                                <strong>{product.projects.length}</strong>{" "}
                                hashtags
                            </span>
                        )}
                    </div>
                    <div>
                        <ProductPeople slug={product.slug} size={32} />
                    </div>
                </footer>
                {this.isMyProduct() && (
                    <ProductEditModal
                        open={this.state.isEditModalOpen}
                        onClose={this.toggleEditModal}
                        product={product}
                        onDelete={this.onDelete}
                        onFinish={this.onFinishEditing}
                    />
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(ProductCard);
