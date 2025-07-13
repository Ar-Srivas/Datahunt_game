import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!teamName.trim() || !leaderName.trim()) {
      setError('Please enter both team name and leader name');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // Store login info in localStorage
      const loginData = { 
        teamName, 
        leaderName, 
        loginTime: new Date().toISOString() 
      };
      
      localStorage.setItem('datahuntLogin', JSON.stringify(loginData));
      
      // Call the onLogin callback provided by parent component
      if (onLogin) {
        onLogin(loginData);
      }
      
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-400">Datahunt 3.0</h1>
          <h2 className="text-xl font-semibold text-gray-300 mt-2"></h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="teamName" className="block text-sm font-medium text-gray-300 mb-1">
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your team name"
            />
          </div>
          
          <div>
            <label htmlFor="leaderName" className="block text-sm font-medium text-gray-300 mb-1">
              Team Leader Name
            </label>
            <input
              id="leaderName"
              type="text"
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter team leader's name"
            />
          </div>
          
          {error && (
            <div className="text-red-300 text-sm bg-red-900 bg-opacity-40 p-2 rounded border border-red-700">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium
              ${loading ? 'bg-blue-600 opacity-70 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : 'Begin Challenge'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-400 bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="mb-2 text-left font-medium text-green-400">Rules:</h3>
          <ul className="text-left list-disc pl-6 space-y-1">
            <li>Reloading the game may result in lost progress.</li>
            <li>Use of computers, notepads, and online tools is allowed.</li>
            <li>Each team gets up to 2 hints.</li>
            <li>No external help or tampering with game elements.</li>
            <li>Fair play is expected—no hacking, modifying source codes, or obstructing others.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;