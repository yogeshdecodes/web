import React from "react";
import PropTypes from "prop-types";
import config from "../../../../config";
import { imageUrl } from "../../../../lib/utils/img";

class Avatar extends React.Component {
    getClassNames = () => {
        let classNames = "img-avatar";

        if (this.props.is) {
            classNames += ` img-${this.props.is}`;
        }

        // if (this.props.withBadge) {
        // 	classNames += ' badge is-badge-white is-avatar-badge is-badge-small';
        // }

        if (this.props.className) {
            classNames += ` ${this.props.className}`;
        }

        return classNames;
    };
    render() {
        return (
            <span
                data-badge={
                    this.props.user && this.props.user.streak
                        ? `🔥 ${this.props.user.streak}`
                        : null
                }
                className={`${this.getClassNames()}`}
            >
                <img
                    alt={this.props.user.username}
                    src={imageUrl(
                        this.props.user.avatar || this.props.src,
                        this.props.is
                    )}
                />
            </span>
        );
    }
}

Avatar.defaultProps = {
    is: 48,
    className: ""
};

Avatar.propTypes = {
    is: PropTypes.number,
    className: PropTypes.string
};

export default Avatar;
