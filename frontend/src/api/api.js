import axios from 'axios';

// In development, CRA's "proxy" field in package.json forwards /api calls to
// http://localhost:5000. In production, set REACT_APP_API_URL to your
// deployed backend URL (e.g. https://your-backend.onrender.com).
const baseURL = process.env.REACT_APP_API_URL || '';

const api = axios.create({
  baseURL,
});

export const analyzeResume = (formData) =>
  api.post('/api/resume/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const fetchHistory = () => api.get('/api/resume/history');

export const fetchResumeById = (id) => api.get(`/api/resume/${id}`);

export const deleteResumeById = (id) => api.delete(`/api/resume/${id}`);

export default api;
