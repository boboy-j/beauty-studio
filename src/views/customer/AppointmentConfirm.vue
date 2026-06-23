<template>
  <div class="min-h-screen bg-skin-50">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">确认预约</div>
      </div>
    </div>

    <div class="px-3 mt-3">
      <!-- 预约信息摘要 -->
      <div class="bg-white rounded-2xl p-5">
        <div class="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
          <div class="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
            <span class="text-2xl">📅</span>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-800">预约确认</h3>
            <p class="text-xs text-gray-400 mt-0.5">请确认以下预约信息</p>
          </div>
        </div>

        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-sm text-gray-400">项目</span>
            <span class="text-sm text-gray-700 font-medium">{{ itemName }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-400">所属套餐</span>
            <span class="text-sm text-gray-700">{{ order?.productName }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-400">预约日期</span>
            <span class="text-sm text-gray-700">{{ date }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-400">时间段</span>
            <span class="text-sm text-gray-700 font-medium">{{ slot }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-400">预约人</span>
            <span class="text-sm text-gray-700">{{ currentUser.nickname }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-400">手机号</span>
            <span class="text-sm text-gray-700">{{ currentUser.phone }}</span>
          </div>
        </div>
      </div>

      <!-- 提示 -->
      <div class="bg-amber-50 rounded-2xl p-4 mt-3 text-sm text-amber-600">
        <span class="font-medium">温馨提示：</span>
        预约成功后请按时到店，如需取消请在到店前2小时操作。
      </div>
    </div>

    <!-- 底部 -->
    <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 px-4 py-3 z-50">
      <button class="btn btn-primary btn-lg btn-block" @click="confirmAppointment">
        确认预约
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { orders, appointments, currentUser } from '@/mock/data.js'

const route = useRoute()
const router = useRouter()

const orderId = Number(route.query.orderId)
const itemName = route.query.itemName || ''
const date = route.query.date || ''
const slot = route.query.slot || ''

const order = computed(() => orders.find(o => o.id === orderId))

function confirmAppointment() {
  // 创建预约
  appointments.push({
    id: Date.now(),
    orderId: orderId,
    userId: currentUser.id,
    userName: currentUser.nickname,
    userPhone: currentUser.phone,
    productName: order.value?.productName || '',
    itemName: itemName,
    date: date,
    timeSlot: slot,
    status: 'pending',
    source: 'online',
    createdAt: new Date().toLocaleString('zh-CN'),
  })

  showToast('预约成功！')
  setTimeout(() => {
    router.push('/appointments')
  }, 800)
}

function showToast(msg) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
</script>
