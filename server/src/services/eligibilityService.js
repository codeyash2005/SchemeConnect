/**
 * Scheme Connect - Rule-Based Eligibility Engine
 * 
 * Evaluates whether a student meets the criteria for a given scholarship scheme.
 * Uses straightforward, deterministic rules that are easy to explain during viva presentations.
 */

/**
 * Checks a single student's eligibility against a single scholarship scheme.
 * 
 * @param {Object} student - Student profile data
 * @param {string} student.category - Caste / Category (e.g. 'SC', 'OBC', 'Open', 'EWS')
 * @param {number} student.income - Annual family income in INR
 * @param {string} student.courseLevel - Current course level (e.g. 'Undergraduate', 'Postgraduate')
 * @param {number} student.percentage - Previous academic percentage (0 to 100)
 * @param {boolean|string} student.hasDisability - Whether the student has PwD / disability status
 * @param {string} student.state - Student domicile state (e.g. 'Maharashtra')
 * @param {Object} scheme - Scholarship record from the database
 * @returns {Object} { isEligible: boolean, matchReasons: string[], failedReasons: string[] }
 */
function checkEligibility(student, scheme) {
  const matchReasons = [];
  const failedReasons = [];

  // Parse student inputs safely
  const studentCategory = (student.category || '').trim();
  const studentIncome = Number(student.income);
  const studentCourse = (student.courseLevel || '').trim();
  const studentPercentage = Number(student.percentage);
  const studentHasDisability =
    student.hasDisability === true ||
    student.hasDisability === 'Yes' ||
    student.hasDisability === 'yes';
  const studentState = (student.state || 'Maharashtra').trim().toLowerCase();

  // 1. Category Check
  const allowedCategories = scheme.eligibleCategories.map((c) => c.trim().toLowerCase());
  const categoryMatched =
    allowedCategories.includes('all') ||
    allowedCategories.includes(studentCategory.toLowerCase());

  if (categoryMatched) {
    matchReasons.push(`Category matched (${studentCategory})`);
  } else {
    failedReasons.push(
      `Category ${studentCategory} is not eligible (Required: ${scheme.eligibleCategories.join(', ')})`
    );
  }

  // 2. Course Level Check
  const allowedCourses = scheme.eligibleCourseLevels.map((c) => c.trim().toLowerCase());
  const courseMatched =
    allowedCourses.includes('all') ||
    allowedCourses.includes(studentCourse.toLowerCase());

  if (courseMatched) {
    matchReasons.push(`Course level matched (${studentCourse})`);
  } else {
    failedReasons.push(
      `Course level ${studentCourse} is not eligible (Required: ${scheme.eligibleCourseLevels.join(', ')})`
    );
  }

  // 3. Family Income Check (Boundary: income <= maxIncome)
  if (scheme.maximumIncome !== null && scheme.maximumIncome !== undefined) {
    if (studentIncome <= scheme.maximumIncome) {
      matchReasons.push(
        `Income requirement satisfied (₹${studentIncome.toLocaleString('en-IN')} ≤ ₹${scheme.maximumIncome.toLocaleString('en-IN')})`
      );
    } else {
      failedReasons.push(
        `Family income ₹${studentIncome.toLocaleString('en-IN')} exceeds limit of ₹${scheme.maximumIncome.toLocaleString('en-IN')}`
      );
    }
  } else {
    matchReasons.push('No upper family income limit configured');
  }

  // 4. Minimum Percentage Check (Boundary: percentage >= minPercentage)
  if (scheme.minimumPercentage !== null && scheme.minimumPercentage !== undefined && scheme.minimumPercentage > 0) {
    if (studentPercentage >= scheme.minimumPercentage) {
      matchReasons.push(
        `Academic requirement satisfied (${studentPercentage}% ≥ ${scheme.minimumPercentage}%)`
      );
    } else {
      failedReasons.push(
        `Academic percentage ${studentPercentage}% is below minimum required ${scheme.minimumPercentage}%`
      );
    }
  } else {
    matchReasons.push('No minimum percentage restriction');
  }

  // 5. Disability Condition Check
  if (scheme.disabilityCondition === 'YES') {
    if (studentHasDisability) {
      matchReasons.push('Disability / PwD criteria satisfied');
    } else {
      failedReasons.push('Scheme is exclusively reserved for Persons with Disabilities (PwD)');
    }
  } else if (scheme.disabilityCondition === 'NO') {
    if (!studentHasDisability) {
      matchReasons.push('General applicant requirement satisfied');
    } else {
      failedReasons.push('Scheme not applicable for this disability category configuration');
    }
  } else {
    // 'ANY'
    matchReasons.push('Open to all disability statuses');
  }

  // 6. State / Domicile Check
  const schemeState = (scheme.stateRequirement || 'Maharashtra').trim().toLowerCase();
  if (schemeState === 'all india' || schemeState === 'any' || schemeState === studentState) {
    matchReasons.push(`State/Domicile requirement satisfied (${student.state || 'Maharashtra'})`);
  } else {
    failedReasons.push(
      `Domicile state ${student.state} does not match required state (${scheme.stateRequirement})`
    );
  }

  const isEligible = failedReasons.length === 0;

  return {
    isEligible,
    matchReasons,
    failedReasons,
  };
}

/**
 * Filters and ranks matching schemes for a student.
 * 
 * @param {Object} student - Student profile data
 * @param {Array<Object>} schemes - Array of scholarship records
 * @returns {Array<Object>} List of matching schemes with match reasons attached
 */
function findEligibleSchemes(student, schemes) {
  const eligibleResults = [];

  for (const scheme of schemes) {
    const evaluation = checkEligibility(student, scheme);
    if (evaluation.isEligible) {
      // Attach eligibility breakdown to the scheme object
      const schemeObj = scheme.toObject ? scheme.toObject() : { ...scheme };
      eligibleResults.push({
        ...schemeObj,
        matchReasons: evaluation.matchReasons,
      });
    }
  }

  return eligibleResults;
}

module.exports = {
  checkEligibility,
  findEligibleSchemes,
};
