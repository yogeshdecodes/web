import { actions as tasksActions } from "../../../ducks/tasks";
import { actions as editorActions } from "../../../ducks/editor";

export default dispatch => {
    return {
        createTask: content => dispatch(tasksActions.createTask(content)),
        updateTask: (id, payload) =>
            dispatch(tasksActions.updateTask(id, payload)),
        deleteTask: id => dispatch(tasksActions.deleteTask(id)),
        reorderTask: (id, afterId) =>
            dispatch(tasksActions.reorderTask(id, afterId)),
        markDone: id => dispatch(tasksActions.markDone(id)),
        markInProgress: id => dispatch(tasksActions.markInProgress(id)),
        markRemaining: id => dispatch(tasksActions.markRemaining(id)),
        toggleEditor: () => dispatch(editorActions.toggleEditor())
    };
};
