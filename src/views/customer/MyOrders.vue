<template>
  <div class="min-h-screen bg-skin-50 pb-24">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">我的订单</div>
      </div>
    </div>

    <!-- 状态筛选 -->
    <div class="bg-white px-4 py-3 flex gap-4 border-b border-gray-50 overflow-x-auto" style="scrollbar-width: none;">
      <div v-for="tab in statusTabs" :key="tab.key"
        class="text-sm cursor-pointer whitespace-nowrap pb-1 transition-colors"
        :class="currentTab === tab.key ? 'text-primary-500 font-medium border-b-2 border-primary-500' : 'text-gray-400'"
        @click="currentTab = tab.key">
        {{ tab.label }}
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="px-3 mt-3 space-y-3">
      <div v-for="order in filteredOrders" :key="order.id" class="bg-white rounded-2xl p-4 shadow-sm cursor-pointer" @click="router.push(`/order/detail/${order.id}`)">
        <div class="flex gap-3">
          <img :src="order.productImage" class="w-20 h-20 rounded-xl object-cover" />
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between">
              <h3 class="text-sm font-medium text-gray-800 truncate">{{ order.productName }}</h3>
              <span class="text-xs px-2 py-0.5 rounded-full" :class="'status-' + order.status">
                {{ statusMap[order.status] }}
              </span>
            </div>
            <p class="text-xs text-gray-400 mt-1">已付款：{{ order.paidAt }}</p>
            <div class="text-red-500 font-bold mt-2">¥{{ order.amount }}</div>
            <div class="mt-1 flex flex-wrap gap-1">
              <span v-for="item in order.items" :key="item.name" class="text-xs text-gray-400">
                {{ item.name }} {{ item.usedCount }}/{{ item.totalCount }}次
              </span>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-50 mt-3 pt-3 flex justify-end gap-2">
          <button class="btn btn-outline btn-sm" @click.stop="router.push(`/appointment/calendar/${order.id}`)">去预约</button>
        </div>
      </div>

      <div v-if="filteredOrders.length === 0" class="empty-state">
        <ClipboardList :size="48" class="text-gray-300 mx-auto" />
        <div class="empty-text">暂无相关订单</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ClipboardList } from 'lucide-vue-next'
import { orders } from '@/mock/data.js'

const router = useRouter()
const currentTab = ref('all')

const statusTabs = [
  { key: 'all', label: '全部' },
  { key: 'paid', label: '待使用' },
  { key: 'used', label: '已使用' },
  { key: 'expired', label: '已过期' },
]

const statusMap = {
  paid: '待使用',
  used: '已用尽',
  expired: '已过期',
  refunding: '退款中',
}

const filteredOrders = computed(() => {
  if (currentTab.value === 'all') return orders
  return orders.filter(o => o.status === currentTab.value)
})
</script>
