import React from 'react';
import PropTypes from 'prop-types';
import './ProfileModalAction.scss';
import {Link} from "react-router-dom";

class ProfileModalAction extends React.Component {
	render() {
		return (
			<Link
				to={`/@${this.props.user.username}`}>
				{this.props.children}
			</Link>
		)
	}
}


ProfileModalAction.propTypes = {
	user: PropTypes.object.isRequired,
}

export default ProfileModalAction;