import "./index.scss";

import {
    Button,
    Card,
    Container,
    Image,
    Level,
    Media,
    SubTitle,
    Title
} from "../../../../vendor/bulma";
import {
    groupTasksByDone,
    isDueSoon,
    orderByDate,
    processTaskString
} from "../../../../lib/utils/tasks";

import CelebratoryThing from "../CelebratoryThing";
import DueCountdown from "../../../../components/DueCountdown";
import Emoji from "../../../../components/Emoji";
import Link from "react-router-dom/es/Link";
import React from "react";
import Spinner from "../../../../components/Spinner";
import TaskDetailModal from "../../../stream/components/Task/components/TaskDetailModal/TaskDetailModal";
import { applySearchTerms } from "lib/utils/tasks";
import { connect } from "react-redux";
import { actions as editorActions } from "../../../../ducks/editor";
import { getMyProducts } from "../../../../lib/products";
import { actions as tasksActions } from "ducks/tasks";

const mapStateToProps = state => {
    return {
        tasks: applySearchTerms(state.tasks.tasks, state.tasks.searchTerms),
        projects: state.projects.projects,
        isSyncing: state.tasks.isSyncing || state.projects.isSyncing,
        isSilentlySyncing: state.tasks.ready && state.tasks.isSyncing,
        failed: state.tasks.failed,
        errorMessages: state.tasks.errorMessages,
        ready: state.tasks.ready && state.projects.ready,
        searchTerms: state.tasks.searchTerms,
        taskView: state.tasks.taskView,
        me: state.user.me,
        remainingTasks: state.stats.user.remaining_tasks,
        doneToday: state.stats.user.done_today
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTasks: () => dispatch(tasksActions.loadTasks()),
        markDone: id => dispatch(tasksActions.markDone(id)),
        markRemaining: id => dispatch(tasksActions.markRemaining(id)),
        markInProgress: id => dispatch(tasksActions.markInProgress(id)),
        deleteTask: id => dispatch(tasksActions.deleteTask(id)),
        updateTask: id => dispatch(tasksActions.updateTask(id)),
        toggleEditor: () => dispatch(editorActions.toggleEditor())
    };
};

const DoneToggle = ({ onClick, showDone }) => (
    <button className={"btn-small"} onClick={onClick}>
        {showDone ? "Hide" : "Show"} completed tasks
    </button>
);

const ProductLink = ({ product, active, onSelect, tasks }) => (
    <div
        onClick={e => onSelect(product.id)}
        className={
            "flex v-center flex-gap ProductLink" + (active ? " active" : "")
        }
    >
        {product.icon && (
            <div>
                <img
                    className={"img-32"}
                    src={product.icon}
                    alt={"product icon"}
                />
            </div>
        )}
        <div>
            <strong>{product.name}</strong>

            <div className={"help"}>
                {groupTasksByDone(tasks).remaining.length} remaining,{" "}
                {groupTasksByDone(tasks).done.length} done
            </div>
        </div>
    </div>
);

const ProductList = ({ products, activeProduct, onSelect, taskGroups }) => (
    <div className={"ProductList"}>
        {orderByDate(products, "asc").map(product => (
            <ProductLink
                tasks={taskGroups[product.name]}
                onSelect={onSelect}
                product={product}
                active={activeProduct === product.id}
            />
        ))}
        <ProductLink
            tasks={taskGroups["Miscellaneous"]}
            onSelect={() => onSelect(-1)}
            product={{ name: "Miscellaneous" }}
            active={activeProduct === -1}
        />
    </div>
);

const ProductsSidebar = ({ products, activeProduct, onSelect, taskGroups }) => (
    <div className={"Sidebar ProductsSidebar card"}>
        <ProductList
            onSelect={onSelect}
            products={products}
            taskGroups={taskGroups}
            activeProduct={activeProduct}
        />
    </div>
);

class CheckableTask extends React.Component {
    state = {
        editing: false,
        deleting: false
    };

    toggleEditingState = () => {
        this.setState({
            editing: !this.state.editing
        });
    };

    onClickDelete = () => {
        if (!this.state.deleting) {
            this.setState({
                deleting: true
            });
        } else {
            this.props.deleteTask(this.props.task.id);
        }
    };

    onTaskClick = () => {
        const { task, markDone, markRemaining } = this.props;

        if (task.done) {
            markRemaining(task.id);
        } else {
            markDone(task.id);
        }
    };

    render() {
        const { task, markInProgress } = this.props;

        return (
            <div className={"CheckableTask"}>
                <div className={"main-control"} onClick={this.onTaskClick}>
                    <input
                        type="checkbox"
                        className={
                            "checkbox-custom" +
                            (task.in_progress ? " in-progress" : "")
                        }
                        checked={task.done}
                    />
                    <label htmlFor="test1">
                        {processTaskString(task)}{" "}
                        {task.due_at && <DueCountdown task={task} />}
                    </label>
                </div>
                <div className={"controls buttons"}>
                    {!task.done && !task.in_progress && (
                        <Button
                            onClick={e => markInProgress(task.id)}
                            warning
                            className={"btn rounded"}
                            small
                        >
                            Mark in progress
                        </Button>
                    )}
                    <button
                        onClick={this.toggleEditingState}
                        className={"btn btn-small btn-gray"}
                    >
                        Edit
                    </button>
                    <button
                        onClick={this.onClickDelete}
                        className={"btn btn-small btn-danger"}
                    >
                        {this.state.deleting ? "Are you sure?" : "Delete"}
                    </button>
                </div>
                {this.state.editing && (
                    <TaskDetailModal
                        open={this.state.editing}
                        onClose={this.toggleEditingState}
                        task={task}
                    />
                )}
            </div>
        );
    }
}

