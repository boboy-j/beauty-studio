<template>
  <div class="page-container bg-skin-50">
    <!-- 首页 -->
    <div class="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-xl">🌸</span>
          <span class="text-lg font-bold text-primary-600">颜美工作室</span>
        </div>
        <div class="flex gap-3">
          <router-link to="/share" class="text-gray-400 text-lg">🎁</router-link>
          <router-link to="/profile" class="text-gray-400 text-lg">👤</router-link>
        </div>
      </div>
    </div>

    <!-- 搜索框 -->
    <div class="px-4 pt-3 pb-2">
      <div class="bg-white rounded-full px-4 py-2.5 flex items-center gap-2 border border-gray-100 shadow-sm">
        <span class="text-gray-300">🔍</span>
        <span class="text-gray-300 text-sm">搜索项目...</span>
      </div>
    </div>

    <!-- Banner轮播 -->
    <div class="px-4 mt-1">
      <div class="relative overflow-hidden rounded-2xl" style="aspect-ratio: 750/320;">
        <img :src="banners[currentBanner].image" :alt="banners[currentBanner].title" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div class="absolute bottom-3 left-4 text-white text-lg font-bold">{{ banners[currentBanner].title }}</div>
        <div class="absolute bottom-3 right-4 flex gap-1.5">
          <span v-for="(b, i) in banners" :key="b.id"
            class="w-1.5 h-1.5 rounded-full transition-all duration-300"
            :class="i === currentBanner ? 'bg-white w-4' : 'bg-white/50'"></span>
        </div>
      </div>
    </div>

    <!-- 公告栏 -->
    <div class="mx-4 mt-3 bg-amber-50 rounded-xl px-4 py-2.5 flex items-center gap-2">
      <span class="text-amber-500 text-sm">📢</span>
      <span class="text-amber-700 text-sm flex-1 truncate">{{ announcements[0].content }}</span>
    </div>

    <!-- 分类导航 -->
    <div class="px-4 mt-4">
      <div class="flex overflow-x-auto gap-3 pb-1" style="scrollbar-width: none;">
        <div v-for="cat in categories" :key="cat.id"
          class="flex-shrink-0 px-5 py-2 rounded-full text-sm cursor-pointer transition-all duration-200"
          :class="selectedCategory === cat.id
            ? 'bg-primary-500 text-white shadow-md'
            : 'bg-white text-gray-500 border border-gray-100'"
          @click="selectedCategory = cat.id">
          <span v-if="cat.icon" class="mr-1">{{ cat.icon }}</span>
          {{ cat.name }}
        </div>
      </div>
    </div>

    <!-- 项目列表 -->
    <div class="px-4 mt-4 pb-6">
      <div class="grid grid-cols-2 gap-3">
        <div v-for="product in filteredProducts" :key="product.id"
          class="card cursor-pointer" @click="goDetail(product.id)">
          <div class="relative" style="aspect-ratio: 1;">
            <img :src="product.images[0]" :alt="product.name" class="w-full h-full object-cover" />
            <div class="absolute top-2 left-2 flex gap-1">
              <span v-for="tag in product.tags" :key="tag"
                class="tag"
                :class="tag === '引流价' ? 'tag-promo' : tag === '套餐' ? 'tag-package' : 'tag-hot'">{{ tag }}</span>
            </div>
          </div>
          <div class="p-3">
            <h3 class="text-sm font-medium text-gray-800 truncate">{{ product.name }}</h3>
            <div class="flex items-baseline gap-1 mt-1">
              <span class="text-red-500 font-bold text-base">¥{{ product.price }}</span>
              <span class="text-gray-300 text-xs line-through">¥{{ product.originalPrice }}</span>
            </div>
            <div class="text-xs text-gray-400 mt-1">已售 {{ product.sales }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { banners, categories, announcements } from '@/mock/data.js'
import { useProductsStore } from '@/store/products.js'

const router = useRouter()
const store = useProductsStore()
const selectedCategory = ref('all')

const filteredProducts = computed(() => {
  const active = store.activeProducts
  if (selectedCategory.value === 'all') return active
  return active.filter(p => p.category === selectedCategory.value)
})

function goDetail(id) {
  router.push(`/product/${id}`)
}

// Banner自动轮播
const currentBanner = ref(0)
let bannerTimer

onMounted(() => {
  bannerTimer = setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.length
  }, 3000)
})

onUnmounted(() => {
  clearInterval(bannerTimer)
})
</script>
