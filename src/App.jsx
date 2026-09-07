import React, { useState, useEffect } from 'react';
import CustomerHeader from './components/CustomerHeader';
import CustomerFooter from './components/CustomerFooter';
import HomePage from './views/HomePage';
import GroupBuysPage from './views/GroupBuysPage';
import GroupBuyDetailPage from './views/GroupBuyDetailPage';
import ArrivedPage from './views/ArrivedPage';
import HowToBuyPage from './views/HowToBuyPage';
import StoreInfoPage from './views/StoreInfoPage';

function getHashRoute() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(getHashRoute());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(getHashRoute());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parse /group-buy/:slug
  let groupBuySlug = null;
  if (currentPath.startsWith('/group-buy/')) {
    groupBuySlug = currentPath.replace('/group-buy/', '').split('/')[0];
  }

  return (
    <div className="app-container">
      {/* Customer Header */}
      <CustomerHeader currentPath={currentPath} onNavigate={navigate} />

      {/* Customer Views Routing */}
      <main className="main-content">
        {currentPath === '/' && (
          <HomePage onNavigate={navigate} />
        )}

        {currentPath === '/group-buys' && (
          <GroupBuysPage onNavigate={navigate} />
        )}

        {groupBuySlug && (
          <GroupBuyDetailPage
            slug={groupBuySlug}
            onNavigate={navigate}
          />
        )}

        {currentPath === '/arrived' && (
          <ArrivedPage onNavigate={navigate} />
        )}

        {currentPath === '/how-to-buy' && (
          <HowToBuyPage onNavigate={navigate} />
        )}

        {currentPath === '/store' && (
          <StoreInfoPage onNavigate={navigate} />
        )}
      </main>

      {/* Customer Footer (Strictly without admin login link) */}
      <CustomerFooter onNavigate={navigate} />
    </div>
  );
}
