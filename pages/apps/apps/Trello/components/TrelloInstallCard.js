import React from 'react';
import InstallCard from '../../../../TasksPage/screens/AppsTab/components/InstallCard';

// todo: get hash fragment fixing for #?token=whateverthefuck

class TrelloInstallCard extends React.Component {

	render() {
		const protocol = window.location.protocol;
		const slashes = protocol.concat("//");
		const host = slashes.concat(window.location.hostname);
		return (
			<div className="TrelloInstallCard">
				<InstallCard
					app="Trello">
					<a href={`https://trello.com/1/authorize?expiration=never&name=Makerlog&scope=read&response_type=token&key=22e6ab5b481625f0cf75a2b921732230&return_url=${host}/apps/trello`} className={"btn"}>
						Install
					</a>
				</InstallCard>
			</div>
		)
	}
}

export default TrelloInstallCard;