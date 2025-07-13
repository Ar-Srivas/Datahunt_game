import React, { useState, useEffect, useRef } from "react";

const Level8 = ({ onSolve }) => {
  const [logs, setLogs] = useState([]);
  const [userInput, setUserInput] = useState({
    timestamp: "",
    bypass: "",
    description: ""
  });
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [typing, setTyping] = useState(false);
  const terminalRef = useRef(null);

  // Predefined log data with updated 2025 timestamps
  const logData = [
    {
      timestamp: "2025-04-17 21:34:52",
      bypass: "SHADOW-7",
      description: "Unauthorized access detected in Mumbai grid systems."
    },
    {
      timestamp: "2025-04-17 21:36:18",
      bypass: "PHANTOM-3",
      description: "Firewall breach on power distribution nodes 12-18."
    },
    {
      timestamp: "2025-04-17 21:38:05",
      bypass: "SHADOW-9",
      description: "Critical systems isolated. Blackout sequence initiated."
    },
    // The fourth log that players need to predict
    {
      timestamp: "2025-04-17 21:40:32",
      bypass: "PHANTOM-5",
      description: "Total grid shutdown averted. Backup systems online."
    }
  ];

  // Display logs one by one with a typing effect
  useEffect(() => {
    if (logs.length < 3) {
      setTyping(true);
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, logData[logs.length]]);
        setTyping(false);
        
        // After all predefined logs are shown, display the form
        if (logs.length === 2) {
          setTimeout(() => setShowForm(true), 1000);
        }
      }, logs.length === 0 ? 1000 : 2500);
      
      return () => clearTimeout(timer);
    }
  }, [logs, typing]);

  // Auto-scroll terminal to bottom when new logs appear
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, message]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  };

  const checkAnswer = () => {
    const correctLog = logData[3];
    
    // Check if the user input matches the expected log
    // Using a somewhat flexible matching to allow for minor variations
    const timestampCorrect = userInput.timestamp.includes("21:40") || 
                             userInput.timestamp.includes("21.40") || 
                             userInput.timestamp.includes("2025-04-17 21:40");
    
    const bypassCorrect = userInput.bypass.toUpperCase().includes("PHANTOM") &&
                          userInput.bypass.includes("5");
    
    // Description is now non-required
    const descriptionCorrect = true;
    
    if (timestampCorrect && bypassCorrect && descriptionCorrect) {
      setSuccess(true);
      setMessage("✅ OVERRIDE SUCCESSFUL – Mumbai is safe!");
      // Add the correct log to the terminal
      setLogs(prev => [...prev, correctLog]);
      setTimeout(() => onSolve(), 3000);
    } else {
      setMessage("❌ OVERRIDE FAILED - Null: 'Nice try, but you'll have to do better than that.'");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-green-400">Level 8 - The Blackout Protocol</h1>
        
        <div className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-4 text-green-400">
          <h2 className="font-bold mb-2">Mission:</h2>
          <p className="text-gray-300">
            Mumbai's power grid is under cyberattack. The hacker known as "Null" has compromised 
            critical systems and initiated a blackout protocol that will shut down the city's infrastructure.
            You've accessed the grid's security logs but the final entry is corrupted. Predict the next
            missing log entry to restore system control and stop the blackout.
          </p>
        </div>
        
        {/* Terminal Display */}
        <div 
          ref={terminalRef}
          className="bg-black p-4 rounded-lg border border-gray-700 font-mono text-sm text-green-500 h-80 overflow-y-auto mb-6 relative"
        >
          <div className="sticky top-0 bg-black pb-2 border-b border-gray-800 mb-3 z-10">
            <div className="text-gray-500">
              [ MUMBAI GRID SYSTEM - EMERGENCY ACCESS TERMINAL ]
            </div>
            <div className="text-gray-500">
              [ SECURITY LOGS - CRITICAL ALERTS ]
            </div>
          </div>
          
          {logs.map((log, index) => (
            <div key={index} className="mb-4 opacity-90">
              <div className="flex flex-wrap">
                <span className="text-yellow-500 mr-2">[{log.timestamp}]</span>
                <span className="text-blue-400 mr-2">[BYPASS: {log.bypass}]</span>
              </div>
              <div className="pl-4 text-green-400 border-l-2 border-gray-800 ml-2 mt-1">{log.description}</div>
            </div>
          ))}
          
          {typing && (
            <div className="animate-pulse mt-2">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1 animate-blink"></span> 
              <span className="text-green-300">Retrieving log data...</span>
            </div>
          )}
          
          {message && (
            <div className={`mt-4 p-3 rounded ${success ? 'bg-green-900 bg-opacity-40 text-green-300 border border-green-700' : 'bg-red-900 bg-opacity-40 text-red-300 border border-red-700'}`}>
              {message}
            </div>
          )}
        </div>
        
        {/* Input Form for the missing log */}
        {showForm && !success && (
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 mb-6">
            <div className="text-red-400 mb-4 flex items-start">
              <div className="animate-pulse mr-2 text-xl">⚠️</div>
              <div>
                <div className="font-bold">ERROR: Log file corrupted. Manual entry required for system override.</div>
                <div className="text-gray-400 text-sm mt-2">
                  Analyze the pattern in the previous logs and predict the missing entry to stop the blackout.
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-semibold">Timestamp:</label>
                <input
                  type="text"
                  name="timestamp"
                  value={userInput.timestamp}
                  onChange={handleInputChange}
                  placeholder="YYYY-MM-DD HH:MM:SS"
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-green-400 font-mono focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <div className="text-xs text-gray-500 mt-1">Format: YYYY-MM-DD XX:XX:XX</div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-semibold">Encryption Bypass:</label>
                <input
                  type="text"
                  name="bypass"
                  value={userInput.bypass}
                  onChange={handleInputChange}
                  placeholder="NAME-X"
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-green-400 font-mono focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <div className="text-xs text-gray-500 mt-1">Pattern: NAME-X</div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-semibold">
                  Event Description: <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <textarea
                  name="description"
                  value={userInput.description}
                  onChange={handleInputChange}
                  placeholder="Describe what happens next in the sequence... (optional)"
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-green-400 font-mono focus:outline-none focus:ring-1 focus:ring-green-500 h-24"
                />
              </div>
              
              <button
                onClick={checkAnswer}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full font-mono font-bold mt-2"
              >
                SUBMIT OVERRIDE
              </button>
            </div>
          </div>
        )}
        
        {/* Success button to proceed */}
        {success && (
          <div className="text-center p-6 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg mb-6">
            <div className="text-xl font-semibold mb-3 text-green-400">
              System Secured
            </div>
            <p className="mb-4 text-gray-300">
              You've successfully predicted the security pattern and prevented the blackout. 
              Mumbai's critical infrastructure is now secure.
            </p>
            <button 
              onClick={onSolve}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Complete Mission
            </button>
          </div>
        )}
        
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default Level8;