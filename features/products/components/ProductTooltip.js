import React from 'react';
import Product from './Product';
import {Tooltip} from "react-tippy";

const ProductTooltipHtml = ({product}) => (
	<div className={"panel-tooltip"}>
		<h2>Product details</h2>
		<Product media product={product}/>
	</div>
)

const ProductTooltip = ({product, children}) => (
	<Tooltip
		interactive
		useContext
		html={
			<ProductTooltipHtml product={product}/>
		}
		delay={300}
		position={'top'}
		size={'small'}>
		{children}
	</Tooltip>
)

export default ProductTooltip;