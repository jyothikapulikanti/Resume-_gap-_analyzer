const fs = require('fs');
const Resume = require('../models/Resume');
const { extractTextFromPdf } = require('../utils/parsePdf');
const { analyzeGap } = require('../utils/openaiService');

/**
 * POST /api/resume/analyze
 * Expects multipart/form-data with:
 *   - resume: PDF file
 *   - jobDescription: string
 *   - jobTitle: string (optional)
 */
async function analyzeResume(req, res) {
  let uploadedFilePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'A resume PDF file is required.' });
    }

    const { jobDescription, jobTitle } = req.body;
    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ message: 'Job description is required.' });
    }

    uploadedFilePath = req.file.path;

    // 1. Extract text from the uploaded PDF
    const resumeText = await extractTextFromPdf(uploadedFilePath);

    if (!resumeText || resumeText.length < 20) {
      return res.status(422).json({
        message:
          'Could not extract readable text from the uploaded PDF. Please upload a text-based (non-scanned) PDF resume.',
      });
    }

    // 2. Call OpenAI to analyze the gap
    const analysis = await analyzeGap(resumeText, jobDescription, jobTitle);

    // 3. Persist the result
    const savedResume = await Resume.create({
      fileName: req.file.originalname,
      resumeText,
      jobTitle: jobTitle || '',
      jobDescription,
      analysis,
    });

    // 4. Clean up the uploaded file from disk (we already stored the text)
    fs.unlink(uploadedFilePath, () => {});

    return res.status(201).json({
      message: 'Resume analyzed successfully.',
      data: savedResume,
    });
  } catch (error) {
    console.error('Error analyzing resume:', error.message);

    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      fs.unlink(uploadedFilePath, () => {});
    }

    if (error.response) {
      // Error from OpenAI API
      return res.status(502).json({
        message: 'The AI service returned an error while analyzing the resume.',
        details: error.response.data?.error?.message || error.message,
      });
    }

    return res.status(500).json({
      message: 'Something went wrong while analyzing the resume.',
      details: error.message,
    });
  }
}

/**
 * GET /api/resume/history
 * Returns a lightweight list of past analyses, most recent first.
 */
async function getHistory(req, res) {
  try {
    const resumes = await Resume.find()
      .select('fileName jobTitle analysis.matchScore createdAt')
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json({ data: resumes });
  } catch (error) {
    console.error('Error fetching history:', error.message);
    return res.status(500).json({ message: 'Failed to fetch history.', details: error.message });
  }
}

/**
 * GET /api/resume/:id
 * Returns the full detail of a single past analysis.
 */
async function getResumeById(req, res) {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Analysis not found.' });
    }
    return res.status(200).json({ data: resume });
  } catch (error) {
    console.error('Error fetching resume:', error.message);
    return res.status(500).json({ message: 'Failed to fetch analysis.', details: error.message });
  }
}

/**
 * DELETE /api/resume/:id
 */
async function deleteResume(req, res) {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Analysis not found.' });
    }
    return res.status(200).json({ message: 'Analysis deleted successfully.' });
  } catch (error) {
    console.error('Error deleting resume:', error.message);
    return res.status(500).json({ message: 'Failed to delete analysis.', details: error.message });
  }
}

module.exports = { analyzeResume, getHistory, getResumeById, deleteResume };
