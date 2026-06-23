<template>
  <div class="min-h-screen bg-skin-50 pb-24">
    <!-- 用户信息头 -->
    <div class="bg-gradient-to-b from-primary-500 to-primary-400 px-4 pt-8 pb-8 text-white">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl overflow-hidden">
          <img v-if="currentUser.avatar" :src="currentUser.avatar" class="w-full h-full object-cover" />
          <User v-else :size="32" class="text-white/80" />
        </div>
        <div>
          <h2 class="text-lg font-bold">{{ currentUser.nickname }}</h2>
          <p class="text-sm opacity-80 mt-1">{{ currentUser.phone }}</p>
        </div>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="bg-white mx-3 -mt-4 rounded-2xl p-4 z-10 relative shadow-sm">
      <div class="grid grid-cols-4 gap-3">
        <div class="text-center cursor-pointer" @click="router.push('/orders')">
          <ClipboardList :size="28" class="mx-auto mb-1 text-gray-600" />
          <div class="text-xs text-gray-500">我的订单</div>
        </div>
        <div class="text-center cursor-pointer" @click="router.push('/appointments')">
          <Calendar :size="28" class="mx-auto mb-1 text-gray-600" />
          <div class="text-xs text-gray-500">我的预约</div>
        </div>
        <div class="text-center cursor-pointer" @click="router.push('/share')">
          <Gift :size="28" class="mx-auto mb-1 text-gray-600" />
          <div class="text-xs text-gray-500">邀请好友</div>
        </div>
        <div class="text-center cursor-pointer">
          <MessageCircle :size="28" class="mx-auto mb-1 text-gray-600" />
          <div class="text-xs text-gray-500">联系客服</div>
        </div>
      </div>
    </div>

    <!-- 订单概览 -->
    <div class="bg-white mx-3 mt-3 rounded-2xl p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-bold text-gray-700">我的订单</h3>
        <router-link to="/orders" class="text-xs text-primary-500">查看全部 →</router-link>
      </div>
      <div class="grid grid-cols-4 gap-2 text-center">
        <div>
          <div class="text-lg font-bold text-gray-700">{{ paidCount }}</div>
          <div class="text-xs text-gray-400 mt-0.5">待使用</div>
        </div>
        <div>
          <div class="text-lg font-bold text-gray-700">{{ usedCount }}</div>
          <div class="text-xs text-gray-400 mt-0.5">已使用</div>
        </div>
        <div>
          <div class="text-lg font-bold text-gray-700">{{ pendingApptCount }}</div>
          <div class="text-xs text-gray-400 mt-0.5">待预约</div>
        </div>
        <div>
          <div class="text-lg font-bold text-gray-700">{{ totalSpent }}</div>
          <div class="text-xs text-gray-400 mt-0.5">消费(¥)</div>
        </div>
      </div>
    </div>

    <!-- 工具栏 -->
    <div class="bg-white mx-3 mt-3 rounded-2xl divide-y divide-gray-50">
      <div class="flex items-center gap-3 p-4 cursor-pointer">
        <Phone :size="20" class="text-gray-500" />
        <span class="text-sm text-gray-600 flex-1">联系商家</span>
        <span class="text-xs text-gray-300">→</span>
      </div>
      <div class="flex items-center gap-3 p-4 cursor-pointer">
        <BookOpen :size="20" class="text-gray-500" />
        <span class="text-sm text-gray-600 flex-1">使用帮助</span>
        <span class="text-xs text-gray-300">→</span>
      </div>
      <div class="flex items-center gap-3 p-4 cursor-pointer" @click="switchToAdmin">
        <Shield :size="20" class="text-gray-500" />
        <span class="text-sm text-gray-600 flex-1">店主管理入口</span>
        <span class="text-xs text-gray-300">→</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { currentUser, orders, appointments } from '@/mock/data.js'
import { User, ClipboardList, Calendar, Gift, MessageCircle, Phone, BookOpen, Shield } from 'lucide-vue-next'

const router = useRouter()

const paidCount = computed(() => orders.filter(o => o.status === 'paid').length)
const usedCount = computed(() => orders.filter(o => o.status === 'used').length)
const pendingApptCount = computed(() => orders.filter(o => o.status === 'paid').length - appointments.filter(a => a.status === 'pending').length)
const totalSpent = computed(() => orders.reduce((sum, o) => sum + o.amount, 0))

function switchToAdmin() {
  // 模拟切换为管理员
  showToast('已切换到管理员模式')
  setTimeout(() => router.push('/admin'), 500)
}

function showToast(msg) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
</script>
