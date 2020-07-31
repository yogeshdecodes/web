import React, { Component } from "react";
import LaunchedToggle from "~/features/products/components/LaunchedToggle";
import Dropzone from "react-dropzone";
import ProductIcon from "~/features/products/components/ProductIcon";
import { handleChange } from "~/lib/utils/random";
import { actions as projectsActions } from "~/ducks/projects";
import TeamSelector from "../TeamSelector";
import { connect } from "react-redux";
import { formatHandle, loadingClass } from "../../../../lib/utils/random";
import { createProduct } from "~/lib/products";
import isFunction from "lodash/isFunction";
import { Router } from "~/routes";
import Spinner from "~/components/Spinner";
import { getOrCreateProject } from "~/lib/utils/projects";
import { renderHelpOrError, StdErrorCollection, ValidationError } from "../../../../lib/utils/error";
import StdErrorMessages from "~/components/forms/StdErrorMessages";

class ProductCreateForm extends Component {
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
        tagText: "",
        productHunt: "",
        twitter: "",
        accent: "#00a676",
        errorMessages: null,
        tagsTooLong: false
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({ tagsTooLong: true });
        }, 2000);
    }

    setUrl = (key, url) => {
        this.setState({
            [key]: url
        });
    };

    setHandle = (key, handle) => {
        this.setState({
            [key]: formatHandle(handle)
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
            if (this.state.tagText === "") {
                throw new ValidationError(
                    "Hashtag can't be empty.",
                    "projects"
                );
            }
            const tags = await this.handleTagCreation();
            // returns product instance
            const product = await createProduct(
                this.state.name,
                this.state.description,
                tags,
                this.state.productHunt,
                this.state.twitter,
                this.state.url,
                this.state.launched,
                this.state.logo,
                this.state.team,
                this.state.accent
            );

            this.setState({ finished: true });

            Router.pushRoute(`/products/${product.slug}`);

            if (isFunction(this.props.onFinish)) {
                this.props.onFinish();
            }
        } catch (e) {
            this.setState({
                isCreating: false,
                errorMessages: new StdErrorCollection(e)
            });
        }
    };

    handleTagCreation = async () =>
        await getOrCreateProject(this.state.tagText, this.props);

    onAddTeamMember = team => {
        this.setState({
            team
        });
    };

    onHashtagChange = newState => {
        this.setState({
            selectedProjects: newState
        });
    };

    handleChange = e => handleChange(e, this);

    render() {
        return (
            <div>
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
                        {renderHelpOrError(
                            null,
                            "name",
                            this.state.errorMessages
                        )}
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
                        {renderHelpOrError(
                            "Make it short and sweet, like a pitch!",
                            "description",
                            this.state.errorMessages
                        )}
                    </div>
                    <div className="control">
                        <label>Hashtag</label>
                        {!this.props.projectsReady ? (
                            <>
                                <Spinner
                                    small
                                    text={
                                        this.state.tagsTooLong ? (
                                            <>
                                                Taking too long?{" "}
                                                <a
                                                    onClick={
                                                        this.props.fetchProjects
                                                    }
                                                >
                                                    Retry
                                                </a>
                                            </>
                                        ) : (
                                            "Loading tags..."
                                        )
                                    }
                                />
                            </>
                        ) : (
                            <input
                                onChange={this.handleChange}
                                type="text"
                                name="tagText"
                                placeholder="#makerlog"
                                value={this.state.tagText}
                            ></input>
                        )}
                        {renderHelpOrError(
                            " Makerlog works by logging tasks with #hashtags and adding the tasks to your product log.",
                            "projects",
                            this.state.errorMessages
                        )}
                    </div>
                    <div className="control">
                        <label>Website (optional)</label>
                        <input
                            name="url"
                            value={this.state.url}
                            onChange={e => this.setUrl("url", e.target.value)}
                            type="text"
                            placeholder="getmakerlog.com"
                        />
                        {renderHelpOrError(
                            null,
                            "url",
                            this.state.errorMessages
                        )}
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
                        {renderHelpOrError(
                            null,
                            "twitter",
                            this.state.errorMessages
                        )}
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
                            Add your team (optional)
                            <p className="help">
                                Add your team usernames and combine your logs!
                            </p>
                        </label>
                        <TeamSelector onChange={this.onAddTeamMember} />
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
                    {this.state.finished && (
                        <>
                            <div className="alert is-success">
                                <div className="alert-body">
                                    Saved. Taking you to the product...
                                </div>
                            </div>{" "}
                            <br />
                        </>
                    )}
                    <StdErrorMessages error={this.state.errorMessages} />
                    <button
                        onClick={e => {
                            e.preventDefault();
                            this.onSubmit();
                        }}
                        className={loadingClass(
                            "btn btn-secondary",
                            this.state.isCreating
                        )}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    projectsReady: state.projects.ready,
    userProjects: state.projects.projects
});

const mapDispatchToProps = dispatch => ({
    pushProject: project =>
        dispatch(projectsActions.fetchProjectsSuccess([project])),

    fetchProjects: project => dispatch(projectsActions.fetchProjects([project]))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreateForm);
