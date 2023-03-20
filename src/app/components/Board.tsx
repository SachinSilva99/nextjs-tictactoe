"use client";
import { useState } from "react";
import Square from "./Square";

interface props {
    xIsNext: boolean;
    squares: any;
    onPlay(squares: any[]): void;
}
export default function Board({ xIsNext, squares, onPlay }: props) {
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        onPlay(nextSquares);
    }

    const boardRows = [...Array(3)].map((x, i) => {
        const boardSquares = [...Array(3)].map((x, j) => {
            return (
                <Square
                    key={3 * i + j}
                    value={squares[3 * i + j]}
                    onSquareClick={() => handleClick(3 * i + j)}
                />
            );
        });

        return (
            <div key={i} className="board-row">
                {boardSquares}
            </div>
        );
    });
    return (
        <>
            <div className="board-row">
                <div className="status">{status}</div>
            </div>
            {boardRows}
        </>
    );
}
function calculateWinner(squares: any[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}
