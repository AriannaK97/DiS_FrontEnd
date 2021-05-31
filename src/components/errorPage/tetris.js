import React from 'react';
import './tetris.css';

const Tetris = require('react-tetris');

function TetrisGame () {
    return(<Tetris>
        {({ Gameboard, points, linesCleared }) => {
            // Render it however you'd like
            return (
                <div>
                    <div style={{color: "#1a092b", marginTop: "150px"}}>
                        <p><strong>Oops! Something went wrong...</strong></p>
                        <p><strong>Points: {points}</strong></p>
                        <p><strong>Lines Cleared: {linesCleared}</strong></p>
                    </div>
                    <Gameboard/>
                </div>
            );
        }}
    </Tetris>);
}

export default TetrisGame;