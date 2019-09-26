import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Emoji from "../../../../../../components/Emoji";
import {
    getHostname,
    normalizeUrl
} from "../../../../../../lib/utils/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { truncate } from "lib/utils/random";

class ProductMedia extends React.Component {
    renderMedium() {
        return (
            <div
                className={"ProductMedia"}
                onClick={() => {
                    if (this.props.linked) {
                        this.props.navigate(
                            `/products/${this.props.product.slug}`
                        );
                    }
                }}
            >
                <div className={"flex"}>
                    {this.props.product.icon && (
                        <div>
                            <figure className="img-48">
                                <img src={this.props.product.icon} alt="User" />
                            </figure>
                        </div>
                    )}
                    <div>
                        <Link
                            to={`/products/${this.props.product.slug}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <strong>
                                {this.props.product.name}{" "}
                                {this.props.product.launched && (
                                    <div className={"tag"}>
                                        <Emoji emoji={"🚀"} /> Launched
                                    </div>
                                )}
                            </strong>
                        </Link>
                        <br />
                        <p>{this.props.product.description}</p>
                        <div>
                            {this.props.product.website && (
                                <a
                                    target="_blank"
                                    className={"btn-link"}
                                    rel="noopener noreferrer"
                                    href={normalizeUrl(
                                        this.props.product.website
                                    )}
                                >
                                    <FontAwesomeIcon icon={"globe"} />
                                    {getHostname(this.props.product.website)}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
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
                <div className={"ProductMedia"}>
                    <LinkComponent
                        to={`/products/${this.props.product.slug}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div className={"flex"}>
                            <div>
                                <figure className="image is-32x32 img-rounded">
                                    <img
                                        src={
                                            this.props.product.icon
                                                ? this.props.product.icon
                                                : "https://via.placeholder.com/200?text=No+icon"
                                        }
                                        alt="Product"
                                    />
                                </figure>
                            </div>
                            <div>
                                <strong>{this.props.product.name}</strong>
                                <br />
                                <small>
                                    {truncate(
                                        this.props.product.description,
                                        10,
                                        "..."
                                    )}
                                </small>
                            </div>
                        </div>
                    </LinkComponent>
                </div>
            );
        }

        return (
            <div className={"ProductMedia"}>
                <LinkComponent
                    to={`/products/${this.props.product.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <div className={"flex"}>
                        <div>
                            <figure className="img-48">
                                <img
                                    src={
                                        this.props.product.icon
                                            ? this.props.product.icon
                                            : "https://via.placeholder.com/200?text=No+icon"
                                    }
                                    alt="Product"
                                />
                            </figure>
                        </div>
                        <div>
                            <div>
                                <strong>
                                    {this.props.product.name}{" "}
                                    {this.props.product.launched && (
                                        <div className={"tag"}>
                                            <Emoji emoji={"🚀"} /> Launched
                                        </div>
                                    )}
                                </strong>
                                <br />
                                <small>
                                    {truncate(
                                        this.props.product.description,
                                        10,
                                        "..."
                                    )}
                                </small>
                            </div>
                        </div>
                    </div>
                </LinkComponent>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    navigate: route => dispatch(push(route))
});

ProductMedia.propTypes = {
    product: PropTypes.object.isRequired
};

export default connect(
    null,
    mapDispatchToProps
)(ProductMedia);
