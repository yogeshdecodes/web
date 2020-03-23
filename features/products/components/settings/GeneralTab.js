import React, { Component } from "react";
import {
    formatUrl,
    handleChange,
    formatHandle
} from "../../../../lib/utils/random";
import isFunction from "lodash/isFunction";
import {
    deleteProduct,
    editProduct,
    leaveProduct
} from "../../../../lib/products";
import ErrorMessageList from "~/components/forms/ErrorMessageList";
import LaunchedToggle from "~/features/products/components/LaunchedToggle";
import Dropzone from "react-dropzone";
import ProductIcon from "~/features/products/components/ProductIcon";
import HashtagPicker from "~/features/projects/components/HashtagPicker";
import { loadingClass } from "~/lib/utils/random";

export default class GeneralTab extends Component {
    state = {
        success: false,
        updating: false,
        name: "",
        description: "",
        launched: false,
        icon: null,
        logoPreviewUrl: null, // use iconpreview rather than icon!
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
            logoPreviewUrl: this.props.product.icon,
            selectedProjects: this.props.product.projects
        });
    }

    setUrl = (key, url) => {
        this.setState({
            [key]: formatUrl(url)
        });
    };

    onLogoUpload = (acceptedFiles, rejectedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = e => {
            this.setState({
                logoPreviewUrl: reader.result
            });

            this.setState({
                icon: file
            });
        };
    };

    setHandle = (key, handle) => {
        this.setState({
            [key]: formatHandle(handle)
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
                this.state.selectedProjects.map(p => p.id),
                this.state.product_hunt,
                this.state.twitter,
                this.state.website,
                this.state.launched,
                this.state.icon,
                this.state.team, // if array of users,
                this.state.accent
            );

            this.setState({
                updating: false,
                success: true,
                errorMessages: null
            });

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

    onHashtagChange = newState => {
        console.log(newState);
        this.setState({
            selectedProjects: newState
        });
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
                <form>
                    <div className="control">
                        <label>Name</label>
                        <input
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name}
                            type="text"
                            placeholder="Makerlog"
                        />
                    </div>
                    <div className="control">
                        <label>Description</label>
                        <input
                            name="description"
                            onChange={this.handleChange}
                            value={this.state.description}
                            type="text"
                            placeholder="The maker community."
                        />
                        <p className="help">
                            Make it short and sweet, like a pitch!
                        </p>
                    </div>
                    <div className="control">
                        <label>Website (optional)</label>
                        <input
                            name="url"
                            value={this.state.website}
                            onChange={e =>
                                this.setUrl("website", e.target.value)
                            }
                            type="text"
                            placeholder="getmakerlog.com"
                        />
                    </div>
                    <div className="control">
                        <label>Twitter (optional)</label>
                        <input
                            name="twitter"
                            value={this.state.twitter}
                            onChange={e =>
                                this.setHandle("twitter", e.target.value)
                            }
                            type="text"
                            placeholder="getmakerlog"
                        />
                    </div>
                    <div className="control">
                        <label>Launched yet?</label>
                        <LaunchedToggle
                            launched={this.state.launched}
                            onLaunchedChange={e =>
                                this.setState({
                                    launched: !this.state.launched
                                })
                            }
                        />
                    </div>
                    <div className="control">
                        <label>Product icon (optional)</label>
                        <div className="flex flex-gap">
                            <div>
                                {this.state.logoPreviewUrl ? (
                                    <ProductIcon
                                        is={48}
                                        product={{
                                            ...this.state,
                                            icon: this.state.logoPreviewUrl
                                        }}
                                    />
                                ) : (
                                    <ProductIcon is={48} product={this.state} />
                                )}
                            </div>
                            <div>
                                <Dropzone
                                    maxSize={2 * 1024 * 1024}
                                    className={"dropzone product-icon"}
                                    accept="image/*"
                                    multiple={false}
                                    onDrop={this.onLogoUpload}
                                >
                                    <span>
                                        Click to select or drop an icon here
                                    </span>
                                </Dropzone>
                            </div>
                        </div>
                    </div>
                    <div className="control">
                        <label>
                            Tracked hashtags
                            <p className="help">
                                Makerlog works by logging tasks with #hashtags
                                and adding the tasks to your product log.
                            </p>
                        </label>
                        <HashtagPicker
                            projects={this.state.selectedProjects}
                            onChange={this.onHashtagChange}
                        />
                    </div>
                    <div className="control">
                        <label>Accent color (optional)</label>
                        <p className="help mb-5">
                            Add a little flair to your product!
                        </p>
                        <input
                            onChange={this.handleChange}
                            type="color"
                            name="accent"
                            value={this.state.accent}
                        ></input>
                    </div>
                    <hr />
                    {this.state.success && (
                        <>
                            <div className="alert is-success">
                                <div className="alert-body">Saved.</div>
                            </div>{" "}
                            <br />
                        </>
                    )}
                    <button
                        onClick={e => {
                            e.preventDefault();
                            this.onSubmit();
                        }}
                        className={loadingClass(
                            "btn btn-secondary",
                            this.state.updating
                        )}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
