import React from 'react';
import './square.css'

export default function Square(props) {

	var style = 'square';
	
	if(props.isWinningSquare) {
		style = 'square winning-square';
	} else 	if(props.isLastMove) {
		style = 'square last-move';
	}	
	return (
		<button className={style} onClick={props.onClick}>
			{props.value}
		</button>
	);
  }
  