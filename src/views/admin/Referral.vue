<template>
  <div class="page-container-admin">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">引流溯源</div>
      </div>
    </div>

    <div class="px-3 mt-3 space-y-3">
      <!-- 邀请排行 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3">🏆 邀请排行 Top 10</h3>
        <div v-for="(item, i) in referralRanking" :key="i" class="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
          <div class="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
            :class="i === 0 ? 'bg-yellow-100 text-yellow-600' : i === 1 ? 'bg-gray-100 text-gray-500' : i === 2 ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-400'">
            {{ i + 1 }}
          </div>
          <div class="flex-1">
            <span class="text-sm text-gray-700">{{ item.name }}</span>
          </div>
          <div class="text-sm text-primary-500 font-medium">{{ item.count }}人</div>
        </div>
        <div v-if="referralRanking.length === 0" class="text-sm text-gray-300 text-center py-4">暂无邀请数据</div>
      </div>

      <!-- 溯源统计 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3">📊 引流渠道分布</h3>
        <div class="space-y-3">
          <div>
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span>分享引流</span>
              <span>85%</span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-primary-400 rounded-full" style="width: 85%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span>自主搜索</span>
              <span>10%</span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-rose-400 rounded-full" style="width: 10%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span>线下录入</span>
              <span>5%</span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-blue-400 rounded-full" style="width: 5%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 邀请关系 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3">🔗 邀请关系</h3>
        <div class="text-center py-6 text-gray-300">
          <div class="text-3xl mb-2">🌳</div>
          <div class="text-sm">邀请关系图谱（Phase 2 实现可视化）</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { referralRanking } from '@/mock/data.js'

const router = useRouter()
</script>
