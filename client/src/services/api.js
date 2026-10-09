/**
 * Centralized API service for Scheme Connect frontend.
 * Uses environment variable VITE_API_URL or defaults to localhost:5000/api.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  /**
   * Check backend health status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${BASE_URL}/health`);
      if (!response.ok) {
        throw new Error(`Health check failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('[API Health Error]:', error);
      throw error;
    }
  },

  /**
   * Fetch all configured scholarship schemes
   */
  async getAllSchemes() {
    try {
      const response = await fetch(`${BASE_URL}/schemes`);
      if (!response.ok) {
        throw new Error(`Failed to fetch schemes with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('[API Schemes Error]:', error);
      throw error;
    }
  },

  /**
   * Evaluate student profile against scholarship eligibility rules
   * @param {Object} studentProfile - { category, income, courseLevel, percentage, hasDisability, state }
   */
  async checkEligibility(studentProfile) {
    try {
      const response = await fetch(`${BASE_URL}/check-eligibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentProfile),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.errors ? data.errors.join('. ') : (data.message || 'Error checking eligibility');
        throw new Error(errorMsg);
      }

      return data;
    } catch (error) {
      console.error('[API Eligibility Error]:', error);
      throw error;
    }
  },
};
