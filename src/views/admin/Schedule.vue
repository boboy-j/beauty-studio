<template>
  <div class="page-container-admin">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">预约配置</div>
      </div>
    </div>

    <div class="px-3 mt-3 space-y-3">
      <!-- 营业时段 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3">⏰ 营业时段设置</h3>
        <div class="flex items-center gap-2 mb-3">
          <div class="flex-1">
            <label class="text-xs text-gray-400 mb-1 block">开始时间</label>
            <input v-model="openTime" type="time" value="08:00" class="form-input" />
          </div>
          <div class="flex-1">
            <label class="text-xs text-gray-400 mb-1 block">结束时间</label>
            <input v-model="closeTime" type="time" value="22:00" class="form-input" />
          </div>
        </div>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">每时段最大接待人数</label>
          <input v-model="maxCapacity" type="number" class="form-input" placeholder="默认2人" />
        </div>
        <button class="btn btn-primary btn-sm mt-3" @click="saveSchedule">保存配置</button>
      </div>

      <!-- 时段预览 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3"><ClipboardList :size="18" class="inline-block mr-1" />时段预览</h3>
        <div class="grid grid-cols-3 gap-2">
          <div v-for="slot in timeSlots" :key="slot"
            class="py-2 rounded-xl text-center text-xs border"
            :class="isInRange(slot) ? 'border-primary-200 bg-primary-50 text-primary-600' : 'border-gray-100 text-gray-300'">
            {{ slot }}
          </div>
        </div>
      </div>

      <!-- 最近预约占用 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3"><Calendar :size="18" class="inline-block mr-1" />明日时段占用</h3>
        <div class="space-y-2">
          <div v-for="(count, slot) in tomorrowSchedule" :key="slot" class="flex items-center gap-3">
            <span class="text-xs text-gray-500 w-24">{{ slot }}</span>
            <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-primary-400 rounded-full" :style="{ width: (count / maxCapacity * 100) + '%' }"></div>
            </div>
            <span class="text-xs text-gray-400 w-12 text-right">{{ count }}/{{ maxCapacity }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ClipboardList, Calendar } from 'lucide-vue-next'
import { timeSlots, scheduleData } from '@/mock/data.js'

const router = useRouter()
const openTime = ref('08:00')
const closeTime = ref('22:00')
const maxCapacity = ref(2)

function isInRange(slot) {
  const start = slot.split('-')[0]
  return start >= openTime.value && start < closeTime.value
}

const tomorrowSchedule = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dateStr = tomorrow.toISOString().split('T')[0]
  return scheduleData[dateStr] || {}
})

function saveSchedule() {
  showToast('营业时段配置已保存')
}

function showToast(msg) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
</script>
