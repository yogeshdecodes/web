import React from 'react';
import PropTypes from 'prop-types';
import Emoji from 'components/Emoji';
import abbreviate from 'number-abbreviate'

const Praise = ({praise}) => (
	<div>
		<Emoji emoji={"👏"}/>&nbsp;{isFinite(String(praise).trim() || NaN) ? abbreviate(praise, 1) : 0}
	</div>
)

Praise.propTypes = {
	praise: PropTypes.number.isRequired,
}

export default Praise;