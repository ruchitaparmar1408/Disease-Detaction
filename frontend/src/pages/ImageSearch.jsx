import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { imageSearch } from '../api';
import './ImageSearch.css';

export default function ImageSearch() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setResult(null);
    setError('');
    if (!f) {
      setFile(null);
      setPreview(null);
      return;
    }
    if (!f.type.startsWith('image/')) {
      setError('Please choose an image file (e.g. JPG, PNG).');
      setFile(null);
      setPreview(null);
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image first.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await imageSearch(file);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Image analysis failed. Try another image.');
    } finally {
      setLoading(false);
    }
  };

  const clearSelection = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    setResult(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="image-search-page">
      <h1 className="image-search-title">Search by image</h1>
      <p className="image-search-desc">
        Upload a photo of a symptom or condition. We’ll suggest possible matching diseases. Always confirm with a healthcare provider.
      </p>

      <form onSubmit={handleSubmit} className="image-search-form">
        <div className="image-search-upload">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="image-search-input"
          />
          {!preview ? (
            <div className="image-search-placeholder" onClick={() => inputRef.current?.click()}>
              <span className="image-search-placeholder-icon">📷</span>
              <span>Click or drag to upload an image</span>
            </div>
          ) : (
            <div className="image-search-preview-wrap">
              <img src={preview} alt="Preview" className="image-search-preview" />
              <div className="image-search-preview-actions">
                <button type="button" onClick={() => inputRef.current?.click()} className="image-search-btn secondary">
                  Change
                </button>
                <button type="button" onClick={clearSelection} className="image-search-btn secondary">
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        {error && <div className="image-search-error">{error}</div>}

        <button type="submit" className="image-search-submit" disabled={!file || loading}>
          {loading ? 'Analyzing…' : 'Analyze image'}
        </button>
      </form>

      {result && (
        <div className="image-search-results">
          <p className="image-search-results-message">{result.message}</p>
          <ul className="image-search-list">
            {result.diseases?.map((d) => (
              <li key={d.id}>
                <Link to={`/disease/${d.slug}`} className="image-search-card">
                  <div className="image-search-card-image">
                    <img src={d.image_url} alt="" />
                  </div>
                  <div className="image-search-card-body">
                    <h3>{d.name}</h3>
                    <p>{d.symptoms?.slice(0, 80)}…</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
