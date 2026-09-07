import React, { useState, useEffect } from 'react';
import { ShoppingBag, Clock, PackageCheck, Phone, MapPin, ChevronRight, ArrowDown } from 'lucide-react';
import GroupBuyCard, { calculateRemainingDays } from '../components/GroupBuyCard';
import { STORE_CONFIG } from '../config/storeConfig';

export default function HomePage({ onNavigate }) {
  const [groupBuys, setGroupBuys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/group-buys?sortBy=smart')
      .then(res => res.json())
      .then(data => setGroupBuys(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Filter groups
  const activeList = groupBuys.filter(g => g.status === 'ACTIVE');
  const endingSoonList = activeList.filter(g => {
    const days = calculateRemainingDays(g.endDate);
    return days !== null && days >= 0 && days <= 2;
  });
  const arrivedList = groupBuys.filter(g => g.status === 'ARRIVED');

  const scrollToActive = () => {
    const el = document.getElementById('active-groupbuys-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page-view">
      {/* 1. Hero Section (Section 4) */}
      <section className="home-hero">
        <h1 className="hero-main-title">
          現在有什麼好康團購？
        </h1>
        <p className="hero-subtitle">
          看到喜歡的商品，直接到店或打電話登記即可。不用網路下單，到店取貨滿意再付款！
        </p>

        <div className="hero-btn-group">
          <button className="btn btn-primary btn-large" onClick={scrollToActive}>
            <ShoppingBag size={22} />
            <span>看現在團購</span>
          </button>
          <button className="btn btn-secondary btn-large" onClick={() => onNavigate('/store')}>
            <MapPin size={22} />
            <span>店家資訊與電話</span>
          </button>
        </div>
      </section>

      {/* 2. 即將截止 (Section 6: 如果團購剩餘時間很短，例如 48 小時內，出現在「快截止了」區塊，醒目顯示「剩 2 天」) */}
      {endingSoonList.length > 0 && (
        <section style={{ marginBottom: '44px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fee2e2', color: '#b91c1c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={22} />
            </div>
            <h2 style={{ color: '#b91c1c' }}>快截止了！即將結單</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {endingSoonList.map(gb => (
              <GroupBuyCard key={gb.id} groupBuy={gb} onNavigate={onNavigate} showUrgentHighlight />
            ))}
          </div>
        </section>
      )}

      {/* 3. 現在團購 (Section 5: 最重要區塊) */}
      <section id="active-groupbuys-section" style={{ marginBottom: '44px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2>現在團購</h2>
            <p style={{ fontSize: '16px', color: '#78716c' }}>嚴選產地生鮮特產・門市冷藏保鮮現取</p>
          </div>
          {activeList.length > 4 && (
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate('/group-buys')}
              style={{ fontSize: '16px', minHeight: '44px', padding: '8px 18px' }}
            >
              查看全部團購 ➔
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', fontSize: '20px', color: '#78716c' }}>載入團購中...</div>
        ) : activeList.length === 0 ? (
          /* Section 27: 空狀態 */
          <div style={{ background: '#ffffff', border: '2px dashed #d6d3d1', borderRadius: '16px', padding: '36px 20px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>目前沒有進行中的團購</h3>
            <p style={{ color: '#78716c', marginBottom: '16px' }}>新的團購準備中，歡迎之後再來看看，或直接來電詢問！</p>
            <a href="tel:0223456789" className="btn btn-primary">
              <Phone size={20} /> 來電詢問下期好康：(02) 2345-6789
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {activeList.map(gb => (
              <GroupBuyCard key={gb.id} groupBuy={gb} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </section>

      {/* 4. 已到貨 (Section 7: 顯示目前已經 ARRIVED 的團購，提醒已登記客人來店取貨) */}
      {arrivedList.length > 0 && (
        <section style={{ marginBottom: '44px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PackageCheck size={22} />
            </div>
            <h2>已到貨專區</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {arrivedList.map(gb => (
              <GroupBuyCard key={gb.id} groupBuy={gb} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )}

      {/* 5. 如何參加 (Section 13: 非常醒目) */}
      <section className="how-to-participate-box">
        <h2 className="participate-title">想參加團購？超簡單！</h2>
        <div style={{ fontSize: '20px', color: '#0f172a', lineHeight: '1.7', marginBottom: '14px' }}>
          <div><strong>① 親自到店：</strong>直接告訴店員想登記哪一款商品與數量。</div>
          <div style={{ margin: '8px 0' }}><strong>或</strong></div>
          <div><strong>② 撥打電話：</strong>一通電話告訴我們您的姓名與電話即可：</div>
        </div>

        <div>
          <a href="tel:0223456789" className="participate-phone-link">
            <Phone size={26} />
            <span>☎ (02) 2345-6789</span>
          </a>
        </div>

        <div style={{ marginTop: '16px', fontSize: '17px', color: '#065f46', fontWeight: '600' }}>
          ✓ 不用網路下單　✓ 不用註冊會員　✓ 到店付款最安心
        </div>

        <div style={{ marginTop: '18px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => onNavigate('/store')}
            style={{ minHeight: '46px', fontSize: '17px', padding: '8px 20px' }}
          >
            <MapPin size={18} /> 查看店家位置與營業時間
          </button>
        </div>
      </section>

      {/* 6. 店家資訊 (Section 15) */}
      <section style={{ background: 'white', border: '2px solid #e7e5e4', borderRadius: '16px', padding: '28px' }}>
        <h2 style={{ marginBottom: '16px' }}>門市資訊</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontSize: '18px' }}>
          <div>
            <div style={{ color: '#78716c', fontSize: '15px' }}>門市名稱</div>
            <strong style={{ fontSize: '20px' }}>{STORE_CONFIG.name}</strong>
          </div>

          <div>
            <div style={{ color: '#78716c', fontSize: '15px' }}>聯絡電話 (點擊直撥)</div>
            <a href={`tel:${STORE_CONFIG.phoneRaw}`} style={{ color: '#059669', fontWeight: '800', textDecoration: 'none' }}>
              {STORE_CONFIG.phone}
            </a>
          </div>

          <div>
            <div style={{ color: '#78716c', fontSize: '15px' }}>門市地址 (點擊導航)</div>
            <a
              href={STORE_CONFIG.mapUrl}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#059669', fontWeight: '700', textDecoration: 'underline' }}
            >
              {STORE_CONFIG.addressShort}
            </a>
          </div>

          <div>
            <div style={{ color: '#78716c', fontSize: '15px' }}>營業時間</div>
            <strong>{STORE_CONFIG.hours}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
