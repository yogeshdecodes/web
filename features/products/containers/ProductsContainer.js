import React from 'react';
import PropTypes from 'prop-types';
import Spinner from "components/Spinner";
import {getMyProducts, getProducts, getRecentlyLaunched} from "../../../lib/products";

class ProductsContainer extends React.Component {
    state = {
        loading: true,
        data: null,
        failed: false,
    }

    async fetchProducts() {
        this.setState({ loading: true, failed: false, })
        let data = null;
        try {
            if (this.props.all) {
                data = await getProducts();
            } else if (this.props.user) {
                data = await getProducts(this.props.user);
            } else if (this.props.recentlyLaunched) {
                data = await getRecentlyLaunched();
                if (data) {
                    data = data.filter(product => product.launched_at !== null)
                }
            } else if (this.props.me) {
                // always last!
                data = await getMyProducts();
            }

            this.setState({ data: data, loading: false, failed: false, })
        } catch (e) {
            this.setState({ data: null, loading: false, failed: true, })
        }
    }

    componentDidMount() {
        this.fetchProducts();
    }

    onEditProduct = () => {
        this.fetchProducts();
    }

    render() {
        const Component = this.props.component;

        if (this.state.loading) {
            return <Spinner small={true} />;
        }

		if (this.state.failed && this.state.loading === false) {
            return <h3 className={"has-text-centered"}>Failed to load products. <button onClick={() => this.fetchProducts()}>Try again &raquo;</button></h3>
		} else if (!this.state.loading && !this.state.failed) {
			// You can optionally pass these to child products (onEdit and onDelete) if you want functionality like this in your view. Works with cards.
			// ProductList picks this up automatically.
			return <Component products={this.state.data} onEdit={this.onEditProduct} onDelete={this.onEditProduct}/>
		}
	}
}

ProductsContainer.propTypes = {
    user: PropTypes.number,
    me: PropTypes.bool,
    all: PropTypes.bool,
}

ProductsContainer.defaultProps = {
    me: true,
}

export default ProductsContainer;