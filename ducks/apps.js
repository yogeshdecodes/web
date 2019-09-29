import { errorArray } from "~/lib/utils/error";

const initialState = {
    isLoading: true,
    ready: false,
    failed: false,
    apps: null,
    installedCount: null,
    linkKey: null,
    errorMessages: null
};

export const types = {
    APPS_FETCH_REQUESTED: "APPS_FETCH_REQUESTED",
    APPS_FETCH_SUCCESS: "APPS_FETCH_SUCCESS",
    APPS_FETCH_FAILED: "APPS_FETCH_FAILED"
};

// rename to name
export const appsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.APPS_FETCH_REQUESTED:
            return {
                ...state,
                isLoading: true,
                ready: false,
                failed: false
            };

        case types.APPS_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ready: true,
                failed: false,
                installedCount: action.installedCount,
                apps: action.apps,
                linkKey: action.linkKey
            };

        case types.APPS_FETCH_FAILED:
            return {
                ...state,
                failed: true,
                ready: false,
                isLoading: false,
                apps: null,
                linkKey: null,
                installedCount: 0,
                errorMessages: action.errorMessages
            };

        default:
            return state;
    }
};

export const actions = {
    fetchApps: () => {
        return {
            type: types.APPS_FETCH_REQUESTED
        };
    },

    fetchAppsSuccess: (apps, installedCount, linkKey) => {
        return {
            type: types.APPS_FETCH_SUCCESS,
            apps: apps,
            installedCount: installedCount,
            linkKey: linkKey
        };
    },

    fetchAppsFailed: (errorMessages = ["Failed to fetch data."]) => {
        return {
            type: types.APPS_FETCH_FAILED,
            errorMessages: errorArray(errorMessages)
        };
    }
};

export const mapDispatchToProps = dispatch => {
    return {
        fetchApps: () => dispatch(actions.fetchApps())
    };
};

export const mapStateToProps = state => {
    return {
        isLoading: state.apps.isLoading,
        ready: state.apps.ready,
        failed: state.apps.failed,
        apps: state.apps.apps,
        installedCount: state.apps.installedCount,
        linkKey: state.apps.linkKey,
        errorMessages: state.apps.errorMessages
    };
};
