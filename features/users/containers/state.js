export default state => {
    return {
        me: state.user.me,
        user: state.user.me,
        isLoggedIn: state.auth.loggedIn
    };
};
