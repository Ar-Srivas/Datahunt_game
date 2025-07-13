import React, { useState } from "react";
import MapComponent from "../components/MapComponent";

export default function Level2({ onSolve }) {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerError, setAnswerError] = useState("");
  const [showRiddle, setShowRiddle] = useState(false);
  const [checkedPoints, setCheckedPoints] = useState({});

  // Updated coordinate data forming a clear pattern
  const coordinateData = [
    { "id": 1, "location": "Point Alpha", "description": "Null infiltrated the network hub, corrupting critical logs.", "coordinates": "26.2, 78.2", "elevation": 70, "region": "Sector 1" },
    { "id": 2, "location": "Point Beta", "description": "A secure terminal was breached, exposing confidential credentials.", "coordinates": "19.0, 73.0", "elevation": 65, "region": "Zone A" },
    { "id": 3, "location": "Point Gamma", "description": "Surveillance systems compromised, rendering security blind.", "coordinates": "20.3, 82.1", "elevation": 60, "region": "Sector 2" },
    { "id": 4, "location": "Point Delta", "description": "The firewall was bypassed, allowing unauthorized data access.", "coordinates": "18.5, 83.1", "elevation": 55, "region": "Zone B" },
    { "id": 5, "location": "Point Epsilon", "description": "Remote workstations were infected, spreading a silent exploit.", "coordinates": "18.3, 83.0", "elevation": 50, "region": "Sector 3" },
    { "id": 6, "location": "Point Zeta", "description": "An encrypted database was forcefully decrypted and altered.", "coordinates": "18.1, 82.9", "elevation": 45, "region": "Zone C" },
    { "id": 7, "location": "Point Eta", "description": "Communication relays were jammed, disrupting all transmissions.", "coordinates": "17.8, 82.8", "elevation": 40, "region": "Sector 4" },
    { "id": 8, "location": "Point Theta", "description": "Critical system logs were erased, concealing traces of intrusion.", "coordinates": "17.6, 82.7", "elevation": 35, "region": "Zone D" },
    { "id": 9, "location": "Point Iota", "description": "Key encryption keys were stolen, rendering all security obsolete.", "coordinates": "17.8, 83.0", "elevation": 30, "region": "Sector 5" },
    { "id": 10, "location": "Point Kappa", "description": "Null executed the final payload, shutting down the mainframe.", "coordinates": "17.9, 83.2", "elevation": 25, "region": "Zone E" },
    { "id": 11, "location": "Point Lambda", "description": "Null's signal source traced to this final breach.", "coordinates": "17.6, 83.2", "elevation": 20, "region": "Unknown Sector" }
  ];
  
  const handleSolve = () => {
    setMessage("Great job! You've placed markers on the map. What location does this pattern point to?");
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    
    // Convert answer to lowercase and trim whitespace
    const userAnswer = answer.toLowerCase().trim();
    
    // Check for both spelling variations
    if (userAnswer === "visakhapatnam" || userAnswer === "vishakhapatnam") {
      setMessage("Correct! Proceed to the next level.");
      setAnswerError("");
      if (onSolve) {
        onSolve();
      }
    } else {
      setAnswerError("Incorrect. Try again. Look at the pattern formed closely.");
    }
  };

  const toggleRiddle = () => {
    setShowRiddle(!showRiddle);
  };

  const handleCheckboxChange = (pointId) => {
    setCheckedPoints(prev => ({
      ...prev,
      [pointId]: !prev[pointId]
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-green-400">Level 2 - Coordinate Pattern Analysis</h1>
        
        <div className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h1 className="font-bold mb-2 text-green-500">Mission:</h1>
          <p className="text-gray-300 italic font-mono leading-relaxed text-green-400">
            "Numbers trace a hidden path, scattered yet drawn toward the waves. Where the coastline bends, a pattern takes shape—converging at a place where trade, history, and the sea intertwine. Follow the cluster, and the answer will reveal itself."
          </p>
          
          <div className="mt-4 text-gray-400 text-sm">
            <p>Analyze the coordinate data and identify the pattern to discover what location they point to.</p>
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-2 py-3 text-center text-xs font-medium text-green-400 uppercase tracking-wider">Check</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Point</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">X, Y</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Elevation (m)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Region</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {coordinateData.map((point) => (
                  <tr key={point.id} className={`hover:bg-gray-800 ${checkedPoints[point.id] ? 'bg-gray-800 bg-opacity-50' : ''}`}>
                    <td className="px-2 py-4 whitespace-nowrap text-center">
                      <input 
                        type="checkbox"
                        checked={!!checkedPoints[point.id]}
                        onChange={() => handleCheckboxChange(point.id)}
                        className="form-checkbox h-5 w-5 text-green-500 rounded border-gray-600 bg-gray-700 focus:ring-green-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-400">Point {point.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{point.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{point.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">{point.coordinates}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{point.elevation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{point.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6">
          <MapComponent onSolve={handleSolve} />
        </div>
        
        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-2 text-green-400">Solve the Puzzle</h2>
          
          <form onSubmit={handleAnswerSubmit} className="mt-4">
            <label className="block mb-2 font-medium text-gray-300">
              What city or location does this pattern point to?
            </label>
            <div className="flex">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter location name"
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
            {answerError && (
              <p className="mt-2 text-red-400">{answerError}</p>
            )}
          </form>
        </div>
        
        {message && (
          <div className="mt-4 p-3 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg text-green-400">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}