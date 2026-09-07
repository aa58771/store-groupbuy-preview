import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import publicData from './data/public-data.json';

// Static client adapter: intercept /api/public/* to read directly from bundled public-data.json
const originalFetch = window.fetch;
window.fetch = async (url, options) => {
  const urlStr = typeof url === 'string' ? url : (url?.url || url?.toString?.() || '');

  if (urlStr.includes('/api/public/group-buys')) {
    const list = publicData.groupBuys || [];

    // Query single group buy by slug
    const match = urlStr.match(/\/api\/public\/group-buys\/([^?#/]+)/);
    if (match) {
      const slug = decodeURIComponent(match[1]);
      const found = list.find(g => g.slug === slug || g.id === slug);
      if (found) {
        return new Response(JSON.stringify(found), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify({ error: '找不到此團購活動' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // List query
    let result = [...list];
    if (urlStr.includes('status=ACTIVE')) {
      result = result.filter(g => g.status === 'ACTIVE');
    } else if (urlStr.includes('status=ARRIVED')) {
      result = result.filter(g => g.status === 'ARRIVED');
    } else if (urlStr.includes('status=UPCOMING')) {
      result = result.filter(g => g.status === 'UPCOMING');
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Strictly block any private API requests
  if (urlStr.includes('/api/')) {
    return new Response(JSON.stringify({ error: 'Forbidden in public preview' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return originalFetch(url, options);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
