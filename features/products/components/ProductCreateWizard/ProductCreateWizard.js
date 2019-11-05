import {Step, Steps, Wizard} from "react-albus";

import Dropzone from "react-dropzone";
import Emoji from "../../../../components/Emoji";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LaunchedToggle from "../LaunchedToggle";
import {Product} from "~/features/products";
import {ProjectPicker} from "~/features/projects";
import React from "react";
import TeamSelector from "../TeamSelector";
import {createProduct} from "~/lib/products";
import isFunction from "lodash/isFunction";

const CreateProductStep1 = props => (
    <div>
        <h3>
            <Emoji emoji="✏️ " /> The basics
        </h3>
        <div className={"form-row"}>
            <h4>What's this product called?</h4>
            <input
                type={"text"}
                value={props.name}
                onChange={props.onNameChange}
            />
        </div>
        <div className={"form-row"}>
            <h4>What does it do?</h4>
            <textarea
                value={props.description}
                onChange={props.onDescriptionChange}
            />
        </div>
        <div className={"form-row"}>
            <h4>Launched yet?</h4>
            <LaunchedToggle
                launched={props.launched}
                onLaunchedChange={props.onLaunchedChange}
            />
        </div>
        <hr />
        <div className={"flex col-right"}>
            <div />
            <button
                className={"btn"}
                disabled={
                    props.description.length === 0 || props.name.length === 0
                }
                onClick={props.next}
            >
                <FontAwesomeIcon icon={"arrow-circle-right"} /> Next
            </button>
        </div>
    </div>
);

const CreateProductStep4 = props => (
    <div>
        <h3>
            <Emoji emoji="👩🏼‍💻" /> Extra details
        </h3>
        <div className={"form-row"}>
            <h4>Website?</h4>
            <input
                type={"url"}
                placeholder="getmakerlog.com"
                value={props.url}
                onChange={props.onUrlChange}
            />
        </div>
        <div className={"form-row"}>
            <h4>Product Hunt URL?</h4>
            <input
                type={"url"}
                placeholder="producthunt.com/posts/makerlog"
                value={props.productHunt}
                onChange={props.onproductHuntChange}
            />
        </div>
        <div className={"form-row"}>
            <h4>Product Twitter handle?</h4>
            <input
                placeholder="getmakerlog"
                value={props.twitter}
                onChange={props.onTwitterChange}
            />
        </div>

        {props.errorMessages && (
            <div className={"panel-message danger"}>
                {props.errorMessagesRender()}
            </div>
        )}

        <hr />
        <div className={"flex col-right"}>
            <div>
                <button className={"btn"} onClick={props.previous}>
                    <FontAwesomeIcon icon={"arrow-circle-left"} /> Previous
                </button>
            </div>
            <div>
                <button
                    className={"btn"}
                    onClick={props.onSubmit}
                    loading={props.loading}
                >
                    <FontAwesomeIcon icon={"check"} /> Finish
                </button>
            </div>
        </div>
    </div>
);

const CreateProductStep3 = props => (
    <div>
        <h3>
            <Emoji emoji="🧐" /> Which hashtags do we track?
        </h3>
        <ProjectPicker onProjectSelect={props.onProjectSelect} />
        <hr />
        <div className={"flex col-right"}>
            <div>
                <button className={"btn"} onClick={props.previous}>
                    <FontAwesomeIcon icon={"arrow-circle-left"} /> Previous
                </button>
            </div>
            <div>
                <button
                    className={"btn"}
                    disabled={
                        props.selectedProjects &&
                        props.selectedProjects.length === 0
                    }
                    onClick={props.next}
                >
                    <FontAwesomeIcon icon={"arrow-circle-right"} /> Next
                </button>
            </div>
        </div>
    </div>
);

const CreateProductAddTeam = props => (
    <div>
        <h3>
            <Emoji emoji="🚢" /> Add your team (optional)
        </h3>
        <div style={{ margin: 30, textAlign: "center" }}>
            <TeamSelector team={props.team} onChange={props.onAddTeamMember} />
        </div>
        <hr />
        <div className={"flex col-right"}>
            <div>
                <button className={"btn"} onClick={props.previous}>
                    <FontAwesomeIcon icon={"arrow-circle-left"} /> Previous
                </button>
            </div>
            <div>
                <button
                    className={"btn"}
                    disabled={
                        props.selectedProjects &&
                        props.selectedProjects.length === 0
                    }
                    onClick={props.next}
                >
                    <FontAwesomeIcon icon={"arrow-circle-right"} /> Next
                </button>
            </div>
        </div>
    </div>
);

