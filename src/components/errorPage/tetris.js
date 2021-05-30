import React from 'react';
import './tetris.css';

const Tetris = require('react-tetris');

function TetrisGame () {
    return(<Tetris>
        {({ Gameboard, points, linesCleared }) => {
            // Render it however you'd like
            return (
                <div>
                    <div>
                        <p>Points: {points}</p>
                        <p>Lines Cleared: {linesCleared}</p>
                    </div>
                    <Gameboard/>
                </div>
            );
        }}
    </Tetris>);
}

export default TetrisGame;