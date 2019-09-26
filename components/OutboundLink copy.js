import React from 'react';
import PropTypes from 'prop-types';

const OutboundLink = ({to, href, children, className = null, style = null}) => (
	<a href={to || href} target={"_blank"} rel="noopener noreferrer" className={className} style={style}>
		{children}
	</a>
)

OutboundLink.propTypes = {
	to: PropTypes.string,
}

export default OutboundLink;