<template>
  <div class="page-container-admin">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">核销记录</div>
      </div>
    </div>

    <div class="px-3 mt-3 space-y-2">
      <div v-for="record in verificationHistory" :key="record.id" class="bg-white rounded-2xl p-4">
        <div class="flex items-start gap-3">
          <div class="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <span class="text-green-500">✓</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">{{ record.customerName }}</span>
              <span class="text-xs text-gray-400">{{ record.time }}</span>
            </div>
            <p class="text-xs text-gray-400 mt-0.5">{{ record.productName }}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs text-gray-400">核销人：{{ record.operator }}</span>
              <span class="text-xs text-gray-500">剩余 {{ record.remainingCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { verificationHistory } from '@/mock/data.js'

const router = useRouter()
</script>
