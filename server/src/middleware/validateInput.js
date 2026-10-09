/**
 * Middleware for validating incoming student profile data for the eligibility check endpoint.
 */
function validateEligibilityInput(req, res, next) {
  const { category, income, courseLevel, percentage } = req.body;
  const errors = [];

  const validCategories = ['Open', 'EWS', 'SC', 'ST', 'OBC', 'VJNT', 'SBC', 'Minority'];
  const validCourses = [
    'Junior College',
    'Undergraduate',
    'Postgraduate',
    'Professional/Technical',
    'ITI/Vocational',
  ];

  if (!category || typeof category !== 'string' || !validCategories.includes(category.trim())) {
    errors.push(`Category must be one of: ${validCategories.join(', ')}`);
  }

  if (income === undefined || income === null || income === '' || isNaN(Number(income)) || Number(income) < 0) {
    errors.push('Annual family income must be a non-negative number.');
  }

  if (!courseLevel || typeof courseLevel !== 'string' || !validCourses.includes(courseLevel.trim())) {
    errors.push(`Course level must be one of: ${validCourses.join(', ')}`);
  }

  if (
    percentage === undefined ||
    percentage === null ||
    percentage === '' ||
    isNaN(Number(percentage)) ||
    Number(percentage) < 0 ||
    Number(percentage) > 100
  ) {
    errors.push('Previous academic percentage must be a number between 0 and 100.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed for student profile.',
      errors,
    });
  }

  next();
}

module.exports = {
  validateEligibilityInput,
};
