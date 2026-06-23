<template>
  <div class="min-h-screen bg-skin-50">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">选择时间</div>
      </div>
    </div>

    <div v-if="order" class="pb-28 px-3">
      <!-- 订单摘要 -->
      <div class="bg-white rounded-2xl p-4 mt-3 flex gap-3">
        <img :src="order.productImage" class="w-14 h-14 rounded-xl object-cover" />
        <div>
          <h3 class="text-sm font-medium text-gray-800">{{ order.productName }}</h3>
          <p class="text-xs text-gray-400 mt-1">选择要预约的服务项目</p>
        </div>
      </div>

      <!-- 选择子项目 -->
      <div class="bg-white rounded-2xl p-4 mt-3">
        <h3 class="text-sm font-bold text-gray-700 mb-3">选择服务项目</h3>
        <div class="space-y-2">
          <div v-for="item in availableItems" :key="item.name"
            class="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors"
            :class="selectedItem === item.name ? 'border-primary-400 bg-primary-50' : 'border-gray-100'"
            @click="selectedItem = item.name">
            <div>
              <span class="text-sm text-gray-700">{{ item.name }}</span>
              <span class="text-xs text-gray-400 ml-2">剩余 {{ item.totalCount - item.usedCount }}/{{ item.totalCount }}次</span>
            </div>
            <span v-if="selectedItem === item.name" class="text-primary-500">✓</span>
          </div>
        </div>
        <div v-if="availableItems.length === 0" class="text-sm text-gray-300 text-center py-4">
          所有项目次数已用完
        </div>
      </div>

      <!-- 选择日期 -->
      <div v-if="selectedItem" class="bg-white rounded-2xl p-4 mt-3">
        <h3 class="text-sm font-bold text-gray-700 mb-3">选择日期</h3>
        <div class="flex overflow-x-auto gap-2 pb-2" style="scrollbar-width: none;">
          <div v-for="date in dateList" :key="date.str"
            class="flex-shrink-0 w-16 py-3 rounded-xl text-center cursor-pointer transition-all border"
            :class="selectedDate === date.str
              ? 'bg-primary-500 text-white border-primary-500 shadow-md'
              : 'bg-white text-gray-600 border-gray-100'"
            @click="selectedDate = date.str; selectedSlot = ''">
            <div class="text-xs">{{ date.weekday }}</div>
            <div class="text-base font-bold mt-1">{{ date.day }}</div>
          </div>
        </div>
      </div>

      <!-- 选择时间段 -->
      <div v-if="selectedDate && selectedItem" class="bg-white rounded-2xl p-4 mt-3">
        <h3 class="text-sm font-bold text-gray-700 mb-3">选择时间段</h3>
        <div class="grid grid-cols-3 gap-2">
          <div v-for="slot in timeSlots" :key="slot"
            class="py-2.5 rounded-xl text-center text-sm cursor-pointer transition-all border"
            :class="selectedSlot === slot
              ? 'bg-primary-500 text-white border-primary-500 shadow-md'
              : isSlotFull(slot)
                ? 'bg-gray-50 text-gray-300 border-gray-50 cursor-not-allowed'
                : 'bg-white text-gray-600 border-gray-100 hover:border-primary-200'"
            @click="selectSlot(slot)">
            <div>{{ slot.split('-')[0] }}</div>
            <div class="text-xs mt-0.5 opacity-60" v-if="!isSlotFull(slot)">可约</div>
            <div class="text-xs mt-0.5" v-else>已满</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20 text-gray-400">订单不存在</div>

    <!-- 底部 -->
    <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 px-4 py-3 z-50">
      <button class="btn btn-primary btn-lg btn-block" :class="{ 'opacity-50': !selectedSlot }" :disabled="!selectedSlot" @click="goConfirm">
        确认预约
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { orders, timeSlots, scheduleData } from '@/mock/data.js'

const route = useRoute()
const router = useRouter()

const order = computed(() => orders.find(o => o.id === Number(route.params.orderId)))
const selectedItem = ref('')
const selectedDate = ref('')
const selectedSlot = ref('')

// 可预约的子项目
const availableItems = computed(() => {
  if (!order.value) return []
  return order.value.items.filter(item => item.usedCount < item.totalCount)
})

// 生成日期列表
const dateList = computed(() => {
  const list = []
  const weekNames = ['日', '一', '二', '三', '四', '五', '六']
  const today = new Date()
  for (let i = 0; i < 14; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    list.push({
      str: d.toISOString().split('T')[0],
      weekday: weekNames[d.getDay()],
      day: d.getDate(),
      month: d.getMonth() + 1,
      isToday: i === 0,
    })
  }
  return list
})

function isSlotFull(slot) {
  if (!selectedDate.value) return false
  const dayData = scheduleData[selectedDate.value]
  if (!dayData || !dayData[slot]) return false
  return dayData[slot] >= 2
}

function selectSlot(slot) {
  if (isSlotFull(slot)) return
  selectedSlot.value = slot
}

function goConfirm() {
  if (!selectedSlot.value || !selectedItem.value || !order.value) return
  router.push({
    path: '/appointment/confirm',
    query: {
      orderId: order.value.id,
      itemName: selectedItem.value,
      date: selectedDate.value,
      slot: selectedSlot.value,
    }
  })
}
</script>
