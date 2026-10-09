import React from 'react';
import { CheckCircle2, Calendar, Building, ArrowRight } from 'lucide-react';
import { translations } from '../utils/translations';

export default function SchemeCard({ scheme, language, onViewDetails }) {
  const t = translations[language];

  return (
    <div className="scheme-card">
      <div className="scheme-card-header">
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            {scheme.type}
          </span>
          <h3 className="scheme-name">{scheme.name}</h3>
        </div>
        <span className="badge badge-success">
          <CheckCircle2 size={14} aria-hidden="true" />
          <span>{language === 'mr' ? 'पात्र' : 'Criteria Matched'}</span>
        </span>
      </div>

      <div className="scheme-meta">
        <span className="scheme-meta-item">
          <Building size={14} aria-hidden="true" />
          <span>{scheme.provider}</span>
        </span>
      </div>

      <p className="scheme-desc">{scheme.description}</p>

      {/* Benefit Highlight Box */}
      <div className="scheme-benefits-box">
        <strong>{t.cardBenefits}: </strong>
        <span>{scheme.benefit}</span>
      </div>

      {/* Matching Criteria Checklist */}
      {scheme.matchReasons && scheme.matchReasons.length > 0 && (
        <div className="match-reasons-box">
          <div className="match-reasons-title">
            <CheckCircle2 size={13} aria-hidden="true" />
            <span>{language === 'mr' ? 'निकष जुळवणी तपशील:' : 'Rule Criteria Matched:'}</span>
          </div>
          <ul className="match-reasons-list">
            {scheme.matchReasons.map((reason, idx) => (
              <li key={idx}>
                <CheckCircle2 size={13} style={{ color: 'var(--success)', flexShrink: 0 }} aria-hidden="true" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Card Footer */}
      <div className="scheme-card-footer">
        <div className="scheme-deadline">
          <Calendar size={14} aria-hidden="true" />
          <span>{t.cardDeadline}: <strong>{scheme.deadline}</strong></span>
        </div>

        <button
          onClick={() => onViewDetails(scheme)}
          className="btn btn-secondary btn-sm"
          aria-label={`View details for ${scheme.name}`}
        >
          <span>{t.btnViewDetails}</span>
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
