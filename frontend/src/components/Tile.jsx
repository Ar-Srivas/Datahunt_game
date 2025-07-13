import React from "react";

const Tile = ({ number, isCorrect, onClick }) => {
    return (
        <div 
            className={`w-20 h-20 flex items-center justify-center text-3xl font-bold cursor-pointer border-2 rounded-lg transition-colors duration-300
                ${number === null 
                    ? "bg-white border-dashed border-gray-400 empty" 
                    : isCorrect
                        ? "bg-green-400 text-white border-green-600 hover:bg-green-500"
                        : "bg-blue-300 border-black hover:bg-blue-400"
                }`}
            onClick={onClick}
        >
            {number !== null && number}
        </div>
    );
};

export default Tile;