<template>
  <div class="page-container-admin">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">数据统计</div>
      </div>
    </div>

    <div class="px-3 mt-3 space-y-3">
      <!-- 概览卡片 -->
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white rounded-2xl p-4">
          <div class="text-xs text-gray-400">累计客户</div>
          <div class="text-2xl font-bold text-gray-800 mt-1">{{ stats.totalCustomers }}</div>
          <div class="text-xs text-green-500 mt-1">↑ 12% 较上月</div>
        </div>
        <div class="bg-white rounded-2xl p-4">
          <div class="text-xs text-gray-400">本月营收</div>
          <div class="text-2xl font-bold text-primary-500 mt-1">¥{{ stats.monthlyRevenue }}</div>
          <div class="text-xs text-green-500 mt-1">↑ 8% 较上月</div>
        </div>
        <div class="bg-white rounded-2xl p-4">
          <div class="text-xs text-gray-400">今日到店</div>
          <div class="text-2xl font-bold text-gray-800 mt-1">{{ stats.todayVisits }}</div>
        </div>
        <div class="bg-white rounded-2xl p-4">
          <div class="text-xs text-gray-400">客单价</div>
          <div class="text-2xl font-bold text-gray-800 mt-1">¥{{ avgPrice }}</div>
        </div>
      </div>

      <!-- 项目销量排行 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3"><BarChart3 :size="18" class="inline-block mr-1" />项目销量排行</h3>
        <div v-for="(item, i) in sortedSales" :key="item.name" class="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
          <div class="w-6 text-center text-xs font-bold" :class="i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-amber-600' : 'text-gray-300'">
            {{ i + 1 }}
          </div>
          <div class="flex-1 text-sm text-gray-700">{{ item.name }}</div>
          <div class="flex items-center gap-2">
            <div class="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-primary-400 rounded-full" :style="{ width: (item.count / maxSales * 100) + '%' }"></div>
            </div>
            <span class="text-xs text-gray-400 w-8 text-right">{{ item.count }}</span>
          </div>
        </div>
      </div>

      <!-- 用户增长趋势 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3"><TrendingUp :size="18" class="inline-block mr-1" />用户增长趋势</h3>
        <div class="flex items-end gap-2" style="height: 120px;">
          <div v-for="(item, i) in stats.userGrowth" :key="i" class="flex-1 flex flex-col items-center gap-1">
            <div class="w-full bg-primary-200 rounded-t-md transition-all"
              :style="{ height: (item.count / maxGrowth * 100) + 'px' }"></div>
            <span class="text-xs text-gray-400">{{ item.date.slice(-2) }}</span>
          </div>
        </div>
      </div>

      <!-- 引流排行 -->
      <div class="bg-white rounded-2xl p-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-gray-700"><Trophy :size="18" class="inline-block mr-1" />引流排行</h3>
          <router-link to="/admin/referral" class="text-xs text-primary-500">查看详情 →</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { BarChart3, TrendingUp, Trophy } from 'lucide-vue-next'
import { stats } from '@/mock/data.js'

const router = useRouter()

const avgPrice = computed(() => {
  if (stats.totalCustomers === 0) return 0
  return Math.round(stats.monthlyRevenue / stats.totalCustomers)
})

const sortedSales = computed(() => {
  return [...stats.productSales].sort((a, b) => b.count - a.count)
})

const maxSales = computed(() => Math.max(...stats.productSales.map(s => s.count)))
const maxGrowth = computed(() => Math.max(...stats.userGrowth.map(g => g.count), 1))
</script>
