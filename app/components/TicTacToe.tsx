'use client'
import React from 'react'

function TicTacToe() {
    const emptyBoard: (string | null)[] = Array(9).fill(null);
    const [board, setBoard] = React.useState<(string | null)[]>(emptyBoard);
    const [isUserTurn, setIsUserTurn] = React.useState(true);
    const [status, setStatus] = React.useState<React.ReactNode>('YOUR TURN!');

    // Check for winner or draw
    React.useEffect(() => {
        const winner = calculateWinner(board);
        if (winner) {
            setStatus(
                winner === 'X'
                    ? <span className="text-lg md:text-2xl font-extrabold text-green-400 text-center">YOU WINNNN</span>
                    : <span className="text-lg md:text-2xl font-extrabold text-red-400 text-center">AUTOPLAYER WINS HAHAHHAHAHA</span>
            );
        } else if (board.every(Boolean)) {
            setStatus('DRAW:(');
        } else if (!isUserTurn) {
            // Autoplayer's turn (smart)
            const timeout = setTimeout(() => {
                // Try to win
                const emptyIndices = board
                    .map((val, idx) => (val === null ? idx : null))
                    .filter((v) => v !== null) as number[];

                // Helper to simulate a move
                function tryMove(symbol: string) {
                    for (let idx of emptyIndices) {
                        const testBoard = board.slice();
                        testBoard[idx] = symbol;
                        if (calculateWinner(testBoard) === symbol) {
                            return idx;
                        }
                    }
                    return null;
                }

                // 1. Win if possible
                let move = tryMove('O');
                // 2. Block user win
                if (move === null) move = tryMove('X');
                // 3. Take center if available
                if (move === null && board[4] === null) move = 4;
                // 4. Take a random corner
                if (move === null) {
                    const corners = [0, 2, 6, 8].filter(i => board[i] === null);
                    if (corners.length > 0) move = corners[Math.floor(Math.random() * corners.length)];
                }
                // 5. Take any random move
                if (move === null && emptyIndices.length > 0) {
                    move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                }

                if (move !== null && move !== undefined) {
                    const newBoard = board.slice();
                    newBoard[move] = 'O';
                    setBoard(newBoard);
                    setIsUserTurn(true);
                }
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [board, isUserTurn]);

    function handleClick(idx: number) {
        if (!isUserTurn || board[idx] || calculateWinner(board)) return;
        const newBoard = board.slice();
        newBoard[idx] = 'X';
        setBoard(newBoard);
        setIsUserTurn(false);
    }

    function handleReset() {
        setBoard(emptyBoard);
        setIsUserTurn(true);
        setStatus('YOUR TURN!');
    }

    return (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="grid grid-cols-3 gap-2 mb-4">
                {board.map((cell, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleClick(idx)}
                        className="aspect-square w-7 h-7 sm:w-12 sm:h-12 md:w-18 md:h-18 lg:w-20 lg:h-20 font-bold rounded bg-gray-800 border-2 border-blue-400
                            hover:bg-gray-700 transition flex items-center justify-center text-3xl sm:text-5xl"
                        disabled={!!cell || !!calculateWinner(board) || !isUserTurn}
                        
                    >
                        {cell}
                    </button>
                ))}
            </div>
            <div className="mb-2 text-sm">{status}</div>
            <button
                onClick={handleReset}
                className="px-2 py-1 text-xs md:px-3 md:py-1.5 md:text-sm lg:px-4 lg:py-2 lg:text-base bg-gradient-to-br from-blue-800 to-purple-600 rounded text-white font-semibold hover:bg-blue-600 transition"
            >
                RESET
            </button>
        </div>
    );
}

// Helper to check for winner
function calculateWinner(squares: (string | null)[]) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6],            // diags
    ];
    for (let [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default function page() {
  return (
    <main>
        <div className="flex flex-col relative items-center justify-center w-full">
            <div className="w-full max-w-xs sm:max-w-sm aspect-square">
            <TicTacToe />
            </div>
        </div>
    </main>
  )
}
