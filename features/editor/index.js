import React, { Component } from "react";
import Modal from "~/components/Modal";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskQueue from "~/features/tasks/components/TaskQueue";
import "./index.scss";
import GoldIcon from "~/components/icons/GoldIcon";
import { StdErrorCollection } from "../../lib/utils/error";

import { Line } from "rc-progress";
import { Router } from "~/routes";
import Spinner from "~/components/Spinner";
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
import OutboundLink from "~/components/OutboundLink";
import GoldCtaButton from "~/features/gold/GoldCtaButton";
import { Link } from "~/routes";

import { DoneStates } from "../../lib/utils/tasks";
import ErrorMessageList from "../../components/forms/ErrorMessageList";

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

class TaskEditorTab extends Component {
    onHoverTips = () => {
        new Track().event("editor-tips-hover");
    };

    render() {
        return (
            <>
                <Modal.Content>
                    <TaskQueue
                        fixedDoneState={
                            this.props.doneState !== undefined
                                ? this.props.doneState
                                : null
                        }
                    />
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

class NextEditorTab extends Component {
    onHoverTips = () => {
        new Track().event("editor-tips-hover");
    };

    render() {
        return (
            <>
                <Modal.Content>
                    <TaskQueue
                        doneState={
                            this.props.doneState !== undefined
                                ? this.props.doneState
                                : null
                        }
                    />
                </Modal.Content>

                <Modal.Footer>
                    <div className="flex flex-gap v-center">
                        <div className="flex-grow v-center flex">
                            <div onMouseEnter={this.onHoverTips}>
                                <Tooltip
                                    html={<div>Life is fun.</div>}
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
        gold: false,
        thread: null,
        failed: false,
        errorMessages: null
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
                this.state.body,
                this.state.gold
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
                failed: true,
                errorMessages: new StdErrorCollection(e)
            });
        }
    };

    render() {
        return (
            <>
                <Modal.Content>
                    <div className="form">
                        {this.state.errorMessages && (
                            <ErrorMessageList
                                errors={this.state.errorMessages}
                            />
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
                        <div className="flex flex-gap">
                            <div className="form-row">
                                <label className="label">
                                    <input
                                        name="gold"
                                        disabled={!this.props.user.gold}
                                        type="checkbox"
                                        value={this.state.gold}
                                        onChange={e => {
                                            this.setState({
                                                gold: e.target.checked
                                            });
                                        }}
                                    />
                                    &nbsp; Gold Club only
                                </label>
                                {!this.props.user.gold ? (
                                    <p className="help">
                                        <strong>
                                            <Link route="gold">
                                                <a target="_blank">Get Gold</a>
                                            </Link>{" "}
                                        </strong>
                                        to limit this post to Gold members only
                                        for higher quality discussions.
                                    </p>
                                ) : (
                                    <p className="help">
                                        Limit this post to Gold members only for
                                        higher quality discussions.
                                    </p>
                                )}
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
                        "editor-select " +
                        (this.props.cardTab === 0 && "is-active")
                    }
                    onClick={e => this.switchTab(0)}
                >
                    Completed
                </a>
                <a
                    className={
                        "editor-select " +
                        (this.props.cardTab === 5 && "is-active")
                    }
                    onClick={e => this.switchTab(5)}
                >
                    In-progress
                </a>
                <a
                    className={
                        "editor-select " +
                        (this.props.cardTab === 4 && "is-active")
                    }
                    onClick={e => this.switchTab(4)}
                >
                    To-do
                </a>
            </>
        );
    };

    renderOldTaskEditingExperience = () => {
        return (
            <>
                {this.props.cardTab === 0 && (
                    <TaskEditorTab {...{ ...this.props, onClose: () => {} }} />
                )}
            </>
        );
    };

    renderNewTaskEditingExperience = () => {
        return (
            <>
                {this.props.cardTab === 4 && (
                    <NextEditorTab
                        {...{ ...this.props, onClose: () => {} }}
                        doneState={DoneStates.REMAINING}
                    />
                )}
                {this.props.cardTab === 5 && (
                    <NextEditorTab
                        {...{ ...this.props, onClose: () => {} }}
                        doneState={DoneStates.IN_PROGRESS}
                    />
                )}
                {this.props.cardTab === 0 && (
                    <NextEditorTab
                        {...{ ...this.props, onClose: () => {} }}
                        doneState={DoneStates.DONE}
                    />
                )}
            </>
        );
    };

    renderTaskEditor = () => {
        return this.renderNewTaskEditingExperience();
    };

    render() {
        if (!this.props.isLoggedIn) return null;

        return (
            <div
                className="CardEditor Editor card"
                style={{ border: "1px solid var(--c-border)" }}
            >
                <Modal.Header>
                    <div className="Editor flex flex-gap v-center">
                        <div className="flex-grow">
                            {this.renderNewTabExperience()}
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
                {this.renderTaskEditor()}
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

    renderTaskEditor = () => {
        return (
            <>
                {this.props.tab === 4 && (
                    <NextEditorTab
                        {...{ ...this.props, onClose: () => {} }}
                        doneState={DoneStates.REMAINING}
                    />
                )}
                {this.props.tab === 5 && (
                    <NextEditorTab
                        {...{ ...this.props, onClose: () => {} }}
                        doneState={DoneStates.IN_PROGRESS}
                    />
                )}
                {this.props.tab === 0 && (
                    <NextEditorTab
                        {...{ ...this.props, onClose: () => {} }}
                        doneState={DoneStates.DONE}
                    />
                )}
            </>
        );
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
                    Completed
                </a>
                <a
                    className={
                        "editor-select " + (this.props.tab === 5 && "is-active")
                    }
                    onClick={e => this.switchTab(5)}
                >
                    In-progress
                </a>
                <a
                    className={
                        "editor-select " + (this.props.tab === 4 && "is-active")
                    }
                    onClick={e => this.switchTab(4)}
                >
                    To-do
                </a>
            </>
        );
    };

    render() {
        if (!this.props.isLoggedIn) return null;

        return (
            <Modal
                modalClassName="ModalEditor Editor Modal panel"
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <Modal.Header>
                    <div className="Editor flex flex-gap v-center">
                        <div className="flex-grow">
                            {this.renderNewTabExperience()}
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
                {this.renderTaskEditor()}

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
    creatingDiscussion: state.editor.creatingDiscussion,
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
    toggleEditorDone: () => dispatch(editorActions.toggleEditorDone()),
    setEditorAttachment: a => dispatch(editorActions.setEditorAttachment(a)),
    markDone: () => dispatch(editorActions.markDone()),
    markInProgress: () => dispatch(editorActions.markInProgress()),
    markRemaining: () => dispatch(editorActions.markRemaining()),
    openDiscussionEditor: () => dispatch(editorActions.openDiscussionEditor()),
    switchTab: (tab, which = null) =>
        dispatch(editorActions.switchTab(tab, which))
});

Editor.propTypes = {};

CardEditor = connect(mapStateToProps, mapDispatchToProps)(CardEditor);
export { CardEditor };
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
