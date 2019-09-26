import React from 'react';
import {connect} from 'react-redux';
import FollowButton from './FollowButton';

const GatedFollowButton = ({inverted = true, ...props}) => {
    if (props.isLoggedIn && props.me.id && props.me.id !== props.userId) {
        return <FollowButton userId={props.userId} inverted={inverted} {...props} />
    } else {
        // todo: login to do follow cta?
        return null;
    }
}

const mapStateToProps = (state) => ({
    me: state.user.me,
    isLoggedIn: state.auth.loggedIn,
})

export default connect(
    mapStateToProps
)(GatedFollowButton);