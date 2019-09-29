import "./index.scss";

import {
    addProductToEvent,
    getEventsForProduct,
    getEventsForUser,
    removeProductFromEvent
} from "../../../../lib/events";
import { deleteProduct, editProduct, leaveProduct } from "~/lib/products";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneralTab from "./components/GeneralTab";
import { Link } from "~/routes";
import Modal from "~/components/Modal";
import React from "react";
import SidebarLink from "~/components/SidebarLink";
import Spinner from "~/components/Spinner";
import TeamSelector from "../TeamSelector";
import { createProject } from "../../../../lib/projects";
import { getProjects } from "~/lib/projects";
import { hasEnded } from "../../../../lib/utils/events";
import isFunction from "lodash/isFunction";
import withCurrentUser from "~/features/users/containers/withCurrentUser";

class EventsTab extends React.Component {
    state = {
        eventUpdating: null,
        loading: false,
        joinable: [],
        joined: [],
        failed: false
    };

    componentDidMount() {
        this.fetchEvents();
    }

    fetchEvents = async () => {
        this.setState({ loading: true, failed: false });
        try {
            // get joinable events
            let joinable = await getEventsForUser(this.props.product.user);
            // get joined events
            const joined = await getEventsForProduct(this.props.product.slug);
            // filter joinable
            joinable = joinable.filter(event => !hasEnded(event));
            joinable = joinable.filter(
                event => !joined.find(e => event.slug === e.slug)
            );
            this.setState({
                loading: false,
                failed: false,
                joinable,
                joined
            });
        } catch (e) {
            this.setState({
                loading: false,
                failed: true
            });
        }
    };

    joinEvent = async event => {
        this.setState({ eventUpdating: event.slug });
        try {
            await addProductToEvent(event.slug, this.props.product.slug);
            this.setState({
                joinable: this.state.joinable.filter(
                    e => e.slug !== event.slug
                ),
                joined: [...this.state.joined, event]
            });

            this.setState({ eventUpdating: null });
        } catch (e) {
            this.setState({ eventUpdating: null });
        }
    };

    leaveEvent = async event => {
        this.setState({ eventUpdating: event.slug });
        try {
            await removeProductFromEvent(event.slug, this.props.product.slug);
            this.setState({
                joined: this.state.joined.filter(e => e.slug !== event.slug),
                joinable: [...this.state.joinable, event]
            });

            this.setState({ eventUpdating: null });
        } catch (e) {
            this.setState({ eventUpdating: null });
        }
    };

    renderEventsJoined = () => {
        const { joined, eventUpdating } = this.state;
        if (joined.length === 0) return null;

        return (
            <div>
                <h3 className="title is-5">Events this product is in</h3>
                {joined.map(event => (
                    <div className="level">
                        <div className="level-left">
                            {this.renderEvent(event)}
                        </div>
                        <div className="level-right">
                            <button
                                onClick={e => this.leaveEvent(event)}
                                className={
                                    "button is-danger is-rounded" +
                                    (eventUpdating === event.slug
                                        ? " is-loading"
                                        : "")
                                }
                            >
                                Remove product
                            </button>
                        </div>
                    </div>
                ))}
                <hr />
            </div>
        );
    };

    renderEvent = event => {
        return (
            <div className="media">
                <div className="media-left">
                    <figure className="image is-square is-32x32">
                        <img src={event.icon} />
                    </figure>
                </div>
                <div className="media-content">
                    <h3 className="title is-6">{event.title}</h3>
                    <h3 className="subtitle is-7">{event.description}</h3>
                </div>
            </div>
        );
    };

