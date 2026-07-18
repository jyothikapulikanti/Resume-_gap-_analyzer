import React from 'react';

/**
 * Signature visual: renders the match score as a rope bridge crossing a gap
 * between "Your Resume" and "Target Role". Solid teal planks represent
 * matched skills; broken amber planks represent missing skills.
 */
function SkillBridge({ matchScore, matchedCount, missingCount }) {
  const total = matchedCount + missingCount || 1;
  const plankCount = Math.min(total, 12);
  const matchedPlanks = Math.round((matchedCount / total) * plankCount);

  const planks = Array.from({ length: plankCount }, (_, i) => i < matchedPlanks);

  return (
    <div className="bridge-wrap">
      <div className="bridge-pillar">
        <span className="bridge-pillar-label">Your Resume</span>
      </div>

      <div className="bridge-track">
        <div className="bridge-rope" />
        <div className="bridge-planks">
          {planks.map((solid, i) => (
            <span key={i} className={`plank ${solid ? 'plank-solid' : 'plank-gap'}`} />
          ))}
        </div>
        <div className="bridge-score">
          <span className="bridge-score-number">{matchScore}%</span>
          <span className="bridge-score-label">match</span>
        </div>
      </div>

      <div className="bridge-pillar">
        <span className="bridge-pillar-label">Target Role</span>
      </div>
    </div>
  );
}

export default SkillBridge;
