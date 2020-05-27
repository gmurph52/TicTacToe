import React from 'react';
import Board from '../board/board';
import './game.css'

export default class Game extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		history: [
		  {
			squares: Array(9).fill(null),
			lastMove: null	
		  }
		],
		stepNumber: 0,
		xIsNext: true,
		gameStarted: false,
		
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
			squares: squares,
			lastMove: i
		  }
		]),
		stepNumber: history.length,
		xIsNext: !this.state.xIsNext,
		gameStarted: true,
		
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
		gameStarted: false,
		lastMove: null
	  });
	}
  
	getGameHistory(history) {
		return history.map((step, move) => {
			const desc = move ? "Go to move #" + move : "Go to game start";
			return (
			  <li key={move}>
				<button className="default-button w3-theme-action history-button" onClick={() => this.jumpTo(move)}>{desc}</button>
			  </li>
			);
		  });
	}

	getGameStatus(history, current, winner) {
		if (history.length === 10 && current === history[9] && !winner) {
			return "Cat's Game";
		}
		else if (winner) {
			return "Winner: " + winner;
		} else {
			return "Next player: " + (this.state.xIsNext ? "X" : "O");
		}
	}

	render() {
	  const history = this.state.history;
	  const current = history[this.state.stepNumber];
	  const winnerInfo = calculateWinner(current.squares); 
	  const moves = this.getGameHistory(history);

	  let winner = !!winnerInfo ? winnerInfo.winner : null;
	  let winningSquares = !!winnerInfo ? winnerInfo.winningSquares : null;
	  let status = this.getGameStatus(history, current, winner)
	  
	  let restartButton;
	  if(this.state.gameStarted) {
		restartButton = (
		  <button className="default-button w3-theme-action" onClick={() => this.handlePlayAgain()}>{winner ? 'Play Again' : 'Restart Game ' }</button>
		);
	  }

	  return (
		<div className="game-wrapper w3-theme-l5">
			<div className="game">
				<div className="game-board-filler">
					<div className="game-board">
						<div className="board-and-status">
							<Board squares={current.squares} winningSquares={winningSquares} lastMove={current.lastMove} onClick={i => this.handleClick(i)} />
							<div className="status">{status}</div>
						</div>
						<div className="restart-button">{restartButton}</div>	
					</div>
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
		return {winner: squares[a], winningSquares: [a, b, c]};
	  }
	}
	return null;
  }
  