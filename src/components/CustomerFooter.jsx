import React from 'react';
import { MapPin, Phone, Clock, ShieldCheck } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export default function CustomerFooter({ onNavigate }) {
  return (
    <footer className="customer-footer no-print">
      <div className="footer-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#1c1917', marginBottom: '8px' }}>
              {STORE_CONFIG.name}
            </div>
            <div style={{ fontSize: '16px', color: '#44403c', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={18} color="#059669" />
                <a
                  href={STORE_CONFIG.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  {STORE_CONFIG.addressShort} (點擊開啟導航)
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={18} color="#059669" />
                <a href={`tel:${STORE_CONFIG.phoneRaw}`} style={{ color: 'inherit', fontWeight: '700', textDecoration: 'none' }}>
                  {STORE_CONFIG.phone} (點擊撥號)
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="#059669" />
                <span>營業時間：{STORE_CONFIG.hours}</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#f5f5f4', padding: '18px 22px', borderRadius: '14px', maxWidth: '400px', border: '1.5px solid #e7e5e4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', color: '#047857', marginBottom: '6px', fontSize: '17px' }}>
              <ShieldCheck size={20} /> 門市品質安心保證
            </div>
            <p style={{ fontSize: '15px', color: '#57534e', lineHeight: '1.5' }}>
              {STORE_CONFIG.guarantee}
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e7e5e4', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '14px', color: '#78716c' }}>
          <div>
            © {new Date().getFullYear()} {STORE_CONFIG.name} 版權所有
          </div>
          <div>
            門市在地經營・品質保證
          </div>
        </div>
      </div>
    </footer>
  );
}
