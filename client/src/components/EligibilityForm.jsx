import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, AlertCircle } from 'lucide-react';
import { translations } from '../utils/translations';
import { storage } from '../utils/storage';

export default function EligibilityForm({ language, onSubmit, loading, initialProfile }) {
  const t = translations[language];

  const categories = [
    { value: 'Open', label: 'Open / General' },
    { value: 'EWS', label: 'EWS (Economically Weaker Section)' },
    { value: 'SC', label: 'SC (Scheduled Caste)' },
    { value: 'ST', label: 'ST (Scheduled Tribe)' },
    { value: 'OBC', label: 'OBC (Other Backward Class)' },
    { value: 'VJNT', label: 'VJNT (Vimukta Jati / Nomadic Tribes)' },
    { value: 'SBC', label: 'SBC (Special Backward Class)' },
    { value: 'Minority', label: 'Minority (Muslim, Christian, Buddhist, Jain, Sikh, Parsi)' },
  ];

  const courseLevels = [
    { value: 'Junior College', label: 'Junior College (11th / 12th)' },
    { value: 'Undergraduate', label: 'Undergraduate (BA, BSc, BCom, etc.)' },
    { value: 'Postgraduate', label: 'Postgraduate (MA, MSc, MCom, etc.)' },
    { value: 'Professional/Technical', label: 'Professional / Technical (BE/BTech, MBA, MBBS, Pharmacy)' },
    { value: 'ITI/Vocational', label: 'ITI / Vocational Training' },
  ];

  const [formData, setFormData] = useState({
    category: 'Open',
    income: '',
    courseLevel: 'Undergraduate',
    percentage: '',
    hasDisability: 'No',
    state: 'Maharashtra',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Populate from passed initialProfile or LocalStorage
    const saved = initialProfile || storage.getProfile();
    if (saved) {
      setFormData({
        category: saved.category || 'Open',
        income: saved.income !== undefined ? saved.income : '',
        courseLevel: saved.courseLevel || 'Undergraduate',
        percentage: saved.percentage !== undefined ? saved.percentage : '',
        hasDisability: saved.hasDisability ? 'Yes' : 'No',
        state: saved.state || 'Maharashtra',
      });
    }
  }, [initialProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.category) {
      errs.category = t.validationCategory;
    }
    if (
      formData.income === '' ||
      isNaN(Number(formData.income)) ||
      Number(formData.income) < 0
    ) {
      errs.income = t.validationIncome;
    }
    if (!formData.courseLevel) {
      errs.courseLevel = t.validationCourse;
    }
    if (
      formData.percentage === '' ||
      isNaN(Number(formData.percentage)) ||
      Number(formData.percentage) < 0 ||
      Number(formData.percentage) > 100
    ) {
      errs.percentage = t.validationPercentage;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const profileToSubmit = {
      category: formData.category,
      income: Number(formData.income),
      courseLevel: formData.courseLevel,
      percentage: Number(formData.percentage),
      hasDisability: formData.hasDisability === 'Yes',
      state: formData.state || 'Maharashtra',
    };

    // Save student profile to LocalStorage
    storage.setProfile(profileToSubmit);

    onSubmit(profileToSubmit);
  };

  const handleReset = () => {
    setFormData({
      category: 'Open',
      income: '',
      courseLevel: 'Undergraduate',
      percentage: '',
      hasDisability: 'No',
      state: 'Maharashtra',
    });
    setErrors({});
  };

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <h2>{t.formTitle}</h2>
        <p>{t.formSubtitle}</p>
      </div>

      {/* Category */}
      <div className="form-group">
        <label className="form-label" htmlFor="category">
          {t.lblCategory}
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-select"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        {errors.category && <span className="form-error">{errors.category}</span>}
      </div>

      {/* Income */}
      <div className="form-group">
        <label className="form-label" htmlFor="income">
          {t.lblIncome}
        </label>
        <input
          id="income"
          type="number"
          name="income"
          min="0"
          step="1000"
          placeholder={t.lblIncomePlaceholder}
          value={formData.income}
          onChange={handleChange}
          className="form-input"
        />
        <span className="form-helper">Annual family income according to income certificate</span>
        {errors.income && <span className="form-error">{errors.income}</span>}
      </div>

      {/* Course Level */}
      <div className="form-group">
        <label className="form-label" htmlFor="courseLevel">
          {t.lblCourse}
        </label>
        <select
          id="courseLevel"
          name="courseLevel"
          value={formData.courseLevel}
          onChange={handleChange}
          className="form-select"
        >
          {courseLevels.map((lvl) => (
            <option key={lvl.value} value={lvl.value}>
              {lvl.label}
            </option>
          ))}
        </select>
        {errors.courseLevel && <span className="form-error">{errors.courseLevel}</span>}
      </div>

      {/* Percentage */}
      <div className="form-group">
        <label className="form-label" htmlFor="percentage">
          {t.lblPercentage}
        </label>
        <input
          id="percentage"
          type="number"
          name="percentage"
          min="0"
          max="100"
          step="0.01"
          placeholder={t.lblPercentagePlaceholder}
          value={formData.percentage}
          onChange={handleChange}
          className="form-input"
        />
        <span className="form-helper">Marks scored in previous qualifying examination (0-100)</span>
        {errors.percentage && <span className="form-error">{errors.percentage}</span>}
      </div>

      {/* Disability */}
      <div className="form-group">
        <label className="form-label" htmlFor="hasDisability">
          {t.lblDisability}
        </label>
        <select
          id="hasDisability"
          name="hasDisability"
          value={formData.hasDisability}
          onChange={handleChange}
          className="form-select"
        >
          <option value="No">{t.lblDisabilityNo}</option>
          <option value="Yes">{t.lblDisabilityYes}</option>
        </select>
      </div>

      {/* State */}
      <div className="form-group">
        <label className="form-label" htmlFor="state">
          {t.lblState}
        </label>
        <input
          id="state"
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="form-input"
          placeholder="Maharashtra"
        />
        <span className="form-helper">State of residence / domicile</span>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ flex: 1 }}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="spinner" />
              <span>{t.btnChecking}</span>
            </>
          ) : (
            <>
              <Search size={18} />
              <span>{t.btnSubmit}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary"
          title="Reset Form"
          disabled={loading}
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </form>
  );
}
