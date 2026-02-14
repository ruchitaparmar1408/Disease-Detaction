import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchDiseases } from '../api';
import './Dashboard.css';

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const list = await searchDiseases(query);
      setResults(list);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searched) {
      searchDiseases('').then(setResults).catch(() => setResults([]));
    }
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Search diseases</h1>
      <p className="dashboard-desc">Find symptoms, treatment, and prevention by name or keyword.</p>

      <form onSubmit={handleSearch} className="dashboard-search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. diabetes, migraine, skin rash…"
          className="dashboard-input"
        />
        <button type="submit" className="dashboard-btn">Search</button>
      </form>

      <div className="dashboard-actions">
        <Link to="/search-by-image" className="dashboard-image-link">
          <span className="dashboard-image-icon">🖼</span>
          Search by image
        </Link>
      </div>

      {loading && <p className="dashboard-status">Searching…</p>}
      {!loading && (
        <div className="dashboard-results">
          {results.length === 0 && searched && <p className="dashboard-empty">No diseases found. Try another search.</p>}
          {results.length === 0 && !searched && <p className="dashboard-empty">Loading list…</p>}
          {results.length > 0 && (
            <ul className="disease-list">
              {results.map((d) => (
                <li key={d.id}>
                  <Link to={`/disease/${d.slug}`} className="disease-card">
                    <div className="disease-card-image">
                      <img src={d.image_url} alt="" />
                    </div>
                    <div className="disease-card-body">
                      <h3>{d.name}</h3>
                      <p className="disease-card-desc">{d.description?.slice(0, 100)}…</p>
                      <span className="disease-card-tag">{d.category}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
