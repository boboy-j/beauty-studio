<template>
  <div class="min-h-screen bg-skin-50">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">确认订单</div>
      </div>
    </div>

    <div v-if="product" class="pb-28">
      <!-- 商品信息 -->
      <div class="bg-white mx-3 mt-3 rounded-2xl p-4 flex gap-3">
        <img :src="product.images[0]" class="w-20 h-20 rounded-xl object-cover" />
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-medium text-gray-800">{{ product.name }}</h3>
          <p class="text-xs text-gray-400 mt-1">{{ product.items.map(i => i.name).join('+') }}</p>
          <div class="text-red-500 font-bold mt-1">¥{{ product.price }}</div>
        </div>
      </div>

      <!-- 联系方式 -->
      <div class="bg-white mx-3 mt-3 rounded-2xl p-4">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm text-gray-600">手机号</span>
          <span class="text-sm text-gray-800">{{ currentUser.phone }}</span>
        </div>
        <div class="border-t border-gray-50 pt-3">
          <label class="text-sm text-gray-600 mb-2 block">备注</label>
          <input v-model="remark" type="text" placeholder="如有特殊需求请备注..." class="form-input text-sm" />
        </div>
      </div>

      <!-- 优惠信息 -->
      <div class="bg-white mx-3 mt-3 rounded-2xl p-4 flex items-center justify-between">
        <span class="text-sm text-gray-600">优惠券</span>
        <span class="text-sm text-gray-300">暂无可用</span>
      </div>

      <!-- 金额明细 -->
      <div class="bg-white mx-3 mt-3 rounded-2xl p-4">
        <div class="flex items-center justify-between text-sm mb-2">
          <span class="text-gray-500">商品金额</span>
          <span class="text-gray-800">¥{{ product.price }}</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-500">优惠</span>
          <span class="text-green-500">-¥0</span>
        </div>
      </div>

      <!-- 支付协议 -->
      <div class="mx-3 mt-3 flex items-center gap-1.5">
        <input type="checkbox" v-model="agree" id="agree" class="accent-primary-500" />
        <label for="agree" class="text-xs text-gray-400">已阅读并同意 <span class="text-primary-500">《购买协议》</span></label>
      </div>
    </div>

    <div v-else class="text-center py-20 text-gray-400">
      商品信息不存在
    </div>

    <!-- 底部 -->
    <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 px-4 py-3 z-50">
      <div class="flex items-center gap-3">
        <div>
          <span class="text-xs text-gray-500">合计 </span>
          <span class="text-red-500 font-bold text-lg" v-if="product">¥{{ product.price }}</span>
        </div>
        <button class="btn btn-primary btn-lg flex-1" :class="{ 'opacity-50': !agree }" :disabled="!agree" @click="handlePay">
          立即支付
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products, currentUser, orders } from '@/mock/data.js'

const route = useRoute()
const router = useRouter()
const remark = ref('')
const agree = ref(true)

const product = products.find(p => p.id === Number(route.params.productId))

function handlePay() {
  if (!agree.value || !product) return

  // 模拟支付
  const newOrder = {
    id: Date.now(),
    userId: currentUser.id,
    productId: product.id,
    productName: product.name,
    productImage: product.images[0],
    amount: product.price,
    status: 'paid',
    paidAt: new Date().toLocaleString('zh-CN'),
    expireAt: new Date(Date.now() + 365 * 24 * 3600 * 1000).toLocaleDateString('zh-CN'),
    items: product.items.map(i => ({ ...i, usedCount: 0 })),
    verificationRecords: [],
  }
  orders.unshift(newOrder)

  showToast('支付成功！')
  setTimeout(() => {
    router.push(`/order/result/${newOrder.id}`)
  }, 500)
}

function showToast(msg) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
</script>
