<template>
  <div class="min-h-screen bg-white">
    <!-- 页面主体 -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>

    <!-- C端底部Tab栏 -->
    <div v-if="showCustomerTab" class="tab-bar">
      <router-link to="/home" class="tab-item" :class="{ active: currentRoute === 'home' }">
        <span class="tab-icon">🏠</span>
        <span>首页</span>
      </router-link>
      <router-link to="/orders" class="tab-item" :class="{ active: currentRoute === 'orders' }">
        <span class="tab-icon">📋</span>
        <span>订单</span>
      </router-link>
      <router-link to="/appointments" class="tab-item" :class="{ active: currentRoute === 'appointments' }">
        <span class="tab-icon">📅</span>
        <span>预约</span>
      </router-link>
      <router-link to="/share" class="tab-item" :class="{ active: currentRoute === 'share' }">
        <span class="tab-icon">🎁</span>
        <span>分享</span>
      </router-link>
      <router-link to="/profile" class="tab-item" :class="{ active: currentRoute === 'profile' }">
        <span class="tab-icon">👤</span>
        <span>我的</span>
      </router-link>
    </div>

    <!-- B端管理员底部Tab栏 -->
    <div v-if="showAdminTab" class="admin-tab-bar">
      <router-link to="/admin" class="admin-tab-item" :class="{ active: currentRoute === 'admin' }">📊 概况</router-link>
      <router-link to="/admin/appointments" class="admin-tab-item" :class="{ active: currentRoute === 'admin-appointments' }">📋 预约</router-link>
      <router-link to="/admin/products" class="admin-tab-item" :class="{ active: currentRoute === 'admin-products' }">📦 项目</router-link>
      <router-link to="/admin/customers" class="admin-tab-item" :class="{ active: currentRoute === 'admin-customers' }">👥 客户</router-link>
      <router-link to="/admin/stats" class="admin-tab-item" :class="{ active: currentRoute === 'admin-stats' }">📈 统计</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentRoute = computed(() => route.name?.toLowerCase() || '')

const customerTabRoutes = ['home', 'myorders', 'myappointments', 'share', 'profile',
  'myorders', 'myappointments', 'share', 'profile',
]

// 显示C端Tab的页面
const showCustomerTab = computed(() => {
  const name = route.name
  const noTabRoutes = ['login', 'productdetail', 'orderconfirm', 'orderresult',
    'orderdetail', 'appointmentcalendar', 'appointmentconfirm']
  if (noTabRoutes.includes(name)) return false
  if (route.meta?.admin) return false
  return true
})

// 显示B端Tab的页面
const showAdminTab = computed(() => {
  return route.meta?.admin === true
})
</script>
