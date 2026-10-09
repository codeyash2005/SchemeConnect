require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Scholarship = require('../models/Scholarship');

const scholarshipDataset = [
  {
    name: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Scheme',
    provider: 'Directorate of Higher Education, Govt. of Maharashtra',
    type: 'State Government',
    description: 'Provides financial assistance for higher and technical education by reimbursing tuition and examination fees for economically backward students of Open and EWS categories.',
    benefit: '50% to 100% reimbursement of tuition fees and exam fees according to government norms.',
    eligibleCategories: ['Open', 'EWS'],
    eligibleCourseLevels: ['Undergraduate', 'Postgraduate', 'Professional/Technical'],
    minimumPercentage: 50,
    maximumIncome: 800000,
    disabilityCondition: 'ANY',
    stateRequirement: 'Maharashtra',
    deadline: '31 March 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Maharashtra Domicile Certificate',
      'Income Certificate (Issued by Tahsildar, <= 8 Lakhs)',
      'Previous Year Marksheet',
      'College Admission / Bonafide Certificate',
      'CAP Allotment Letter',
      'Bank Account Passbook (Aadhaar linked)'
    ],
    applicationLink: 'https://mahadbt.maharashtra.gov.in',
    officialSource: 'MahaDBT Portal (Government of Maharashtra)',
  },
  {
    name: 'Government of India Post-Matric Scholarship for Scheduled Caste Students',
    provider: 'Social Justice and Special Assistance Department, Govt. of Maharashtra',
    type: 'Centrally Sponsored / State Implemented',
    description: 'Complete tuition fee waiver and maintenance allowance for Scheduled Caste (SC) students pursuing post-matriculation or higher education in recognized institutions.',
    benefit: '100% Tuition & Exam Fee waiver plus monthly maintenance allowance up to ₹13,500/year depending on course.',
    eligibleCategories: ['SC'],
    eligibleCourseLevels: ['Junior College', 'Undergraduate', 'Postgraduate', 'Professional/Technical', 'ITI/Vocational'],
    minimumPercentage: 35,
    maximumIncome: 250000,
    disabilityCondition: 'ANY',
    stateRequirement: 'Maharashtra',
    deadline: '31 March 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Maharashtra Domicile Certificate',
      'Caste Certificate (SC)',
      'Caste Validity Certificate',
      'Income Certificate (Issued by Tahsildar)',
      'Previous Year Marksheet',
      'College Bonafide Certificate',
      'Bank Details linked with Aadhaar'
    ],
    applicationLink: 'https://mahadbt.maharashtra.gov.in',
    officialSource: 'MahaDBT Portal (Social Justice Dept)',
  },
  {
    name: 'Post-Matric Scholarship Scheme for Scheduled Tribes (ST)',
    provider: 'Tribal Development Department, Govt. of Maharashtra',
    type: 'Centrally Sponsored / State Implemented',
    description: 'Financial support for Scheduled Tribe (ST) students to complete secondary and higher education without economic hardship.',
    benefit: '100% Tuition fees, examination fees, and hostel maintenance allowance.',
    eligibleCategories: ['ST'],
    eligibleCourseLevels: ['Junior College', 'Undergraduate', 'Postgraduate', 'Professional/Technical', 'ITI/Vocational'],
    minimumPercentage: 35,
    maximumIncome: 250000,
    disabilityCondition: 'ANY',
    stateRequirement: 'Maharashtra',
    deadline: '31 March 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Maharashtra Domicile Certificate',
      'Tribe Certificate (ST)',
      'Tribe Validity Certificate',
      'Income Certificate',
      'Previous Year Marksheet',
      'Bonafide Certificate',
      'Bank Passbook'
    ],
    applicationLink: 'https://mahadbt.maharashtra.gov.in',
    officialSource: 'MahaDBT Portal (Tribal Development Dept)',
  },
  {
    name: 'Post-Matric Scholarship to Other Backward Class (OBC) Students',
    provider: 'VJNT, OBC and SBC Welfare Department, Govt. of Maharashtra',
    type: 'State Government',
    description: 'Tuition and examination fee concession along with maintenance allowances for eligible OBC students pursuing post-matric courses.',
    benefit: '50% to 100% Tuition fee and exam fee concession as per non-creamy layer criteria.',
    eligibleCategories: ['OBC'],
    eligibleCourseLevels: ['Junior College', 'Undergraduate', 'Postgraduate', 'Professional/Technical', 'ITI/Vocational'],
    minimumPercentage: 45,
    maximumIncome: 150000,
    disabilityCondition: 'ANY',
    stateRequirement: 'Maharashtra',
    deadline: '31 March 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Maharashtra Domicile Certificate',
      'Caste Certificate (OBC)',
      'Non-Creamy Layer Certificate',
      'Income Certificate',
      'Previous Marksheet',
      'College Admission Receipt / Bonafide',
      'Bank Account Details'
    ],
    applicationLink: 'https://mahadbt.maharashtra.gov.in',
    officialSource: 'MahaDBT Portal (VJNT, OBC & SBC Welfare)',
  },
  {
    name: 'Post-Matric Scholarship for VJNT Students',
    provider: 'VJNT, OBC and SBC Welfare Department, Govt. of Maharashtra',
    type: 'State Government',
    description: 'Dedicated financial support for Vimukta Jati and Nomadic Tribes (VJNT) students for continuing higher education.',
    benefit: 'Full or partial tuition fee reimbursement and exam fee support.',
    eligibleCategories: ['VJNT'],
    eligibleCourseLevels: ['Junior College', 'Undergraduate', 'Postgraduate', 'Professional/Technical', 'ITI/Vocational'],
    minimumPercentage: 45,
    maximumIncome: 150000,
    disabilityCondition: 'ANY',
    stateRequirement: 'Maharashtra',
    deadline: '31 March 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Maharashtra Domicile Certificate',
      'VJNT Caste Certificate',
      'Income Certificate',
      'Previous Year Marksheet',
      'Bonafide Certificate',
      'Bank Passbook'
    ],
    applicationLink: 'https://mahadbt.maharashtra.gov.in',
    officialSource: 'MahaDBT Portal (VJNT, OBC & SBC Welfare)',
  },
  {
    name: 'Post-Matric Scholarship for Special Backward Class (SBC) Students',
    provider: 'VJNT, OBC and SBC Welfare Department, Govt. of Maharashtra',
    type: 'State Government',
    description: 'Financial assistance for Special Backward Class (SBC) students to pursue post-matric courses without financial distress.',
    benefit: '100% Tuition fee reimbursement in government and aided institutions plus maintenance allowance.',
    eligibleCategories: ['SBC'],
    eligibleCourseLevels: ['Junior College', 'Undergraduate', 'Postgraduate', 'Professional/Technical', 'ITI/Vocational'],
    minimumPercentage: 45,
    maximumIncome: 150000,
    disabilityCondition: 'ANY',
    stateRequirement: 'Maharashtra',
    deadline: '31 March 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Maharashtra Domicile Certificate',
      'SBC Caste Certificate',
      'Income Certificate',
      'Previous Year Marksheet',
      'Bonafide Certificate',
      'Bank Passbook'
    ],
    applicationLink: 'https://mahadbt.maharashtra.gov.in',
    officialSource: 'MahaDBT Portal (VJNT, OBC & SBC Welfare)',
  },
  {
    name: 'Eklavya Scholarship for Postgraduate Students',
    provider: 'Directorate of Higher Education, Govt. of Maharashtra',
    type: 'State Merit-cum-Need',
    description: 'Encourages meritorious arts, science, commerce and law students pursuing full-time Master degrees/Postgraduate courses.',
    benefit: '₹5,000 per academic year for postgraduate studies.',
    eligibleCategories: ['Open', 'EWS', 'OBC', 'SC', 'ST', 'VJNT', 'SBC', 'Minority'],
    eligibleCourseLevels: ['Postgraduate'],
    minimumPercentage: 60,
    maximumIncome: 75000,
    disabilityCondition: 'ANY',
    stateRequirement: 'Maharashtra',
    deadline: '31 March 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Maharashtra Domicile Certificate',
      'Graduation Marksheet (>= 60% in degree exam)',
      'Income Certificate (Issued by Tahsildar, <= ₹75,000)',
      'PG College Admission / Bonafide Certificate',
      'Bank Account Passbook'
    ],
    applicationLink: 'https://mahadbt.maharashtra.gov.in',
    officialSource: 'MahaDBT Portal (Higher Education Dept)',
  },
  {
    name: 'Dr. Panjabrao Deshmukh Vastigruh Nirvah Bhatta Yojna (Hostel Allowance)',
    provider: 'Directorate of Technical Education, Govt. of Maharashtra',
    type: 'State Government',
    description: 'Hostel maintenance allowance for children of registered marginal landholders or registered construction workers pursuing professional technical education.',
    benefit: 'Up to ₹30,000 per year for Mumbai/Pune/Nagpur regions and ₹20,000 per year for other municipal areas.',
    eligibleCategories: ['Open', 'EWS', 'OBC', 'VJNT', 'SBC'],
    eligibleCourseLevels: ['Professional/Technical'],
    minimumPercentage: 50,
    maximumIncome: 800000,
    disabilityCondition: 'ANY',
    stateRequirement: 'Maharashtra',
    deadline: '30 April 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Maharashtra Domicile Certificate',
      'Marginal Landholder Certificate (Alpabhu-Dharak) or Registered Labour Certificate',
      'Income Certificate',
      'Hostel Admission Receipt / Rent Agreement',
      'CAP Allotment Letter',
      'College Bonafide Certificate'
    ],
    applicationLink: 'https://mahadbt.maharashtra.gov.in',
    officialSource: 'MahaDBT Portal (Technical Education Dept)',
  },
  {
    name: 'Scholarship for Students with Disabilities (PwD) - Post Matric',
    provider: 'Department of Empowerment of Persons with Disabilities, Govt. of India',
    type: 'Central Government',
    description: 'Assistance for students with bench-mark disabilities (40% or more) studying in Class 11 up to Post-graduation degrees.',
    benefit: 'Maintenance allowance up to ₹4,000/month, book grant of ₹1,500/year, and disability allowance.',
    eligibleCategories: ['Open', 'EWS', 'SC', 'ST', 'OBC', 'VJNT', 'SBC', 'Minority'],
    eligibleCourseLevels: ['Junior College', 'Undergraduate', 'Postgraduate', 'Professional/Technical', 'ITI/Vocational'],
    minimumPercentage: 40,
    maximumIncome: 250000,
    disabilityCondition: 'YES',
    stateRequirement: 'All India',
    deadline: '31 May 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Disability Certificate (UDID card or medical authority >= 40%)',
      'Income Certificate',
      'Previous Year Marksheet',
      'Bonafide Certificate',
      'Bank Account Passbook'
    ],
    applicationLink: 'https://scholarships.gov.in',
    officialSource: 'National Scholarship Portal (NSP)',
  },
  {
    name: 'State Minority Scholarship for Higher and Professional Education',
    provider: 'Minority Development Department, Govt. of Maharashtra',
    type: 'State Government',
    description: 'Scholarship for meritorious students belonging to notified minority communities (Muslim, Christian, Buddhist, Sikh, Parsi, Jain, and Jewish) pursuing professional/higher courses.',
    benefit: '₹25,000 or actual college fees (whichever is lower) per academic year.',
    eligibleCategories: ['Minority'],
    eligibleCourseLevels: ['Undergraduate', 'Postgraduate', 'Professional/Technical'],
    minimumPercentage: 50,
    maximumIncome: 800000,
    disabilityCondition: 'ANY',
    stateRequirement: 'Maharashtra',
    deadline: '30 April 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Maharashtra Domicile Certificate',
      'Minority Declaration / Minority Certificate',
      'Income Certificate',
      'Previous Exam Marksheet',
      'College Fee Receipt',
      'Bank Account Details'
    ],
    applicationLink: 'https://mahadbt.maharashtra.gov.in',
    officialSource: 'MahaDBT Portal (Minority Development Dept)',
  },
  {
    name: 'Merit-Cum-Means Scholarship for Professional and Technical Courses CS',
    provider: 'Ministry of Minority Affairs, Govt. of India',
    type: 'Central Government',
    description: 'Merit-cum-Means financial assistance to minority students pursuing recognized professional and technical undergraduate or postgraduate courses.',
    benefit: 'Course fee reimbursement up to ₹20,000/year plus maintenance allowance of ₹1,000/month for hostellers.',
    eligibleCategories: ['Minority'],
    eligibleCourseLevels: ['Undergraduate', 'Postgraduate', 'Professional/Technical'],
    minimumPercentage: 50,
    maximumIncome: 250000,
    disabilityCondition: 'ANY',
    stateRequirement: 'All India',
    deadline: '31 May 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Self-Declaration of Minority Community',
      'Income Certificate issued by designated State Authority',
      'Previous Year Marksheet',
      'Proof of Admission in Technical/Professional Institute',
      'Bank Passbook'
    ],
    applicationLink: 'https://scholarships.gov.in',
    officialSource: 'National Scholarship Portal (NSP)',
  },
  {
    name: 'Pragati Scholarship Scheme for Girl Students (Technical Degree/Diploma)',
    provider: 'All India Council for Technical Education (AICTE)',
    type: 'Central Government',
    description: 'AICTE scheme aimed at empowering young women to pursue technical education in AICTE approved colleges (max 2 girls per family).',
    benefit: '₹50,000 per annum for every year of study as lump sum towards college fees, books, and laptops.',
    eligibleCategories: ['Open', 'EWS', 'SC', 'ST', 'OBC', 'VJNT', 'SBC', 'Minority'],
    eligibleCourseLevels: ['Undergraduate', 'Professional/Technical'],
    minimumPercentage: 50,
    maximumIncome: 800000,
    disabilityCondition: 'ANY',
    stateRequirement: 'All India',
    deadline: '30 June 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Class 10 and Class 12 / Diploma Marksheet',
      'Annual Family Income Certificate',
      'Admission Letter for AICTE Approved Technical Degree/Diploma',
      'Bonafide Certificate',
      'Bank Account Details'
    ],
    applicationLink: 'https://scholarships.gov.in',
    officialSource: 'National Scholarship Portal (AICTE Section)',
  },
  {
    name: 'Tuition Fee and Examination Fee Support for Freeship Categories',
    provider: 'Directorate of Higher Education, Govt. of Maharashtra',
    type: 'State Government',
    description: 'Tuition fee and examination fee concession for students belonging to SC, ST, VJNT, OBC, and SBC categories studying in non-grant or aided higher education institutions.',
    benefit: '50% to 100% waiver on tuition and exam fees based on family income tier.',
    eligibleCategories: ['SC', 'ST', 'OBC', 'VJNT', 'SBC'],
    eligibleCourseLevels: ['Undergraduate', 'Postgraduate', 'Professional/Technical'],
    minimumPercentage: 40,
    maximumIncome: 800000,
    disabilityCondition: 'ANY',
    stateRequirement: 'Maharashtra',
    deadline: '31 March 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Maharashtra Domicile Certificate',
      'Caste Certificate and Validity',
      'Income Certificate',
      'College Admission Fee Structure',
      'Bank Details'
    ],
    applicationLink: 'https://mahadbt.maharashtra.gov.in',
    officialSource: 'MahaDBT Portal (Government of Maharashtra)',
  },
  {
    name: 'Government Vidyaniketan Scholarship',
    provider: 'Directorate of Higher Education, Govt. of Maharashtra',
    type: 'State Merit-Based',
    description: 'Merit scholarship awarded to students who have completed Class 10 from Government Vidyaniketan and are enrolled in Junior College or First Year Degree.',
    benefit: 'Stipend of ₹100 per month and study allowance.',
    eligibleCategories: ['Open', 'EWS', 'SC', 'ST', 'OBC', 'VJNT', 'SBC', 'Minority'],
    eligibleCourseLevels: ['Junior College', 'Undergraduate'],
    minimumPercentage: 60,
    maximumIncome: null, // No income cap for pure merit vidyaniketan
    disabilityCondition: 'ANY',
    stateRequirement: 'Maharashtra',
    deadline: '31 March 2026 (Subject to official extension)',
    requiredDocuments: [
      'Aadhaar Card',
      'Vidyaniketan SSC Passing Certificate',
      'Previous Marksheet',
      'College Bonafide Certificate',
      'Bank Passbook'
    ],
    applicationLink: 'https://mahadbt.maharashtra.gov.in',
    officialSource: 'MahaDBT Portal (Higher Education Dept)',
  }
];

async function seedDatabase() {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await connectDB();

    console.log(`[Seed] Processing ${scholarshipDataset.length} scholarship records...`);

    let insertedCount = 0;
    let updatedCount = 0;

    for (const scheme of scholarshipDataset) {
      const existing = await Scholarship.findOne({ name: scheme.name });
      if (existing) {
        await Scholarship.updateOne({ name: scheme.name }, scheme);
        updatedCount++;
      } else {
        await Scholarship.create(scheme);
        insertedCount++;
      }
    }

    console.log(`[Seed] Done! Inserted: ${insertedCount}, Updated: ${updatedCount}, Total: ${scholarshipDataset.length}`);
    await mongoose.connection.close();
    console.log('[Seed] Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error seeding scholarships:', error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = { scholarshipDataset, seedDatabase };
