<template>
  <div class="min-h-screen" style="background: linear-gradient(180deg, #f0fdf4 0%, #fefcf9 100%);">
    <div class="flex flex-col items-center pt-16 px-6">
      <!-- 成功图标 -->
      <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <CheckCircle :size="40" class="text-green-500" />
      </div>
      <h2 class="text-xl font-bold text-gray-800 mb-2">支付成功</h2>
      <p class="text-sm text-gray-400 mb-8">你的订单已支付成功，快去预约到店时间吧</p>

      <!-- 订单信息卡片 -->
      <div v-if="order" class="w-full bg-white rounded-2xl p-5 shadow-sm">
        <div class="flex gap-3 mb-4">
          <img :src="order.productImage" class="w-16 h-16 rounded-xl object-cover" />
          <div>
            <h3 class="text-sm font-medium text-gray-800">{{ order.productName }}</h3>
            <p class="text-xs text-gray-400 mt-1">订单号：{{ order.id }}</p>
            <div class="text-red-500 font-bold mt-1">¥{{ order.amount }}</div>
          </div>
        </div>
        <div class="border-t border-gray-50 pt-3">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-400">状态</span>
            <span class="text-green-500 font-medium">已付款 · 待使用</span>
          </div>
          <div class="flex justify-between text-sm" v-for="item in order.items" :key="item.name">
            <span class="text-gray-400">{{ item.name }}</span>
            <span class="text-gray-600">{{ item.usedCount }}/{{ item.totalCount }}次</span>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="w-full mt-8 flex flex-col gap-3">
        <button class="btn btn-primary btn-lg btn-block" @click="goAppointment">去预约</button>
        <button class="btn btn-outline btn-lg btn-block" @click="goOrders">查看订单</button>
      </div>

      <!-- 分享引导 -->
      <div class="mt-8 bg-amber-50 rounded-2xl px-5 py-4 w-full">
        <div class="flex items-center gap-2 mb-1">
          <Gift :size="18" class="text-amber-600 inline-block mr-1" />
          <span class="text-sm font-medium text-amber-700">分享给好友，双方都优惠</span>
        </div>
        <p class="text-xs text-amber-500 mt-1">邀请好友注册，双方各得50元优惠券</p>
        <button class="mt-3 text-sm text-amber-600 font-medium" @click="router.push('/share')">立即分享 →</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircle, Gift } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { orders } from '@/mock/data.js'

const route = useRoute()
const router = useRouter()

const order = computed(() => orders.find(o => o.id === Number(route.params.orderId)))

function goAppointment() {
  if (order.value) {
    router.push(`/appointment/calendar/${order.value.id}`)
  }
}

function goOrders() {
  router.push('/orders')
}
</script>
