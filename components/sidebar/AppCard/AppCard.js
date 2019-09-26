import React from 'react';
import Emoji from "../../Emoji";
import OutboundLink from "../../OutboundLink";
import {UserContainer} from "features/users";
import Avatar from "../../../features/users/components/Avatar/Avatar";
import './AppCard.scss';

export default () => (
	<div className={"card AppCard"}>
		<div className={"card-content"}>
			<div className={"grid"}>
				<div>
					<h3 className={"heading"}><Emoji emoji="📱"/> Get the app</h3>
					<p>Get the Makerlog app and log tasks from anywhere in the world. Get it on <OutboundLink href="https://testflight.apple.com/join/n3zhTJtu">iOS</OutboundLink> or  <OutboundLink href="https://play.google.com/store/apps/details?id=com.brownfingers.getmakerlog">Android</OutboundLink>.</p>

					<p>
						<UserContainer username="arnavpuri" component={({ user }) => <Avatar is={16} user={user} />} />
						<span>by maker <a href="https://getmakerlog.com/@arnavpuri">@arnavpuri</a></span>
					</p>
				</div>
				<div>
					<img alt="app screenshot" src="/assets/img/makerlog-app-device.png" width="70"/>
				</div>
			</div>
		</div>
	</div>
)