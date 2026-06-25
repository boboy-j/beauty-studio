<template>
  <div class="page-container-admin">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">今日预约</div>
      </div>
    </div>

    <div class="px-3 mt-3 space-y-3">
      <div v-for="apt in realTodayAppts" :key="apt.id" class="bg-white rounded-2xl p-4">
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-medium text-gray-800">{{ apt.userName }}</h3>
              <span class="text-xs text-gray-400">{{ apt.phone }}</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">{{ apt.productName }} · {{ apt.itemName }}</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full">⏰ {{ apt.timeSlot }}</span>
            </div>
          </div>
          <div v-if="apt.status === 'pending'">
            <button class="btn btn-primary btn-sm" @click="verifyApt(apt)">确认核销</button>
          </div>
          <div v-else>
            <span class="status-badge" :class="'status-' + apt.status">{{ apt.status === 'completed' ? '已核销' : '已取消' }}</span>
          </div>
        </div>
      </div>

      <div v-if="realTodayAppts.filter(a => a.status === 'pending').length === 0" class="text-center py-10 text-gray-300">
        <CheckCircle :size="32" class="text-green-400 mb-2 mx-auto" />
        <div class="text-sm">今日预约已全部核销</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CheckCircle } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { todayAppointments, appointments, orders, verificationHistory } from '@/mock/data.js'

const router = useRouter()

const todayStr = new Date().toISOString().split('T')[0]
const realTodayAppts = computed(() => {
  const fromAppts = appointments.filter(a => a.date === todayStr && a.status === 'pending')
  if (fromAppts.length > 0) return fromAppts
  return todayAppointments
})

function verifyApt(apt) {
  apt.status = 'completed'
  // 更新对应订单子项目的已使用次数
  const order = orders.find(o => o.id === apt.orderId)
  if (order) {
    const item = order.items.find(i => i.name === apt.itemName)
    if (item) item.usedCount++
    // 写入核销记录
    order.verificationRecords.push({
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
      item: apt.itemName,
      operator: '金女士',
    })
    // 如果所有子项目都用完了，订单状态改为 used
    const allUsed = order.items.every(i => i.usedCount >= i.totalCount)
    if (allUsed) order.status = 'used'
  }
  // 写入全局核销历史
  const foundItem = order?.items.find(i => i.name === apt.itemName)
  verificationHistory.unshift({
    id: Date.now(),
    customerName: apt.userName,
    productName: apt.productName || apt.itemName,
    time: new Date().toLocaleString('zh-CN', { hour12: false }),
    operator: '金女士',
    remainingCount: foundItem ? `${foundItem.totalCount - foundItem.usedCount}/${foundItem.totalCount}` : '-',
  })
  showToast(`已核销 ${apt.userName} 的 ${apt.itemName}`)
}

function showToast(msg) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
</script>
