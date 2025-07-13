import React, { useState, useRef, useEffect } from "react";

const Level7 = ({ onSolve }) => {
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);
  
  // The correct answer password
  const correctAnswer = "FORTRESS UNLOCKED";
  
  // Fixed audio file URL to use public folder path
  const audioUrl = "/level7.wav";
  
  // Handle audio load success
  const handleAudioLoaded = () => {
    setAudioLoaded(true);
    setAudioError(false);
  };
  
  // Handle audio load error
  const handleAudioError = () => {
    setAudioError(true);
    setAudioLoaded(false);
    console.error("Error loading audio file. Please check the file path:", audioUrl);
  };
  
  // Play audio when loaded
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.error("Error playing audio:", err);
      });
    }
  };
  
  const checkAnswer = () => {
    if (userInput.trim().toUpperCase() === correctAnswer) {
      setSuccess(true);
      setMessage("Correct! Access restored. The fortress has been unlocked.");
      setTimeout(() => onSolve(), 1500);
    } else {
      setMessage("Access denied. The code phrase is incorrect. Try again.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-green-400">Level 7 - Encrypted Transmission</h1>
        
        <div className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h2 className="font-bold mb-2 text-green-400">Mission:</h2>
          <p className="text-gray-300 italic">
            "Intercepted transmission: Data fragmented. Coordinates corrupted. Reconstruct the pattern to restore access."
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
              Access Restored!
            </div>
            <p className="mb-4 text-gray-300">
              You've successfully decoded the message and unlocked the fortress.
            </p>
            <button 
              onClick={onSolve}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Proceed to Next Level
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">Encrypted Audio Transmission:</h3>
              
              {/* Audio player with better error handling */}
              <div className="relative mb-6 bg-black p-4 rounded-lg border border-cyber-cyan overflow-hidden">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full">
                    {audioError ? (
                      <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-400 p-3 rounded">
                        Failed to load audio file. Please try downloading it instead.
                      </div>
                    ) : (
                      <>
                        <audio 
                          ref={audioRef}
                          controls 
                          className="w-full" 
                          onLoadedData={handleAudioLoaded}
                          onError={handleAudioError}
                        >
                          <source src={audioUrl} type="audio/wav" />
                          <source src={audioUrl} type="audio/mpeg" />
                          <source src={audioUrl} type="audio/mp3" />
                          Your browser does not support the audio element.
                        </audio>
                      </>
                    )}
                  </div>
                  
                  <div className="flex justify-center w-full">
                    <div className="w-full h-12 bg-black relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20 bg-noise-pattern"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-pulse text-cyber-cyan text-xs font-mono">TRANSMISSION INTERCEPTED</div>
                      </div>
                      <div className="absolute bottom-0 w-full">
                        <div className="h-3 bg-gradient-to-r from-cyber-purple via-cyber-cyan to-cyber-purple animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Download button */}
                  <div className="w-full flex justify-end">
                    <a
                      href={audioUrl}
                      download="encrypted_message.wav"
                      className="flex items-center px-3 py-1 bg-gray-800 text-cyber-cyan rounded text-sm hover:bg-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Audio
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-green-400">System Analysis:</h3>
                  <div className="bg-black p-3 rounded-lg text-cyber-cyan font-mono text-sm h-32 overflow-y-auto">
                    <p>&gt; INTERCEPTED TRANSMISSION DETECTED</p>
                    <p>&gt; SOURCE: UNKNOWN</p>
                    <p>&gt; ENCRYPTION: STANDARD VOICE PATTERN</p>
                    <p>&gt; ANALYSIS: CONTAINS ACCESS PHRASE</p>
                    <p>&gt; RECOMMENDATION: LISTEN CAREFULLY AND IDENTIFY EXACT WORDS</p>
                    <p>&gt; WARNING: CASE SENSITIVE, ENTER EXACTLY AS HEARD</p>
                    <p>&gt; AWAITING MANUAL DECRYPTION...</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-green-400">Enter Access Phrase:</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter the exact phrase from the audio"
                    className="flex-grow p-2 bg-gray-800 border border-gray-700 rounded text-cyber-cyan font-mono focus:outline-none focus:ring-2 focus:ring-cyber-cyan"
                  />
                  <button
                    onClick={checkAnswer}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            
            {message && (
              <div className={`p-4 border rounded-lg text-center mb-6 ${
                message.includes("Correct") 
                  ? "bg-green-900 bg-opacity-20 border-green-700 text-green-400" 
                  : "bg-red-900 bg-opacity-20 border-red-700 text-red-400"
              }`}>
                {message}
              </div>
            )}
          </>
        )}
      </div>
      
      {/* CSS for animated effects */}
      <style jsx>{`
        .bg-noise-pattern {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        @keyframes scanAnimation {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-scan {
          animation: scanAnimation 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Level7;