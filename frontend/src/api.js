function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function searchDiseases(q) {
  const params = q ? new URLSearchParams({ q }) : '';
  const res = await fetch(`/api/diseases/search${params ? '?' + params : ''}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Search failed');
  const data = await res.json();
  return data.diseases;
}

export async function getDisease(idOrSlug) {
  const res = await fetch(`/api/diseases/${encodeURIComponent(idOrSlug)}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Disease not found');
  return res.json();
}

export async function imageSearch(file) {
  const form = new FormData();
  form.append('image', file);
  const res = await fetch('/api/diseases/image-search', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: form
  });
  if (!res.ok) throw new Error('Image search failed');
  return res.json();
}
