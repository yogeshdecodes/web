import React from "react";
import { Link } from "~/routes";
import { truncate } from "~/lib/utils/random";
import ProductIcon from "~/features/products/components/ProductIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import { connect } from "react-redux";

export class ProductMedia extends React.Component {
    isCurrentUser = () => {
        // TODO: Add team support
        return (
            (this.props.product &&
                this.props.product.user === this.props.me.id) ||
            this.props.product.team.includes(this.props.me.id)
        );
    };

    renderMedium() {
        return (
            <Link
                route="product-page"
                params={{ slug: this.props.product.slug }}
            >
                <a className="a-unstyled ProductMedia">
                    <div>
                        <div className={"flex"}>
                            <ProductIcon is={48} product={this.props.product} />
                            <div className="flex-grow">
                                <strong>{this.props.product.name} </strong>
                                <p>
                                    {truncate(
                                        this.props.product.description,
                                        14,
                                        "..."
                                    )}
                                </p>
                            </div>
                            {this.isCurrentUser() && (
                                <div>
                                    <Link
                                        route="product-edit"
                                        params={{
                                            slug: this.props.product.slug
                                        }}
                                    >
                                        <a className="unstyled">
                                            <FontAwesomeIcon icon="edit" />
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </a>
            </Link>
        );
    }

    render() {
        if (this.props.medium) {
            return this.renderMedium();
        }

        let LinkComponent = Link;

        if (!this.props.linked) {
            LinkComponent = props => <div>{props.children}</div>;
        }

        if (this.props.xs) {
            return (
                <Link
                    route="product-page"
                    params={{ slug: this.props.product.slug }}
                >
                    <a className="a-unstyled ProductMedia">
                        <div>
                            <div className={"flex"}>
                                <ProductIcon
                                    is={32}
                                    product={this.props.product}
                                />
                                <div className="flex-grow">
                                    <strong>{this.props.product.name} </strong>
                                    <p>
                                        {truncate(
                                            this.props.product.description,
                                            14,
                                            "..."
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>
            );
        }

        return (
            <Link
                route="product-page"
                params={{ slug: this.props.product.slug }}
            >
                <a className="a-unstyled ProductMedia">
                    <div>
                        <div className={"flex"}>
                            <ProductIcon is={48} product={this.props.product} />
                            <div
                                className="flex flex-column"
                                style={{ justifyContent: "center" }}
                            >
                                <strong>{this.props.product.name} </strong>
                                {this.props.product.description ? (
                                    <>
                                        <p>
                                            {truncate(
                                                this.props.product.description,
                                                14,
                                                "..."
                                            )}
                                        </p>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        );
    }
}

export default connect(mapUserToProps)(ProductMedia);
