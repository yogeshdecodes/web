import React from "react";
import { Tooltip } from "react-tippy";
import { getRelatedData } from "~/lib/projects";
import Spinner from "./Spinner";
import { ProductMedia } from "~/features/products/components/Product/components/ProductMedia/ProductMedia";

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
            <div
                style={{
                    width: 300,
                    fontSize: 16,
                    textAlign: "left",
                    background: "#363636",
                    borderRadius: 5,
                    padding: "1rem"
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
            </div>
        );
    }
}

const ProjectLink = props => {
    const tag = <span className={"brand-underline"}>{props.children}</span>;

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
