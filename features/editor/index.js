import React, { Component } from "react";
import Modal from "~/components/Modal";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskQueue from "~/features/tasks/components/TaskQueue";
import "./index.scss";
import GoldIcon from "~/components/icons/GoldIcon";

import { Line } from "rc-progress";
import { Router } from "~/routes";
import Emoji from "~/components/Emoji";
import GoldCtaButton from "~/components/GoldCtaButton";
import Spinner from "~/components/Spinner";
import { ThreadTypeSelect } from "~/features/discussions/ThreadTypeSelect";
import { createMilestone } from "~/lib/milestones";
import { createThread } from "~/lib/discussions";
import { actions as editorActions } from "~/ducks/editor";
import { getMyProducts } from "~/lib/products";
import { loadingClass } from "~/lib/utils/random";
import { Tooltip } from "react-tippy";
import MarkdownHelpText from "~/components/MarkdownHelpText";
import { Track } from "../../vendor/ga";
import MarkdownIt from "markdown-it";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import dynamic from "next/dynamic";
import GoldMessage from "../../components/GoldMessage";
import OutboundLink from "~/components/OutboundLink";

import { Experiment, Variant } from "react-optimize";
import { DoneStates } from "../../lib/utils/tasks";
import experiments from "../../experiments";
import { isDev } from "../../config";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
    ssr: false
});

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ProductSelectorDropdown extends React.Component {
    state = {
        loading: true,
        products: [],
        failed: false
    };

    componentDidMount() {
        this.getProducts();
    }

    getProducts = async () => {
        this.setState({ loading: true });
        try {
            const products = await getMyProducts();
            this.setState({
                products,
                failed: false,
                loading: false
            });
        } catch (e) {
            this.setState({
                failed: true,
                loading: false
            });
        }
    };

    render() {
        if (this.state.loading) return <Spinner small />;
        if (this.state.failed)
            return (
                <button className={"btn-small"} onClick={this.getProducts}>
                    Retry
                </button>
            );

        return (
            <div className="select">
                <select value={this.props.value} onChange={this.props.onChange}>
                    <option>Tag a product... (optional)</option>
                    {this.state.products.map(p => (
                        <option value={p.slug}>{p.name}</option>
                    ))}
                </select>
            </div>
        );
    }
}

class MilestoneEditor extends React.Component {
    state = {
        loading: false,
        title: "",
        body: "",
        product: null,
        failed: false,
        icon: null,
        iconPreview: null
    };

    onSubmit = async () => {
        this.setState({
            loading: true
        });
        try {
            await createMilestone({
                title: this.state.title,
                body: this.state.body,
                product: this.state.product,
                icon: this.state.icon
            });
            this.setState({
                title: "",
                body: "",
                product: null,
                icon: null,
                iconPreview: null,
                loading: false
            });

            new Track().event("milestone-posted");
            if (this.props.onClose) this.props.onClose();
            if (this.props.onBack) this.props.onBack();
        } catch (e) {
            this.setState({
                failed: true,
                loading: false
            });
        }
    };

    onIconUpload = (acceptedFiles, rejectedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = e => {
            this.setState({
                icon: file,
                iconPreview: reader.result
            });
        };
    };

