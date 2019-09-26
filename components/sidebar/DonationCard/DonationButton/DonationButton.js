import React from 'react';

const DonationButton = (props) => (
	<a className="bmc-button" target="_blank" rel="noopener noreferrer" href="https://give.getmakerlog.com/">
		<img src="/assets/img/heart.png" alt="Heart"/>
		<span>Donate to Makerlog</span>
	</a>
)

DonationButton.propTypes = {}

export default DonationButton;