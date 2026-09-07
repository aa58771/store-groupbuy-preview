import React, { useState, useEffect } from 'react';
import { PackageCheck, ArrowLeft, Phone, MapPin } from 'lucide-react';
import { formatFullDate } from '../components/GroupBuyCard';

export default function ArrivedPage({ onNavigate }) {
  const [arrivedList, setArrivedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/group-buys?status=ARRIVED')
      .then(res => res.json())
      .then(data => setArrivedList(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="arrived-page-view">
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#dcfce7', color: '#15803d', padding: '6px 14px', borderRadius: '999px', fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>
          <PackageCheck size={20} /> 門市現貨取貨中
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>
          商品已到貨專區
        </h1>
        <p style={{ fontSize: '19px', color: '#44403c' }}>
          以下團購商品已全數抵達門市！<strong>已經登記的客人請攜帶姓名與電話直接到店取貨付款。</strong>
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '20px', color: '#78716c' }}>
          載入到貨清單中...
        </div>
      ) : arrivedList.length === 0 ? (
        <div style={{ background: '#ffffff', border: '2px dashed #d6d3d1', borderRadius: '16px', padding: '40px 20px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '8px' }}>目前沒有到貨待取商品</h2>
          <p style={{ color: '#78716c', marginBottom: '20px', fontSize: '18px' }}>
            最新一批商品運送中，到貨時店員將主動致電通知已登記的客人！
          </p>
          <button className="btn btn-primary" onClick={() => onNavigate('/group-buys')}>
            查看現在有哪些開跑團購
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {arrivedList.map(gb => {
            const targetSlug = gb.slug || gb.id;
            return (
              <article
                key={gb.id}
                className="group-buy-card"
                onClick={() => onNavigate(`/group-buy/${targetSlug}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-image-wrap">
                  <img
                    src={gb.productImageUrl || 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80'}
                    alt={gb.title}
                    className="card-image"
                  />
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span style={{
                      background: '#15803d', color: '#ffffff', padding: '6px 14px',
                      borderRadius: '8px', fontSize: '17px', fontWeight: '800'
                    }}>
                      已到貨
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <h3 className="card-title">{gb.title}</h3>

                  {/* Arrival Reminder (Section 16: 已經登記的客人可以到店取貨，不要顯示立即購買) */}
                  <div style={{
                    background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: '12px',
                    padding: '14px 18px', marginBottom: '20px'
                  }}>
                    <div style={{ fontSize: '16px', color: '#166534', fontWeight: '700' }}>
                      取貨提醒：
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#14532d', marginTop: '2px' }}>
                      已經登記的客人可以來店取貨
                    </div>
                    <div style={{ fontSize: '15px', color: '#4b5563', marginTop: '4px' }}>
                      請於每日營業時間 09:00 ~ 21:00 報姓名電話取貨
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-large"
                      style={{ width: '100%' }}
                      onClick={() => onNavigate(`/group-buy/${targetSlug}`)}
                    >
                      查看商品取貨資訊
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
