import React from 'react';

const STATUS_CONFIG = {
  // Group Buy Statuses
  DRAFT: { label: '草稿', className: 'badge-closed' },
  UPCOMING: { label: '即將開始', className: 'badge-upcoming' },
  ACTIVE: { label: '團購中', className: 'badge-active' },
  CLOSED: { label: '已截止', className: 'badge-closed' },
  ORDERED: { label: '已向廠商訂貨', className: 'badge-upcoming' },
  ARRIVED: { label: '商品已到貨', className: 'badge-arrived' },
  COMPLETED: { label: '團購完成', className: 'badge-completed' },
  CANCELLED: { label: '已取消', className: 'badge-cancelled' },

  // Reservation Statuses
  RESERVED: { label: '已登記', className: 'badge-upcoming' },
  PICKED_UP: { label: '已取貨', className: 'badge-active' },

  // Payment Statuses
  UNPAID: { label: '未付款', className: 'badge-unpaid' },
  PAID: { label: '已付款', className: 'badge-paid' },
};

export default function StatusBadge({ status, type = 'status' }) {
  const config = STATUS_CONFIG[status] || { label: status, className: 'badge-closed' };
  return (
    <span className={`badge ${config.className}`}>
      {config.label}
    </span>
  );
}
