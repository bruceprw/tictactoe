import React, { useState } from "react";
import { XorO, Winner } from "./types";

export const Main = () => {
    const [boardSize, setBoardSize] = useState<number>(3);
    const [board, setBoard] = useState<(XorO | undefined)[][]>(
        Array.from({ length: boardSize }, () =>
            Array(boardSize).fill(undefined)
        )
    );
    const [currentPlayer, setCurrentPlayer] = useState<XorO>("X");
    const [winner, setWinner] = useState<Winner>(undefined);

    const handleClick = (rowIndex: number, colIndex: number) => {
        if (board[rowIndex][colIndex] || winner) return;

        const newBoard = board.map((row, rIdx) =>
            row.map((cell, cIdx) =>
                rIdx === rowIndex && cIdx === colIndex ? currentPlayer : cell
            )
        );

        setBoard(newBoard);
        checkWinner(newBoard);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLDivElement>,
        rowIndex: number,
        colIndex: number
    ) => {
        if (event.key === "Enter") {
            handleClick(rowIndex, colIndex);
        }
    };

    const checkWinner = (board: (XorO | undefined)[][]) => {
        const lines: (XorO | undefined)[][] = [];

        // Rows and Columns
        for (let i = 0; i < boardSize; i++) {
            lines.push(board[i]);
            lines.push(board.map((row) => row[i]));
        }

        // Diagonals
        lines.push(board.map((row, idx) => row[idx]));
        lines.push(board.map((row, idx) => row[boardSize - 1 - idx]));

        for (const line of lines) {
            if (line[0] && line.every((cell) => cell === line[0])) {
                setWinner(line[0]);
                return;
            }
        }

        if (board.flat().every((cell) => cell !== undefined)) {
            setWinner("Draw");
        }
    };

    const resetGame = () => {
        setBoard(
            Array.from({ length: boardSize }, () =>
                Array(boardSize).fill(undefined)
            )
        );
        setCurrentPlayer("X");
        setWinner(undefined);
    };

    const handleBoardSizeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newSize = Number(event.target.value);
        setBoardSize(newSize);
        setBoard(
            Array.from({ length: newSize }, () =>
                Array(newSize).fill(undefined)
            )
        );
        setWinner(undefined);
        setCurrentPlayer("X");
    };

    return (
        <div className="flex flex-col mt-10 items-center gap-6">
            <div className="font-bold text-4xl text-gray-800">Tic Tac Toe</div>
            <div className="flex flex-col items-center">
                <label className="font-medium text-lg mb-2">
                    Board Size: {boardSize}
                </label>
                <input
                    type="range"
                    min="3"
                    max="15"
                    value={boardSize}
                    onChange={handleBoardSizeChange}
                    className="w-64"
                />
            </div>
            {winner && (
                <div className="text-2xl font-bold text-green-600">
                    {winner === "Draw" ? "It's a draw!" : `${winner} wins!`}
                </div>
            )}
            <div className="flex flex-col gap-2">
                {board.map((row, rowIndex) => (
                    <div className="flex gap-2" key={rowIndex}>
                        {row.map((column, colIndex) => (
                            <div
                                key={colIndex}
                                role="button"
                                tabIndex={0}
                                className="border-2 border-gray-900 w-16 h-16 cursor-pointer items-center justify-center text-3xl font-bold flex text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onClick={() => handleClick(rowIndex, colIndex)}
                                onKeyDown={(event) =>
                                    handleKeyDown(event, rowIndex, colIndex)
                                }
                            >
                                {column}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                onClick={resetGame}
            >
                Reset Game
            </button>
        </div>
    );
};
