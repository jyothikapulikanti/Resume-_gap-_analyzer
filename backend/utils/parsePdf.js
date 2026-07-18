const fs = require('fs');
const pdfParse = require('pdf-parse');

/**
 * Reads a PDF file from disk and extracts its plain text content.
 * @param {string} filePath - absolute path to the uploaded PDF file
 * @returns {Promise<string>} extracted text
 */
async function extractTextFromPdf(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return (data.text || '').trim();
}

module.exports = { extractTextFromPdf };
