<template>
  <div class="min-h-screen bg-skin-50 pb-24">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">我的预约</div>
      </div>
    </div>

    <div class="px-3 mt-3 space-y-3">
      <div v-for="apt in appointments" :key="apt.id" class="bg-white rounded-2xl p-4">
        <div class="flex items-start justify-between">
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-medium text-gray-800">{{ apt.itemName }}</h3>
            <p class="text-xs text-gray-400 mt-1">{{ apt.productName }}</p>
          </div>
          <span class="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
            :class="'status-' + apt.status">
            {{ statusMap[apt.status] }}
          </span>
        </div>
        <div class="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <span><Calendar :size="14" class="inline-block" /> {{ apt.date }}</span>
          <span><Clock :size="14" class="inline-block" /> {{ apt.timeSlot }}</span>
        </div>
        <div v-if="apt.status === 'pending'" class="border-t border-gray-50 mt-3 pt-3 flex justify-end">
          <button class="text-sm text-red-400" @click="cancelAppointment(apt.id)">取消预约</button>
        </div>
      </div>

      <div v-if="appointments.length === 0" class="empty-state">
        <div class="empty-icon"><Calendar :size="48" class="text-gray-300" /></div>
        <div class="empty-text">暂无预约记录</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calendar, Clock } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { appointments } from '@/mock/data.js'

const router = useRouter()

const statusMap = {
  pending: '待消费',
  completed: '已完成',
  cancelled: '已取消',
}

function cancelAppointment(id) {
  const apt = appointments.find(a => a.id === id)
  if (apt) {
    apt.status = 'cancelled'
    showToast('已取消预约')
  }
}

function showToast(msg) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
</script>