    render() {
        /*if (!this.props.hasGold) {
            return (

                <Modal
                    open={this.props.open}
                    onClose={this.props.onClose}
                    background={'transparent'}>
                    <div className={"MilestoneEditor-container"}>
                        <Level>
                            <Level.Left>
                                <Title is={"5"} className={"has-text-white"}>
                                    Add a milestone
                                </Title>
                            </Level.Left>
                            <Level.Right>
                                <Button text small className={"has-text-white is-rounded"} onClick={this.props.onBack}>
                                    ← Go back
                                </Button>
                            </Level.Right>
                        </Level>
                        <div className="card">
                            <div className={"card-content"}>
                                <div className={"content"}>
                                    <h2>Milestones is a Gold-only feature.</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )
        }*/

        return (
            <>
                <Modal.Content>
                    <div className={"MilestoneEditor-container"}>
                        {!this.props.hasGold ? (
                            <GoldMessage feature="Milestones" />
                        ) : (
                            <>
                                <div
                                    className={
                                        "milestone-form" +
                                        (!this.props.hasGold ? " disabled" : "")
                                    }
                                >
                                    {this.state.failed && (
                                        <div className={"panel-message danger"}>
                                            Oops! Something went wrong. Make
                                            sure the form is all filled up!
                                        </div>
                                    )}
                                    <div className={"form-row"}>
                                        <label className="label">Title</label>
                                        <div className={"control"}>
                                            <input
                                                type={"text"}
                                                value={this.state.title}
                                                onChange={e =>
                                                    this.setState({
                                                        title: e.target.value
                                                    })
                                                }
                                                placeholder="First customer!"
                                            />
                                        </div>
                                    </div>
                                    <div className={"form-row"}>
                                        <label className="label">Content</label>
                                        <div className={"control"}>
                                            <MdEditor
                                                style={{ height: 300 }}
                                                config={{
                                                    view: {
                                                        menu: true,
                                                        md: true,
                                                        html: false
                                                    }
                                                }}
                                                onChange={({ html, text }) =>
                                                    this.setState({
                                                        body: text
                                                    })
                                                }
                                                value={this.state.body}
                                                renderHTML={text =>
                                                    mdParser.render(text)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Modal.Content>
                {this.props.hasGold && (
                    <Modal.Footer>
                        <div className="flex flex-gap v-center">
                            <div className="flex-grow v-center flex">
                                <ProductSelectorDropdown
                                    value={this.state.product}
                                    onChange={e =>
                                        this.setState({
                                            product: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <button
                                    className={loadingClass(
                                        "btn btn-primary",
                                        this.state.loading
                                    )}
                                    onClick={this.onSubmit}
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </Modal.Footer>
                )}
            </>
        );
    }
}

/**
 *         if (this.props.creatingDiscussion)
            return (
                <DiscussionEditor
                    open={this.props.open}
                    onClose={this.props.onClose}
                    onBack={this.props.openDiscussionEditor}
                />
            );

        if (this.props.creatingMilestone)
            return (
                <MilestoneEditor
                    hasGold={this.props.hasGold}
                    open={this.props.open}
                    onClose={this.props.onClose}
                    onBack={this.props.openMilestoneEditor}
                />
            );
 */

class MilestoneEditorTab extends Component {
    render() {
        return (
            <>
                <Modal.Content>
                    <MilestoneEditor {...this.props} />
                </Modal.Content>
                <Modal.Footer>
                    <div className="flex flex-gap v-center">
                        <div className="flex-grow v-center flex"></div>
                        <div>
                            <button className="btn btn-primary">Post</button>
                        </div>
                    </div>
                </Modal.Footer>
            </>
        );
    }
}

class TaskEditorTab extends Component {
    onHoverTips = () => {
        new Track().event("editor-tips-hover");
    };

    render() {
        return (
            <>
                <Modal.Content>
                    {isDev ? (
                        <TaskQueue fixedDoneState={DoneStates.DONE} />
                    ) : (
                        <Experiment
                            loader={
                                <Spinner
                                    small
                                    text="Loading the task editor..."
                                />
                            }
                            id={experiments.NEW_TASK_EXPERIENCE.id}
                        >
                            <Variant id="0">
                                <TaskQueue />
                            </Variant>
                            <Variant id="1">
                                <TaskQueue fixedDoneState={DoneStates.DONE} />
                            </Variant>
                        </Experiment>
                    )}
                </Modal.Content>

                <Modal.Footer>
                    <div className="flex flex-gap v-center">
                        <div className="flex-grow v-center flex">
                            <div onMouseEnter={this.onHoverTips}>
                                <Tooltip
                                    html={
                                        <div>
                                            Click the checkbox to mark as done,
                                            in progress, or remaining. <br />{" "}
                                            Hit Shift+Enter to add multiple
                                            tasks.
                                        </div>
                                    }
                                    animateFill={false}
                                    delay={200}
                                    size={"small"}
                                >
                                    <p className="help has-text-grey help-link">
                                        <FontAwesomeIcon icon="lightbulb" />{" "}
                                        Tips
                                    </p>
                                </Tooltip>
                            </div>
                        </div>
                        <div>
                            <button
                                className={loadingClass(
                                    "btn btn-primary",
                                    this.props.isCreating
                                )}
                                onClick={e => this.props.createTasks()}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </>
        );
    }
}

class DiscussionEditor extends React.Component {
    state = {
        loading: false,
        type: "TEXT",
        title: "",
        body: "",
        thread: null,
        failed: false
    };

    onSubmit = async () => {
        this.setState({
            loading: true
        });
        try {
            this.setState({
                loading: true,
                failed: false
            });

            const thread = await createThread(
                this.state.type,
                this.state.title,
                this.state.body
            );

            this.setState({
                loading: false,
                thread
            });

            new Track().event("discussion-posted");
            if (this.props.onClose) this.props.onClose();
            if (this.props.onBack) this.props.onBack();
            Router.pushRoute(`/discussions/${thread.slug}/`);
        } catch (e) {
            this.setState({
                loading: false,
                failed: true
            });
        }
    };

    render() {
        if (
            false &&
            this.props.user &&
            this.props.user.streak < 7 &&
            !this.props.user.gold
        ) {
            return (
                <Modal.Content>
                    <div className="alert is-gold">
                        <div className="alert-body">
                            <h3>
                                You must have a 7 day streak to post a thread.
                            </h3>
                            <div className="flex flex-v-gap flex-column">
                                <div></div>
                                <div>
                                    <p className="heading">
                                        Progress: {this.props.user.streak} days
                                    </p>
                                    <Line
                                        percent={this.props.user.streak / 7}
                                        strokeWidth="2"
                                        trailWidth="2"
                                        trailColor="var(--c-border)"
                                        strokeColor="var(--c-main)"
                                    />
                                </div>
                                <div>
                                    <small>
                                        <strong>Can't wait?</strong> Create
                                        threads right away with <GoldIcon />{" "}
                                        <OutboundLink to="https://gold.getmakerlog.com">
                                            Makerlog Gold
                                        </OutboundLink>
                                        .
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Content>
            );
        }

        return (
            <>
                <Modal.Content>
                    <div className="form">
                        {this.state.failed && (
                            <div className={"panel-message danger"}>
                                Oops! Something went wrong. Make sure the form
                                is all filled up!
                            </div>
                        )}
                        <div className={"form-row"}>
                            <label className="label">Title</label>
                            <div className={"control"}>
                                <input
                                    type={"text"}
                                    value={this.state.title}
                                    onChange={e =>
                                        this.setState({
                                            title: e.target.value
                                        })
                                    }
                                    placeholder={
                                        this.state.type === "QUESTION"
                                            ? "How do I make $1m MRR?"
                                            : "A guide on making cool things"
                                    }
                                />
                            </div>
                        </div>
                        <div className={"form-row"}>
                            <label className="label">Post</label>
                            <div className={"control"}>
                                <MdEditor
                                    style={{ height: 300 }}
                                    config={{
                                        view: {
                                            menu: true,
                                            md: true,
                                            html: false
                                        }
                                    }}
                                    onChange={({ html, text }) =>
                                        this.setState({
                                            body: text
                                        })
                                    }
                                    value={this.state.body}
                                    renderHTML={text => mdParser.render(text)}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Content>

                <Modal.Footer>
                    <div className="flex flex-gap v-center">
                        <div className="flex-grow v-center flex">
                            <div>
                                <MarkdownHelpText className="has-text-grey" />
                            </div>
                        </div>
                        <div>
                            <button
                                className={loadingClass(
                                    "btn btn-primary",
                                    this.state.loading
                                )}
                                onClick={this.onSubmit}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </>
        );
    }
}

class CardEditor extends Component {
    state = {
        open: false
    };

    switchTab = tab => {
        this.props.switchTab(tab, "card");
    };

    renderNewTabExperience = () => {
        return (
            <>
                <a
                    className={
                        "editor-select " + (this.props.tab === 0 && "is-active")
                    }
                    onClick={e => this.switchTab(0)}
                >
                    To-do
                </a>
                <a
                    className={
                        "editor-select " + (this.props.tab === 4 && "is-active")
                    }
                    onClick={e => this.switchTab(4)}
                >
                    Completed task
                </a>
            </>
        );
    };

    render() {
        if (!this.props.isLoggedIn) return null;

        return (
            <div
                className="card"
                style={{ border: "1px solid var(--c-border)" }}
            >
                <Modal.Header>
                    <div className="Editor flex flex-gap v-center">
                        <div className="flex-grow">
                            {isDev ? (
                                this.renderNewTabExperience()
                            ) : (
                                <Experiment
                                    id={experiments.NEW_TASK_EXPERIENCE.id}
                                >
                                    <Variant id="0">
                                        <a
                                            className={
                                                "editor-select " +
                                                (this.props.tab === 0 &&
                                                    "is-active")
                                            }
                                            onClick={e => this.switchTab(0)}
                                        >
                                            Task
                                        </a>
                                    </Variant>
                                    <Variant id="1">
                                        {this.renderNewTabExperience()}
                                    </Variant>
                                </Experiment>
                            )}
                            <a
                                className={
                                    "editor-select " +
                                    (this.props.cardTab === 1 && "is-active")
                                }
                                onClick={e => this.switchTab(1)}
                            >
                                Milestone
                            </a>
                            <a
                                className={
                                    "editor-select " +
                                    (this.props.cardTab === 2 && "is-active")
                                }
                                onClick={e => this.switchTab(2)}
                            >
                                Discussion
                            </a>
                        </div>
                    </div>
                </Modal.Header>
                {this.props.cardTab === 0 && (
                    <TaskEditorTab {...{ ...this.props, onClose: () => {} }} />
                )}
                {this.props.cardTab === 1 && (
                    <MilestoneEditor
                        hasGold={this.props.hasGold}
                        onClose={() => {}}
                    />
                )}
                {this.props.cardTab === 2 && (
                    <DiscussionEditor
                        hasGold={this.props.hasGold}
                        onClose={() => {}}
                        user={this.props.user}
                    />
                )}
            </div>
        );
    }
}

class Editor extends Component {
    switchTab = tab => {
        this.props.switchTab(tab);
    };

    renderNewTabExperience = () => {
        return (
            <>
                <a
                    className={
                        "editor-select " + (this.props.tab === 0 && "is-active")
                    }
                    onClick={e => this.switchTab(0)}
                >
                    To-do
                </a>
                <a
                    className={
                        "editor-select " + (this.props.tab === 4 && "is-active")
                    }
                    onClick={e => this.switchTab(4)}
                >
                    Completed task
                </a>
            </>
        );
    };

    render() {
        if (!this.props.isLoggedIn) return null;

        return (
            <Modal
                modalClassName="Modal panel"
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <Modal.Header>
                    <div className="Editor flex flex-gap v-center">
                        <div className="flex-grow">
                            {isDev ? (
                                this.renderNewTabExperience()
                            ) : (
                                <Experiment
                                    id={experiments.NEW_TASK_EXPERIENCE.id}
                                >
                                    <Variant id="0">
                                        <a
                                            className={
                                                "editor-select " +
                                                (this.props.tab === 0 &&
                                                    "is-active")
                                            }
                                            onClick={e => this.switchTab(0)}
                                        >
                                            Task
                                        </a>
                                    </Variant>
                                    <Variant id="1">
                                        {this.renderNewTabExperience()}
                                    </Variant>
                                </Experiment>
                            )}
                            <a
                                className={
                                    "editor-select " +
                                    (this.props.tab === 1 && "is-active")
                                }
                                onClick={e => this.switchTab(1)}
                            >
                                Milestone
                            </a>
                            <a
                                className={
                                    "editor-select " +
                                    (this.props.tab === 2 && "is-active")
                                }
                                onClick={e => this.switchTab(2)}
                            >
                                Discussion
                            </a>
                        </div>
                    </div>
                </Modal.Header>
                {this.props.tab === 0 && <TaskEditorTab {...this.props} />}
                {this.props.tab === 1 && (
                    <MilestoneEditor
                        hasGold={this.props.hasGold}
                        onClose={this.props.onClose}
                    />
                )}
                {this.props.tab === 2 && (
                    <DiscussionEditor
                        hasGold={this.props.hasGold}
                        onClose={this.props.onClose}
                        user={this.props.user}
                    />
                )}
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.loggedIn,
    user: state.user.me,
    hasGold: state.user.me ? state.user.me.gold : false,
    open: state.editor.open,
    queue: state.editor.queue,
    creatingMilestone: state.editor.creatingMilestone,
    creatingDiscussion: state.editor.creatingDiscussion,
    editorDueAt: state.editor.editorDueAt,
    editorAttachment: state.editor.editorAttachment,
    isCreating: state.editor.isCreating,
    editorValue: state.editor.editorValue,
    editorDone: state.editor.editorDone,
    editorInProgress: state.editor.editorInProgress,
    createFailed: state.editor.createFailed,
    errorMessages: state.editor.errorMessages,
    fieldErrors: state.editor.fieldErrors,
    tab: state.editor.tab,
    cardTab: state.editor.cardTab
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(editorActions.toggleEditor()),
    addToQueue: () => dispatch(editorActions.addToQueue()),
    removeFromQueue: t => dispatch(editorActions.removeFromQueue(t)),
    createTasks: () => dispatch(editorActions.createTasks()),
    setEditorValue: v => dispatch(editorActions.setEditorValue(v)),
    setEditorDueAt: v => dispatch(editorActions.setEditorDueAt(v)),
    toggleEditorDone: () => dispatch(editorActions.toggleEditorDone()),
    setEditorAttachment: a => dispatch(editorActions.setEditorAttachment(a)),
    markDone: () => dispatch(editorActions.markDone()),
    markInProgress: () => dispatch(editorActions.markInProgress()),
    markRemaining: () => dispatch(editorActions.markRemaining()),
    openMilestoneEditor: () => dispatch(editorActions.openMilestoneEditor()),
    openDiscussionEditor: () => dispatch(editorActions.openDiscussionEditor()),
    switchTab: (tab, which = null) =>
        dispatch(editorActions.switchTab(tab, which))
});

Editor.propTypes = {};

CardEditor = connect(mapStateToProps, mapDispatchToProps)(CardEditor);
export { CardEditor };
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
