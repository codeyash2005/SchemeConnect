const Scholarship = require('../models/Scholarship');
const { findEligibleSchemes } = require('../services/eligibilityService');

/**
 * Health check endpoint.
 */
const getHealth = (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
};

/**
 * Retrieve all scholarships from the database.
 */
const getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scholarship.find().sort({ name: 1 }).lean();
    return res.status(200).json({
      success: true,
      count: schemes.length,
      schemes,
    });
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to load scholarship information right now. Please check your connection and try again.',
    });
  }
};

/**
 * Evaluate student profile against all scholarships using rule-based eligibility engine.
 */
const checkStudentEligibility = async (req, res) => {
  try {
    const { category, income, courseLevel, percentage, hasDisability, state } = req.body;

    const studentProfile = {
      category: category.trim(),
      income: Number(income),
      courseLevel: courseLevel.trim(),
      percentage: Number(percentage),
      hasDisability: hasDisability === true || hasDisability === 'Yes' || hasDisability === 'yes',
      state: state ? state.trim() : 'Maharashtra',
    };

    // Query active scholarships from MongoDB
    const allSchemes = await Scholarship.find().lean();

    // Run deterministic rule engine
    const matchingSchemes = findEligibleSchemes(studentProfile, allSchemes);

    return res.status(200).json({
      success: true,
      count: matchingSchemes.length,
      schemes: matchingSchemes,
      studentProfile,
    });
  } catch (error) {
    console.error('Error evaluating eligibility:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to process eligibility check right now. Please try again.',
    });
  }
};

module.exports = {
  getHealth,
  getAllSchemes,
  checkStudentEligibility,
};
