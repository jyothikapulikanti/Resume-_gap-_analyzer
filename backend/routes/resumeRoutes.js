const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  analyzeResume,
  getHistory,
  getResumeById,
  deleteResume,
} = require('../controllers/resumeController');

// POST /api/resume/analyze - upload resume + job description, get AI gap analysis
router.post('/analyze', upload.single('resume'), analyzeResume);

// GET /api/resume/history - list past analyses
router.get('/history', getHistory);

// GET /api/resume/:id - get a single analysis
router.get('/:id', getResumeById);

// DELETE /api/resume/:id - delete a saved analysis
router.delete('/:id', deleteResume);

module.exports = router;
