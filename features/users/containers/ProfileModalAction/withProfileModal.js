import React from "react";
import ProfileModal from "../../components/ProfileModal/index";

export default function withProfileModal(WrappedComponent) {
	// ...and returns another component...
	return class extends React.Component {
		state = {
			expanded: false,
		}

		expand = () => this.setState({expanded: !this.state.expanded})

		render() {
			return (
				<React.Fragment>
					<WrappedComponent expand={this.expand} {...this.props} />
					<ProfileModal
						user={this.props.user}
						isOpen={this.state.expanded}
						onRequestClose={this.expand}
						contentLabel="Welcome"/>
				</React.Fragment>
			);
		}
	};
}