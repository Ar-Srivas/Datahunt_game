import React, { useState } from "react";
import { API_BASE_URL } from "../config";

const Level4 = ({ onSolve }) => {
const [selectedGates, setSelectedGates] = useState(['', '', '']);
const [selectedGates2, setSelectedGates2] = useState(['', '', '']);
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);
const [solvedCircuits, setSolvedCircuits] = useState({
  circuit1: false,
  circuit2: false
});

// Available gates
const availableGates = ["AND", "OR", "NOT", "XOR", "NAND", "NOR"];

// Circuit specifications
const circuitSpecs = {
  circuit1: {
    inputA: true,
    inputB: false,
    expectedOutput: true,
    correctSequence: ["XOR", "OR", "AND"]
  },
  circuit2: {
    inputA: true,
    inputB: true,
    expectedOutput: false,
    correctSequence: ["AND", "NOR", "NOT"]
  }
};

// Handle gate selection for first circuit
const handleGateSelection = (index, gate) => {
  // If selecting the same gate that's already in this position, allow it
  if (selectedGates[index] === gate) return;
  
  // Check if this gate is already used in another position
  const otherPositions = selectedGates.filter((g, i) => i !== index);
  if (gate !== '' && otherPositions.includes(gate)) {
    setMessage("Each logic gate can only be used once per circuit!");
    return;
  }
  
  // If all checks pass, update the selection
  const newSequence = [...selectedGates];
  newSequence[index] = gate;
  setSelectedGates(newSequence);
  setMessage(""); // Clear any previous error message
};

// Handle gate selection for second circuit
const handleGateSelection2 = (index, gate) => {
  // If selecting the same gate that's already in this position, allow it
  if (selectedGates2[index] === gate) return;
  
  // Check if this gate is already used in another position
  const otherPositions = selectedGates2.filter((g, i) => i !== index);
  if (gate !== '' && otherPositions.includes(gate)) {
    setMessage("Each logic gate can only be used once per circuit!");
    return;
  }
  
  // If all checks pass, update the selection
  const newSequence = [...selectedGates2];
  newSequence[index] = gate;
  setSelectedGates2(newSequence);
  setMessage(""); // Clear any previous error message
};

// Function to check if a gate is already selected in a circuit
const isGateUsedInCircuit1 = (gate, currentIndex) => {
  if (gate === '') return false;
  return selectedGates.some((g, i) => g === gate && i !== currentIndex);
};

const isGateUsedInCircuit2 = (gate, currentIndex) => {
  if (gate === '') return false;
  return selectedGates2.some((g, i) => g === gate && i !== currentIndex);
};

// Calculate output for a single circuit
const calculateCircuitOutput = (circuitId) => {
  const gates = circuitId === "circuit1" ? selectedGates : selectedGates2;
  const specs = circuitSpecs[circuitId];
  
  // If any gates are missing, return null
  if (gates.includes('')) return null;
  
  // Start with input A
  let result = specs.inputA;
  
  // Apply each gate in sequence
  for (let i = 0; i < gates.length; i++) {
    const gate = gates[i];
    
    switch (gate) {
      case "AND":
        // For the first gate, use inputB, otherwise use false (since we only have 2 inputs)
        result = result && (i === 0 ? specs.inputB : false);
        break;
      case "OR":
        result = result || (i === 0 ? specs.inputB : false);
        break;
      case "NOT":
        result = !result;
        break;
      case "XOR":
        result = result !== (i === 0 ? specs.inputB : false);
        break;
      case "NAND":
        result = !(result && (i === 0 ? specs.inputB : false));
        break;
      case "NOR":
        result = !(result || (i === 0 ? specs.inputB : false));
        break;
      default:
        break;
    }
  }
  
  return result;
};

// Check if the circuit's output matches the expected output
const isCircuitCorrect = (circuitId) => {
  const output = calculateCircuitOutput(circuitId);
  if (output === null) return false;
  return output === circuitSpecs[circuitId].expectedOutput;
};

// Check the solution for a specific circuit
const checkSolution = (circuitId) => {
  setLoading(true);
  
  setTimeout(() => {
    const isCorrect = isCircuitCorrect(circuitId);
    
    if (isCorrect) {
      // Update the UI to show this circuit is solved
      const updatedCircuits = { ...solvedCircuits };
      updatedCircuits[circuitId] = true;
      setSolvedCircuits(updatedCircuits);
      
      // Check if both circuits are solved
      if (updatedCircuits.circuit1 && updatedCircuits.circuit2) {
        setSuccess(true);
        setMessage("Both circuits fixed! The security system has been bypassed. 🎉");
        
        // Call onSolve after a brief delay
        setTimeout(() => {
          if (onSolve) {
            onSolve();
          }
        }, 1500);
      } else {
        setMessage(`Circuit ${circuitId === "circuit1" ? "1" : "2"} is fixed! Now fix the other circuit.`);
      }
    } else {
      setMessage(`Circuit ${circuitId === "circuit1" ? "1" : "2"} isn't working correctly. Try a different configuration.`);
    }
    
    setLoading(false);
  }, 500); // Simulate a delay for processing
};