const CreateProductStep2 = props => (
    <div>
        <h3>
            <Emoji emoji="✨" /> Pick an icon (optional)
        </h3>
        <div className={"has-text-centered"}>
            <Dropzone
                maxSize={2 * 1024 * 1024}
                className={"dropzone"}
                accept="image/*"
                multiple={false}
                onDrop={props.onLogoUpload}
            >
                <h4>
                    {props.logoPreviewUrl ? (
                        <span>
                            Yay! <Emoji emoji="✨" />
                        </span>
                    ) : (
                        <span>Drop an icon here</span>
                    )}
                </h4>
            </Dropzone>
        </div>
        {props.logoPreviewUrl && (
            <div style={{ padding: 20 }}>
                <Product
                    media
                    linked={false}
                    product={{
                        id: 8,
                        name: props.name,
                        slug: "makerlog",
                        user: 1,
                        product_hunt: "producthunt.com/posts/makerlog-2-0",
                        twitter: "getmakerlog",
                        website: "https://getmakerlog.com",
                        projects: [],
                        launched: props.launched,
                        icon: props.logoPreviewUrl,
                        description: props.description,
                        created_at: "2018-08-25T07:34:45.992312+08:00",
                        launched_at: "2018-08-25T07:34:45.987730+08:00"
                    }}
                />
            </div>
        )}
        <hr />
        <div className={"flex col-right"}>
            <div>
                <button className={"btn"} onClick={props.previous}>
                    <FontAwesomeIcon icon={"arrow-circle-left"} /> Previous
                </button>
            </div>
            <div>
                <button className={"btn"} onClick={props.next} primary>
                    <FontAwesomeIcon icon={"arrow-circle-right"} /> Next
                </button>
            </div>
        </div>
    </div>
);

class ProductCreateWizard extends React.Component {
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

    renderErrorMessages = () => {
        let messages = [];
        let errors = this.state.errorMessages;
        if (typeof errors === "object") {
            for (let key in errors) {
                messages.push(
                    <p>
                        <strong>{key.replace(/[_-]/g, " ")}</strong>:{" "}
                        {errors[key]}
                    </p>
                );
            }
        } else if (errors.constructor === Array) {
            errors.map(err => {
                messages.push(<p>{err}</p>);

                return true;
            });
        } else {
            messages = this.state.errorMessages;
        }

        return messages;
    };

    render() {
        return (
            <div className="CreateProductForm">
                <Wizard>
                    <Steps>
                        <Step
                            id="firstStep"
                            render={({ next }) => (
                                <CreateProductStep1
                                    next={next}
                                    name={this.state.name}
                                    onNameChange={e =>
                                        this.setState({ name: e.target.value })
                                    }
                                    description={this.state.description}
                                    onDescriptionChange={e =>
                                        this.setState({
                                            description: e.target.value
                                        })
                                    }
                                    launched={this.state.launched}
                                    onLaunchedChange={e =>
                                        this.setState({
                                            launched: !this.state.launched
                                        })
                                    }
                                />
                            )}
                        />
                        <Step
                            id="secondStep"
                            render={({ previous, next }) => (
                                <CreateProductStep2
                                    previous={previous}
                                    next={next}
                                    logoPreviewUrl={this.state.logoPreviewUrl}
                                    logo={this.state.logo}
                                    onLogoUpload={this.onLogoUpload}
                                    launched={this.state.launched}
                                    name={this.state.name}
                                    description={this.state.description}
                                />
                            )}
                        />
                        <Step
                            id="thirdStep"
                            render={({ next, previous }) => (
                                <CreateProductStep3
                                    selectedProjects={
                                        this.state.selectedProjects
                                    }
                                    previous={previous}
                                    next={next}
                                    onProjectSelect={projects =>
                                        this.setState({
                                            selectedProjects: projects
                                        })
                                    }
                                />
                            )}
                        />
                        <Step
                            id="teamStep"
                            render={({ next, previous }) => (
                                <CreateProductAddTeam
                                    team={this.state.team}
                                    onAddTeamMember={this.onAddTeamMember}
                                    previous={previous}
                                    next={next}
                                />
                            )}
                        />
                        <Step
                            id="fourthStep"
                            render={({ previous }) => (
                                <CreateProductStep4
                                    loading={this.state.isCreating}
                                    previous={previous}
                                    twitter={this.state.twitter}
                                    productHunt={this.state.productHunt}
                                    url={this.state.url}
                                    onTwitterChange={e =>
                                        this.setState({
                                            twitter: e.target.value
                                        })
                                    }
                                    onproductHuntChange={e =>
                                        this.setUrl(
                                            "productHunt",
                                            e.target.value
                                        )
                                    }
                                    onUrlChange={e =>
                                        this.setUrl("url", e.target.value)
                                    }
                                    onSubmit={this.onSubmit}
                                    errorMessages={this.state.errorMessages}
                                    errorMessagesRender={
                                        this.renderErrorMessages
                                    }
                                />
                            )}
                        />
                    </Steps>
                </Wizard>
            </div>
        );
    }
}

ProductCreateWizard.propTypes = {};

// TODO: componentize projectpicker

export default ProductCreateWizard;
