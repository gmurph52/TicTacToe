import React from 'react';
import Header from "./header/header.js"
import Game from "./game/game.js"

export default class Root extends React.Component {

	render() {
		return (
			<div>
				<Header />
				<Game />
			</div>
		);
	}
}