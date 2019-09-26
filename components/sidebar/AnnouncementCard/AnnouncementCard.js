import React from 'react';
import Emoji from "../../Emoji";
import styled from 'styled-components';

export default (props) => (
	<div className={"card AnnouncementCard"}>
		<div className={"card-content"}>
			<h3>
				{props.title}
			</h3>
			{props.children}
		</div>
	</div>
)