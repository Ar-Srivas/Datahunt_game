import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import Level1 from "./pages/level1";
import Level2 from "./pages/level2";
import Level3 from "./pages/level3";
import Level4 from "./pages/level4";
import Level5 from "./pages/level5";
import Level6 from "./pages/level6";
import Level7 from "./pages/level7";
import Level8 from "./pages/level8";
import EndPage from "./pages/endpage";
import LoginPage from "./pages/loginpage";
import axios from "axios";
import { API_BASE_URL } from "./config";
import './index.css';

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [availableLevels, setAvailableLevels] = useState([1]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  useEffect(() => {
    // Check if user is already logged in
    const storedLoginData = localStorage.getItem('datahuntLogin');
    if (storedLoginData) {
      try {
        const loginData = JSON.parse(storedLoginData);
        setUser(loginData);
        setIsLoggedIn(true);
      } catch (error) {
        localStorage.removeItem('datahuntLogin');
      }
    }
    
    fetchLevelStatus();
  }, []);
  
  const fetchLevelStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/levels`);
      
      // Set completed levels
      const backendCompleted = response.data.completed || [];
      setCompletedLevels(backendCompleted);
      
      // Set available levels - ensure we have at least level 1
      const backendAvailable = response.data.available || [];
      const availableLevelsSet = new Set([1, ...backendAvailable]);
      
      // Make sure all levels up to current level and completed levels are available
      backendCompleted.forEach(level => {
        availableLevelsSet.add(level);
        if (level < 8) availableLevelsSet.add(level + 1);
      });
      
      setAvailableLevels(Array.from(availableLevelsSet).sort((a, b) => a - b));
      
    } catch (error) {
      // Use default values if API fails
      setAvailableLevels([1]);
    }
  };
  
  const handleLevelComplete = async (levelId) => {
    try {
      // Add the completed level to the completed levels array
      if (!completedLevels.includes(levelId)) {
        setCompletedLevels(prev => [...prev, levelId]);
      }
      
      // If Level 8 is completed, show the EndPage
      if (levelId === 8) {
        setGameCompleted(true);
        return;
      }
      
      // Otherwise, proceed to the next level
      try {
        // Try to call the API but don't block if it fails
        const response = await axios.post(`${API_BASE_URL}/solution`, {
          level_id: levelId,
          dev_mode: false,
          team_name: user?.teamName || "Anonymous"
        });
        
        if (response.data.next_level) {
          setCurrentLevel(response.data.next_level);
          fetchLevelStatus();
        }
      } catch (apiError) {
        // Silent catch
      }
      
      // Always progress to next level even if API fails
      const nextLevel = levelId + 1;
      setCurrentLevel(nextLevel);
      
      // Update available levels to include the next level
      setAvailableLevels(prev => {
        if (!prev.includes(nextLevel)) {
          return [...prev, nextLevel].sort((a, b) => a - b);
        }
        return prev;
      });
      
    } catch (error) {
      // If Level 8 is completed, show the EndPage regardless of API response
      if (levelId === 8) {
        setGameCompleted(true);
        return;
      }
      
      // Otherwise move to next level even if API fails
      const nextLevel = levelId + 1;
      setCurrentLevel(nextLevel);
      setAvailableLevels(prev => {
        if (!prev.includes(nextLevel)) {
          return [...prev, nextLevel].sort((a, b) => a - b);
        }
        return prev;
      });
    }
  };

  const handleLogin = (loginData) => {
    setUser(loginData);
    setIsLoggedIn(true);
    
    // Optionally send login data to backend
    try {
      axios.post(`${API_BASE_URL}/login`, {
        team_name: loginData.teamName,
        leader_name: loginData.leaderName,
        login_time: loginData.loginTime
      }).catch(err => {
        // Silent catch
      });
    } catch (error) {
      // Silent catch
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('datahuntLogin');
    setUser(null);
    setIsLoggedIn(false);
    setGameCompleted(false);
    setCurrentLevel(1);
    setCompletedLevels([]);
    setAvailableLevels([1]);
  };
  
  const resetGame = () => {
    setGameCompleted(false);
    setCurrentLevel(1);
  };

  const renderLevel = () => {
    switch (currentLevel) {
      case 1:
        return <Level1 onSolve={() => handleLevelComplete(1)} />;
      case 2:
        return <Level2 onSolve={() => handleLevelComplete(2)} />;
      case 3:
        return <Level3 onSolve={() => handleLevelComplete(3)} />;
      case 4:
        return <Level4 onSolve={() => handleLevelComplete(4)} />;
      case 5:
        return <Level5 onSolve={() => handleLevelComplete(5)} />;
      case 6:
        return <Level6 onSolve={() => handleLevelComplete(6)} />;
      case 7:
        return <Level7 onSolve={() => handleLevelComplete(7)} />;
      case 8:
        return <Level8 onSolve={() => handleLevelComplete(8)} />;
      default:
        return <div className="p-6 text-center">Level not found</div>;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }
  
  if (gameCompleted) {
    return (
      <>
        <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-4 relative z-30 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold" style={{ color: "#FF6600" }}>
                DataHunt 3.0
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={resetGame}
                className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg border border-gray-700"
              >
                Play Again
              </button>
              
              <button
                onClick={handleLogout}
                className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg border border-gray-700"
                style={{ color: "#FF6600" }}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
        <EndPage />
      </>
    );
  }

  return (
    <div className="App relative min-h-screen">
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-4 relative z-30 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold" style={{ color: "#FF6600" }}>
              DataHunt 3.0
            </h1>
          </div>
          
          <div className="flex items-center">
            {/* Team name */}
            {user && (
              <span className="text-sm bg-gray-800 px-3 py-1 rounded-lg border border-gray-700">
                Team: <span className="font-semibold" style={{ color: "#FF6600" }}>{user.teamName}</span>
              </span>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto pt-8 pb-20">
        {renderLevel()}
      </div>
      
      {/* Logout button in bottom right corner */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-lg border border-gray-700 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span style={{ color: "#FF6600" }}>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default App;