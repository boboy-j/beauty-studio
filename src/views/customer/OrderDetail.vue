<template>
  <div class="min-h-screen bg-skin-50">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">订单详情</div>
      </div>
    </div>

    <div v-if="order" class="pb-24">
      <!-- 状态条 -->
      <div class="bg-gradient-to-r from-primary-500 to-primary-400 px-4 py-5 text-white">
        <div class="text-lg font-bold mb-1" v-if="order.status === 'paid'">已付款 · 待使用</div>
        <div class="text-lg font-bold mb-1" v-else-if="order.status === 'used'">已使用</div>
        <div class="text-xs opacity-80">订单号：{{ order.id }}</div>
        <div class="text-xs opacity-80 mt-1">付款时间：{{ order.paidAt }}</div>
      </div>

      <!-- 套餐信息 -->
      <div class="bg-white mx-3 mt-3 rounded-2xl p-4">
        <div class="flex gap-3 mb-3">
          <img :src="order.productImage" class="w-16 h-16 rounded-xl object-cover" />
          <div>
            <h3 class="text-sm font-medium text-gray-800">{{ order.productName }}</h3>
            <div class="text-red-500 font-bold mt-1">¥{{ order.amount }}</div>
          </div>
        </div>
        <div class="border-t border-gray-50 pt-3">
          <div v-for="item in order.items" :key="item.name" class="flex items-center justify-between py-2">
            <span class="text-sm text-gray-600">{{ item.name }}</span>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-800">{{ item.usedCount }}/{{ item.totalCount }}次</span>
              <!-- 进度条 -->
              <div class="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-primary-400 rounded-full transition-all"
                  :style="{ width: (item.usedCount / item.totalCount * 100) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-50 pt-3 mt-2 text-xs text-gray-400">
          有效期至：{{ order.expireAt }}
        </div>
      </div>

      <!-- 核销记录 -->
      <div class="bg-white mx-3 mt-3 rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3"><ClipboardList :size="18" class="text-gray-600 mr-2 inline-block" /> 核销记录</h3>
        <div v-if="order.verificationRecords.length" v-for="record in order.verificationRecords" :key="record.time"
          class="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-green-400"></span>
            <span class="text-sm text-gray-600">{{ record.item }}</span>
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-400">{{ record.time }}</div>
            <div class="text-xs text-gray-400">核销人：{{ record.operator }}</div>
          </div>
        </div>
        <div v-else class="text-sm text-gray-300 py-4 text-center">暂无核销记录</div>
      </div>

      <!-- 操作按钮 -->
      <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 px-4 py-3 z-50 flex gap-3">
        <button class="btn btn-primary btn-lg flex-1" @click="router.push(`/appointment/calendar/${order.id}`)">去预约</button>
        <button class="btn btn-outline btn-lg" @click="showContact = true">联系商家</button>
      </div>
    </div>

    <div v-else class="text-center py-20 text-gray-400">订单不存在</div>

    <!-- 联系商家弹窗 -->
    <div v-if="showContact" class="fixed inset-0 bg-black/40 z-50 flex items-end justify-center pb-20" @click="showContact = false">
      <div class="bg-white rounded-2xl w-full max-w-[400px] mx-4 p-6" @click.stop>
        <div class="text-center">
          <div class="mb-2"><Phone :size="32" class="text-gray-500" /></div>
          <h3 class="text-base font-bold text-gray-800 mb-1">联系商家</h3>
          <p class="text-sm text-gray-400 mb-4">如需修改订单或退款，请联系工作室</p>
          <a :href="'tel:13900000000'" class="btn btn-primary btn-lg btn-block">拨打 139-0000-0000</a>
          <button class="mt-3 text-sm text-gray-400" @click="showContact = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ClipboardList, Phone } from 'lucide-vue-next'
import { orders } from '@/mock/data.js'

const route = useRoute()
const router = useRouter()
const showContact = ref(false)

const order = computed(() => orders.find(o => o.id === Number(route.params.id)))
</script>
