import React from "react";
import PropTypes from "prop-types";
import { Button } from "~/vendor/bulma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { follow, isFollowing, unfollow } from "~/lib/user";

class FollowButton extends React.Component {
    state = {
        isLoading: true,
        following: false,
        failed: false
    };

    onFollowClick = async () => {
        try {
            this.setState({ isLoading: true, failed: false });
            let following = false;
            if (this.state.following) {
                following = await unfollow(this.props.userId);
            } else {
                following = await follow(this.props.userId);
            }
            this.setState({
                isLoading: false,
                following: following,
                failed: false
            });
        } catch (e) {
            this.setState({ failed: true, isLoading: false });
        }
    };

    checkFollowing = async () => {
        try {
            this.setState({ isLoading: true, failed: false });
            const following = await isFollowing(this.props.userId);
            this.setState({
                isLoading: false,
                following: following,
                failed: false
            });
        } catch (e) {
            this.setState({ failed: true, isLoading: false });
        }
    };

    componentDidMount() {
        this.checkFollowing();
    }

    render() {
        return (
            <Button
                className={
                    "is-rounded is-brand-background-darker " +
                    this.props.className
                }
                loading={this.state.isLoading}
                error={this.state.failed}
                primary
                onClick={
                    this.state.failed ? this.checkFollowing : this.onFollowClick
                }
            >
                <FontAwesomeIcon
                    icon={this.state.following ? "check" : "user-plus"}
                />
                {this.state.following ? "Following" : "Follow"}
            </Button>
        );
    }
}

FollowButton.propTypes = {
    inverted: PropTypes.bool,
    userId: PropTypes.number.isRequired
};

export default FollowButton;
