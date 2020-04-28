import React from 'react';
import Square from '../square/square.js'
import './board.css'

export default class Board extends React.Component {
	
	renderSquare(i) {
		let isWinningSquare = this.props.winningSquares ? this.props.winningSquares.some(x => x === i) : false;
		return (
		<Square
			value={this.props.squares[i]}
			isWinningSquare={isWinningSquare}
			onClick={() => this.props.onClick(i)}
		/>
		);
	}
  
	render() {
	  return (
		<div class="board">
		  <div className="board-row">
			{this.renderSquare(0)}
			{this.renderSquare(1)}
			{this.renderSquare(2)}
		  </div>
		  <div className="board-row">
			{this.renderSquare(3)}
			{this.renderSquare(4)}
			{this.renderSquare(5)}
		  </div>
		  <div className="board-row">
			{this.renderSquare(6)}
			{this.renderSquare(7)}
			{this.renderSquare(8)}
		  </div>
		</div>
	  );
	}
  }