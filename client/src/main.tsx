import React, { useState } from "react";
import { XorO, Winner } from "./types";

export const Main = () => {
    const [board, setBoard] = useState<(XorO | undefined)[][]>([
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
    ]);
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
        const lines = [
            // Rows
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            // Columns
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            // Diagonals
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]],
        ];

        for (const line of lines) {
            if (line[0] && line[0] === line[1] && line[1] === line[2]) {
                setWinner(line[0]);
                return;
            }
        }

        if (board.flat().every((cell) => cell !== undefined)) {
            setWinner("Draw");
        }
    };

    const resetGame = () => {
        setBoard([
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
        ]);
        setCurrentPlayer("X");
        setWinner(undefined);
    };

    return (
        <div className="flex flex-col mt-10 items-center gap-10">
            <div className="font-bold text-2xl">Tic Tac Toe</div>
            {winner && (
                <div className="text-xl font-bold">
                    {winner === "Draw" ? "It's a draw!" : `${winner} wins!`}
                </div>
            )}
            <div className="flex flex-col gap-1">
                {board.map((row, rowIndex) => (
                    <div className="flex gap-1" key={rowIndex}>
                        {row.map((column, colIndex) => (
                            <div
                                key={colIndex}
                                role="button"
                                tabIndex={0}
                                className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
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
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={resetGame}
            >
                Reset Game
            </button>
        </div>
    );
};
