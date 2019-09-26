import React from "react";

const ProductGrid = ({ children }) => (
    <section className={"grid-products"}>
        {React.Children.toArray(children).map(c => (
            <div className={"stretchCard"}>{c}</div>
        ))}
    </section>
);

export default ProductGrid;
