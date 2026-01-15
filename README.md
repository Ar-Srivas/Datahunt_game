#  DataHunt 3. 0

<div align="center">


**An interactive data science-themed puzzle game where you analyze patterns, solve data mysteries, and uncover insights across Mumbai's infrastructure.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Game Levels](#-game-levels)

</div>

---

## 📖 Overview

DataHunt 3.0 is an educational gamified experience that combines puzzle-solving with data science and analytics concepts. Players progress through 8 challenging levels, each testing different analytical and problem-solving skills in the context of data analysis, pattern recognition, and intelligent decision-making.

## ✨ Features

- 🔐 **8 Unique Levels** - Progressive difficulty with diverse puzzle types
- 🎯 **Interactive Challenges** - From binary puzzles to word association games
- 🗺️ **Map Integration** - Geolocation-based data visualization using Leaflet
- 🤖 **AI-Powered** - Semantic word similarity using Google's Generative AI
- 📊 **Progress Tracking** - Level completion and state management
- 🎨 **Modern UI** - Built with React, Tailwind CSS, and Shadcn components
- 🔊 **Multimedia** - Audio and video integration for immersive experience

## 🎮 Game Levels

| Level | Name | Challenge Type | Key Skills |
|-------|------|----------------|------------|
| **1** | Classic Puzzle | Binary & Decimal Conversion | Problem-solving, Number systems |
| **2** | Map Challenge | Geolocation Data Analysis | Geographic analysis, Pattern recognition |
| **3** | The Leak | Semantic Word Game | Vocabulary, Association, Deduction |
| **4** | Logic Gates | Circuit Puzzle | Boolean logic, Sequential reasoning |
| **5** | Data Patterns | Access Pattern Analysis | Anomaly detection, Data validation |
| **6** | [Mystery] | [Dynamic Challenge] | [Adaptive Skills] |
| **7** | Audio Cipher | Sound-based Data Puzzle | Audio analysis, Signal processing |
| **8** | Final Challenge | [Ultimate Test] | Comprehensive application |

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1 with Vite
- **Styling**: Tailwind CSS with Shadcn UI components
- **Map Library**: Leaflet & React-Leaflet
- **HTTP Client**: Axios
- **AI Integration**: Google Generative AI SDK
- **Data Processing**: PapaParse for CSV handling

### Backend
- **Framework**: FastAPI 0.103.1
- **Server**: Uvicorn & Gunicorn
- **AI/ML**: Google Generative AI for embeddings
- **Data Processing**: NumPy
- **Environment Management**: Python-dotenv

## 📂 Project Structure

```
Datahunt_game/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Level components (Level1-8)
│   │   ├── App.jsx         # Main application logic
│   │   └── config.js       # Configuration settings
│   ├── public/             # Static assets
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── routers/
    │   └── level_routes.py  # API route definitions
    ├── services/
    │   ├── level_services.py       # Core game logic
    │   └── word_game_services.py   # Word similarity service
    ├── app.py              # FastAPI application
    ├── requirements.txt
    └── Procfile           # Production deployment config
```

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check - API status |
| `GET` | `/health` | Server health status |
| `GET` | `/levels` | Get completed and available levels |
| `POST` | `/solution` | Validate level solution |
| `POST` | `/word-game/start` | Initialize word guessing game |
| `POST` | `/word-game/guess` | Submit word guess |
| `POST` | `/logic-gates/check` | Validate logic circuit solution |

## 🎯 Environment Variables

### Frontend (. env)
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Backend (.env)
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
---
