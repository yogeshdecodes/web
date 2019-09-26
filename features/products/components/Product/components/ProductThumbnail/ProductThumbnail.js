import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import ProductTooltip from "../../../ProductTooltip";

class ProductThumbnail extends React.Component {
	render() {
		return (
			<Link to={`/products/${this.props.product.slug}`}>
				<ProductTooltip product={this.props.product}>
					<img className={"img-48"} src={this.props.product.icon ? this.props.product.icon : "https://via.placeholder.com/200?text=No+icon"} alt="Thumbnail"/>
				</ProductTooltip>
			</Link>
		)
	}
}

ProductThumbnail.propTypes = {
	product: PropTypes.object.isRequired,
}

export default ProductThumbnail;