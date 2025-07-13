import React, { useState, useEffect, useRef } from "react";

const EndPage = () => {
  const [typedText, setTypedText] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const terminalRef = useRef(null);
  
  const fullText = "⚡ SYSTEM OVERRIDE SUCCESSFUL ⚡\nMumbai's power grid is secure. The blackout protocol has been neutralized.";
  const nullQuote = "Not bad. You traced my steps, broke my sequence, and stopped the blackout. But don't mistake this for victory... You were always just playing my game.";
  const finalMessage = "CONNECTION LOST. SIGNAL TERMINATED.\nNULL HAS DISCONNECTED.\nStatus: City Safe... For Now.";

  // Typing effect for the success message
  useEffect(() => {
    let currentIndex = 0;
    setShowContent(true);
    
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowQuote(true), 1000);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  // Show final elements sequentially
  useEffect(() => {
    if (showQuote) {
      setTimeout(() => setShowFinalMessage(true), 3000);
    }
    
    if (showFinalMessage) {
      setTimeout(() => setShowButton(true), 2000);
    }
  }, [showQuote, showFinalMessage]);
  
  // Auto-scroll terminal when content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [typedText, showQuote, showFinalMessage]);
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyber-cyan glitch-textm text-orange-300">MISSION COMPLETE</h1>
          <div className="h-1 w-48 bg-cyber-purple mx-auto mt-2"></div>
        </div>
        
        <div 
          ref={terminalRef}
          className="bg-black p-6 rounded-lg border border-cyber-bright-cyan shadow-xl shadow-cyber-purple/30 font-mono text-cyber-cyan h-96 overflow-y-auto mb-8 relative"
        >
          {showContent && (
            <div className="space-y-6">
              {/* Success message with typing effect */}
              <div className="text-center">
                <pre className="whitespace-pre-line text-xl font-bold text-cyber-bright-cyan">{typedText}</pre>
              </div>
              
              {/* Null's quote */}
              {showQuote && (
                <div className="mt-8 border-l-4 border-cyber-orange pl-4 text-cyber-orange italic fade-in text-green-400">
                  <p className="mb-2 text-xs text-cyber-orange">INCOMING TRANSMISSION:</p>
                  <p className="text-cyber-orange">"{nullQuote}"</p>
                  <p className="text-right text-cyber-orange mt-2">- NULL</p>
                </div>
              )}
              
              {/* Final terminal message */}
              {showFinalMessage && (
                <div className="mt-8 text-center fade-in">
                  <div className="inline-block bg-cyber-purple/20 p-4 border border-cyber-purple rounded">
                    <pre className="whitespace-pre-line text-cyber-bright-cyan font-bold">{finalMessage}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Blinking cursor */}
          <div className="h-4 w-3 bg-cyber-cyan inline-block ml-1 animate-blink"></div>
        </div>
        
        {/* Team stats and congratulations */}
        <div className="bg-gray-800 p-6 rounded-lg border border-cyber-purple mb-8">
          <h2 className="text-xl font-bold mb-4 text-cyber-cyan">Mission Debriefing</h2>
          <p className="text-orange-300 mb-4">

            Congratulations on completing the Data Hunt challenge! Your analytical skills and
            persistence have prevented a simulated cyberattack on Mumbai's critical infrastructure.
          </p>
        </div>
        
        {/* Final button */}
        {showButton && (
          <div className="text-center fade-in">
            <a 
              href="/"
              className="inline-block px-8 py-4 bg-cyber-bright-cyan text-gray-900 rounded-lg hover:bg-cyber-cyan transition-colors font-bold text-lg"
            >
              Return to Home
            </a>
            
            <p className="mt-4 text-gray-500 text-sm">
              Thank you for participating in the Data Hunt Challenge.
            </p>
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
        
        .fade-in {
          animation: fadeIn 1s ease-in;
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .glitch-text {
          text-shadow: 
            0.05em 0 0 rgba(255, 102, 0, .75),
            -0.025em -0.05em 0 rgba(0, 240, 168, .75),
            0.025em 0.05em 0 rgba(90, 0, 255, .75);
          animation: glitch 500ms infinite;
        }
        
        @keyframes glitch {
          0% {
            text-shadow: 
              0.05em 0 0 rgba(255, 102, 0, .75),
              -0.05em -0.025em 0 rgba(0, 240, 168, .75),
              -0.025em 0.05em 0 rgba(90, 0, 255, .75);
          }
          14% {
            text-shadow: 
              0.05em 0 0 rgba(255, 102, 0, .75),
              -0.05em -0.025em 0 rgba(0, 240, 168, .75),
              -0.025em 0.05em 0 rgba(90, 0, 255, .75);
          }
          15% {
            text-shadow: 
              -0.05em -0.025em 0 rgba(255, 102, 0, .75),
              0.025em 0.025em 0 rgba(0, 240, 168, .75),
              -0.05em -0.05em 0 rgba(90, 0, 255, .75);
          }
          49% {
            text-shadow: 
              -0.05em -0.025em 0 rgba(255, 102, 0, .75),
              0.025em 0.025em 0 rgba(0, 240, 168, .75),
              -0.05em -0.05em 0 rgba(90, 0, 255, .75);
          }
          50% {
            text-shadow: 
              0.025em 0.05em 0 rgba(255, 102, 0, .75),
              0.05em 0 0 rgba(0, 240, 168, .75),
              0 -0.05em 0 rgba(90, 0, 255, .75);
          }
          99% {
            text-shadow: 
              0.025em 0.05em 0 rgba(255, 102, 0, .75),
              0.05em 0 0 rgba(0, 240, 168, .75),
              0 -0.05em 0 rgba(90, 0, 255, .75);
          }
          100% {
            text-shadow: 
              -0.025em 0 0 rgba(255, 102, 0, .75),
              -0.025em -0.025em 0 rgba(0, 240, 168, .75),
              -0.025em -0.05em 0 rgba(90, 0, 255, .75);
          }
        }
      `}</style>
    </div>
  );
};

export default EndPage;