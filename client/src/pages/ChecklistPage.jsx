import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { translations } from '../utils/translations';
import { CheckSquare, Square, RotateCcw, AlertCircle, Check } from 'lucide-react';

const DEFAULT_DOCUMENTS = [
  { id: 'aadhaar', name: 'Aadhaar Card (Linked with active mobile number & bank)', requiredType: 'Mandatory for all portals' },
  { id: 'domicile', name: 'Maharashtra Domicile Certificate', requiredType: 'State schemes' },
  { id: 'income', name: 'Income Certificate (Issued by Tahsildar for current financial year)', requiredType: 'Income-capped schemes' },
  { id: 'caste', name: 'Caste Certificate / Tribe Certificate', requiredType: 'Reserved categories (SC/ST/OBC/VJNT/SBC)' },
  { id: 'caste_validity', name: 'Caste Validity Certificate', requiredType: 'Professional / Technical degree admissions' },
  { id: 'marksheet', name: 'Previous Qualifying Examination Marksheet (SSC / HSC / Degree)', requiredType: 'Academic verification' },
  { id: 'bonafide', name: 'College Admission Receipt / Bonafide Certificate', requiredType: 'Current enrollment verification' },
  { id: 'bank', name: 'Bank Account Passbook / Cancelled Cheque (Aadhaar Seeded)', requiredType: 'Direct Benefit Transfer (DBT)' },
  { id: 'cap_letter', name: 'CAP Allotment Letter (For centralized technical admissions)', requiredType: 'Professional engineering/management' },
  { id: 'pwd_cert', name: 'Disability Certificate (UDID card or Medical Authority >= 40%)', requiredType: 'Applicable for PwD students' },
];

export default function ChecklistPage({ language }) {
  const t = translations[language];

  const [checkedMap, setCheckedMap] = useState({});

  useEffect(() => {
    const saved = storage.getChecklist();
    if (saved && typeof saved === 'object') {
      setCheckedMap(saved);
    }
  }, []);

  const toggleDoc = (id) => {
    const updated = {
      ...checkedMap,
      [id]: !checkedMap[id],
    };
    setCheckedMap(updated);
    storage.setChecklist(updated);
  };

  const handleReset = () => {
    setCheckedMap({});
    storage.setChecklist({});
  };

  const totalCount = DEFAULT_DOCUMENTS.length;
  const completedCount = DEFAULT_DOCUMENTS.filter((doc) => checkedMap[doc.id]).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="container">
      <div className="checklist-container">
        {/* Header */}
        <div className="checklist-header">
          <h1 className="section-title">{t.chkTitle}</h1>
          <p className="section-subtitle">{t.chkSubtitle}</p>
        </div>

        {/* Progress Card */}
        <div className="checklist-progress-card">
          <div className="progress-info">
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                {completedCount} of {totalCount} {t.chkProgress}
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {progressPercent}% readiness achieved
              </span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button onClick={handleReset} className="btn btn-secondary btn-sm">
            <RotateCcw size={14} />
            <span>{t.chkReset}</span>
          </button>
        </div>

        {/* Checklist items */}
        <div className="checklist-items">
          {DEFAULT_DOCUMENTS.map((doc) => {
            const isChecked = !!checkedMap[doc.id];
            return (
              <div
                key={doc.id}
                className={`checklist-item ${isChecked ? 'checked' : ''}`}
                onClick={() => toggleDoc(doc.id)}
              >
                <div className="checklist-checkbox">
                  {isChecked && <Check size={14} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="checklist-text">{doc.name}</div>
                  <span style={{ fontSize: '0.75rem', color: isChecked ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
                    {doc.requiredType}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice alert */}
        <div className="alert alert-info">
          <AlertCircle size={20} style={{ flexShrink: 0, color: 'var(--primary)' }} />
          <div>
            <strong>Notice</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>{t.chkNotice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
