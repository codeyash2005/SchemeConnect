const express = require('express');
const router = express.Router();
const {
  getHealth,
  getAllSchemes,
  checkStudentEligibility,
} = require('../controllers/scholarshipController');
const { validateEligibilityInput } = require('../middleware/validateInput');

// Health endpoint
router.get('/health', getHealth);

// Get all schemes
router.get('/schemes', getAllSchemes);

// Check eligibility
router.post('/check-eligibility', validateEligibilityInput, checkStudentEligibility);

module.exports = router;
