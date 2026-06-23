<template>
  <div class="min-h-screen bg-skin-50 pb-24">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">客户详情</div>
      </div>
    </div>

    <div v-if="customer" class="px-3 mt-3 space-y-3">
      <!-- 客户信息卡片 -->
      <div class="bg-white rounded-2xl p-5">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-2xl text-primary-500 font-bold">
            {{ customer.name[0] }}
          </div>
          <div>
            <h2 class="text-lg font-bold text-gray-800">{{ customer.name }}</h2>
            <p class="text-sm text-gray-400 mt-0.5">{{ customer.phone }}</p>
            <p class="text-xs text-gray-300 mt-1">注册时间：{{ customer.registerTime }} · 来源：{{ customer.source }}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-50">
          <div class="bg-skin-50 rounded-xl p-3 text-center">
            <div class="text-xl font-bold text-gray-800">{{ customer.totalSpent }}</div>
            <div class="text-xs text-gray-400 mt-0.5">累计消费(¥)</div>
          </div>
          <div class="bg-skin-50 rounded-xl p-3 text-center">
            <div class="text-xl font-bold text-gray-800">{{ customer.visitCount }}</div>
            <div class="text-xs text-gray-400 mt-0.5">到店次数</div>
          </div>
        </div>
      </div>

      <!-- 订单记录 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3"><ClipboardList :size="18" class="inline-block mr-1" />订单记录</h3>
        <div v-for="order in customerOrders" :key="order.id" class="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
          <img :src="order.productImage" class="w-12 h-12 rounded-lg object-cover" />
          <div class="flex-1 min-w-0">
            <div class="text-sm text-gray-700">{{ order.productName }}</div>
            <div class="text-xs text-gray-400 mt-0.5">{{ order.paidAt }} · ¥{{ order.amount }}</div>
          </div>
          <span class="text-xs px-2 py-0.5 rounded-full" :class="'status-' + order.status">
            {{ order.status === 'paid' ? '使用中' : '已用尽' }}
          </span>
        </div>
        <div v-if="customerOrders.length === 0" class="text-sm text-gray-300 text-center py-4">暂无订单记录</div>
      </div>

      <!-- 最近预约 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3"><Calendar :size="18" class="inline-block mr-1" />最近预约</h3>
        <div v-for="apt in customerAppts" :key="apt.id" class="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
          <div>
            <div class="text-sm text-gray-700">{{ apt.itemName }}</div>
            <div class="text-xs text-gray-400 mt-0.5">{{ apt.date }} {{ apt.timeSlot }}</div>
          </div>
          <span class="text-xs px-2 py-0.5 rounded-full" :class="'status-' + apt.status">
            {{ statusMap[apt.status] }}
          </span>
        </div>
        <div v-if="customerAppts.length === 0" class="text-sm text-gray-300 text-center py-4">暂无预约记录</div>
      </div>
    </div>

    <div v-else class="text-center py-20 text-gray-400">客户不存在</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ClipboardList, Calendar } from 'lucide-vue-next'
import { customers, orders, appointments } from '@/mock/data.js'

const route = useRoute()
const router = useRouter()

const customer = customers.find(c => c.id === Number(route.params.id))

const customerOrders = computed(() => {
  // 简化：用客户姓名匹配
  if (!customer) return []
  return orders.filter(o => true).slice(0, 2)
})

const customerAppts = computed(() => {
  if (!customer) return []
  // 简化：用模拟数据
  return appointments.filter(a => a.userName === customer.name)
})

const statusMap = { pending: '待消费', completed: '已完成', cancelled: '已取消' }
</script>
