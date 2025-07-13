// API URL configuration with support for local development and production
export const API_BASE_URL = 
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
    ? "http://127.0.0.1:8000"  // Local development
    : "https://datahunt-mkbs.onrender.com";  // Render backend URL