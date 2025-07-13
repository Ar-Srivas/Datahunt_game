import React, { useState, useEffect } from "react";
import PuzzleBoard from "../components/PuzzleBoard";

const Level1 = ({ onSolve }) => {
    const [message, setMessage] = useState("");
    const [showBinaryCode, setShowBinaryCode] = useState(false);
    const [decimalInput, setDecimalInput] = useState("");
    const [binaryError, setBinaryError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [modalClosed, setModalClosed] = useState(false);
    
    // The secret binary code and its decimal equivalent
    const secretBinaryCode = "10110101";
    const secretDecimalValue = parseInt(secretBinaryCode, 2); // Converts to 181
    
    const handleSolve = () => {
        setMessage("Great job solving the puzzle!");
        setShowBinaryCode(true);
    };
    
    const handleDecimalSubmit = (e) => {
        e.preventDefault();
        
        // Check if the input matches the decimal value of the binary code
        if (parseInt(decimalInput) === secretDecimalValue) {
            setMessage("Correct decimal conversion! Wait for the briefing to continue.");
            setBinaryError("");
            // Show modal with video
            setShowModal(true);
        } else {
            setBinaryError("Incorrect decimal value.");
        }
    };
    
    const handleVideoEnded = () => {
        setVideoEnded(true);
    };
    
    const closeModal = () => {
        setModalClosed(true);
        setShowModal(false);
        
        // Only call onSolve after modal is closed
        if (onSolve) {
            onSolve();
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-700">
                <h1 className="text-2xl font-bold mb-4 text-green-400">Level 1: Classic Puzzle</h1>
                
                <div className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h2 className="font-bold mb-2 text-green-400">Mission:</h2>
                    <p className="text-gray-300">
                        Rearrange the tiles to solve the 8-puzzle.
                    </p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6">
                    <PuzzleBoard onSolve={handleSolve} />
                </div>
                
                {showBinaryCode && (
                    <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-green-500">
                        <h2 className="text-xl font-semibold mb-2 text-green-400">Secret Binary Code Revealed!</h2>
                        <div className="flex mb-4 justify-center">
                            {secretBinaryCode.split('').map((bit, index) => (
                                <div 
                                    key={index} 
                                    className={`w-12 h-12 m-1 flex items-center justify-center text-xl font-bold border-2 rounded ${
                                        bit === '1' ? 'bg-black text-green-400 border-green-500' : 'bg-gray-900 text-gray-400 border-gray-700'
                                    }`}
                                >
                                    {bit}
                                </div>
                            ))}
                        </div>
                        
                        <form onSubmit={handleDecimalSubmit} className="mt-4">
                            <label className="block mb-2 font-medium text-gray-300">
                                Convert this binary code to decimal and enter the number:
                            </label>
                            <div className="flex">
                                <input
                                    type="number"
                                    value={decimalInput}
                                    onChange={(e) => setDecimalInput(e.target.value)}
                                    placeholder="Enter decimal value"
                                    className="flex-grow px-4 py-2 bg-gray-900 border border-gray-700 rounded-l text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Submit
                                </button>
                            </div>
                            {binaryError && (
                                <p className="mt-2 text-red-400">{binaryError}</p>
                            )}
                        </form>
                    </div>
                )}
                
                {message && (
                    <div className="mt-4 p-3 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg text-green-400">
                        {message}
                    </div>
                )}
            </div>
            
            {/* Video Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-lg max-w-4xl w-full border border-cyber-purple shadow-lg">
                        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-cyber-cyan">Transmission Intercepted</h3>
                            {videoEnded && (
                                <button 
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            )}
                        </div>
                        
                        <div className="relative" style={{paddingBottom: "56.25%"}}>
                            <video 
                                className="absolute inset-0 w-full h-full" 
                                autoPlay 
                                controls
                                onEnded={handleVideoEnded}
                            >
                                <source src="/level1.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        
                        <div className="p-4 border-t border-gray-700">
                            {videoEnded ? (
                                <div className="flex justify-end">
                                    <button 
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-cyber-cyan text-gray-900 rounded hover:bg-cyber-bright-cyan"
                                    >
                                        Continue to Next Level
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse mr-2"></div>
                                    <p className="text-gray-300">Watching briefing... Please wait until the video completes.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Level1;