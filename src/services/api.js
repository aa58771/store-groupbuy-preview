import publicData from '../data/public-data.json';

const PUBLIC_LIST_STATUSES = ['UPCOMING', 'ACTIVE', 'ARRIVED'];

export async function fetchPublicGroupBuys(query = {}) {
  let list = publicData.groupBuys || [];
  if (query.status) {
    list = list.filter(gb => gb.status === query.status);
  } else {
    list = list.filter(gb => PUBLIC_LIST_STATUSES.includes(gb.status));
  }
  return list;
}

export async function fetchPublicGroupBuyBySlug(slug) {
  const list = publicData.groupBuys || [];
  const found = list.find(gb => gb.slug === slug || gb.id === slug);
  if (!found) {
    throw new Error('找不到此團購活動');
  }
  return found;
}
