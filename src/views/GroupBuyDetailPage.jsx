import React, { useState, useEffect } from 'react';
import {
  Phone,
  MapPin,
  Calendar,
  Clock,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { calculateRemainingDays, formatFullDate } from '../components/GroupBuyCard';
import StatusBadge from '../components/StatusBadge';

export default function GroupBuyDetailPage({ slug, onNavigate }) {
  const [groupBuy, setGroupBuy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    fetch(`/api/public/group-buys/${encodeURIComponent(slug)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('NOT_FOUND');
        }
        return res.json();
      })
      .then(data => {
        setGroupBuy(data);
        // Set dynamic document title for SEO & LINE sharing (Section 24)
        const minPrice = data.items?.length > 0 ? Math.min(...data.items.map(i => i.groupPrice)) : '';
        document.title = `${data.title} | 團購價 $${minPrice} | 幸福社區生鮮門市`;
      })
      .catch(err => {
        console.error(err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));

    return () => {
      document.title = '幸福社區生鮮門市 | 實體門市團購';
    };
  }, [slug]);

  const handleShare = async () => {
    const minPrice = groupBuy.items?.length > 0 ? Math.min(...groupBuy.items.map(i => i.groupPrice)) : '';
    const shareData = {
      title: `${groupBuy.title} - 門市團購價 $${minPrice}`,
      text: `${groupBuy.title}，門市團購特價 $${minPrice}，${groupBuy.endDate} 截止。直接到店或打電話登記即可！`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        // Fallback to copy link
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', fontSize: '20px', color: '#78716c' }}>
        載入團購資訊中...
      </div>
    );
  }

  /* Section 28: 友善 404 處理 */
  if (notFound || !groupBuy) {
    return (
      <div style={{
        background: '#ffffff', border: '2px solid #e7e5e4', borderRadius: '20px',
        padding: '48px 24px', textAlign: 'center', maxWidth: '640px', margin: '40px auto'
      }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fee2e2', color: '#b91c1c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <AlertCircle size={36} />
        </div>
        <h1 style={{ fontSize: '26px', marginBottom: '10px' }}>這個團購可能已經結束或網址已失效</h1>
        <p style={{ color: '#78716c', fontSize: '18px', marginBottom: '24px' }}>
          別擔心！門市隨時都有新鮮好康的在地生鮮與水果團購正在進行。
        </p>
        <button className="btn btn-primary btn-large" onClick={() => onNavigate('/group-buys')}>
          查看現在團購
        </button>
      </div>
    );
  }

  const remainingDays = calculateRemainingDays(groupBuy.endDate);
  const isEndingSoon = remainingDays !== null && remainingDays >= 0 && remainingDays <= 2;
  const isArrived = groupBuy.status === 'ARRIVED';

  const minPriceItem = groupBuy.items && groupBuy.items.length > 0
    ? groupBuy.items.reduce((prev, curr) => (prev.groupPrice < curr.groupPrice ? prev : curr))
    : null;
  const savings = minPriceItem && minPriceItem.originalPrice > minPriceItem.groupPrice
    ? minPriceItem.originalPrice - minPriceItem.groupPrice
    : 0;

  return (
    <div className="group-buy-detail-page" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Back button */}
      <div style={{ marginBottom: '16px' }}>
        <button
          className="btn btn-secondary"
          onClick={() => onNavigate('/group-buys')}
          style={{ minHeight: '44px', padding: '6px 16px', fontSize: '16px' }}
        >
          <ArrowLeft size={18} /> 返回現在團購列表
        </button>
      </div>

      <article style={{ background: '#ffffff', border: '2px solid #e7e5e4', borderRadius: '20px', overflow: 'hidden', paddingBottom: '32px' }}>
        {/* 1. 商品大圖片 (Section 9) */}
        <div style={{ width: '100%', aspectRatio: '16 / 9', background: '#f5f5f4', overflow: 'hidden', position: 'relative' }}>
          <img
            src={groupBuy.productImageUrl || 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80'}
            alt={groupBuy.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
            <StatusBadge status={groupBuy.status} />
          </div>
        </div>

        <div style={{ padding: '28px 24px' }}>
          {/* 2. 商品名稱 (Section 9) */}
          <h1 style={{ fontSize: '30px', fontWeight: '800', marginBottom: '16px', lineHeight: '1.3' }}>
            {groupBuy.title}
          </h1>

          {/* 3 & 4. 團購價 + 原價與現省金額 (Section 9 & 10) */}
          {minPriceItem && (
            <div style={{
              background: '#fef2f2', border: '2px solid #fecaca', borderRadius: '14px',
              padding: '16px 20px', marginBottom: '22px'
            }}>
              <div style={{ fontSize: '16px', color: '#991b1b', fontWeight: '700' }}>門市團購特惠價</div>
              <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', marginTop: '2px' }}>
                <span className="num-font" style={{ fontSize: '42px', fontWeight: '800', color: '#b91c1c', lineHeight: '1' }}>
                  ${minPriceItem.groupPrice}
                </span>
                {groupBuy.items.length > 1 && (
                  <span style={{ fontSize: '20px', color: '#7f1d1d', fontWeight: '700' }}>起</span>
                )}
                {minPriceItem.originalPrice > minPriceItem.groupPrice && (
                  <span className="num-font" style={{ fontSize: '20px', textDecoration: 'line-through', color: '#78716c', marginLeft: '6px' }}>
                    原價 ${minPriceItem.originalPrice}
                  </span>
                )}
                {savings > 0 && (
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 12px', borderRadius: '8px', fontSize: '18px', fontWeight: '800', marginLeft: '8px' }}>
                    現省 ${savings}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 5. 截止日期 (Section 11: 完整日期 + 剩X天) */}
          <div style={{
            background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px',
            padding: '16px 20px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={22} color="#b91c1c" />
              <span style={{ fontSize: '18px', fontWeight: '700' }}>團購截止日期：</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <strong style={{ fontSize: '20px', color: '#b91c1c' }}>
                {formatFullDate(groupBuy.endDate)}
              </strong>
              {isEndingSoon && (
                <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '3px 10px', borderRadius: '6px', fontSize: '16px', fontWeight: '800' }}>
                  {remainingDays === 0 ? '今天截止！' : `剩 ${remainingDays} 天`}
                </span>
              )}
            </div>
          </div>

          {/* 6. 預計到貨日期 (Section 9) */}
          <div style={{
            background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px',
            padding: '16px 20px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={22} color="#059669" />
              <span style={{ fontSize: '18px', fontWeight: '700' }}>預計到貨日期：</span>
            </div>
            <strong style={{ fontSize: '20px', color: '#059669' }}>
              {formatFullDate(groupBuy.expectedArrivalDate)}
            </strong>
          </div>

          {/* 7. 商品規格卡片清單 (Section 12: 使用明確卡片顯示，非下拉選單) */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              商品規格與價格
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {groupBuy.items?.map(it => (
                <div
                  key={it.id}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '16px 20px', background: '#ecfdf5', borderRadius: '14px',
                    border: '2px solid #a7f3d0'
                  }}
                >
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#065f46' }}>
                    {it.variantName}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {it.originalPrice > it.groupPrice && (
                      <span className="num-font" style={{ fontSize: '16px', textDecoration: 'line-through', color: '#78716c', marginRight: '10px' }}>
                        ${it.originalPrice}
                      </span>
                    )}
                    <span className="num-font" style={{ fontSize: '28px', fontWeight: '800', color: '#b91c1c' }}>
                      ${it.groupPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. 如何登記 (Section 13: 非常醒目，①到店 ②電話 tel:) */}
          <div className="how-to-participate-box" style={{ margin: '0 0 32px 0' }}>
            <h2 className="participate-title">想參加這一團？</h2>
            <div style={{ fontSize: '19px', color: '#0f172a', lineHeight: '1.7', marginBottom: '12px' }}>
              <div><strong>① 到店告訴店員：</strong>直接親洽門市登記即可。</div>
              <div style={{ margin: '6px 0' }}><strong>或</strong></div>
              <div><strong>② 打電話告訴我們：</strong>撥打下方電話告知姓名即可登記：</div>
            </div>

            <div>
              <a href="tel:0223456789" className="participate-phone-link">
                <Phone size={26} />
                <span>☎ (02) 2345-6789</span>
              </a>
            </div>

            <div style={{ marginTop: '16px', fontSize: '17px', color: '#065f46', fontWeight: '700' }}>
              不用網路下單，也不用註冊會員。商品抵達門市後取貨付款！
            </div>

            <div style={{ marginTop: '16px' }}>
              <button
                className="btn btn-secondary"
                onClick={() => onNavigate('/store')}
                style={{ minHeight: '46px', fontSize: '16px', padding: '8px 18px' }}
              >
                <MapPin size={18} /> 查看店家位置與營業時間
              </button>
            </div>
          </div>

          {/* 9. 商品介紹 (Section 9) */}
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '10px' }}>
              商品介紹
            </h2>
            <div style={{ fontSize: '18px', lineHeight: '1.7', color: '#292524', background: '#fafaf9', padding: '18px 20px', borderRadius: '12px', border: '1px solid #e7e5e4' }}>
              {groupBuy.productDesc || groupBuy.description || '日本青森縣直發原裝箱，果香濃郁、清脆甜爽！'}
            </div>
          </div>

          {/* 10. 注意事項 (Section 9) */}
          {groupBuy.notice && (
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '10px' }}>
                注意事項
              </h2>
              <div style={{
                fontSize: '17px', lineHeight: '1.6', color: '#92400e', background: '#fffbeb',
                padding: '16px 20px', borderRadius: '12px', border: '1.5px solid #fde68a', display: 'flex', alignItems: 'flex-start', gap: '8px'
              }}>
                <AlertCircle size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>{groupBuy.notice}</div>
              </div>
            </div>
          )}

          {/* 11. 店家資訊 (Section 9 & 15) */}
          <div style={{ background: '#f5f5f4', padding: '20px', borderRadius: '14px', border: '1px solid #e7e5e4', marginBottom: '28px' }}>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#1c1917', marginBottom: '8px' }}>
              取貨門市資訊
            </div>
            <div style={{ fontSize: '16px', color: '#44403c', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><strong>門市：</strong>幸福社區生鮮門市</div>
              <div><strong>地址：</strong>台北市大安區和平東路二段 88 號</div>
              <div><strong>電話：</strong>(02) 2345-6789</div>
              <div><strong>營業時間：</strong>每日 09:00 ~ 21:00</div>
            </div>
          </div>

          {/* 12. 分享功能 (Section 25: 方便家人把商品資訊分享給長輩) */}
          <div className="share-box">
            <div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#1c1917' }}>
                覺得好康？分享給長輩或家人
              </div>
              <div style={{ fontSize: '15px', color: '#78716c' }}>
                一鍵發送到 LINE 或複製網址
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleShare}
                style={{ minHeight: '48px', padding: '8px 18px', fontSize: '17px' }}
              >
                <Share2 size={18} />
                <span>分享好康</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={copyToClipboard}
                style={{ minHeight: '48px', padding: '8px 18px', fontSize: '17px' }}
              >
                {copied ? <Check size={18} color="#15803d" /> : <Copy size={18} />}
                <span>{copied ? '已複製連結！' : '複製網址'}</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
