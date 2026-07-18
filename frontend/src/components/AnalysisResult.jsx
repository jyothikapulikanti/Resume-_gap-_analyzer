import React from 'react';
import SkillBridge from './SkillBridge';

function AnalysisResult({ result, onReset }) {
  const { analysis, fileName, jobTitle } = result;
  const { matchScore, matchedSkills, missingSkills, recommendations, summary } = analysis;

  return (
    <div className="result-card">
      <div className="result-header">
        <div>
          <h2 className="result-title">Analysis complete</h2>
          <p className="result-subtitle">
            {fileName} {jobTitle ? `vs. ${jobTitle}` : ''}
          </p>
        </div>
        <button className="btn-secondary" onClick={onReset}>
          New analysis
        </button>
      </div>

      <SkillBridge
        matchScore={matchScore}
        matchedCount={matchedSkills.length}
        missingCount={missingSkills.length}
      />

      {summary && (
        <div className="summary-box">
          <span className="summary-eyebrow">Summary</span>
          <p>{summary}</p>
        </div>
      )}

      <div className="skills-grid">
        <div className="skills-column">
          <h3 className="skills-heading skills-heading-matched">
            Matched skills <span className="count-badge count-matched">{matchedSkills.length}</span>
          </h3>
          <div className="chip-list">
            {matchedSkills.length ? (
              matchedSkills.map((skill, i) => (
                <span className="chip chip-matched" key={i}>
                  {skill}
                </span>
              ))
            ) : (
              <p className="empty-note">No overlapping skills detected.</p>
            )}
          </div>
        </div>

        <div className="skills-column">
          <h3 className="skills-heading skills-heading-gap">
            Missing skills <span className="count-badge count-gap">{missingSkills.length}</span>
          </h3>
          <div className="chip-list">
            {missingSkills.length ? (
              missingSkills.map((skill, i) => (
                <span className="chip chip-gap" key={i}>
                  {skill}
                </span>
              ))
            ) : (
              <p className="empty-note">No major gaps found. Great match!</p>
            )}
          </div>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h3 className="skills-heading">Recommendations</h3>
          <ul className="recommendation-list">
            {recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AnalysisResult;
