const initialState = {
    isLoading: false,
    failed: false,
    me: {}
};

export const types = {
    USER_REQUESTED: "USER_REQUESTED",
    USER_SUCCESS: "USER_SUCCESS",
    USER_FAILED: "USER_FAILED",
    USER_UPDATE: "USER_UPDATE"
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_REQUESTED:
            return {
                ...state,
                isLoading: true,
                failed: false
            };

        case types.USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                failed: false,
                me: action.user
            };

        case types.USER_UPDATE:
            return {
                ...state,
                isLoading: false,
                failed: false,
                me: action.patch ? { ...state.me, ...action.user } : action.user
            };

        case types.USER_FAILED:
            return {
                ...state,
                isLoading: false,
                failed: true,
                me: {}
            };

        default:
            return state;
    }
};

export const actions = {
    loadUser: () => {
        return {
            type: types.USER_REQUESTED
        };
    },

    userSuccess: (user, stats) => {
        return {
            type: types.USER_SUCCESS,
            user: user,
            stats: stats
        };
    },

    userFailed: (e = null) => {
        return {
            type: types.USER_FAILED
        };
    },

    updateUser: (user, patch = false) => {
        return {
            type: types.USER_UPDATE,
            user: user,
            patch
        };
    }
};

export const mapDispatchToProps = dispatch => {
    return {};
};

export const mapStateToProps = state => {
    return {
        isLoading: state.user.isLoading,
        failed: state.user.failed,
        me: state.user.me,
        user: state.user.me,
        isLoggedIn: state.auth.loggedIn
    };
};

export const mapGoldStateToProps = state => {
    return {
        hasGold: state.user.me ? state.user.me.gold : false
    };
};

export const mapGoldDispatchToProps = dispatch => {};
