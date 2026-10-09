import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { storage } from '../utils/storage';
import { translations } from '../utils/translations';
import EligibilityForm from '../components/EligibilityForm';
import SchemeCard from '../components/SchemeCard';
import SchemeModal from '../components/SchemeModal';
import { AlertCircle, HelpCircle, Layers, CheckCircle } from 'lucide-react';

export default function EligibilityPage({ language }) {
  const t = translations[language];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matchingSchemes, setMatchingSchemes] = useState(null); // null when not evaluated yet
  const [evaluatedProfile, setEvaluatedProfile] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [allSchemes, setAllSchemes] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load all schemes on mount for context or fallback
  useEffect(() => {
    async function loadSchemes() {
      try {
        const res = await api.getAllSchemes();
        if (res.schemes) {
          setAllSchemes(res.schemes);
        }
      } catch (err) {
        console.warn('Initial schemes fetch note:', err.message);
      } finally {
        setInitialLoading(false);
      }
    }

    loadSchemes();

    // Check if there's an existing profile saved in LocalStorage
    const savedProfile = storage.getProfile();
    if (savedProfile) {
      handleCheckEligibility(savedProfile);
    }
  }, []);

  const handleCheckEligibility = async (profile) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.checkEligibility(profile);
      setMatchingSchemes(response.schemes || []);
      setEvaluatedProfile(profile);
    } catch (err) {
      setError(err.message || t.errorLoad);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="eligibility-layout">
        {/* Left Column: Form */}
        <div>
          <EligibilityForm
            language={language}
            onSubmit={handleCheckEligibility}
            loading={loading}
            initialProfile={evaluatedProfile}
          />
        </div>

        {/* Right Column: Results */}
        <div>
          {/* Error Banner */}
          {error && (
            <div className="alert alert-danger">
              <AlertCircle size={20} style={{ flexShrink: 0 }} />
              <div>
                <strong>{t.errorLoad}</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>{error}</p>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div
                className="spinner spinner-primary"
                style={{ width: '2.5rem', height: '2.5rem', margin: '0 auto 1.25rem auto' }}
              />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t.btnChecking}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Evaluating criteria against active database records...
              </p>
            </div>
          )}

          {/* Initial State (No search performed yet) */}
          {!loading && matchingSchemes === null && (
            <div className="card" style={{ padding: '2.5rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div className="brand-icon-wrapper" style={{ width: '2.25rem', height: '2.25rem' }}>
                  <Layers size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem' }}>Scholarship Database Ready</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {allSchemes.length > 0 ? `${allSchemes.length} verified schemes available` : 'Ready to evaluate'}
                  </span>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Complete the profile form on the left with your academic details, annual family income, category, and domicile. When you click <strong>"Check Eligible Schemes"</strong>, our backend rule engine will filter and present only the schemes where you satisfy all criteria.
              </p>

              <div style={{ backgroundColor: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--success)' }} />
                  What the engine checks:
                </h4>
                <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li>Caste / Social category matching</li>
                  <li>Family annual income threshold verification</li>
                  <li>Course level eligibility (JC, UG, PG, Professional)</li>
                  <li>Previous qualifying examination percentage cutoff</li>
                  <li>Disability / PwD criteria where applicable</li>
                </ul>
              </div>
            </div>
          )}

          {/* Results: Matching Schemes Found */}
          {!loading && matchingSchemes !== null && matchingSchemes.length > 0 && (
            <div>
              <div className="results-header">
                <div>
                  <h2 className="results-title">
                    <span>{t.resultsTitle}</span>
                    <span className="badge badge-success">
                      {matchingSchemes.length} {t.resultsFound}
                    </span>
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Showing schemes matched for: <strong>{evaluatedProfile?.category}</strong>, Income: <strong>₹{evaluatedProfile?.income?.toLocaleString('en-IN')}</strong>, Course: <strong>{evaluatedProfile?.courseLevel}</strong>
                  </p>
                </div>
              </div>

              <div className="schemes-list">
                {matchingSchemes.map((scheme) => (
                  <SchemeCard
                    key={scheme._id || scheme.name}
                    scheme={scheme}
                    language={language}
                    onViewDetails={(s) => setSelectedScheme(s)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Results: No Match */}
          {!loading && matchingSchemes !== null && matchingSchemes.length === 0 && (
            <div className="no-match-box">
              <div className="no-match-icon">
                <HelpCircle size={32} />
              </div>
              <h3 className="no-match-title">{t.noMatchTitle}</h3>
              <p className="no-match-desc">{t.noMatchDesc}</p>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Evaluated profile: Category: {evaluatedProfile?.category} | Income: ₹{evaluatedProfile?.income?.toLocaleString('en-IN')} | Course: {evaluatedProfile?.courseLevel} | Percentage: {evaluatedProfile?.percentage}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedScheme && (
        <SchemeModal
          scheme={selectedScheme}
          language={language}
          onClose={() => setSelectedScheme(null)}
        />
      )}
    </div>
  );
}
