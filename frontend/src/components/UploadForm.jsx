import React, { useRef, useState } from 'react';

function UploadForm({ onSubmit, isLoading }) {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFile = (selected) => {
    if (!selected) return;
    if (selected.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }
    setError('');
    setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('A resume PDF is required.');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please paste the job description.');
      return;
    }
    setError('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobTitle', jobTitle);
    formData.append('jobDescription', jobDescription);
    onSubmit(formData);
  };

  return (
    <form className="upload-card" onSubmit={handleSubmit}>
      <div className="field-group">
        <label className="field-label" htmlFor="jobTitle">
          Target role <span className="optional">(optional)</span>
        </label>
        <input
          id="jobTitle"
          type="text"
          placeholder="e.g. Senior Backend Engineer"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="text-input"
        />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="jobDescription">
          Job description
        </label>
        <textarea
          id="jobDescription"
          placeholder="Paste the full job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="text-area"
          rows={8}
        />
      </div>

      <div className="field-group">
        <span className="field-label">Resume (PDF)</span>
        <div
          className={`dropzone ${isDragging ? 'dropzone-active' : ''} ${file ? 'dropzone-filled' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFile(e.target.files?.[0])}
            hidden
          />
          {file ? (
            <span className="dropzone-filename">📄 {file.name}</span>
          ) : (
            <>
              <span className="dropzone-title">Drop your resume PDF here</span>
              <span className="dropzone-subtitle">or click to browse</span>
            </>
          )}
        </div>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn-primary" disabled={isLoading}>
        {isLoading ? 'Analyzing…' : 'Analyze gap'}
      </button>
    </form>
  );
}

export default UploadForm;
