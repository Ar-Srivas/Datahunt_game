import React, { useState } from "react";

const Level5 = ({ onSolve }) => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  
  // Updated access pattern dataset
  const dataset = [
      { "time": "08:45", "location": "Mumbai, India", "ip": "192.168.5.10", "device": "Secure Terminal", "user": "sec_admin" },
      { "time": "03:12", "location": "Singapore", "ip": "203.44.56.78", "device": "Workstation", "user": "sec_admin" },
      { "time": "14:20", "location": "Mumbai, India", "ip": "192.168.5.15", "device": "Core Workstation", "user": "analyst_01" },
      { "time": "05:30", "location": "London, UK", "ip": "185.22.67.90", "device": "Secure Terminal", "user": "null_000" },
      { "time": "17:55", "location": "Mumbai, India", "ip": "192.168.5.20", "device": "Research Workstation", "user": "root_sys" },
      { "time": "01:45", "location": "Mumbai, India", "ip": "45.188.99.201", "device": "VPN Proxy", "user": "sys_admin" },
      { "time": "19:30", "location": "Mumbai, India", "ip": "192.168.5.22", "device": "Secure Terminal", "user": "sec_admin" },
      { "time": "11:10", "location": "Tokyo, Japan", "ip": "210.56.77.88", "device": "Mobile Access Node", "user": "null_001" },
      { "time": "16:25", "location": "Mumbai, India", "ip": "192.168.5.24", "device": "AI Core Terminal", "user": "root_sys" },
      { "time": "04:05", "location": "Moscow, Russia", "ip": "193.44.89.102", "device": "Remote Access Node", "user": "analyst_02" }
  ];
  
  // State for user's answers - initialize all to "Authorized" instead of "Select"
  const [userAnswers, setUserAnswers] = useState(Array(dataset.length).fill("Authorized"));
  
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };
  
  const checkAnswers = () => {
    // The correct unauthorized entries are at indices 3, 5, and 7
    const expectedUnauthorizedIndices = [3, 5, 7]; 
    
    // Get indices of all entries the user marked as unauthorized
    const userUnauthorizedIndices = userAnswers.map((answer, index) => 
      answer === "Unauthorized" ? index : -1).filter(index => index !== -1);
    
    // Check if the user selected the correct unauthorized entries
    const correctEntriesSelected = expectedUnauthorizedIndices.every(index => 
      userUnauthorizedIndices.includes(index));
    
    if (correctEntriesSelected && userUnauthorizedIndices.length === expectedUnauthorizedIndices.length) {
      setSuccess(true);
      setMessage("Correct! You've successfully identified the unauthorized access attempts.");
      onSolve && onSolve(5);
    } else {
      setMessage("Your security analysis is incorrect. Review the access logs and try again.");
    }
  };
  
  const handleProceed = () => {
    console.log("Proceeding to next level");
    if (typeof onSolve === 'function') {
      onSolve();
    } else {
      console.error("onSolve is not a function:", onSolve);
    }
  };
  
  const resetAnswers = () => {
    setUserAnswers(Array(dataset.length).fill("Authorized"));
    setMessage("");
    setSuccess(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-green-400">Level 5 - Security Breach Analysis</h1>
        
        <div className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h2 className="font-bold mb-2 text-green-400">Mission:</h2>
          <p className="text-gray-300">
            Analyze the login records and identify any suspicious access patterns. Mark 3 suspicious 
            logins as "Unauthorized" to help secure the system.
          </p>
          <br></br>
          <p className="text-gray-300 italic">
          "Most logins follow a pattern—secure locations, known users, expected devices. But something’s off. A ghost in the system, an outsider slipping through, and a terminal that doesn’t belong. Find the 
          three breaches before Null covers their tracks."
          </p>
        </div>
        
        {success ? (
          <div className="text-center p-6 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg mb-6 text-green-400">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="text-xl font-semibold mb-3">
              Success! The security breach has been identified.
            </div>
            <p className="mb-4 text-gray-300">
              You've successfully identified the unauthorized access attempts in the system logs.
            </p>
            
            <button 
              onClick={handleProceed}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Proceed to Next Level
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">Login Activity Records:</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-700">
                <table className="min-w-full bg-gray-800">
                  <thead>
                    <tr className="bg-gray-900">
                      <th className="py-2 px-4 border-b border-gray-700 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Time</th>
                      <th className="py-2 px-4 border-b border-gray-700 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Location</th>
                      <th className="py-2 px-4 border-b border-gray-700 text-left text-xs font-medium text-green-400 uppercase tracking-wider">IP Address</th>
                      <th className="py-2 px-4 border-b border-gray-700 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Device</th>
                      <th className="py-2 px-4 border-b border-gray-700 text-left text-xs font-medium text-green-400 uppercase tracking-wider">User</th>
                      <th className="py-2 px-4 border-b border-gray-700 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataset.map((entry, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}>
                        <td className="py-2 px-4 border-b border-gray-700 text-gray-300">{entry.time}</td>
                        <td className="py-2 px-4 border-b border-gray-700 text-gray-300">{entry.location}</td>
                        <td className="py-2 px-4 border-b border-gray-700 text-gray-300 font-mono text-sm">{entry.ip}</td>
                        <td className="py-2 px-4 border-b border-gray-700 text-gray-300">{entry.device}</td>
                        <td className="py-2 px-4 border-b border-gray-700 text-gray-300 font-mono">
                          {/* Highlight suspicious users with a different color */}
                          <span className={entry.user === "--Unknown--" || entry.user === "null_001" ? "text-cyber-orange" : ""}>
                            {entry.user}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-gray-700">
                          <select
                            value={userAnswers[index]}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            className={`p-2 border rounded font-mono focus:outline-none focus:ring-2 w-full ${
                              userAnswers[index] === "Authorized" 
                                ? "bg-green-900 bg-opacity-20 border-green-700 text-green-400" 
                                : "bg-red-900 bg-opacity-20 border-red-700 text-red-400"
                            }`}
                          >
                            <option value="Authorized">Authorized</option>
                            <option value="Unauthorized">Unauthorized</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={checkAnswers}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Analysis
              </button>
              
              <button
                onClick={resetAnswers}
                className="px-6 py-2 border border-gray-600 rounded hover:bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Reset
              </button>
            </div>
            
            {message && (
              <div className={`mt-4 p-4 rounded-lg text-center ${
                message.includes("Correct") ? 
                  "bg-green-900 bg-opacity-20 border border-green-700 text-green-400" : 
                  "bg-red-900 bg-opacity-20 border border-red-700 text-red-400"
              }`}>
                {message}
              </div>
            )}
            
            <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <h3 className="font-semibold text-green-400 mb-2">Security Analysis Tips:</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                  <li>Identify anomalies in the security logs.</li>                
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Level5;