    renderEventsJoinable = () => {
        const { joinable, eventUpdating } = this.state;
        if (joinable.length === 0)
            return (
                <div>
                    No events to add this product to.{" "}
                    <Link to="/events">All events &raquo;</Link>
                </div>
            );

        return (
            <div>
                <h3 className="title is-5">Events available</h3>
                {joinable.map(event => (
                    <div className="level">
                        <div className="level-left">
                            {this.renderEvent(event)}
                        </div>
                        <div className="level-right">
                            <button
                                onClick={e => this.joinEvent(event)}
                                className={
                                    "button is-primary is-rounded" +
                                    (eventUpdating === event.slug
                                        ? " is-loading"
                                        : "")
                                }
                            >
                                Add product
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    render() {
        const { loading, joinable, joined, failed } = this.state;
        const { isOwner } = this.props;

        if (!isOwner)
            return (
                <div>
                    <strong>
                        Only the owner of this product can enroll it in an
                        event.
                    </strong>{" "}
                    <br /> Your entry will count as one entry for the whole
                    team.
                </div>
            );

        if (loading) return <Spinner small text="Loading events..." />;
        if (failed)
            return (
                <button onClick={this.fetchEvents}>
                    Failed to load. Click to retry.
                </button>
            );
        return (
            <div>
                {this.renderEventsJoined()}
                {this.renderEventsJoinable()}
            </div>
        );
    }
}

// Three required props:
// productSlug={props.productSlug} onDelete={props.onDelete} onFinish={props.onFinish}

const TeamTab = props => (
    <TeamSelector
        product={props.product}
        team={props.team}
        onChange={props.onChange}
    />
);

class HashtagCreator extends React.Component {
    state = {
        loading: false,
        value: "",
        failed: false
    };

    onSubmit = async e => {
        this.setState({ loading: true });
        try {
            const project = await createProject(this.state.value);
            this.setState({
                loading: false,
                value: "",
                failed: false
            });

            if (this.props.onCreate) {
                this.props.onCreate(project);
            }
        } catch (e) {
            this.setState({
                loading: false,
                failed: true
            });
        }
    };

    render = () => (
        <div className="field">
            <p
                className={
                    "control has-icons-left" +
                    (this.state.loading ? " is-loading" : "")
                }
            >
                <input
                    onKeyPress={e => {
                        if (e.key === "Enter") this.onSubmit(e);
                    }}
                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                    className={"input"}
                    placeholder="new_hashtag"
                />
                <span className="icon is-small is-left">#</span>
            </p>
        </div>
    );
}

/*
 * return an array onChange with picked project IDs.
 * remove all project IDs not in user.
 * allow creation of hashtags
 * do a nice onboarding if there's no hashtags.
 * */

class HashtagPicker extends React.Component {
    state = {
        loading: true,
        projects: null,
        selectedProjects: this.props.initialSelected
            ? this.props.initialSelected
            : [],
        otherProjectsToInject: [],
        failed: false
    };

    componentDidMount() {
        this.loadProjects();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedProjects !== this.state.selectedProjects) {
            if (this.props.onChange) {
                this.props.onChange([
                    ...this.state.selectedProjects,
                    ...this.state.otherProjectsToInject
                ]);
            }
        }
    }

    loadProjects = async () => {
        this.setState({
            loading: true
        });
        try {
            const projects = await getProjects();
            this.setState({
                loading: false,
                failed: false,
                projects,
                otherProjectsToInject: this.props.initialSelected
                    ? this.props.initialSelected.filter(
                          e => !projects.map(p => p.id).includes(e)
                      )
                    : []
            });
        } catch (e) {
            this.setState({
                failed: true,
                loading: false
            });
        }
    };

    onCreateTag = project => {
        this.setState({
            projects: [...this.state.projects, project],
            selectedProjects: [...this.state.selectedProjects, project.id]
        });
    };

    unselect = project => {
        this.setState({
            selectedProjects: this.state.selectedProjects.filter(
                p => p !== project.id
            )
        });
    };

    select = e => {
        let value = Array.from(e.target.selectedOptions, option =>
            parseInt(option.value)
        );
        this.setState({ selectedProjects: value });
    };

    renderUserTags = () => {
        return (
            <div className={"grid-2c"}>
                <div>
                    <HashtagCreator onCreate={this.onCreateTag} />
                    <div
                        className="select is-multiple"
                        style={{ width: "100%" }}
                    >
                        <select
                            size={5}
                            style={{ width: "100%" }}
                            value={this.state.selectedProjects}
                            onChange={this.select}
                            multiple
                        >
                            {this.state.projects.map(project => (
                                <option value={project.id}>
                                    #{project.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <div className="field is-grouped is-grouped-multiline">
                        {this.state.selectedProjects.map(pid => {
                            const project = this.state.projects.find(
                                project => project.id === parseInt(pid)
                            );
                            if (project) {
                                return (
                                    <div className="control">
                                        <div className="tags has-addons">
                                            <span className="tag">
                                                #{project.name}
                                            </span>
                                            <button
                                                onClick={e =>
                                                    this.unselect(project)
                                                }
                                                className="tag is-delete"
                                            />
                                        </div>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        if (this.state.loading) return <Spinner />;
        if (this.state.failed)
            return (
                <button className={"btn-link"} onClick={this.loadProjects}>
                    Failed. Click to retry.
                </button>
            );

        return (
            <>
                <span className={"label"}>Your tags</span>
                {this.renderUserTags()}
                <hr />
                <span className={"label"}>Team tags</span>
                <div className={"tags"}>
                    Your team has added{" "}
                    {this.state.otherProjectsToInject.length} tags.
                </div>
            </>
        );
    }
}

const HashtagsTab = props => (
    <>
        <HashtagPicker
            initialSelected={props.projects.map(p => p.id)}
            onChange={props.onHashtagPicked}
        />
    </>
);

class ProductEditForm extends React.Component {
    state = {
        activeTab: 1,
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
        team: []
    };

    componentDidMount() {
        // Load initial values
        this.setState({
            ...this.props.product,
            icon: null,
            iconPreview: this.props.product.icon
        });
    }

    switchTab = activeTab => {
        this.setState({
            activeTab
        });
    };

    hasChanged = () => {
        // disable button unless changes happen
        return true;
    };

    onChange = (k, e) => {
        let newState = {};
        newState[k] = e.target.value;
        this.setState(newState);
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

    onIconUpload = (file, preview) => {
        this.setState({
            icon: file,
            iconPreview: preview
        });
    };

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

    isOwner = () => this.props.me.id === this.state.user;

    onDelete = async () => {
        try {
            if (this.isOwner()) {
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

    renderMenu = () => (
        <>
            <SidebarLink
                active={this.state.activeTab === 1}
                onClick={() => this.switchTab(1)}
            >
                <span className={"menu-icon"}>
                    {this.state.iconPreview ? (
                        <figure className="image is-24x24 img-rounded">
                            <img
                                src={this.state.iconPreview}
                                alt={this.state.name}
                            />
                        </figure>
                    ) : (
                        <FontAwesomeIcon icon={"ship"} />
                    )}
                </span>
                <span>
                    <span>General</span>
                </span>
            </SidebarLink>
            <SidebarLink
                active={this.state.activeTab === 2}
                onClick={() => this.switchTab(2)}
            >
                <span className={"menu-icon"}>
                    <FontAwesomeIcon icon={"tasks"} />
                </span>
                <span>Hashtags</span>
            </SidebarLink>
            <SidebarLink
                active={this.state.activeTab === 3}
                onClick={() => this.switchTab(3)}
            >
                <span className={"menu-icon"}>
                    <FontAwesomeIcon icon={"users"} />
                </span>
                <span>Team</span>
            </SidebarLink>
            <SidebarLink
                active={this.state.activeTab === 4}
                onClick={() => this.switchTab(4)}
            >
                <span className={"menu-icon"}>
                    <FontAwesomeIcon icon={"check-circle"} />
                </span>
                <span>Events</span>
            </SidebarLink>
        </>
    );

    render() {
        return (
            <div className={"ProductEditForm grid-modal"}>
                <div className={"SidebarMenu"}>
                    <div>{this.renderMenu()}</div>
                    <div className={"bottom-button"}>
                        <button
                            loading={this.state.updating}
                            onClick={this.onSubmit}
                            className={"btn rounded"}
                        >
                            <FontAwesomeIcon icon={"check-circle"} />
                            <span>Save changes</span>
                        </button>
                        <button className={"btn-link"} onClick={this.onDelete}>
                            <FontAwesomeIcon icon={"trash"} />
                            {this.isOwner() ? (
                                <span>Delete product</span>
                            ) : (
                                <span>Leave product</span>
                            )}
                        </button>
                    </div>
                </div>
                <div className={"ModalForm"}>
                    {this.state.errorMessages && (
                        <div className={"panel-message danger"}>
                            {this.renderErrorMessages()}
                        </div>
                    )}

                    {this.state.activeTab === 1 && (
                        <GeneralTab
                            name={this.state.name}
                            onNameChange={e => this.onChange("name", e)}
                            description={this.state.description}
                            onDescriptionChange={e =>
                                this.onChange("description", e)
                            }
                            launched={this.state.launched}
                            onLaunch={() =>
                                this.setState({
                                    launched: !this.state.launched
                                })
                            }
                            onIconUpload={this.onIconUpload}
                            website={this.state.website}
                            onWebsiteChange={e =>
                                this.setUrl("website", e.target.value)
                            }
                            productHunt={this.state.product_hunt}
                            onProductHuntChange={e =>
                                this.setUrl("product_hunt", e.target.value)
                            }
                            twitter={this.state.twitter}
                            onTwitterChange={e => this.onChange("twitter", e)}
                        />
                    )}
                    {this.state.activeTab === 2 && (
                        <HashtagsTab
                            projects={this.state.projects}
                            onHashtagPicked={selectedProjects =>
                                this.setState({ selectedProjects })
                            }
                        />
                    )}
                    {this.state.activeTab === 3 && (
                        <TeamTab
                            product={this.props.product}
                            team={this.state.team}
                            onChange={team => this.setState({ team })}
                        />
                    )}
                    {this.state.activeTab === 4 && (
                        <EventsTab
                            isOwner={this.isOwner()}
                            product={this.props.product}
                        />
                    )}
                </div>
            </div>
        );
    }
}

ProductEditForm = withCurrentUser(ProductEditForm);

const ProductEditModal = props => (
    <Modal
        open={props.open}
        onClose={props.onClose}
        background={"transparent"}
        flexDirection={"column"}
        percentWidth={55}
        style={{
            width: "100%"
        }}
        modalStyles={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
        className="ProductEditModal"
    >
        <Modal.Content verticallyCentered={true}>
            <ProductEditForm
                onDelete={props.onDelete}
                onFinish={props.onFinish}
                product={props.product}
            />
        </Modal.Content>
    </Modal>
);

export default ProductEditModal;
