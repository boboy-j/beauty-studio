<template>
  <div class="page-container-admin">
    <!-- 顶部 -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-500 px-4 pt-4 pb-6 text-white">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-lg font-bold">管理后台</h1>
          <p class="text-xs opacity-80 mt-0.5">{{ adminUser.nickname }}</p>
        </div>
        <div class="flex items-center gap-3">
          <router-link to="/profile" class="text-white/80 text-sm">切回顾客端</router-link>
        </div>
      </div>

      <!-- 今日数据卡片 -->
      <div class="grid grid-cols-3 gap-2">
        <div class="bg-white/15 rounded-xl p-3 text-center backdrop-blur-sm">
          <div class="text-2xl font-bold">{{ stats.todayVisits }}</div>
          <div class="text-xs opacity-80 mt-0.5">今日到店</div>
        </div>
        <div class="bg-white/15 rounded-xl p-3 text-center backdrop-blur-sm">
          <div class="text-2xl font-bold">¥{{ stats.monthlyRevenue }}</div>
          <div class="text-xs opacity-80 mt-0.5">本月营收</div>
        </div>
        <div class="bg-white/15 rounded-xl p-3 text-center backdrop-blur-sm">
          <div class="text-2xl font-bold">{{ pendingCount }}</div>
          <div class="text-xs opacity-80 mt-0.5">待核销</div>
        </div>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="mx-3 -mt-3 bg-white rounded-2xl p-4 shadow-sm z-10 relative">
      <h3 class="text-sm font-bold text-gray-700 mb-3">快捷操作</h3>
      <div class="grid grid-cols-4 gap-3">
        <div class="text-center cursor-pointer" @click="router.push('/admin/appointments')">
          <div class="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-1">
            <ClipboardList :size="20" />
          </div>
          <div class="text-xs text-gray-500">核销</div>
        </div>
        <div class="text-center cursor-pointer" @click="router.push('/admin/products')">
          <div class="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-1">
            <Package :size="20" />
          </div>
          <div class="text-xs text-gray-500">管理项目</div>
        </div>
        <div class="text-center cursor-pointer" @click="router.push('/admin/schedule')">
          <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-1">
            <Calendar :size="20" />
          </div>
          <div class="text-xs text-gray-500">预约配置</div>
        </div>
        <div class="text-center cursor-pointer" @click="router.push('/admin/customers')">
          <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-1">
            <Users :size="20" />
          </div>
          <div class="text-xs text-gray-500">客户</div>
        </div>
      </div>
    </div>

    <!-- 今日预约 -->
    <div class="mx-3 mt-3 bg-white rounded-2xl p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-bold text-gray-700">今日预约</h3>
        <router-link to="/admin/appointments" class="text-xs text-primary-500">查看全部 →</router-link>
      </div>
      <div v-for="apt in todayAppointments.slice(0, 3)" :key="apt.id" class="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-green-400"></span>
          <div>
            <span class="text-sm text-gray-700">{{ apt.userName }}</span>
            <span class="text-xs text-gray-400 ml-2">{{ apt.timeSlot }}</span>
          </div>
        </div>
        <span class="text-xs text-gray-400">{{ apt.productName }}</span>
      </div>
      <div v-if="todayAppointments.length === 0" class="text-sm text-gray-300 text-center py-4">今日暂无预约</div>
    </div>

    <!-- 数据概览 -->
    <div class="mx-3 mt-3 bg-white rounded-2xl p-4">
      <h3 class="text-sm font-bold text-gray-700 mb-3">📈 数据概览</h3>
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-skin-50 rounded-xl p-3">
          <div class="text-xs text-gray-400">累计客户</div>
          <div class="text-xl font-bold text-gray-800 mt-1">{{ stats.totalCustomers }}</div>
        </div>
        <div class="bg-skin-50 rounded-xl p-3">
          <div class="text-xs text-gray-400">本月营收</div>
          <div class="text-xl font-bold text-primary-500 mt-1">¥{{ stats.monthlyRevenue }}</div>
        </div>
      </div>
      <div class="mt-3">
        <router-link to="/admin/stats" class="text-sm text-primary-500">查看完整数据统计 →</router-link>
      </div>
    </div>

    <div class="h-20"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ClipboardList, Package, Calendar, Users, TrendingUp } from 'lucide-vue-next'
import { stats, todayAppointments, adminUser } from '@/mock/data.js'

const router = useRouter()

const pendingCount = computed(() => todayAppointments.filter(a => a.status === 'pending').length)
</script>