CheckableTask = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckableTask);

const Tasks = ({ tasks, showDone, toggleDoneTasks, me }) => {
    const groupedTasks = groupTasksByDone(tasks);
    const dueSoon = tasks && tasks.filter(task => isDueSoon(task));

    return (
        <div className={"Tasks"}>
            <div className={"flex v-center col-right"}>
                <div className={"has-text-grey-light"}>
                    <strong>
                        {groupedTasks.remaining.length +
                            groupedTasks.in_progress.length}{" "}
                        remaining
                    </strong>
                    , {groupedTasks.done.length} done
                </div>
                <div>
                    <DoneToggle onClick={toggleDoneTasks} showDone={showDone} />
                </div>
            </div>

            <div className="card">
                <div className={"card-content"}>
                    {dueSoon && dueSoon.length > 0 && (
                        <>
                            <h3>
                                Due soon <Emoji emoji={"🚨"} />{" "}
                            </h3>
                            {dueSoon &&
                                dueSoon.map(task => (
                                    <CheckableTask key={task.id} task={task} />
                                ))}
                            <hr />
                        </>
                    )}
                    {groupedTasks.in_progress.length === 0 &&
                        groupedTasks.remaining.length === 0 && (
                            <CelebratoryThing me={me} />
                        )}
                    {groupedTasks.in_progress.map(task => (
                        <CheckableTask key={task.id} task={task} />
                    ))}
                    {groupedTasks.in_progress.length !== 0 &&
                        groupedTasks.remaining.length !== 0 && <hr />}
                    {groupedTasks.remaining.map(task => (
                        <CheckableTask key={task.id} task={task} />
                    ))}
                    {showDone && groupedTasks.done.length !== 0 && <hr />}
                    {showDone
                        ? groupedTasks.done.map(task => (
                              <CheckableTask key={task.id} task={task} />
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
};

class ListView extends React.Component {
    state = {
        activeProduct: -1,
        loading: false,
        products: null,
        failed: false,
        showDone: false
    };

    componentDidMount() {
        // Sync projects & tasks to ease consistency issues
        this.fetchProducts();
        this.props.loadTasks();
    }

    selectProduct = activeProduct => {
        this.setState({ activeProduct });
    };

    fetchProducts = async () => {
        this.setState({ loading: true });
        try {
            const products = orderByDate(await getMyProducts(), "asc");
            // If no products, set active to misc.
            this.setState({
                loading: false,
                products,
                activeProduct: products.length ? products[0].id : -1,
                failed: false
            });
        } catch (e) {
            this.setState({
                loading: false,
                failed: true
            });
        }
    };

    toggleDoneTasks = () => {
        this.setState({
            showDone: !this.state.showDone
        });
    };

    getTasksForProducts = () => {
        const { products, showDone } = this.state;

        const { tasks } = this.props;

        let filteredTasks = tasks;

        if (!showDone) {
            // filteredTasks = tasks.filter(t => !t.done)
        }

        let linkedProjectIds = products
            .map(p => p.projects.map(p => p.id))
            .flat();

        let taskGroups = {};
        orderByDate(filteredTasks).map(task => {
            let taskTagIds = task.project_set.map(p => p.id);
            if (!taskTagIds.some(r => linkedProjectIds.includes(r))) {
                !("Miscellaneous" in taskGroups) &&
                    (taskGroups["Miscellaneous"] = []);
                taskGroups["Miscellaneous"].push(task);
            } else {
                products.map(product => {
                    if (
                        taskTagIds.some(r =>
                            product.projects.map(p => p.id).includes(r)
                        )
                    ) {
                        !(product.name in taskGroups) &&
                            (taskGroups[product.name] = []);
                        taskGroups[product.name].push(task);
                    }

                    return true;
                });
            }

            return true;
        });

        return taskGroups;
    };

    render() {
        const { loading, products, activeProduct } = this.state;

        const { me } = this.props;

        // Order by projects
        // pass tags to sidebar

        if (loading || products === null) return <Spinner />;

        let currentProduct = products.find(p => p.id === activeProduct);
        const taskGroups = this.getTasksForProducts();
        let tasks = [];

        if (currentProduct) {
            tasks = taskGroups[currentProduct.name];
        } else {
            tasks = taskGroups["Miscellaneous"];
        }

        return (
            <div className={"container ListView"}>
                <div className={"grid-s-c"}>
                    <div>
                        <ProductsSidebar
                            onSelect={this.selectProduct}
                            products={products}
                            taskGroups={taskGroups}
                            activeProduct={activeProduct}
                        />
                        <br />
                        <Link
                            to={"/products"}
                            className={"btn-primary btn-small"}
                        >
                            + Add a product
                        </Link>
                    </div>

                    <div>
                        <Tasks
                            me={me}
                            tasks={tasks}
                            toggleDoneTasks={this.toggleDoneTasks}
                            showDone={this.state.showDone}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListView);
