import React, { useState } from 'react';
import './App.css';
import UploadForm from './components/UploadForm';
import AnalysisResult from './components/AnalysisResult';
import Loader from './components/Loader';
import ErrorBanner from './components/ErrorBanner';
import History from './components/History';
import { analyzeResume, fetchResumeById } from './api/api';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await analyzeResume(formData);
      setResult(res.data.data);
    } catch (err) {
      const message =
        err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = async (id) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetchResumeById(id);
      setResult(res.data.data);
    } catch (err) {
      setError('Could not load that analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-mark">RG</div>
        <div>
          <h1 className="app-title">Resume Gap Analyzer</h1>
          <p className="app-tagline">
            See exactly where your resume falls short of a job description — and how to close it.
          </p>
        </div>
      </header>

      <main className="app-main">
        <ErrorBanner message={error} onDismiss={() => setError('')} />

        {isLoading && <Loader />}

        {!isLoading && !result && (
          <>
            <UploadForm onSubmit={handleSubmit} isLoading={isLoading} />
            <History onSelect={handleSelectHistory} />
          </>
        )}

        {!isLoading && result && <AnalysisResult result={result} onReset={handleReset} />}
      </main>

      <footer className="app-footer">
        <span>Built with React, Node.js, Express, MongoDB &amp; OpenAI</span>
      </footer>
    </div>
  );
}

export default App;
