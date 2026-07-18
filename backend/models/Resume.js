const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema(
  {
    matchScore: { type: Number, min: 0, max: 100, default: 0 },
    matchedSkills: [{ type: String }],
    missingSkills: [{ type: String }],
    recommendations: [{ type: String }],
    summary: { type: String, default: '' },
  },
  { _id: false }
);

const ResumeSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    resumeText: { type: String, required: true },
    jobTitle: { type: String, default: '' },
    jobDescription: { type: String, required: true },
    analysis: { type: AnalysisSchema, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', ResumeSchema);
