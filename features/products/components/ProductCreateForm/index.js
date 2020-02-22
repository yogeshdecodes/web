import React, { Component } from "react";
import LaunchedToggle from "~/features/products/components/LaunchedToggle";
import Dropzone from "react-dropzone";
import ProductIcon from "~/features/products/components/ProductIcon";

export default class ProductCreateForm extends Component {
    state = {
        isCreating: false,
        finished: false,
        name: "",
        description: "",
        launched: false,
        logo: null,
        logoPreviewUrl: null,
        selectedProjects: [],
        url: "",
        team: [],
        productHunt: "",
        twitter: "",
        errorMessages: null
    };

    setUrl = (key, url) => {
        let newUrl = url;

        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            newUrl = `https://${url}`;
        }
        this.setState({
            [key]: newUrl
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
        };

        this.setState({
            logo: file
        });
    };

    onSubmit = async () => {
        try {
            this.setState({ isCreating: true });
            // returns product instance
            await createProduct(
                this.state.name,
                this.state.description,
                this.state.selectedProjects,
                this.state.productHunt,
                this.state.twitter,
                this.state.url,
                this.state.launched,
                this.state.logo,
                this.state.team
            );

            if (isFunction(this.props.onFinish)) {
                this.props.onFinish();
            }
        } catch (e) {
            this.setState({
                isCreating: false,
                errorMessages: e.field_errors || e.message
            });
        }
    };

    onAddTeamMember = team => {
        this.setState({
            team
        });
    };

    render() {
        return (
            <div>
                <form>
                    <div className="control">
                        <label>Name</label>
                        <input type="text" placeholder="Makerlog" />
                    </div>
                    <div className="control">
                        <label>Description</label>
                        <input type="text" placeholder="The maker community." />
                        <p className="help">
                            Make it short and sweet, like a pitch!
                        </p>
                    </div>
                    <div className="control">
                        <label>Website (optional)</label>
                        <input type="text" placeholder="getmakerlog.com" />
                    </div>
                    <div className="control">
                        <label>Twitter (optional)</label>
                        <input type="text" placeholder="getmakerlog" />
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
                        <div className="input-control flex flex-gap">
                            <div>
                                <input type="text" placeholder="#makerlog" />
                            </div>
                            <div>
                                <button className="btn-light">Add</button>
                            </div>
                        </div>
                        <div className="hashtag-list flex flex-gap">
                            <div className="tag">#test</div>
                        </div>
                    </div>
                    <div className="control">
                        <label>
                            Add your team (optional)
                            <p className="help">
                                Add your team usernames and combine your logs!
                            </p>
                        </label>
                        <div className="input-control flex flex-gap">
                            <div>
                                <input
                                    type="text"
                                    placeholder="makerlog_username"
                                />
                            </div>
                            <div>
                                <button className="btn-light">Add</button>
                            </div>
                        </div>
                        <div className="hashtag-list flex flex-gap">
                            <div className="tag">@sergio</div>
                        </div>
                    </div>
                    <hr />
                    <button className="btn btn-secondary">Submit</button>
                </form>
            </div>
        );
    }
}
