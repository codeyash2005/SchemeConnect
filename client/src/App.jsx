import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EligibilityPage from './pages/EligibilityPage';
import ChecklistPage from './pages/ChecklistPage';
import { storage } from './utils/storage';
import './styles/App.css';

export default function App() {
  const [theme, setTheme] = useState(() => storage.getTheme());
  const [language, setLanguage] = useState(() => storage.getLanguage());

  // Synchronize data-theme on html/body element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storage.setTheme(theme);
  }, [theme]);

  // Synchronize language preference in LocalStorage
  useEffect(() => {
    storage.setLanguage(language);
  }, [language]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar
          theme={theme}
          onToggleTheme={handleToggleTheme}
          language={language}
          onToggleLanguage={handleToggleLanguage}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home language={language} />} />
            <Route
              path="/check-eligibility"
              element={<EligibilityPage language={language} />}
            />
            <Route
              path="/checklist"
              element={<ChecklistPage language={language} />}
            />
          </Routes>
        </main>
        <Footer language={language} />
      </div>
    </Router>
  );
}
