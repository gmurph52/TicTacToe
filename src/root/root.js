import React from 'react';
import Header from "../header/header.js"
import Game from "../game/game.js"
import "./root.css"

export default class Root extends React.Component {

	render() {
		return (
			<div className="wrapper">
				<Header />
				<Game />
			</div>
		);
	}
}
