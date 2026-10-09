import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  FileCheck, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Languages, 
  GraduationCap,
  ShieldAlert,
  Sliders,
  CheckCheck
} from 'lucide-react';
import { translations } from '../utils/translations';

export default function Home({ language }) {
  const t = translations[language];

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-grid">
            {/* Left Column: Headline and Call-To-Action */}
            <div className="hero-content">
              <div className="hero-pill" aria-label="Technology summary">
                <Sparkles size={14} aria-hidden="true" />
                <span>{t.heroBadge}</span>
              </div>

              <h1 id="hero-title" className="hero-title">
                <span className="brand-accent">{t.brandName}</span> — {t.heroTitle}
              </h1>

              <p className="hero-description">{t.heroDesc}</p>

              <div className="hero-cta-group">
                <Link to="/check-eligibility" className="btn btn-primary btn-lg">
                  <Search size={18} aria-hidden="true" />
                  <span>{t.btnCheckNow}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link to="/checklist" className="btn btn-secondary">
                  <FileCheck size={18} aria-hidden="true" />
                  <span>{t.btnDocChecklist}</span>
                </Link>
              </div>

              <p className="hero-microcopy">
                {t.heroMicrocopy}
              </p>
            </div>

            {/* Right Column: Informational Preview Card */}
            <div className="hero-card-column">
              <div className="hero-info-card">
                <div className="hero-info-header">
                  <div className="info-icon-badge" aria-hidden="true">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h2 className="info-title">{t.previewCardTitle}</h2>
                    <p className="info-subtitle">{t.previewCardSub}</p>
                  </div>
                </div>

                <div className="info-features-list">
                  <div className="info-feature-item">
                    <CheckCircle2 size={16} className="info-feature-icon" aria-hidden="true" />
                    <span>{t.previewFeat1}</span>
                  </div>
                  <div className="info-feature-item">
                    <CheckCircle2 size={16} className="info-feature-icon" aria-hidden="true" />
                    <span>{t.previewFeat2}</span>
                  </div>
                  <div className="info-feature-item">
                    <CheckCircle2 size={16} className="info-feature-icon" aria-hidden="true" />
                    <span>{t.previewFeat3}</span>
                  </div>
                  <div className="info-feature-item">
                    <CheckCircle2 size={16} className="info-feature-icon" aria-hidden="true" />
                    <span>{t.previewFeat4}</span>
                  </div>
                </div>

                <div className="hero-info-footer">
                  <span className="badge badge-accent">
                    <CheckCheck size={13} aria-hidden="true" />
                    <span>{t.previewBadge}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Process Pipeline Section */}
        <section className="pipeline-section" aria-labelledby="pipeline-heading">
          <div className="section-header">
            <h2 id="pipeline-heading" className="section-title">{t.pipelineHeader}</h2>
            <p className="section-subtitle">{t.pipelineSub}</p>
          </div>

          <div className="pipeline-container">
            <div className="pipeline-steps">
              {/* Step 1 */}
              <div className="pipeline-card">
                <div className="pipeline-step-indicator">
                  <span className="step-number">1</span>
                </div>
                <div className="pipeline-card-content">
                  <h3 className="pipeline-step-title">{t.pipeStep1}</h3>
                  <p className="pipeline-step-desc">{t.pipeStep1Desc}</p>
                </div>
              </div>

              <div className="pipeline-connector" aria-hidden="true">
                <span className="connector-line"></span>
                <span className="connector-arrow">→</span>
              </div>

              {/* Step 2 */}
              <div className="pipeline-card highlight">
                <div className="pipeline-step-indicator highlight">
                  <span className="step-number">2</span>
                </div>
                <div className="pipeline-card-content">
                  <h3 className="pipeline-step-title">{t.pipeStep2}</h3>
                  <p className="pipeline-step-desc">{t.pipeStep2Desc}</p>
                </div>
              </div>

              <div className="pipeline-connector" aria-hidden="true">
                <span className="connector-line"></span>
                <span className="connector-arrow">→</span>
              </div>

              {/* Step 3 */}
              <div className="pipeline-card">
                <div className="pipeline-step-indicator">
                  <span className="step-number">3</span>
                </div>
                <div className="pipeline-card-content">
                  <h3 className="pipeline-step-title">{t.pipeStep3}</h3>
                  <p className="pipeline-step-desc">{t.pipeStep3Desc}</p>
                </div>
              </div>
            </div>

            {/* Clarification Notice */}
            <div className="pipeline-disclaimer-card">
              <ShieldAlert size={16} className="disclaimer-icon" aria-hidden="true" />
              <p>{t.pipelineNote}</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section" aria-labelledby="features-heading">
          <div className="section-header">
            <h2 id="features-heading" className="section-title">{t.featuresTitle}</h2>
            <p className="section-subtitle">{t.featuresSub}</p>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon-box" aria-hidden="true">
                <Sliders size={22} />
              </div>
              <div className="feature-info">
                <h3 className="feature-title">{t.feat1Title}</h3>
                <p className="feature-desc">{t.feat1Desc}</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon-box" aria-hidden="true">
                <BookOpen size={22} />
              </div>
              <div className="feature-info">
                <h3 className="feature-title">{t.feat2Title}</h3>
                <p className="feature-desc">{t.feat2Desc}</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon-box" aria-hidden="true">
                <FileCheck size={22} />
              </div>
              <div className="feature-info">
                <h3 className="feature-title">{t.feat3Title}</h3>
                <p className="feature-desc">{t.feat3Desc}</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="feature-card">
              <div className="feature-icon-box" aria-hidden="true">
                <Languages size={22} />
              </div>
              <div className="feature-info">
                <h3 className="feature-title">{t.feat4Title}</h3>
                <p className="feature-desc">{t.feat4Desc}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
