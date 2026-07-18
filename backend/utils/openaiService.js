const axios = require('axios');

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Builds the instruction prompt sent to OpenAI. Asks for strict JSON output
 * so the response can be parsed reliably by the backend.
 */
function buildPrompt(resumeText, jobDescription, jobTitle) {
  return `You are an expert technical recruiter and career coach. Compare the RESUME against the JOB DESCRIPTION below and identify skill/experience gaps.

Job Title: ${jobTitle || 'Not specified'}

JOB DESCRIPTION:
"""
${jobDescription}
"""

RESUME:
"""
${resumeText}
"""

Return ONLY a valid JSON object (no markdown, no code fences, no extra commentary) with EXACTLY this shape:

{
  "matchScore": <number 0-100 representing overall fit>,
  "matchedSkills": [<array of strings - skills/keywords from the job description that ARE present in the resume>],
  "missingSkills": [<array of strings - important skills/keywords from the job description that are MISSING from the resume>],
  "recommendations": [<array of strings - specific, actionable suggestions to close the gaps, e.g. courses, projects, certifications, resume wording changes>],
  "summary": "<2-4 sentence plain-English summary of overall fit and biggest gap>"
}

Be specific and concise. Do not include any text outside the JSON object.`;
}

/**
 * Calls the OpenAI Chat Completions API to analyze the gap between
 * a resume and a job description.
 * @param {string} resumeText
 * @param {string} jobDescription
 * @param {string} [jobTitle]
 * @returns {Promise<object>} parsed analysis object
 */
async function analyzeGap(resumeText, jobDescription, jobTitle) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set in the environment.');
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const prompt = buildPrompt(resumeText, jobDescription, jobTitle);

  const response = await axios.post(
    OPENAI_URL,
    {
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are a precise assistant that only replies with valid, parsable JSON matching the schema requested by the user. Never wrap the JSON in markdown code fences.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
      response_format: { type: 'json_object' },
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 60000,
    }
  );

  const rawContent = response.data?.choices?.[0]?.message?.content || '{}';

  let parsed;
  try {
    parsed = JSON.parse(rawContent);
  } catch (err) {
    // Fallback: try to strip stray markdown fences if the model added them anyway
    const cleaned = rawContent.replace(/```json|```/g, '').trim();
    parsed = JSON.parse(cleaned);
  }

  return {
    matchScore: Math.max(0, Math.min(100, Number(parsed.matchScore) || 0)),
    matchedSkills: Array.isArray(parsed.matchedSkills) ? parsed.matchedSkills : [],
    missingSkills: Array.isArray(parsed.missingSkills) ? parsed.missingSkills : [],
    recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
    summary: typeof parsed.summary === 'string' ? parsed.summary : '',
  };
}

module.exports = { analyzeGap };
