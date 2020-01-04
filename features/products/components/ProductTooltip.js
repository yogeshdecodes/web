import React from "react";
import { Tooltip } from "react-tippy";
import ProductMedia from "./Product/components/ProductMedia";

const ProductTooltipHtml = ({ product }) => (
    <div className={"panel-tooltip"}>
        <ProductMedia product={product} />
    </div>
);

const ProductTooltip = ({ product, children }) => (
    <Tooltip
        interactive
        useContext
        html={<ProductTooltipHtml product={product} />}
        delay={300}
        position={"top"}
        size={"small"}
    >
        {children}
    </Tooltip>
);

export default ProductTooltip;
