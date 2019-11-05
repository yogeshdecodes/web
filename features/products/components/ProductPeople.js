import React from "react";
import {FaceStack} from "~/features/users";
import {getProductPeople} from "~/lib/products";

class ProductPeople extends React.Component {
    state = {
        isLoading: true,
        users: null,
        failed: false
    };

    componentDidMount() {
        this.getProductPeople();
    }

    getProductPeople = async () => {
        try {
            const people = await getProductPeople(this.props.slug);
            this.setState({
                isLoading: false,
                users: people,
                failed: false
            });
        } catch (e) {
            this.setState({ isLoading: false, failed: true });
        }
    };

    render() {
        if (this.state.isLoading) {
            return null;
        } else if (this.state.failed) {
            return (
                <React.Fragment>
                    Failed to load.{" "}
                    <button onClick={this.getProductPeople}>Retry</button>
                </React.Fragment>
            );
        }

        return (
            <FaceStack
                is={this.props.size}
                users={this.state.users}
                limit={this.props.maxFaces}
            />
        );
    }
}

ProductPeople.defaultProps = {
    maxFaces: 5,
    size: null
};

export default ProductPeople;
