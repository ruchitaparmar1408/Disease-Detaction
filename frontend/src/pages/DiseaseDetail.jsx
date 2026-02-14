import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDisease } from '../api';
import './DiseaseDetail.css';

export default function DiseaseDetail() {
  const { idOrSlug } = useParams();
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDisease(idOrSlug)
      .then(setDisease)
      .catch(() => setError('Disease not found'))
      .finally(() => setLoading(false));
  }, [idOrSlug]);

  if (loading) return <div className="detail-loading">Loading…</div>;
  if (error || !disease) return <div className="detail-error">{error || 'Not found'} <Link to="/dashboard">Back to search</Link></div>;

  const sections = [
    { title: 'Overview', content: disease.description, single: true },
    { title: 'Symptoms', content: disease.symptoms },
    { title: 'Causes', content: disease.causes },
    { title: 'Treatment', content: disease.treatment },
    { title: 'Prevention', content: disease.prevention }
  ].filter(s => s.content);

  return (
    <div className="disease-detail">
      <Link to="/dashboard" className="detail-back">← Back to search</Link>

      <div className="detail-hero">
        <div className="detail-image-wrap">
          <img src={disease.image_url} alt={disease.name} className="detail-image" />
        </div>
        <div className="detail-head">
          <span className="detail-category">{disease.category}</span>
          <h1 className="detail-title">{disease.name}</h1>
          {disease.description && <p className="detail-overview">{disease.description}</p>}
        </div>
      </div>

      <div className="detail-sections">
        {sections.filter(s => !s.single).map((section) => (
          <section key={section.title} className="detail-section">
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
