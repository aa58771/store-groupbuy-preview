import React from 'react';
import { Eye, Phone, CheckCircle2, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

export default function HowToBuyPage({ onNavigate }) {
  return (
    <div className="how-to-buy-page-view" style={{ maxWidth: '780px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>
          怎麼參加團購？
        </h1>
        <p style={{ fontSize: '20px', color: '#44403c' }}>
          超簡單 3 步驟，中高齡長輩不用學、免操作手機下單！
        </p>
      </div>

      {/* 3 Big Clear Steps (Section 14) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
        {/* Step 1 */}
        <div style={{
          background: '#ffffff', border: '2px solid #e7e5e4', borderRadius: '18px',
          padding: '24px 28px', display: 'flex', alignItems: 'flex-start', gap: '20px'
        }}>
          <div style={{
            width: '54px', height: '54px', borderRadius: '50%', background: '#dcfce7',
            color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: '800', flexShrink: 0
          }}>
            1
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '6px', color: '#0f172a' }}>
              看到喜歡的商品
            </h2>
            <p style={{ fontSize: '18px', color: '#44403c', lineHeight: '1.6' }}>
              在首頁或「現在團購」瀏覽當期推薦的日本蘋果、產地小農水果或生鮮好康。看好想買的規格與特價。
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div style={{
          background: '#ffffff', border: '2px solid #059669', borderRadius: '18px',
          padding: '24px 28px', display: 'flex', alignItems: 'flex-start', gap: '20px',
          boxShadow: '0 4px 12px rgba(5, 150, 105, 0.1)'
        }}>
          <div style={{
            width: '54px', height: '54px', borderRadius: '50%', background: '#059669',
            color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: '800', flexShrink: 0
          }}>
            2
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '6px', color: '#065f46' }}>
              到店或打電話登記
            </h2>
            <p style={{ fontSize: '18px', color: '#44403c', lineHeight: '1.6', marginBottom: '12px' }}>
              直接親自到門市櫃檯告知店員，或直接撥打門市專線，店員會在 10 秒內為您登記姓名與電話。
            </p>
            <a href="tel:0223456789" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '18px', minHeight: '46px' }}>
              <Phone size={20} />
              <span>來電登記：(02) 2345-6789</span>
            </a>
          </div>
        </div>

        {/* Step 3 */}
        <div style={{
          background: '#ffffff', border: '2px solid #e7e5e4', borderRadius: '18px',
          padding: '24px 28px', display: 'flex', alignItems: 'flex-start', gap: '20px'
        }}>
          <div style={{
            width: '54px', height: '54px', borderRadius: '50%', background: '#fef3c7',
            color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: '800', flexShrink: 0
          }}>
            3
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '6px', color: '#0f172a' }}>
              商品到貨後來店取貨
            </h2>
            <p style={{ fontSize: '18px', color: '#44403c', lineHeight: '1.6' }}>
              商品到店後，我們會發送電話或現場通知。您只需在營業時間來店，現場開箱檢查滿意，再付款取貨即可！
            </p>
          </div>
        </div>
      </div>

      {/* Reassurance Notice (Section 14) */}
      <div style={{
        background: '#f5f5f4', border: '2px solid #e7e5e4', borderRadius: '18px',
        padding: '28px 24px', marginBottom: '32px'
      }}>
        <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#047857' }}>
          <ShieldCheck size={26} /> 門市特別叮嚀與說明
        </h3>
        <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '18px', color: '#292524' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={22} color="#059669" />
            <strong>不需要網路下單</strong>：免除中高齡長輩操作手機購物的困擾。
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={22} color="#059669" />
            <strong>不需要註冊會員</strong>：不需記憶帳號或密碼，報電話即完成。
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={22} color="#059669" />
            <strong>不需要信用卡付款</strong>：取貨時現場付現金或門市結帳，安全無虞。
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={22} color="#059669" />
            <strong>詳細到貨時間以店家通知為準</strong>：如遇天氣或產地船班異動，門市第一時間主動告知。
          </li>
        </ul>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          className="btn btn-primary btn-large"
          onClick={() => onNavigate('/group-buys')}
          style={{ minWidth: '240px' }}
        >
          <span>立即瀏覽現在團購</span>
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
