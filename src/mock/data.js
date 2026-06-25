// ===== 模拟数据 =====

// 分类
export const categories = [
  { id: 'all', name: '全部' },
  { id: '祛痘', name: '祛痘', icon: 'Sparkles' },
  { id: '美白', name: '美白', icon: 'Sun' },
  { id: '除螨', name: '除螨', icon: 'Search' },
  { id: '减肥', name: '减肥', icon: 'Heart' },
  { id: '套餐', name: '套餐优惠', icon: 'Gift' },
]

// 项目列表
export const products = [
  {
    id: 1,
    name: '深层祛痘护理',
    category: '祛痘',
    desc: '采用专业祛痘技术，深层清洁毛孔，清除痘痘和粉刺，配合消炎修复精华，帮助肌肤恢复平滑状态。适合痘痘肌、油性肌肤。',
    price: 198,
    originalPrice: 398,
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=300&fit=crop',
    ],
    tags: ['引流价', '热门'],
    skinTypes: ['油皮', '混合', '痘痘肌'],
    items: [{ name: '深层祛痘护理', count: 1 }],
    validityDays: 365,
    notes: '请提前预约；孕妇慎用；治疗后24小时避免化妆',
    isActive: true,
    sales: 328,
  },
  {
    id: 2,
    name: '光子美白嫩肤',
    category: '美白',
    desc: '进口光子嫩肤仪器，温和美白淡斑，改善暗沉肤色，提亮肌肤光泽度。无痛无创，即做即走。',
    price: 298,
    originalPrice: 699,
    images: [
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
    ],
    tags: ['热门'],
    skinTypes: ['干皮', '混合', '敏感'],
    items: [{ name: '光子美白嫩肤', count: 1 }],
    validityDays: 365,
    notes: '治疗后注意防晒；建议搭配修复面膜',
    isActive: true,
    sales: 256,
  },
  {
    id: 3,
    name: '深层除螨清洁',
    category: '除螨',
    desc: '专业除螨检测+深层清洁，清除毛囊内螨虫和油脂堆积，改善黑头、粉刺、毛孔粗大问题。',
    price: 158,
    originalPrice: 358,
    images: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
    ],
    tags: ['引流价'],
    skinTypes: ['油皮', '混合', '痘痘肌'],
    items: [{ name: '深层除螨清洁', count: 1 }],
    validityDays: 365,
    notes: '建议每月做1次；治疗后注意补水',
    isActive: true,
    sales: 412,
  },
  {
    id: 4,
    name: '中医经络减肥',
    category: '减肥',
    desc: '结合中医经络理论与现代仪器，通过穴位刺激促进新陈代谢，加速脂肪分解。安全无副作用。',
    price: 398,
    originalPrice: 880,
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    ],
    tags: ['热门'],
    skinTypes: [],
    items: [{ name: '中医经络减肥', count: 1 }],
    validityDays: 180,
    notes: '建议配合饮食调理；经期暂停治疗',
    isActive: true,
    sales: 189,
  },
  {
    id: 5,
    name: '水光针补水套餐',
    category: '套餐',
    desc: '3次水光针深度补水+2次修复面膜护理，让肌肤喝饱水，恢复水润光泽。适合干性肌肤、换季敏感肌。',
    price: 699,
    originalPrice: 1580,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=300&fit=crop',
    ],
    tags: ['套餐', '热销'],
    skinTypes: ['干皮', '混合', '敏感'],
    items: [
      { name: '水光针深度补水', count: 3 },
      { name: '修复面膜护理', count: 2 },
    ],
    validityDays: 365,
    notes: '每次治疗间隔1-2周；治疗后注意防晒',
    isActive: true,
    sales: 145,
  },
  {
    id: 6,
    name: '祛痘美白综合套餐',
    category: '套餐',
    desc: '祛痘3次+美白2次，一站式解决痘痘和肤色暗沉问题。超高性价比，学生党首选。',
    price: 598,
    originalPrice: 1396,
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop',
    ],
    tags: ['套餐', '超值'],
    skinTypes: ['油皮', '混合', '痘痘肌'],
    items: [
      { name: '深层祛痘护理', count: 3 },
      { name: '光子美白嫩肤', count: 2 },
    ],
    validityDays: 365,
    notes: '请提前预约；可分开使用',
    isActive: true,
    sales: 267,
  },
]