// Reset a specific circuit
const resetCircuit = (circuitId) => {
  if (circuitId === "circuit1") {
    setSelectedGates(['', '', '']);
  } else {
    setSelectedGates2(['', '', '']);
  }
  setMessage(""); // Clear any message when resetting
};

return (
  <div className="p-6 max-w-4xl mx-auto">
    <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-green-400">Level 4 - Logic Gate Circuits</h1>
      
      <div className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
        <h2 className="font-bold mb-2 text-green-400">Mission:</h2>
        <p className="text-gray-300">
          Fix the broken logic gate circuits to bypass the security system. Configure each circuit to produce the expected output.
        </p>
        <p className="text-gray-300 mt-2 italic">
          "Firewalls are just puzzles made of rules. Break the sequence, and you walk right through. But be careful—one wrong move, and the system shuts you out forever."
        </p>
        <p className="mt-3 text-amber-400 font-mono text-sm border-l-2 border-amber-400 pl-3">
          NOTE: Each type of logic gate can only be used once per circuit.
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
            Success! The firewall has been bypassed.
          </div>
          <p className="mb-4 text-gray-300">
            You've found the correct sequences for both circuits:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-gray-800 rounded border border-cyan-700">
              <p className="font-medium text-cyan-400">Circuit 1:</p>
              <p className="font-mono text-gray-300">{selectedGates.join(" → ")}</p>
            </div>
            <div className="p-3 bg-gray-800 rounded border border-purple-700">
              <p className="font-medium text-purple-400">Circuit 2:</p> 
              <p className="font-mono text-gray-300">{selectedGates2.join(" → ")}</p>
            </div>
          </div>
          <button 
            onClick={() => onSolve()}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Proceed to Next Level
          </button>
        </div>
      ) : (
        <>
          {/* Circuit 1 */}
          <div className="mb-8">
            <div className="bg-gray-800 p-3 rounded-t-lg border border-cyan-700">
              <h3 className="text-lg font-semibold text-cyan-400">Circuit 1</h3>
              <div className="flex items-center space-x-2 text-sm font-mono mt-2">
                <span className="bg-gray-900 px-2 py-1 rounded text-cyan-400 border border-gray-700">Input A = 1</span>
                <span className="bg-gray-900 px-2 py-1 rounded text-cyan-400 border border-gray-700">Input B = 0</span>
                <span className="bg-gray-900 px-2 py-1 rounded text-green-400 border border-gray-700">Expected Output = 1</span>
              </div>
            </div>
            <div className="p-6 bg-gray-800 border-2 border-cyan-700 border-t-0 rounded-b-lg">
              <div className="flex items-center justify-center space-x-2 flex-wrap gap-y-6">
                <div className="flex flex-col items-center">
                  <div className="font-bold mb-2 text-gray-300">Inputs</div>
                  <div className="w-20 h-20 rounded-full bg-gray-900 border-2 border-cyan-500 flex items-center justify-center text-cyan-400">
                    <div>
                      <div>A = 1</div>
                      <div>B = 0</div>
                    </div>
                  </div>
                </div>
                
                {/* Wire */}
                <div className="w-8 h-1 bg-cyan-500 self-center"></div>
                
                {/* Gates */}
                {[0, 1, 2].map((index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                      <div className="mb-2 text-gray-300">Gate {index + 1}</div>
                      <select 
                        value={selectedGates[index]}
                        onChange={(e) => handleGateSelection(index, e.target.value)}
                        className="p-2 border-2 border-cyan-600 rounded bg-gray-900 text-cyan-400 w-24 h-20 text-center font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="">Select...</option>
                        {availableGates.map(gate => (
                          <option 
                            key={gate} 
                            value={gate}
                            disabled={isGateUsedInCircuit1(gate, index)}
                          >
                            {gate} {isGateUsedInCircuit1(gate, index) ? "(Used)" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Wire between gates */}
                    {index < 2 && <div className="w-8 h-1 bg-cyan-500 self-center"></div>}
                  </React.Fragment>
                ))}
                
                {/* Wire */}
                <div className="w-8 h-1 bg-cyan-500 self-center"></div>
                
                {/* Output */}
                <div className="flex flex-col items-center">
                  <div className="font-bold mb-2 text-gray-300">Output</div>
                  <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-xl font-bold ${
                    calculateCircuitOutput("circuit1") === null ? 
                      "bg-gray-900 border-gray-700 text-gray-500" : 
                    calculateCircuitOutput("circuit1") ? 
                      "bg-gray-900 border-green-500 text-green-400" : 
                      "bg-gray-900 border-red-500 text-red-400"
                  }`}>
                    <div>
                      {calculateCircuitOutput("circuit1") === null ? (
                        "?"
                      ) : (
                        calculateCircuitOutput("circuit1") ? "1" : "0"
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                <p className="text-gray-300 font-mono mb-4 sm:mb-0">
                  Sequence: {selectedGates.map(g => g || "___").join(" → ")}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => checkSolution("circuit1")}
                    disabled={loading || selectedGates.includes('')}
                    className={`px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 ${
                      (loading || selectedGates.includes('')) ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Testing..." : "Test Circuit 1"}
                  </button>
                  <button
                    onClick={() => resetCircuit("circuit1")}
                    className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700 text-gray-300"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Circuit 2 */}
          <div className="mb-8">
            <div className="bg-gray-800 p-3 rounded-t-lg border border-purple-700">
              <h3 className="text-lg font-semibold text-purple-400">Circuit 2</h3>
              <div className="flex items-center space-x-2 text-sm font-mono mt-2">
                <span className="bg-gray-900 px-2 py-1 rounded text-purple-400 border border-gray-700">Input A = 1</span>
                <span className="bg-gray-900 px-2 py-1 rounded text-purple-400 border border-gray-700">Input B = 1</span>
                <span className="bg-gray-900 px-2 py-1 rounded text-green-400 border border-gray-700">Expected Output = 0</span>
              </div>
            </div>
            <div className="p-6 bg-gray-800 border-2 border-purple-700 border-t-0 rounded-b-lg">
              <div className="flex items-center justify-center space-x-2 flex-wrap gap-y-6">
                <div className="flex flex-col items-center">
                  <div className="font-bold mb-2 text-gray-300">Inputs</div>
                  <div className="w-20 h-20 rounded-full bg-gray-900 border-2 border-purple-500 flex items-center justify-center text-purple-400">
                    <div>
                      <div>A = 1</div>
                      <div>B = 1</div>
                    </div>
                  </div>
                </div>
                
                {/* Wire */}
                <div className="w-8 h-1 bg-purple-500 self-center"></div>
                
                {/* Gates */}
                {[0, 1, 2].map((index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                      <div className="mb-2 text-gray-300">Gate {index + 1}</div>
                      <select 
                        value={selectedGates2[index]}
                        onChange={(e) => handleGateSelection2(index, e.target.value)}
                        className="p-2 border-2 border-purple-600 rounded bg-gray-900 text-purple-400 w-24 h-20 text-center font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select...</option>
                        {availableGates.map(gate => (
                          <option 
                            key={gate} 
                            value={gate}
                            disabled={isGateUsedInCircuit2(gate, index)}
                          >
                            {gate} {isGateUsedInCircuit2(gate, index) ? "(Used)" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Wire between gates */}
                    {index < 2 && <div className="w-8 h-1 bg-purple-500 self-center"></div>}
                  </React.Fragment>
                ))}
                
                {/* Wire */}
                <div className="w-8 h-1 bg-purple-500 self-center"></div>
                
                {/* Output */}
                <div className="flex flex-col items-center">
                  <div className="font-bold mb-2 text-gray-300">Output</div>
                  <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-xl font-bold ${
                    calculateCircuitOutput("circuit2") === null ? 
                      "bg-gray-900 border-gray-700 text-gray-500" : 
                    calculateCircuitOutput("circuit2") === false ? 
                      "bg-gray-900 border-green-500 text-green-400" : 
                      "bg-gray-900 border-red-500 text-red-400"
                  }`}>
                    <div>
                      {calculateCircuitOutput("circuit2") === null ? (
                        "?"
                      ) : (
                        calculateCircuitOutput("circuit2") ? "1" : "0"
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                <p className="text-gray-300 font-mono mb-4 sm:mb-0">
                  Sequence: {selectedGates2.map(g => g || "___").join(" → ")}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => checkSolution("circuit2")}
                    disabled={loading || selectedGates2.includes('')}
                    className={`px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 ${
                      (loading || selectedGates2.includes('')) ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Testing..." : "Test Circuit 2"}
                  </button>
                  <button
                    onClick={() => resetCircuit("circuit2")}
                    className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700 text-gray-300"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {message && (
            <div className={`mt-4 p-4 rounded-lg text-center ${
              message.includes("fixed") || message.includes("bypassed") ? 
                "bg-green-900 bg-opacity-20 border border-green-700 text-green-400" : 
              message.includes("can only be used once") ?
                "bg-amber-900 bg-opacity-20 border border-amber-700 text-amber-400" :
                "bg-red-900 bg-opacity-20 border border-red-700 text-red-400"
            }`}>
              {message}
            </div>
          )}
        </>
      )}
    </div>
  </div>
  );
};

export default Level4;