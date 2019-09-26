import React from 'react';
import PropTypes from 'prop-types';
import ProfileModal from '..//ProfileModal';
import './LargeAvatar.scss';

class LargeAvatar extends React.Component {
	state = {
		expanded: false,
	}

	expand = () => this.setState({expanded: !this.state.expanded})

	render() {
		return (
			<div
				onClick={this.expand}>

				<figure className={"LargeAvatar " + (!this.props.user.streak || !this.props.user.week_tda ? 'lazy' : '')}>
					<img
						alt={"User"}
						src={this.props.user.avatar}
						className={"img-128"}
						title={this.props.user.username}/>
				</figure>

				<ProfileModal
					user={this.props.user}
					isOpen={this.state.expanded}
					onRequestClose={this.expand}
					contentLabel="Welcome"/>
			</div>
		)
	}
}

LargeAvatar.propTypes = {
	user: PropTypes.shape({
		avatar: PropTypes.string.isRequired,
		week_tda: PropTypes.string.isRequired,
		streak: PropTypes.number.isRequired,
	})
}

export default LargeAvatar;