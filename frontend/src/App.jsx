import { useState } from 'react';
import './App.css'
import ChatBox from '../components/ChatBox';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      // Dark mode
      document.body.style.background = '#0a0a0a';
      document.body.style.color = '#ffffff';
      document.documentElement.style.background = '#0a0a0a';
    } else {
      // Light mode
      document.body.style.background = '#ffffff';
      document.body.style.color = '#1a1a1a';
      document.documentElement.style.background = '#ffffff';
    }
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Futuristic Background Elements */}
      <div className="bg-pattern"></div>
      <div className="grid-overlay"></div>
      
      {/* Botón de tema en esquina */}
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* Header centrado */}
      <header className="app-header">
        <span className="title-accent">TAURO</span>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <ChatBox />
      </main>

      {/* Footer futurista */}
      <footer className="app-footer">
        <div className="footer-line"></div>
        <p className="footer-text">
          Powered by Advanced AI Technology • © 2024
        </p>
      </footer>
    </div>
  );
}

export default App
