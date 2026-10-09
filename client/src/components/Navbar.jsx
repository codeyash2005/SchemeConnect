import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Navbar({ theme, onToggleTheme, language, onToggleLanguage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const t = translations[language];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand */}
        <Link to="/" className="brand" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon-wrapper">
            <GraduationCap size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">{t.brandName}</span>
            <span className="brand-sub">{t.brandSubtitle}</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                {t.navHome}
              </Link>
            </li>
            <li>
              <Link
                to="/check-eligibility"
                className={`nav-link ${isActive('/check-eligibility') ? 'active' : ''}`}
              >
                {t.navCheck}
              </Link>
            </li>
            <li>
              <Link
                to="/checklist"
                className={`nav-link ${isActive('/checklist') ? 'active' : ''}`}
              >
                {t.navChecklist}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="nav-actions">
          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            className="lang-btn"
            title="Switch Language / भाषा बदला"
          >
            <Globe size={16} />
            <span>{language === 'en' ? 'मराठी' : 'English'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="theme-btn"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav open">
          <ul className="nav-links">
            <li>
              <Link
                to="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.navHome}
              </Link>
            </li>
            <li>
              <Link
                to="/check-eligibility"
                className={`nav-link ${isActive('/check-eligibility') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.navCheck}
              </Link>
            </li>
            <li>
              <Link
                to="/checklist"
                className={`nav-link ${isActive('/checklist') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.navChecklist}
              </Link>
            </li>
          </ul>

          <div className="mobile-nav-actions">
            <button
              onClick={() => {
                onToggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="lang-btn"
            >
              <Globe size={16} />
              <span>{language === 'en' ? 'मराठी' : 'English'}</span>
            </button>
            <button
              onClick={() => {
                onToggleTheme();
                setMobileMenuOpen(false);
              }}
              className="theme-btn"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
