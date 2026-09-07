import React from 'react';
import { Store, MapPin, Phone, Clock, Car, Bus, Navigation } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export default function StoreInfoPage({ onNavigate }) {
  return (
    <div className="store-info-page-view" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px' }}>
          店家門市資訊
        </h1>
        <p style={{ fontSize: '19px', color: '#44403c' }}>
          歡迎隨時親臨門市選購、登記團購好物或領取到貨商品。
        </p>
      </div>

      {/* Main Info Card */}
      <div style={{
        background: '#ffffff', border: '2px solid #e7e5e4', borderRadius: '20px',
        padding: '32px 28px', marginBottom: '28px', boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Store size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1c1917' }}>{STORE_CONFIG.name}</h2>
            <div style={{ fontSize: '16px', color: '#059669', fontWeight: '700' }}>{STORE_CONFIG.subtitle}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', fontSize: '19px' }}>
          {/* Phone */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <Phone size={24} color="#059669" style={{ flexShrink: 0, marginTop: '4px' }} />
            <div>
              <div style={{ fontSize: '15px', color: '#78716c', fontWeight: '700' }}>門市來電專線 (點擊撥打)</div>
              <a
                href={`tel:${STORE_CONFIG.phoneRaw}`}
                style={{ fontSize: '26px', fontWeight: '800', color: '#047857', textDecoration: 'none' }}
              >
                {STORE_CONFIG.phone}
              </a>
              <div style={{ fontSize: '15px', color: '#78716c', marginTop: '2px' }}>
                {STORE_CONFIG.phoneHours}
              </div>
            </div>
          </div>

          {/* Address */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <MapPin size={24} color="#059669" style={{ flexShrink: 0, marginTop: '4px' }} />
            <div>
              <div style={{ fontSize: '15px', color: '#78716c', fontWeight: '700' }}>門市地址 (點擊開啟 Google Maps 導航)</div>
              <a
                href={STORE_CONFIG.mapUrl}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '22px', fontWeight: '800', color: '#1c1917', textDecoration: 'underline' }}
              >
                {STORE_CONFIG.address}
              </a>
              <div style={{ marginTop: '8px' }}>
                <a
                  href={STORE_CONFIG.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ minHeight: '48px', padding: '8px 20px', fontSize: '16px' }}
                >
                  <Navigation size={18} /> 開啟手機地圖導航
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <Clock size={24} color="#059669" style={{ flexShrink: 0, marginTop: '4px' }} />
            <div>
              <div style={{ fontSize: '15px', color: '#78716c', fontWeight: '700' }}>門市營業時間</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#1c1917' }}>
                {STORE_CONFIG.hours}
              </div>
              <div style={{ fontSize: '15px', color: '#78716c', marginTop: '2px' }}>
                {STORE_CONFIG.hoursNotice}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transit & Parking Info */}
      <div style={{
        background: '#ffffff', border: '2px solid #e7e5e4', borderRadius: '20px',
        padding: '28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px'
      }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bus size={22} color="#059669" /> 大眾交通方式
          </h3>
          <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '16px', color: '#44403c' }}>
            <li>• <strong>火車／捷運：</strong>{STORE_CONFIG.transitMetro}</li>
            <li>• <strong>公車：</strong>{STORE_CONFIG.transitBus}</li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Car size={22} color="#059669" /> 停車與臨停資訊
          </h3>
          <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '16px', color: '#44403c' }}>
            <li>• <strong>門市門口：</strong>{STORE_CONFIG.parkingStore}</li>
            <li>• <strong>收費停車場：</strong>{STORE_CONFIG.parkingPaid}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
