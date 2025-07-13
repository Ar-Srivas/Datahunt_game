import React, { useState, useEffect } from "react";
import Tile from "./Tile";

const PuzzleBoard = ({ onSolve }) => {
    const [tiles, setTiles] = useState([]);
    const [isSolved, setIsSolved] = useState(false);

    useEffect(() => {
        // Initialize with hardcoded start state
        initializeHardcodedState();
    }, []);

    const initializeHardcodedState = () => {
        // Hardcoded start state:
        // 1  8  2  
        // 0  4  3  
        // 7  6  5  
        // Where 0 represents the empty tile (null)
        const hardcodedState = [8,6,4,3,null,1,2,7,5];
        setTiles(hardcodedState);
        setIsSolved(false);
    };
    
    const resetGame = () => {
        // Reset to the same hardcoded state instead of randomizing
        initializeHardcodedState();
    };

    const moveTile = (index) => {
        const emptyIndex = tiles.indexOf(null);
        const isAdjacent = (
            // Same row and adjacent column
            (Math.floor(index / 3) === Math.floor(emptyIndex / 3) && Math.abs(index - emptyIndex) === 1) ||
            // Same column and adjacent row
            (index % 3 === emptyIndex % 3 && Math.abs(index - emptyIndex) === 3)
        );

        if (isAdjacent) {
            let newTiles = [...tiles];
            [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
            setTiles(newTiles);
            
            // Check if the puzzle is solved after the move
            if (checkSolution(newTiles)) {
                setIsSolved(true);
                onSolve();
            }
        }
    };

    const checkSolution = (currentTiles) => {
        const solution = [1, 2, 3, 4, 5, 6, 7, 8, null];
        return currentTiles.every((tile, index) => tile === solution[index]);
    };

    // Check if a specific tile is in the correct position
    const isCorrectPosition = (number, index) => {
        if (number === null) return index === 8; // Empty tile should be at position 8
        return number === index + 1; // Other tiles should match their position (+1 since array is 0-indexed)
    };

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 gap-3 bg-gray-100 p-4 rounded-lg shadow-md">
                {tiles.map((num, i) => (
                    <Tile 
                        key={i} 
                        number={num} 
                        isCorrect={isCorrectPosition(num, i)}
                        onClick={() => !isSolved && moveTile(i)} 
                    />
                ))}
            </div>
            <button 
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={resetGame}
            >
                Reset Puzzle
            </button>
        </div>
    );
};

export default PuzzleBoard;