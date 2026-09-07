import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import GroupBuyCard from '../components/GroupBuyCard';

export default function GroupBuysPage({ onNavigate }) {
  const [groupBuys, setGroupBuys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/group-buys?sortBy=smart')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        // Show ACTIVE and UPCOMING
        const list = data.filter(g => g.status === 'ACTIVE' || g.status === 'UPCOMING');
        setGroupBuys(list);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="group-buys-page-view">
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>
          現在團購
        </h1>
        <p style={{ fontSize: '18px', color: '#44403c' }}>
          門市當期開跑與即將開跑好康商品。不用網路下單，親自來店或來電即可完成登記。
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '20px', color: '#78716c' }}>
          載入團購活動中...
        </div>
      ) : groupBuys.length === 0 ? (
        <div style={{ background: '#ffffff', border: '2px dashed #d6d3d1', borderRadius: '16px', padding: '40px 20px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '8px' }}>目前暫無進行中的團購</h2>
          <p style={{ color: '#78716c', marginBottom: '20px' }}>新的團購準備中，歡迎稍後再來看看！</p>
          <button className="btn btn-secondary" onClick={() => onNavigate('/')}>
            <ArrowLeft size={18} /> 返回首頁
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {groupBuys.map(gb => (
            <GroupBuyCard key={gb.id} groupBuy={gb} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}
