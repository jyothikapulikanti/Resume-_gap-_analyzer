import React from 'react';

function Loader({ label = 'Analyzing your resume…' }) {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
      <div className="loader-spinner" />
      <p>{label}</p>
    </div>
  );
}

export default Loader;
