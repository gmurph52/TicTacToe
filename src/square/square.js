import React from 'react';
import './square.css'

export default function Square(props) {
	if(props.isWinningSquare) {
		return (
			<button className="square winning-square" onClick={props.onClick}>
			  {props.value}
			</button>
		  );	
	} else {	
		return (
			<button className="square" onClick={props.onClick}>
				{props.value}
			</button>
		);
	}
  }
  