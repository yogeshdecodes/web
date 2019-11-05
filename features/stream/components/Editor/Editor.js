import {Link, Redirect} from "~/routes";

import {Button} from "~/vendor/bulma";
import Dropzone from "react-dropzone";
import Emoji from "~/components/Emoji";
import ErrorMessageList from "~/components/forms/ErrorMessageList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GoldCtaButton from "~/components/GoldCtaButton";
import {HotKeys} from "react-hotkeys";
import Modal from "~/components/Modal";
import ProjectLink from "~/components/ProjectLink";
import React from "react";
import Spinner from "~/components/Spinner";
import {ThreadTypeSelect} from "~/features/discussions/ThreadTypeSelect";
import chrono from "chrono-node";
import {connect} from "react-redux";
import {createMilestone} from "~/lib/milestones";
import {createThread} from "~/lib/discussions";
import {actions as editorActions} from "~/ducks/editor";
import {format} from "date-fns";
import {getMyProducts} from "~/lib/products";
import processString from "react-process-string";

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
                    <option>No product</option>
                    {this.state.products.map(p => (
                        <option value={p.slug}>{p.name}</option>
                    ))}
                </select>
            </div>
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
            if (this.props.onClose) this.props.onClose();
            if (this.props.onBack) this.props.onBack();
        } catch (e) {
            this.setState({
                loading: false,
                failed: true
            });
        }
    };

    render() {
        if (this.state.thread) {
            return <Redirect to={`/discussions/${this.state.thread.slug}`} />;
        }

        return (
            <Modal
                open={this.props.open}
                onClose={this.props.onClose}
                background={"transparent"}
            >
                <div className={"DiscussionEditor-container"}>
                    <div className={"flex"}>
                        <div>
                            <h3 className={"has-text-white"}>Post a thread</h3>
                        </div>
                        <div>
                            <button
                                className={
                                    "btn-small has-text-white is-rounded"
                                }
                                onClick={this.props.onBack}
                            >
                                ← Go back
                            </button>
                        </div>
                    </div>
                    <div className="card">
                        <div className={"thread-selectors"}>
                            <ThreadTypeSelect
                                isSelected={this.state.type === "TEXT"}
                                onClick={e => this.setState({ type: "TEXT" })}
                            >
                                <Emoji emoji={"📝"} /> Textpost
                            </ThreadTypeSelect>
                            <ThreadTypeSelect
                                isSelected={this.state.type === "QUESTION"}
                                onClick={e =>
                                    this.setState({ type: "QUESTION" })
                                }
                            >
                                <Emoji emoji={"🤔"} /> Question
                            </ThreadTypeSelect>
                            <ThreadTypeSelect
                                isSelected={this.state.type === "LINK"}
                                onClick={e => this.setState({ type: "LINK" })}
                            >
                                <Emoji emoji={"🔗"} /> Link
                            </ThreadTypeSelect>
                        </div>
                        <div className={"card-content"}>
                            {this.state.failed && (
                                <div className={"panel-message danger"}>
                                    Oops! Something went wrong. Make sure the
                                    form is all filled up!
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
                                    <textarea
                                        value={this.state.body}
                                        onChange={e =>
                                            this.setState({
                                                body: e.target.value
                                            })
                                        }
                                        placeholder="Write away..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"flex"}>
                        <div>
                            <small className={"help has-text-white"}>
                                <FontAwesomeIcon icon={["fab", "markdown"]} />{" "}
                                Markdown is supported.
                            </small>
                        </div>
                        <div>
                            <Button
                                onClick={this.onSubmit}
                                loading={this.state.loading}
                                primary
                                className={"is-rounded has-text-weight-bold"}
                            >
                                <FontAwesomeIcon icon={"check"} />{" "}
                                <span>Post thread</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
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
                iconPreview: null
            });
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
            <Modal
                open={this.props.open}
                onClose={this.props.onClose}
                background={"transparent"}
            >
                <div className={"MilestoneEditor-container"}>
                    <div className={"flex"}>
                        <div>
                            <h4 className={"has-text-white"}>
                                Add a milestone
                            </h4>
                        </div>
                        <div>
                            <button
                                className={
                                    "btn-small has-text-white is-rounded"
                                }
                                onClick={this.props.onBack}
                            >
                                ← Go back
                            </button>
                        </div>
                    </div>
                    <div className="card">
                        <div className={"card-content"}>
                            {!this.props.hasGold && (
                                <div className={"panel-message gold"}>
                                    <div className={"flex"}>
                                        <div className={"gold-text"}>
                                            <h2>
                                                Milestones is a Gold feature.
                                            </h2>
                                            <h3>
                                                Get Gold and support the maker
                                                movement for just $5/mo.
                                            </h3>
                                        </div>
                                        <div>
                                            <GoldCtaButton />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div
                                className={
                                    "milestone-form" +
                                    (!this.props.hasGold ? " disabled" : "")
                                }
                            >
                                {this.state.failed && (
                                    <div className={"panel-message danger"}>
                                        Oops! Something went wrong. Make sure
                                        the form is all filled up!
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
                                            placeholder="Made an amazing product"
                                        />
                                    </div>
                                </div>
                                <div className={"form-row"}>
                                    <label className="label">Post</label>
                                    <div className={"control"}>
                                        <textarea
                                            value={this.state.body}
                                            onChange={e =>
                                                this.setState({
                                                    body: e.target.value
                                                })
                                            }
                                            placeholder="Tell your followers what happened..."
                                        />
                                    </div>
                                </div>
                                <div className={"columns"}>
                                    <div
                                        className={"column"}
                                        style={{ padding: 0, margin: 0 }}
                                    >
                                        <div className={"form-row"}>
                                            <label className="label">
                                                Tag a product
                                            </label>
                                            <div className={"control"}>
                                                <ProductSelectorDropdown
                                                    value={this.state.product}
                                                    onChange={e =>
                                                        this.setState({
                                                            product:
                                                                e.target.value
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={"column"}
                                        style={{ padding: 0, margin: 0 }}
                                    >
                                        <div className={"form-row"}>
                                            <label className="label">
                                                Icon
                                            </label>
                                            <div className={"control"}>
                                                <Dropzone
                                                    maxSize={2 * 1024 * 1024}
                                                    className={"icon-dropzone"}
                                                    accept="image/*"
                                                    multiple={false}
                                                    onDrop={this.onIconUpload}
                                                >
                                                    {this.state.iconPreview ? (
                                                        <img
                                                            className={
                                                                "image is-square is-48x48"
                                                            }
                                                            src={
                                                                this.state
                                                                    .iconPreview
                                                            }
                                                        />
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            icon={"camera"}
                                                        />
                                                    )}
                                                </Dropzone>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.hasGold && (
                        <div className={"flex"}>
                            <div>
                                <small className={"help has-text-white"}>
                                    <FontAwesomeIcon
                                        icon={["fab", "markdown"]}
                                    />{" "}
                                    Markdown is supported.
                                </small>
                            </div>
                            <div>
                                <Button
                                    onClick={this.onSubmit}
                                    loading={this.state.loading}
                                    primary
                                    className={
                                        "is-rounded has-text-weight-bold"
                                    }
                                >
                                    <FontAwesomeIcon icon={"check"} />{" "}
                                    <span>Post milestone</span>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        );
    }
}

const BasicTask = ({ task, onDelete }) => {
    //let doneIcon = faCheck;
    //let remainingIcon = faDotCircle;

    let icon = task.done ? (
        <FontAwesomeIcon icon={"check-circle"} color="#27ae60" />
    ) : (
        <FontAwesomeIcon icon={"dot-circle"} color="#f39c12" />
    );

    const hashtagConfig = {
        regex: /#([a-z0-9_-]+?)( |,|$|\.)/gim,
        fn: (key, result) => {
            let projectName = result[1];

            return <ProjectLink key={result[1]}>#{projectName}</ProjectLink>;
        }
    };

    let processed = processString([hashtagConfig])(task.content);

    return (
        <div
            className={
                "Entry " +
                (task.done
                    ? "done"
                    : task.in_progress
                    ? "in_progress"
                    : "remaining")
            }
        >
            {icon} &nbsp; {processed}
            <button className={"btn-small"} onClick={onDelete}>
                <FontAwesomeIcon icon={"trash"} />
            </button>{" "}
            {task.attachment && <FontAwesomeIcon icon={"camera"} />}
        </div>
    );
};

const HelpBox = ({ onClose }) => (
    <div className={"flex"}>
        <table>
            <tr>
                <th>Key</th>
                <th>Action</th>
            </tr>
            <tr>
                <td>
                    <div className={"tag"}>Shift + N</div>
                </td>
                <td>Open Editor.</td>
            </tr>
            <tr>
                <td>
                    <div className={"tag"}>Enter</div>
                </td>
                <td>Appends current task to queue.</td>
            </tr>
            <tr>
                <td>
                    <div className={"tag"}>Ctrl/Cmd + Enter</div>
                </td>
                <td>Posts all tasks in queue.</td>
            </tr>
            <tr>
                <td>
                    <div className={"tag"}>Ctrl/Cmd + D</div>
                </td>
                <td>Toggle done of current task.</td>
            </tr>
            <tr>
                <td>
                    <div className={"tag"}>Ctrl/Cmd + I</div>
                </td>
                <td>Toggle open image uploader.</td>
            </tr>
        </table>
        <button className={"btn-link"} onClick={onClose}>
            Close
        </button>
    </div>
);

class Editor extends React.Component {
    state = {
        showImageUploader: false,
        showDueEditor: false,
        editorNaturalDate: "",
        typeTick: 0,
        tooLarge: false
    };

    ticks = 0;

    handlers = () => ({
        enter: () => {
            if (this.props.editorValue.length <= 3) {
                return false;
            }

            this.props.addToQueue();
        },
        "mod+enter": this.onSubmit,
        "mod+i": this.toggleImageUploader,
        "mod+d": () => {
            this.handleTypeChange();
            return false;
        }
    });

    changeTick = () => {
        let newTick = this.state.typeTick + 1;
        // three is number of changes possible (todo, inprogress, remaining)
        // reset to done if not
        this.setState({
            typeTick: newTick <= 3 ? newTick : 0
        });
    };

    handleTypeChange = async () => {
        // three is number of changes possible (todo, inprogress, remaining)
        // reset to done if not
        let newTick = this.state.typeTick + 1;
        // three is number of changes possible (todo, inprogress, remaining)
        // reset to done if not
        await this.setState({
            typeTick: newTick <= 2 ? newTick : 0
        });
    };

    renderIcon = () => {
        let doneIcon = "check";
        let remainingIcon = "dot-circle";

        return this.props.editorDone ? (
            <FontAwesomeIcon size="2x" icon={doneIcon} color={"white"} />
        ) : (
            <FontAwesomeIcon size="2x" icon={remainingIcon} color={"white"} />
        );
    };

    onDrop = (acceptedFiles, rejectedFiles) => {
        if (!acceptedFiles.length) {
            this.setState({ tooLarge: true });
            return;
        } else {
            this.setState({ tooLarge: false });
        }
        const file = acceptedFiles[0];
        this.props.setEditorAttachment(file);
    };

    onClickIcon = () => {
        this.handleTypeChange();
    };

    onSubmit = () => {
        if (this.props.editorValue.length >= 3) {
            this.props.addToQueue();
        }
        this.props.createTasks();
    };

    renderQueue = () => {
        return this.props.queue.map(t => (
            <BasicTask
                task={t}
                onDelete={() => this.props.removeFromQueue(t)}
            />
        ));
    };

    toggleImageUploader = () => {
        this.setState({ showImageUploader: !this.state.showImageUploader });
    };

    toggleDueEditor = () => {
        this.setState({ showDueEditor: !this.state.showDueEditor });
    };

    canShowExtraTools = () => {
        return !(
            !this.props.queue.length && this.props.editorValue.length === 0
        );
    };

    setEditorDueAt = e => {
        this.setState({
            editorNaturalDate: e.target.value
        });
        this.props.setEditorDueAt(chrono.parseDate(e.target.value));
    };

    render() {
        switch (this.state.typeTick) {
            case 0:
                this.props.markDone();
                break;

            case 1:
                this.props.markRemaining();
                break;

            case 2:
                this.props.markInProgress();
                break;

            default:
                this.props.markDone();
        }

        if (this.props.creatingDiscussion)
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

        return (
            <Modal
                open={this.props.open}
                onClose={this.props.onClose}
                background={"transparent"}
            >
                <div className={"Editor-container"}>
                    <section className={"Editor"}>
                        <div className={"editor-flex"}>
                            <div
                                onClick={this.onClickIcon}
                                className={
                                    "icon" +
                                    (this.props.editorDone
                                        ? " done"
                                        : this.props.editorInProgress
                                        ? " in_progress"
                                        : " todo")
                                }
                            >
                                {this.renderIcon()}
                            </div>
                            <HotKeys
                                handlers={this.handlers()}
                                className={"input-div"}
                            >
                                <input
                                    id={"editor-input"}
                                    autoFocus
                                    value={this.props.editorValue}
                                    onChange={e =>
                                        this.props.setEditorValue(
                                            e.target.value
                                        )
                                    }
                                    autoComplete={"off"}
                                    placeholder={
                                        this.props.editorDone
                                            ? "Write something you did today."
                                            : this.props.editorInProgress
                                            ? "Write what you're working on."
                                            : "Write a to-do."
                                    }
                                />
                            </HotKeys>
                            <div
                                onClick={this.toggleDueEditor}
                                className={"icon"}
                            >
                                <FontAwesomeIcon
                                    icon={
                                        !this.props.editorDueAt
                                            ? "calendar-alt"
                                            : "calendar-check"
                                    }
                                />
                            </div>
                            <div
                                onClick={this.toggleImageUploader}
                                className={"icon uploader"}
                            >
                                <FontAwesomeIcon icon={"camera"} />
                            </div>
                        </div>
                    </section>

                    {this.state.showDueEditor && (
                        <section className={"Editor DueEditor"}>
                            <div className={"editor-flex"}>
                                <div className={"input-div"}>
                                    <input
                                        id={"editor-input"}
                                        autoFocus
                                        value={this.state.editorNaturalDate}
                                        onChange={this.setEditorDueAt}
                                        autoComplete={"off"}
                                        placeholder={"When is this task due?"}
                                    />
                                </div>
                                {this.props.editorDueAt !== null && (
                                    <div
                                        onClick={this.toggleDueEditor}
                                        className={"icon"}
                                    >
                                        <FontAwesomeIcon icon={"check"} />
                                    </div>
                                )}
                            </div>
                            {this.props.editorDueAt && (
                                <div className={"date-preview"}>
                                    <small>
                                        {format(
                                            this.props.editorDueAt,
                                            "MMMM d, yyyy (h:mm aa)"
                                        )}
                                    </small>
                                </div>
                            )}
                        </section>
                    )}
                    {this.state.showImageUploader && (
                        <div className={"box"}>
                            <Dropzone
                                maxSize={2 * 1024 * 1024}
                                className={"dropzone"}
                                accept="image/*"
                                multiple={false}
                                onDrop={this.onDrop}
                            >
                                {!this.props.editorAttachment && (
                                    <h4>
                                        {this.state.tooLarge
                                            ? "Attachment is too large!"
                                            : "Drop an image to attach here"}
                                    </h4>
                                )}
                                {this.props.editorAttachment && (
                                    <img
                                        src={
                                            this.props.editorAttachment.preview
                                        }
                                    />
                                )}
                            </Dropzone>
                        </div>
                    )}

                    {!this.canShowExtraTools() &&
                        !(
                            this.state.showImageUploader ||
                            this.state.showDueEditor
                        ) && (
                            <div
                                className={
                                    "card MultiColumnSelector is-flex-mobile columns"
                                }
                            >
                                <div
                                    className={"column"}
                                    onClick={this.props.openMilestoneEditor}
                                >
                                    <div>
                                        <Emoji emoji={"🚩️"} />
                                    </div>
                                    <div
                                        className={
                                            "title is-5 is-hidden-mobile"
                                        }
                                    >
                                        Add a milestone
                                    </div>
                                </div>
                                <div
                                    className={"column"}
                                    onClick={this.props.openDiscussionEditor}
                                >
                                    <div>
                                        <Emoji emoji={"✍️"} />
                                    </div>
                                    <div
                                        className={
                                            "title is-5 is-hidden-mobile"
                                        }
                                    >
                                        Post a topic
                                    </div>
                                </div>
                                <Link route={"products"}>
                                    <div
                                        className={"column"}
                                        onClick={this.props.onClose}
                                    >
                                        <div>
                                            <Emoji emoji={"🚢"} />
                                        </div>
                                        <div
                                            className={
                                                "title is-5 is-hidden-mobile"
                                            }
                                        >
                                            Add a product
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                    {this.canShowExtraTools() &&
                        !(
                            this.state.showImageUploader ||
                            this.state.showDueEditor
                        ) && (
                            <div
                                className={
                                    this.props.queue.length === 0 &&
                                    "box is-hidden-mobile"
                                }
                            >
                                {this.props.createFailed && (
                                    <ErrorMessageList
                                        errorMessages={this.props.errorMessages}
                                        fieldErrors={this.props.fieldErrors}
                                    />
                                )}
                                {this.props.queue.length > 0 ? (
                                    this.renderQueue()
                                ) : (
                                    <small className={"has-text-grey"}>
                                        <strong>
                                            Click on the icon to change task
                                            type between done, to-do, or in
                                            progress.
                                        </strong>
                                        <br />
                                        {
                                            // eslint-disable-next-line
                                        }{" "}
                                        <span className={"tag"}>Enter</span>{" "}
                                        adds another task. Press{" "}
                                        <span className={"tag"}>
                                            Cmd/Ctrl + Enter
                                        </span>{" "}
                                        to finish.
                                    </small>
                                )}
                            </div>
                        )}

                    {this.canShowExtraTools() ? (
                        <div className={"flex stretch"}>
                            <div />
                            <div>
                                <Button
                                    loading={this.props.isCreating}
                                    onClick={this.onSubmit}
                                    className={
                                        "button is-medium is-primary is-rounded"
                                    }
                                >
                                    <FontAwesomeIcon icon={"check"} />{" "}
                                    <strong>Submit</strong>
                                </Button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
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
    fieldErrors: state.editor.fieldErrors
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
    openDiscussionEditor: () => dispatch(editorActions.openDiscussionEditor())
});

Editor.propTypes = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);
