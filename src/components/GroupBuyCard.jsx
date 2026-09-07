import React from 'react';
import { Calendar, Clock, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';
import StatusBadge from './StatusBadge';

export function calculateRemainingDays(endDateStr) {
  if (!endDateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDateStr);
  end.setHours(0, 0, 0, 0);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function formatFullDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${year} 年 ${parseInt(month, 10)} 月 ${parseInt(day, 10)} 日`;
}

export default function GroupBuyCard({ groupBuy, onNavigate, showUrgentHighlight = false }) {
  const minPriceItem = groupBuy.items && groupBuy.items.length > 0
    ? groupBuy.items.reduce((prev, curr) => (prev.groupPrice < curr.groupPrice ? prev : curr))
    : null;

  const targetSlug = groupBuy.slug || groupBuy.id;
  const remainingDays = calculateRemainingDays(groupBuy.endDate);
  const isEndingSoon = remainingDays !== null && remainingDays >= 0 && remainingDays <= 2;
  const isArrived = groupBuy.status === 'ARRIVED';

  const savings = minPriceItem && minPriceItem.originalPrice > minPriceItem.groupPrice
    ? minPriceItem.originalPrice - minPriceItem.groupPrice
    : 0;

  const handleClick = (e) => {
    e.preventDefault();
    onNavigate(`/group-buy/${targetSlug}`);
  };

  return (
    <div
      className="group-buy-card"
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        borderColor: (showUrgentHighlight && isEndingSoon) ? '#f59e0b' : undefined,
      }}
    >
      {/* Product Image */}
      <div className="card-image-wrap">
        <img
          src={groupBuy.productImageUrl || 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80'}
          alt={groupBuy.title}
          className="card-image"
          loading="lazy"
        />

        {/* Top Status & Urgency Badge */}
        <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
          {isEndingSoon && groupBuy.status === 'ACTIVE' && (
            <span style={{
              background: '#b91c1c', color: '#ffffff', padding: '4px 10px',
              borderRadius: '8px', fontSize: '15px', fontWeight: '800', boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}>
              {remainingDays === 0 ? '今天截止！' : `剩 ${remainingDays} 天`}
            </span>
          )}
          <StatusBadge status={groupBuy.status} />
        </div>
      </div>

      {/* Card Content */}
      <div className="card-body">
        <h3 className="card-title">{groupBuy.title}</h3>

        {/* Price & Savings */}
        {minPriceItem && (
          <div className="price-display-block">
            <div style={{ fontSize: '15px', color: '#78716c', fontWeight: '700' }}>團購特價</div>
            <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
              <span className="price-main-tag num-font">
                ${minPriceItem.groupPrice}
              </span>
              {groupBuy.items.length > 1 && (
                <span style={{ fontSize: '16px', color: '#78716c', fontWeight: '700' }}>起</span>
              )}
              {minPriceItem.originalPrice > minPriceItem.groupPrice && (
                <span className="price-orig-tag num-font">
                  原價 ${minPriceItem.originalPrice}
                </span>
              )}
              {savings > 0 && (
                <span className="price-savings-tag">
                  現省 ${savings}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Dates Box (Section 11: 完整日期 + 剩X天) */}
        <div className="card-dates-box">
          {!isArrived ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#44403c' }}>團購截止：</span>
                <strong style={{ color: '#b91c1c' }}>{formatFullDate(groupBuy.endDate)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#44403c' }}>預計到貨：</span>
                <strong style={{ color: '#059669' }}>{formatFullDate(groupBuy.expectedArrivalDate)}</strong>
              </div>
            </>
          ) : (
            <div style={{ color: '#b45309', fontWeight: '800', textAlign: 'center', padding: '4px 0' }}>
              🎉 商品已到貨！已登記客人歡迎到店領取
            </div>
          )}
        </div>

        {/* Action Button */}
        <div style={{ marginTop: 'auto' }}>
          <button
            type="button"
            className="btn btn-primary btn-large"
            style={{ width: '100%' }}
            onClick={handleClick}
          >
            <span>查看詳細資訊</span>
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
