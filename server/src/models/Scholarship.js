const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Scholarship name is required'],
      trim: true,
      unique: true,
    },
    provider: {
      type: String,
      required: [true, 'Provider department/agency is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Scholarship type is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    benefit: {
      type: String,
      required: [true, 'Benefit details are required'],
      trim: true,
    },
    eligibleCategories: {
      type: [String],
      required: [true, 'At least one eligible category is required'],
      index: true,
    },
    eligibleCourseLevels: {
      type: [String],
      required: [true, 'At least one course level is required'],
      index: true,
    },
    minimumPercentage: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
    maximumIncome: {
      type: Number,
      default: null, // null means no upper income ceiling configured
    },
    disabilityCondition: {
      type: String,
      enum: ['ANY', 'YES', 'NO'],
      default: 'ANY', // 'YES' = strictly for PwD students; 'NO' = non-disabled only; 'ANY' = both
    },
    stateRequirement: {
      type: String,
      default: 'Maharashtra',
      trim: true,
    },
    deadline: {
      type: String,
      required: [true, 'Application deadline is required'],
      trim: true,
    },
    requiredDocuments: {
      type: [String],
      required: true,
      default: [],
    },
    applicationLink: {
      type: String,
      required: [true, 'Official application portal link is required'],
      trim: true,
    },
    officialSource: {
      type: String,
      required: [true, 'Official source portal name is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

module.exports = Scholarship;
