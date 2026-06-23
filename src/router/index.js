import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // C端页面
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: () => import('@/views/customer/Home.vue'), meta: { title: '首页', showTab: true } },
  { path: '/product/:id', name: 'ProductDetail', component: () => import('@/views/customer/ProductDetail.vue'), meta: { title: '项目详情' } },
  { path: '/login', name: 'Login', component: () => import('@/views/customer/Login.vue'), meta: { title: '登录' } },
  { path: '/order/confirm/:productId', name: 'OrderConfirm', component: () => import('@/views/customer/OrderConfirm.vue'), meta: { title: '确认订单' } },
  { path: '/order/result/:orderId', name: 'OrderResult', component: () => import('@/views/customer/OrderResult.vue'), meta: { title: '支付结果' } },
  { path: '/orders', name: 'MyOrders', component: () => import('@/views/customer/MyOrders.vue'), meta: { title: '我的订单', showTab: true } },
  { path: '/order/detail/:id', name: 'OrderDetail', component: () => import('@/views/customer/OrderDetail.vue'), meta: { title: '订单详情' } },
  { path: '/appointment/calendar/:orderId', name: 'AppointmentCalendar', component: () => import('@/views/customer/AppointmentCalendar.vue'), meta: { title: '选择时间' } },
  { path: '/appointment/confirm', name: 'AppointmentConfirm', component: () => import('@/views/customer/AppointmentConfirm.vue'), meta: { title: '确认预约' } },
  { path: '/appointments', name: 'MyAppointments', component: () => import('@/views/customer/MyAppointments.vue'), meta: { title: '我的预约', showTab: true } },
  { path: '/share', name: 'Share', component: () => import('@/views/customer/Share.vue'), meta: { title: '我的分享', showTab: true } },
  { path: '/profile', name: 'Profile', component: () => import('@/views/customer/Profile.vue'), meta: { title: '个人中心', showTab: true } },

  // B端管理页面
  { path: '/admin', name: 'AdminDashboard', component: () => import('@/views/admin/Dashboard.vue'), meta: { title: '管理首页', admin: true } },
  { path: '/admin/appointments', name: 'AdminAppointments', component: () => import('@/views/admin/Appointments.vue'), meta: { title: '今日预约', admin: true } },
  { path: '/admin/verifications', name: 'AdminVerifications', component: () => import('@/views/admin/Verifications.vue'), meta: { title: '核销记录', admin: true } },
  { path: '/admin/products', name: 'AdminProducts', component: () => import('@/views/admin/Products.vue'), meta: { title: '项目管理', admin: true } },
  { path: '/admin/product/edit/:id?', name: 'AdminProductEdit', component: () => import('@/views/admin/ProductEdit.vue'), meta: { title: '编辑项目', admin: true } },
  { path: '/admin/schedule', name: 'AdminSchedule', component: () => import('@/views/admin/Schedule.vue'), meta: { title: '预约配置', admin: true } },
  { path: '/admin/customers', name: 'AdminCustomers', component: () => import('@/views/admin/Customers.vue'), meta: { title: '客户管理', admin: true } },
  { path: '/admin/customer/:id', name: 'AdminCustomerDetail', component: () => import('@/views/admin/CustomerDetail.vue'), meta: { title: '客户详情', admin: true } },
  { path: '/admin/referral', name: 'AdminReferral', component: () => import('@/views/admin/Referral.vue'), meta: { title: '引流溯源', admin: true } },
  { path: '/admin/stats', name: 'AdminStats', component: () => import('@/views/admin/Stats.vue'), meta: { title: '数据统计', admin: true } },
  { path: '/admin/push', name: 'AdminPush', component: () => import('@/views/admin/Push.vue'), meta: { title: '消息推送', admin: true } },

  { path: '/:pathMatch(.*)*', redirect: '/home' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
