import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../api/api';

function History({ onSelect }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory()
      .then((res) => setItems(res.data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!items.length) return null;

  return (
    <div className="history-card">
      <h3 className="skills-heading">Recent analyses</h3>
      <ul className="history-list">
        {items.map((item) => (
          <li key={item._id} className="history-item" onClick={() => onSelect?.(item._id)}>
            <span className="history-file">{item.fileName}</span>
            {item.jobTitle && <span className="history-title">{item.jobTitle}</span>}
            <span className="history-score">{item.analysis?.matchScore ?? '-'}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
