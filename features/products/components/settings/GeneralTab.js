import React, { Component } from "react";
import { formatUrl, handleChange } from "../../../../lib/utils/random";
import isFunction from "lodash/isFunction";
import {
    editProduct,
    deleteProduct,
    leaveProduct
} from "../../../../lib/products";
import ErrorMessageList from "~/components/ErrorMessageList";

export default class GeneralTab extends Component {
    state = {
        updating: false,
        name: "",
        description: "",
        launched: false,
        icon: null,
        iconPreview: null, // use iconpreview rather than icon!
        selectedProjects: [],
        productHunt: "",
        twitter: "",
        errorMessages: null,
        team: [],
        accent: "#00a676"
    };

    componentDidMount() {
        // Load initial values
        this.setState({
            ...this.props.product,
            icon: null,
            iconPreview: this.props.product.icon
        });
    }

    setUrl = (key, url) => {
        this.setState({
            [key]: formatUrl(url)
        });
    };

    onIconUpload = (file, preview) => {
        this.setState({
            icon: file,
            iconPreview: preview
        });
    };

    handleChange = e => handleChange(e, this);

    onSubmit = async () => {
        try {
            this.setState({ updating: true });
            const product = await editProduct(
                this.state.slug,
                this.state.name,
                this.state.description,
                this.state.selectedProjects,
                this.state.product_hunt,
                this.state.twitter,
                this.state.website,
                this.state.launched,
                this.state.icon,
                this.state.team // if array of users
            );

            this.setState({ updating: false, errorMessages: null });

            if (isFunction(this.props.onFinish)) {
                this.props.onFinish(product);
            }
        } catch (e) {
            this.setState({
                updating: false,
                errorMessages: e.field_errors || e.message
            });
        }
    };

    onDelete = async () => {
        try {
            if (this.props.isOwner) {
                await deleteProduct(this.props.product.slug);
            } else {
                await leaveProduct(this.props.product.slug);
            }

            if (isFunction(this.props.onDelete)) {
                this.props.onDelete();
            }
        } catch (e) {
            this.setState({
                loading: false,
                errorMessages: e.field_errors || e.message
            });
        }
    };

    render() {
        const { isOwner, isTeammate, product } = this.props;

        return (
            <div>
                <ErrorMessageList fieldErrors={this.state.errorMessages} />
            </div>
        );
    }
}
