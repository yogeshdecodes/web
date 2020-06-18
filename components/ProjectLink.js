import React from "react";
import { Tooltip } from "react-tippy";
import { getRelatedData } from "~/lib/projects";
import Spinner from "./Spinner";
import styled from "styled-components";
import { ProductMedia } from "~/features/products/components/Product/components/ProductMedia/ProductMedia";

export const UnderlinedText = styled.span`
    display: inline-block;
    line-height: 20px;
    color: inherit;
    border-bottom: 2px solid #2ce28a;
    margin-right: 3px;
`;

const LinkedProductsDiv = styled.div`
    background: #363636;
    border-radius: 5px;
    padding: 1rem !important;
`;

class ProjectRelated extends React.Component {
    state = {
        productsReady: false,
        products: null,
        failed: false
    };

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        try {
            const relations = await getRelatedData(this.props.project.id);
            this.setState({
                productsReady: true,
                products: relations.products,
                failed: false
            });
        } catch (e) {
            this.setState({
                failed: true,
                productsReady: false,
                products: null
            });
        }
    };

    render() {
        const project = this.props.project;

        if (!project) {
            return <h3 className={"heading"}>No project provided.</h3>;
        }

        return (
            <LinkedProductsDiv
                style={{
                    width: 300,
                    padding: 10,
                    fontSize: 16,
                    textAlign: "left"
                }}
            >
                <h3 className={"heading has-text-white"}>Linked products</h3>
                {!this.state.productsReady && <Spinner small color={"white"} />}
                {this.state.productsReady &&
                    this.state.products &&
                    this.state.products.length > 0 &&
                    this.state.products.map(product => (
                        <ProductMedia product={product} />
                    ))}
                {this.state.products && this.state.products.length === 0 && (
                    <span>No products linked.</span>
                )}
            </LinkedProductsDiv>
        );
    }
}

const ProjectLink = props => {
    const tag = <UnderlinedText>{props.children}</UnderlinedText>;

    if (!props.project) {
        return tag;
    }

    return (
        <Tooltip
            interactive
            useContext
            html={<ProjectRelated project={props.project} />}
            animateFill={false}
            delay={200}
            position={"top"}
            size={"small"}
        >
            {tag}
        </Tooltip>
    );
};

export default ProjectLink;
