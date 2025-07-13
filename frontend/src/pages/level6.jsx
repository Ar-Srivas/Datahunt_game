import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config"; // Import from config instead of using process.env

const Level6 = ({ onSolve }) => {
  const correctSequence = ["REBOOT", "ISOLATE", "EXECUTE"];
  const [inputSequence, setInputSequence] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonHighlight, setButtonHighlight] = useState(null);
  
  const availableCommands = [
    "REBOOT", "ISOLATE", "EXECUTE", 
    "SCAN", "FIREWALL", "ANALYZE", "DECRYPT", "PATCH"
  ];
  
  // Shuffle the commands for display
  const shuffledCommands = [...availableCommands].sort(() => Math.random() - 0.5);
  
  const handleClick = (command) => {
    // Don't allow new commands if already successful or loading
    if (success || loading) return;
    
    // Don't allow duplicate commands
    if (inputSequence.includes(command)) return;
    
    // Animate button press
    setButtonHighlight(command);
    setTimeout(() => setButtonHighlight(null), 300);
    
    const newSequence = [...inputSequence, command];
    setInputSequence(newSequence);
    
    if (newSequence.length === correctSequence.length) {
      checkSequence(newSequence);
    }
  };
  
  const checkSequence = async (sequence) => {
    setLoading(true);
    try {
      // Check if the sequence matches the correct sequence
      const isCorrect = sequence.every((cmd, index) => cmd === correctSequence[index]);
      
      if (isCorrect) {
        setSuccess(true);
        setMessage("ACCESS GRANTED. CONTROL RESTORED.");
        
        // Optional: Report success to backend
        try {
          await axios.post(`${API_BASE_URL}/level6/solution`, {
            sequence: sequence
          });
        } catch (apiError) {
          console.warn("API error while reporting solution, but continuing:", apiError);
        }
        
        // Call onSolve after 2 seconds to allow for celebration
        setTimeout(() => {
          if (onSolve) {
            onSolve();
          }
        }, 2000);
      } else {
        setMessage("ACCESS DENIED. INCORRECT SEQUENCE.");
        setTimeout(() => {
          resetSequence();
        }, 1500);
      }
    } catch (error) {
      console.error("Error checking sequence:", error);
      setMessage("SYSTEM ERROR. PLEASE TRY AGAIN.");
      setTimeout(() => {
        resetSequence();
      }, 1500);
    } finally {
      setLoading(false);
    }
  };
  
  const resetSequence = () => {
    setInputSequence([]);
    setMessage("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-green-400">Level 6 - System Override Protocol</h1>
        
        <div className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h2 className="font-bold mb-2 text-green-400">Mission:</h2>
          <p className="text-gray-300 italic">
            "The AI is locked behind layers of security. You must follow the right sequence to regain control. 
            First, clear its memory. Then, sever any outside connections. Finally, take command and force execution. 
            Fail, and the system remains locked."
          </p>
        </div>
        
        {/* Terminal display */}
        <div className="mb-6 bg-black text-green-400 p-4 font-mono rounded-lg border border-cyber-cyan shadow-inner">
          <div className="flex mb-2">
            <span className="text-gray-500 mr-2">&gt;</span>
            <span className="typing-animation">OVERRIDE SEQUENCE REQUIRED...</span>
          </div>
          
          {inputSequence.length > 0 && (
            <div className="flex mb-2">
              <span className="text-gray-500 mr-2">&gt;</span>
              <span>COMMANDS: {inputSequence.join(" -> ")}</span>
            </div>
          )}
          
          {message && (
            <div className="flex">
              <span className="text-gray-500 mr-2">&gt;</span>
              <span className={success ? "text-cyber-bright-cyan font-bold" : "text-cyber-orange"}>
                {message}
              </span>
            </div>
          )}
        </div>
        
        {/* Command slots */}
        <div className="flex justify-center space-x-4 mb-6">
          {[0, 1, 2].map((index) => (
            <div 
              key={index}
              className={`w-32 h-16 border-2 flex items-center justify-center text-lg font-mono
                ${inputSequence[index] 
                  ? "border-cyber-cyan bg-gray-800 text-cyber-cyan" 
                  : "border-gray-700 bg-gray-800 text-gray-400"}
                ${success && "border-cyber-bright-cyan bg-gray-800 text-cyber-bright-cyan"}`}
            >
              {inputSequence[index] || (index === 0 ? "1st" : index === 1 ? "2nd" : "3rd")}
            </div>
          ))}
        </div>
        
        {/* Command buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {shuffledCommands.map((command) => (
            <button
              key={command}
              onClick={() => handleClick(command)}
              disabled={inputSequence.includes(command) || success || loading}
              className={`py-3 px-2 font-mono text-sm sm:text-base
                ${inputSequence.includes(command) 
                  ? "bg-gray-800 text-gray-500 border border-gray-700" 
                  : buttonHighlight === command
                    ? "bg-cyber-purple text-white"
                    : "bg-gray-800 text-cyber-cyan border border-cyber-cyan hover:bg-gray-700"}
                rounded transition-colors duration-200
                ${(success || loading) && !inputSequence.includes(command) ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {command}
            </button>
          ))}
        </div>
        
        {/* Reset button */}
        {!success && (
          <div className="flex justify-center">
            <button
              onClick={resetSequence}
              disabled={inputSequence.length === 0 || loading || success}
              className={`px-6 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded
                ${(inputSequence.length === 0 || loading || success) 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-gray-700 hover:text-white"}`}
            >
              RESET SEQUENCE
            </button>
          </div>
        )}
        
        {success && (
          <div className="text-center mt-6">
            <div className="inline-block animate-pulse px-6 py-2 bg-cyber-bright-cyan text-gray-900 rounded-lg">
              Proceeding to next level...
            </div>
          </div>
        )}
        
        {/* Hints section */}
        <div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <h3 className="font-semibold text-green-400 mb-2">System Log:</h3>
          <ul className="list-disc pl-5 text-gray-300 space-y-1 font-mono text-sm">
            <li>Security protocol active - requires 3-step override sequence</li>
            <li>Warning: Maximum of 3 commands can be entered</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Level6;