// Banner
export const banners = [
  { id: 1, image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=750&h=320&fit=crop', title: '新客专享' },
  { id: 2, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=750&h=320&fit=crop', title: '夏日美白季' },
  { id: 3, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=750&h=320&fit=crop', title: '老带新有礼' },
]

// 当前用户
export const currentUser = {
  id: 1,
  nickname: '小美',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=beauty',
  phone: '138****8888',
  role: 'customer', // 'customer' | 'admin'
  inviterId: null,
  inviteCode: 'ABCD1234',
  createdAt: '2026-01-15',
}

// 管理员
export const adminUser = {
  id: 999,
  nickname: '金女士（店主）',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  phone: '139****0000',
  role: 'admin',
  inviterId: null,
  inviteCode: 'ADMIN001',
  createdAt: '2025-12-01',
  pinCode: '8888', // 管理员后台 PIN 码
}

// 订单
export const orders = [
  {
    id: 1001,
    userId: 1,
    productId: 1,
    productName: '深层祛痘护理',
    productImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop',
    amount: 198,
    status: 'paid', // 'paid' | 'used' | 'expired' | 'refunding'
    paidAt: '2026-06-20 14:30:00',
    expireAt: '2027-06-20',
    items: [
      { name: '深层祛痘护理', totalCount: 1, usedCount: 1 },
    ],
    verificationRecords: [
      { time: '2026-06-22 10:00', item: '深层祛痘护理', operator: '金女士' },
    ],
  },
  {
    id: 1002,
    userId: 1,
    productId: 5,
    productName: '水光针补水套餐',
    productImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop',
    amount: 699,
    status: 'paid',
    paidAt: '2026-06-18 09:15:00',
    expireAt: '2027-06-18',
    items: [
      { name: '水光针深度补水', totalCount: 3, usedCount: 1 },
      { name: '修复面膜护理', totalCount: 2, usedCount: 0 },
    ],
    verificationRecords: [
      { time: '2026-06-19 14:00', item: '水光针深度补水', operator: '金女士' },
    ],
  },
  {
    id: 1003,
    userId: 1,
    productId: 6,
    productName: '祛痘美白综合套餐',
    productImage: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=200&fit=crop',
    amount: 598,
    status: 'paid',
    paidAt: '2026-06-15 16:45:00',
    expireAt: '2027-06-15',
    items: [
      { name: '深层祛痘护理', totalCount: 3, usedCount: 0 },
      { name: '光子美白嫩肤', totalCount: 2, usedCount: 0 },
    ],
    verificationRecords: [],
  },
]

// 预约
export const appointments = [
  {
    id: 201,
    orderId: 1001,
    userId: 1,
    userName: '小美',
    userPhone: '138****8888',
    productName: '深层祛痘护理',
    itemName: '深层祛痘护理',
    date: '2026-06-22',
    timeSlot: '10:00-11:00',
    status: 'completed', // 'pending' | 'completed' | 'cancelled'
    source: 'online',
    createdAt: '2026-06-20 15:00',
  },
  {
    id: 202,
    orderId: 1002,
    userId: 1,
    userName: '小美',
    userPhone: '138****8888',
    productName: '水光针补水套餐',
    itemName: '水光针深度补水',
    date: '2026-06-26',
    timeSlot: '14:00-15:00',
    status: 'pending',
    source: 'online',
    createdAt: '2026-06-19 10:30',
  },
  {
    id: 203,
    orderId: 1003,
    userId: 1,
    userName: '小美',
    userPhone: '138****8888',
    productName: '祛痘美白综合套餐',
    itemName: '深层祛痘护理',
    date: '2026-06-28',
    timeSlot: '09:00-10:00',
    status: 'pending',
    source: 'online',
    createdAt: '2026-06-16 11:20',
  },
]

// 日历时段配置
export const timeSlots = [
  '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
  '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
  '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00',
]

export const scheduleCapacity = 2 // 每时段最大接待人数

// 生成未来30天的日程数据
function generateSchedule() {
  const schedule = {}
  const now = new Date()
  for (let i = 0; i < 30; i++) {
    const d = new Date(now)
    d.setDate(d.getDate() + i)
    const dateStr = d.toISOString().split('T')[0]
    schedule[dateStr] = {}
    timeSlots.forEach(slot => {
      const count = Math.floor(Math.random() * (scheduleCapacity + 1))
      schedule[dateStr][slot] = count
    })
  }
  return schedule
}

export const scheduleData = generateSchedule()

// 客户列表（管理员视角）
export const customers = [
  { id: 1, name: '小美', phone: '138****8888', totalSpent: 1495, visitCount: 2, registerTime: '2026-01-15', source: '分享引流' },
  { id: 2, name: '丽丽', phone: '139****1234', totalSpent: 598, visitCount: 1, registerTime: '2026-02-20', source: '分享引流' },
  { id: 3, name: '小王', phone: '136****5678', totalSpent: 396, visitCount: 3, registerTime: '2026-03-05', source: '线下录入' },
  { id: 4, name: '张姐', phone: '137****9012', totalSpent: 1296, visitCount: 5, registerTime: '2026-01-28', source: '自主搜索' },
  { id: 5, name: '婷婷', phone: '135****3456', totalSpent: 198, visitCount: 1, registerTime: '2026-04-12', source: '分享引流' },
]

// 引流排行
export const referralRanking = [
  { name: '小美', count: 3 },
  { name: '丽丽', count: 2 },
  { name: '张姐', count: 1 },
  { name: '小王', count: 1 },
]

// 统计
export const stats = {
  totalCustomers: 68,
  todayVisits: 4,
  monthlyRevenue: 12890,
  productSales: [
    { name: '深层祛痘护理', count: 45 },
    { name: '光子美白嫩肤', count: 32 },
    { name: '深层除螨清洁', count: 38 },
    { name: '中医经络减肥', count: 18 },
    { name: '水光针补水套餐', count: 22 },
    { name: '祛痘美白综合套餐', count: 28 },
  ],
  userGrowth: [
    { date: '第1周', count: 5 },
    { date: '第2周', count: 8 },
    { date: '第3周', count: 12 },
    { date: '第4周', count: 15 },
    { date: '第5周', count: 10 },
    { date: '第6周', count: 18 },
  ],
}

// 今日预约（管理员视角）
export const todayAppointments = [
  { id: 301, userName: '丽丽', phone: '139****1234', productName: '祛痘美白综合套餐', itemName: '深层祛痘护理', timeSlot: '09:00-10:00', status: 'pending', orderId: 2002 },
  { id: 302, userName: '小王', phone: '136****5678', productName: '深层除螨清洁', itemName: '深层除螨清洁', timeSlot: '10:00-11:00', status: 'pending', orderId: 2003 },
  { id: 303, userName: '婷婷', phone: '135****3456', productName: '光子美白嫩肤', itemName: '光子美白嫩肤', timeSlot: '14:00-15:00', status: 'pending', orderId: 2004 },
  { id: 304, userName: '张姐', phone: '137****9012', productName: '水光针补水套餐', itemName: '水光针深度补水', timeSlot: '15:00-16:00', status: 'pending', orderId: 2005 },
]

// 核销记录（管理员视角）
export const verificationHistory = [
  { id: 401, customerName: '小美', productName: '深层祛痘护理', time: '2026-06-22 10:00', operator: '金女士', remainingCount: '0/1' },
  { id: 402, customerName: '小美', productName: '水光针深度补水', time: '2026-06-19 14:00', operator: '金女士', remainingCount: '2/3' },
  { id: 403, customerName: '小王', productName: '深层除螨清洁', time: '2026-06-18 11:30', operator: '金女士', remainingCount: '0/1' },
  { id: 404, customerName: '张姐', productName: '中医经络减肥', time: '2026-06-17 16:00', operator: '金女士', remainingCount: '1/2' },
  { id: 405, customerName: '丽丽', productName: '祛痘美白综合套餐', time: '2026-06-15 09:30', operator: '金女士', remainingCount: '4/5' },
]

// 公告
export const announcements = [
  { id: 1, content: '🎉 新客首次体验享8折优惠！', active: true },
  { id: 2, content: '📢 老带新双方各得50元优惠券活动进行中', active: true },
]
