import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ExternalLink, AlertCircle } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Footer({ language }) {
  const t = translations[language];

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1 — Branding */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-header">
              <div className="brand-icon-wrapper" aria-hidden="true">
                <GraduationCap size={18} />
              </div>
              <div>
                <h4 className="footer-brand-title">{t.brandName}</h4>
                <p className="footer-brand-subtitle">{t.brandSubtitle}</p>
              </div>
            </div>
            <p className="footer-brand-desc">{t.footerDesc}</p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="footer-col">
            <h5 className="footer-col-heading">{t.footerLinks}</h5>
            <ul className="footer-nav-list">
              <li>
                <Link to="/" className="footer-link">
                  {t.navHome}
                </Link>
              </li>
              <li>
                <Link to="/check-eligibility" className="footer-link">
                  {t.navCheck}
                </Link>
              </li>
              <li>
                <Link to="/checklist" className="footer-link">
                  {t.navChecklist}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Official Portals */}
          <div className="footer-col">
            <h5 className="footer-col-heading">{t.footerOfficialPortals}</h5>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="https://mahadbt.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link external"
                >
                  <span>MahaDBT Portal</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://scholarships.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link external"
                >
                  <span>National Scholarship Portal</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://dte.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link external"
                >
                  <span>DTE Maharashtra</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 — Important Note */}
          <div className="footer-col footer-col-note">
            <h5 className="footer-col-heading">
              <AlertCircle size={15} className="note-icon" aria-hidden="true" />
              <span>{t.footerNoteTitle}</span>
            </h5>
            <p className="footer-disclaimer-text">{t.footerDisclaimer}</p>
          </div>
        </div>

        {/* Bottom Bar: Copyright line */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright-text">{t.footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
}
