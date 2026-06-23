<template>
  <div class="min-h-screen bg-skin-50">
    <!-- 顶部导航 -->
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">项目详情</div>
      </div>
    </div>

    <div v-if="product" class="pb-24">
      <!-- 大图 -->
      <div style="aspect-ratio: 4/3;" class="relative">
        <img :src="product.images[0]" :alt="product.name" class="w-full h-full object-cover" />
        <div class="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">
          1/{{ product.images.length }}
        </div>
      </div>

      <!-- 基本信息 -->
      <div class="bg-white px-4 py-4 mt-0">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-xl font-bold text-gray-800">{{ product.name }}</h1>
            <div class="flex gap-1 mt-2">
              <span v-for="tag in product.tags" :key="tag"
                class="tag" :class="tag === '引流价' ? 'tag-promo' : tag === '套餐' ? 'tag-package' : 'tag-hot'">{{ tag }}</span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-red-500">
              <span class="text-sm">¥</span>
              <span class="text-2xl font-bold">{{ product.price }}</span>
            </div>
            <div class="text-gray-300 text-xs line-through mt-1">原价 ¥{{ product.originalPrice }}</div>
          </div>
        </div>

        <!-- 已售 -->
        <div class="mt-3 text-xs text-gray-400 bg-skin-50 rounded-lg px-3 py-2">
          已售 {{ product.sales }} 件 · {{ product.validityDays }}天内有效
        </div>
      </div>

      <!-- 套餐内容 -->
      <div class="bg-white mt-3 px-4 py-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3 flex items-center"><Package :size="18" class="text-gray-600 mr-2" />套餐内容</h3>
        <div v-for="item in product.items" :key="item.name" class="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
          <span class="text-sm text-gray-600">{{ item.name }}</span>
          <span class="text-sm text-primary-600 font-medium">{{ item.count }}次</span>
        </div>
      </div>

      <!-- 适用肌肤 -->
      <div v-if="product.skinTypes && product.skinTypes.length" class="bg-white mt-3 px-4 py-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3 flex items-center"><Droplets :size="18" class="text-gray-600 mr-2" />适用肌肤</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="skin in product.skinTypes" :key="skin" class="px-3 py-1 bg-rose-50 text-rose-600 text-xs rounded-full">{{ skin }}</span>
        </div>
      </div>

      <!-- 项目介绍 -->
      <div class="bg-white mt-3 px-4 py-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3 flex items-center"><FileText :size="18" class="text-gray-600 mr-2" />项目介绍</h3>
        <p class="text-sm text-gray-500 leading-relaxed">{{ product.desc }}</p>
      </div>

      <!-- 注意事项 -->
      <div class="bg-white mt-3 px-4 py-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3 flex items-center"><TriangleAlert :size="18" class="text-amber-500 mr-2" />注意事项</h3>
        <p class="text-sm text-gray-500">{{ product.notes }}</p>
      </div>

      <!-- 效果图集 -->
      <div class="bg-white mt-3 px-4 py-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3 flex items-center"><Image :size="18" class="text-gray-600 mr-2" />效果图集</h3>
        <div class="flex gap-2 overflow-x-auto" style="scrollbar-width: none;">
          <img v-for="(img, i) in product.images" :key="i" :src="img"
            class="w-28 h-28 object-cover rounded-xl flex-shrink-0" />
        </div>
      </div>

      <!-- 底部购买按钮 -->
      <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 px-4 py-3 flex gap-3 items-center z-50">
        <div class="flex-1">
          <div class="text-red-500">
            <span class="text-xs">¥</span>
            <span class="text-xl font-bold">{{ product.price }}</span>
          </div>
        </div>
        <button class="btn btn-primary btn-lg flex-1" @click="goBuy">立即购买</button>
      </div>
    </div>

    <div v-else class="text-center py-20 text-gray-400">
      项目不存在
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Package, Droplets, FileText, TriangleAlert, Image } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/store/products.js'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()

const product = computed(() => store.getProductById(route.params.id))

function goBuy() {
  if (!product.value) return
  router.push(`/order/confirm/${product.value.id}`)
}
</script>
