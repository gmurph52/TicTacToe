import React from 'react';
import Board from '../board/board';
import './game.css'

export default class Game extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		history: [
		  {
			squares: Array(9).fill(null)
		  }
		],
		stepNumber: 0,
		xIsNext: true,
		gameStarted: false
	  };
	}
  
	handleClick(i) {
	  const history = this.state.history.slice(0, this.state.stepNumber + 1);
	  const current = history[history.length - 1];
	  const squares = current.squares.slice();
	  if (calculateWinner(squares) || squares[i]) {
		return;
	  }
	  squares[i] = this.state.xIsNext ? "X" : "O";
	  this.setState({
		history: history.concat([
		  {
			squares: squares
		  }
		]),
		stepNumber: history.length,
		xIsNext: !this.state.xIsNext,
		gameStarted: true
	  });
	}
  
	jumpTo(step) {
	  this.setState({
		stepNumber: step,
		xIsNext: step % 2 === 0
	  });
	}
  
	handlePlayAgain() {
	  this.setState(null);
	  this.setState({
		history: [
		  {
			squares: Array(9).fill(null)
		  }
		],
		stepNumber: 0,
		xIsNext: true,
		gameStarted: false
	  });
	}
  
	render() {
	  const history = this.state.history;
	  const current = history[this.state.stepNumber];
	  const winner = calculateWinner(current.squares);
  
	  const moves = history.map((step, move) => {
		const desc = move ? "Go to move #" + move : "Go to game start";
		return (
		  <li key={move}>
			<button className="default-button w3-theme-action history-button" onClick={() => this.jumpTo(move)}>{desc}</button>
		  </li>
		);
	  });
  
	  let restartButton;
	  let status;
  
	  if(this.state.gameStarted) {
		restartButton = (
		  <button className="default-button w3-theme-action" onClick={() => this.handlePlayAgain()}>{winner ? 'Play Again' : 'Restart Game ' }</button>
		);
	  }

	  if (history.length > 9 && !winner) {
		status = "Cat's Game";
	  }
	  else if (winner) {
		status = "Winner: " + winner;
	  } else {
		status = "Next player: " + (this.state.xIsNext ? "X" : "O");
	  }
  
	  return (
		<div className="game-wrapper w3-theme-l5">
			<div className="game">
				<div className="game-board">
					<div className="board-and-status">
						<Board squares={current.squares} onClick={i => this.handleClick(i)} />
						<div className="status">{status}</div>
					</div>
					<div className="restart-button">{restartButton}</div>
				
				</div>
				<div className="game-info">
					<div>Game History</div>
					<ol>{moves}</ol>
				</div>
			</div>
		</div>
	  );
	}
  }

  function calculateWinner(squares) {
	const lines = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
	  const [a, b, c] = lines[i];
	  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
		return squares[a];
	  }
	}
	return null;
  }
  