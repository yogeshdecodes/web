import React from 'react';
import PropTypes from 'prop-types';

// TODO: Fetch quotes from other sources.
const Quote = ({quote, author}) => (
	<blockquote>
		"{quote}"
		<cite>{author}</cite>
	</blockquote>
)

Quote.propTypes = {
	quote: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired
}

export default Quote;