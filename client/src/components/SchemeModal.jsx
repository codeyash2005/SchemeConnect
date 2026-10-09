import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, Building, FileText, CheckCircle2, AlertTriangle, IndianRupee, GraduationCap } from 'lucide-react';
import { translations } from '../utils/translations';

export default function SchemeModal({ scheme, language, onClose }) {
  const t = translations[language];

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!scheme) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
              {scheme.type}
            </span>
            <h3>{scheme.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              <Building size={14} />
              <span>{scheme.provider}</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Description */}
          <div>
            <h4 className="modal-section-title">About the Scheme</h4>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {scheme.description}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="modal-section-title">
              <IndianRupee size={16} style={{ color: 'var(--accent)' }} />
              {t.cardBenefits}
            </h4>
            <div className="scheme-benefits-box">
              {scheme.benefit}
            </div>
          </div>

          {/* Eligibility Summary */}
          <div>
            <h4 className="modal-section-title">
              <GraduationCap size={16} style={{ color: 'var(--primary)' }} />
              {t.modalEligibilitySummary}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              <div style={{ backgroundColor: 'var(--bg-muted)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Eligible Categories:</span>
                <strong style={{ fontSize: '0.85rem' }}>{scheme.eligibleCategories.join(', ')}</strong>
              </div>
              <div style={{ backgroundColor: 'var(--bg-muted)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Eligible Courses:</span>
                <strong style={{ fontSize: '0.85rem' }}>{scheme.eligibleCourseLevels.join(', ')}</strong>
              </div>
              <div style={{ backgroundColor: 'var(--bg-muted)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Max Family Income:</span>
                <strong style={{ fontSize: '0.85rem' }}>
                  {scheme.maximumIncome ? `₹${scheme.maximumIncome.toLocaleString('en-IN')}` : 'No upper limit'}
                </strong>
              </div>
              <div style={{ backgroundColor: 'var(--bg-muted)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Min Qualifying Marks:</span>
                <strong style={{ fontSize: '0.85rem' }}>{scheme.minimumPercentage}%</strong>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h4 className="modal-section-title">
              <FileText size={16} style={{ color: 'var(--primary)' }} />
              {t.modalRequiredDocs}
            </h4>
            <ul className="docs-list">
              {scheme.requiredDocuments && scheme.requiredDocuments.length > 0 ? (
                scheme.requiredDocuments.map((doc, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={15} style={{ color: 'var(--success)', flexShrink: 0 }} />
                    <span>{doc}</span>
                  </li>
                ))
              ) : (
                <li style={{ color: 'var(--text-muted)' }}>Check official guidelines for document list.</li>
              )}
            </ul>
          </div>

          {/* Official Portal Source & Deadline */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Official Authority:</span>
              <strong>{scheme.officialSource}</strong>
            </div>
            <div style={{ fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>{t.cardDeadline}:</span>
              <strong>{scheme.deadline}</strong>
            </div>
          </div>

          {/* Mandatory Prototype Disclaimer */}
          <div className="modal-disclaimer">
            <AlertTriangle size={18} style={{ color: 'var(--warning)', flexShrink: 0, marginTop: '2px' }} />
            <span>{t.modalDisclaimer}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            {t.modalClose}
          </button>
          <a
            href={scheme.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <span>{t.modalOfficialPortal}</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
