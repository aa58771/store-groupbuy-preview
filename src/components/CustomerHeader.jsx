import React from 'react';
import { Store, Phone } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export default function CustomerHeader({ currentPath, onNavigate }) {
  return (
    <header className="customer-header no-print">
      <div className="header-inner">
        {/* Brand */}
        <a
          href="#/"
          className="header-brand"
          onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
        >
          <div className="header-logo-icon">
            <Store size={26} />
          </div>
          <div>
            <div className="header-title">{STORE_CONFIG.name}</div>
            <div style={{ fontSize: '14px', color: '#78716c', fontWeight: '500' }}>
              {STORE_CONFIG.tagline}
            </div>
          </div>
        </a>

        {/* Navigation Tabs */}
        <nav className="header-nav">
          <a
            href="#/group-buys"
            className={`header-nav-link ${currentPath === '/group-buys' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('/group-buys'); }}
          >
            現在團購
          </a>

          <a
            href="#/arrived"
            className={`header-nav-link ${currentPath === '/arrived' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('/arrived'); }}
          >
            已到貨
          </a>

          <a
            href="#/how-to-buy"
            className={`header-nav-link ${currentPath === '/how-to-buy' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('/how-to-buy'); }}
          >
            如何購買
          </a>

          <a
            href="#/store"
            className={`header-nav-link ${currentPath === '/store' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNavigate('/store'); }}
          >
            店家資訊
          </a>

          {/* Quick Call Button */}
          <a href={`tel:${STORE_CONFIG.phoneRaw}`} className="header-phone-btn" title="點擊直接撥打門市電話">
            <Phone size={18} />
            <span>{STORE_CONFIG.phone}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
