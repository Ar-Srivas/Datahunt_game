import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Level3 = ({ onSolve }) => {
    const [sessionId, setSessionId] = useState(null);
    const [guess, setGuess] = useState("");
    const [similarity, setSimilarity] = useState(null);
    const [history, setHistory] = useState([]);
    const [targetWord, setTargetWord] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/word-game/start`);
            setSessionId(response.data.session_id);
            setHistory([]);
            setSimilarity(null);
            setGameOver(false);
            setTargetWord(null);
            setMessage("");
        } catch (error) {
            console.error("Failed to start game:", error);
            setMessage("Failed to start game. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGuess = async () => {
        if (!guess.trim()) return;
        
        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/word-game/guess`, {
                session_id: sessionId,
                guess: guess.trim().toLowerCase()
            });

            if (response.data.error) {
                setMessage(response.data.error);
                return;
            }

            const similarityScore = response.data.similarity;
            setSimilarity(similarityScore);
            
            // Add to history and sort by similarity (highest first)
            const newHistory = [...history, { word: guess, score: similarityScore }];
            newHistory.sort((a, b) => b.score - a.score);
            setHistory(newHistory);

            // Check if the guess is successful (95% similarity or exact match)
            if (response.data.is_successful) {
                setGameOver(true);
                setMessage(`You found the keyword with high similarity (${similarityScore}%)! 🎉`);
                setTargetWord(guess);
                setTimeout(() => {
                    if (onSolve) {
                        onSolve();
                    }
                }, 1500);
            } 
            // Give feedback when close but not quite there
            else if (similarityScore >= 85 && similarityScore < 95) {
                setMessage("You're getting very close! Need to reach 95% similarity.");
            }
        } catch (error) {
            console.error("Error checking guess:", error);
            setMessage("Error checking guess. Please try again.");
        } finally {
            setLoading(false);
            setGuess("");
        }
    };

    // Get color class based on similarity score (using our cyber theme)
    const getColorClass = (score) => {
        if (score >= 95) return "bg-green-900 text-green-400"; // Very hot
        if (score >= 80) return "bg-green-800 text-green-400"; // Hot
        if (score >= 65) return "bg-blue-900 text-blue-300"; // Warm
        if (score >= 50) return "bg-gray-800 text-gray-300"; // Lukewarm 
        if (score >= 35) return "bg-gray-900 text-gray-400"; // Cool
        return "bg-gray-900 text-gray-500"; // Cold
    };

    // Get temperature icon based on similarity score
    const getTemperatureIcon = (score) => {
        if (score >= 95) return "🔥"; // Very hot
        if (score >= 80) return "🔥"; // Hot
        if (score >= 65) return "♨️"; // Warm
        if (score >= 50) return "😐"; // Lukewarm
        if (score >= 35) return "❄️"; // Cool
        return "🧊"; // Cold
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-700">
                <h1 className="text-2xl font-bold mb-4 text-green-400">Level 3: The Leak</h1>
                
                <div className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h2 className="font-bold mb-2 text-green-400">Mission:</h2>
                    <p className="text-gray-300 mb-4">
                        Find the keyword hidden in Null's digital trail. Use the Semantle-style word association game to discover it.
                    </p>
                    <p className="text-gray-300 italic font-mono leading-relaxed">
                        "I operate in shadows, unseen and sly,
                        Gathering secrets as days go by.<br/>
                        Infiltrating ranks with a hidden guise,
                        My success measured by what I apprise.<br/>
                        What am I?"
                    </p>
                </div>

                {gameOver ? (
                    <div className="p-6 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg">
                        <div className="text-xl font-semibold text-green-400 mb-3">
                            {targetWord ? (
                                <>
                                    <p className="mb-2">Congratulations! You found the keyword:</p>
                                    <p className="text-2xl font-bold bg-black inline-block px-4 py-2 rounded">{targetWord}</p>
                                </>
                            ) : "You found the hidden keyword!"}
                        </div>
                        <p className="mb-4 text-gray-300">
                            This keyword unlocks the next level.
                        </p>
                        <button 
                            onClick={() => onSolve()}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Proceed to Level 4
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="p-4 mb-6 bg-gray-800 border border-gray-700 rounded-lg">
                            <h2 className="text-lg font-semibold text-green-400 mb-3">Word Game</h2>
                            <p className="text-gray-300 mb-4">
                                Guess words related to intelligence operations and cybersecurity.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    className="p-3 bg-gray-900 border border-gray-700 rounded-md flex-grow text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={guess}
                                    onChange={(e) => setGuess(e.target.value)}
                                    placeholder="Enter your guess..."
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleGuess();
                                    }}
                                    disabled={loading}
                                    autoFocus
                                />
                                <button 
                                    className={`px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                                        loading ? "opacity-75 cursor-not-allowed" : ""
                                    }`}
                                    onClick={handleGuess}
                                    disabled={loading}
                                >
                                    {loading ? "Checking..." : "Submit Guess"}
                                </button>
                            </div>
                        </div>

                        {similarity !== null && (
                            <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-2">{getTemperatureIcon(similarity)}</span>
                                        <p className="font-bold text-lg text-green-400">Similarity: {similarity}%</p>
                                    </div>
                                    <p className="text-sm text-gray-400">Need 95% to solve</p>
                                </div>
                                
                                {/* Temperature Gauge */}
                                <div className="relative w-full h-6 bg-gradient-to-r from-gray-700 via-blue-600 to-green-500 rounded-full">
                                    {/* Target threshold marker */}
                                    <div 
                                        className="absolute top-0 h-6 border-r-2 border-white border-dashed z-10"
                                        style={{ left: "95%" }}
                                    ></div>
                                    
                                    <div className="absolute top-0 left-0 right-0 h-full flex items-center">
                                        {/* Position marker based on similarity */}
                                        <div 
                                            className="h-8 w-3 bg-white border-2 border-gray-900 rounded-full" 
                                            style={{ 
                                                marginLeft: `calc(${similarity}% - 6px)`,
                                                transform: "translateY(-1px)"
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                
                                {/* Labels */}
                                <div className="flex justify-between text-xs mt-1">
                                    <span className="text-gray-400">Cold</span>
                                    <span className="text-green-400">Hot</span>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className={`mt-4 p-3 rounded ${
                                message.includes("Congratulations") || message.includes("95%") 
                                    ? 'bg-green-900 bg-opacity-40 text-green-300 border border-green-700' 
                                    : 'bg-red-900 bg-opacity-40 text-red-300 border border-red-700'
                            }`}>
                                {message}
                            </div>
                        )}
                    </>
                )}

                <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <h2 className="text-xl font-semibold mb-3 text-green-400">Previous Guesses:</h2>
                    {history.length === 0 ? (
                        <p className="text-gray-500 italic">No guesses yet</p>
                    ) : (
                        <div className="overflow-auto max-h-64">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-900">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Word</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Similarity</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Temperature</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-900 divide-y divide-gray-800">
                                    {history.map((entry, index) => (
                                        <tr key={index} className={getColorClass(entry.score)}>
                                            <td className="px-4 py-3 font-mono">{entry.word}</td>
                                            <td className="px-4 py-3">{entry.score}%</td>
                                            <td className="px-4 py-3 text-xl">{getTemperatureIcon(entry.score)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Level3;