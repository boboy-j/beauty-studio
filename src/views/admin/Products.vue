<template>
  <div class="page-container-admin">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">项目管理</div>
        <router-link to="/admin/product/edit/0" class="text-primary-500 text-sm font-medium">+ 新增</router-link>
      </div>
    </div>

    <div class="px-3 mt-3 space-y-3">
      <div v-for="product in store.items" :key="product.id" class="bg-white rounded-2xl p-4">
        <div class="flex gap-3">
          <img :src="product.images[0]" class="w-20 h-20 rounded-xl object-cover" />
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between">
              <h3 class="text-sm font-medium text-gray-800">{{ product.name }}</h3>
              <div class="flex items-center gap-1">
                <span class="w-2 h-2 rounded-full" :class="product.isActive ? 'bg-green-400' : 'bg-gray-300'"></span>
                <span class="text-xs text-gray-400">{{ product.isActive ? '上架' : '下架' }}</span>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-1">{{ product.category }}</p>
            <div class="text-red-500 font-bold mt-1">¥{{ product.price }} <span class="text-gray-300 text-xs line-through">¥{{ product.originalPrice }}</span></div>
            <div class="flex flex-wrap gap-1 mt-2">
              <span v-for="tag in product.tags" :key="tag"
                class="tag text-xs" :class="tag === '引流价' ? 'tag-promo' : tag === '套餐' ? 'tag-package' : 'tag-hot'">{{ tag }}</span>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-50 mt-3 pt-3 flex justify-end gap-2">
          <button class="btn btn-outline btn-sm" @click="router.push(`/admin/product/edit/${product.id}`)">编辑</button>
          <button class="btn btn-sm" :class="product.isActive ? 'btn-outline' : 'btn-primary'" @click="toggleStatus(product)">
            {{ product.isActive ? '下架' : '上架' }}
          </button>
          <button class="btn btn-sm text-red-400 border border-red-200 hover:bg-red-50 rounded-lg" @click="confirmDelete(product)">
            删除
          </button>
        </div>
      </div>

      <div v-if="store.items.length === 0" class="text-center py-16 text-gray-400">
        <Package :size="48" class="text-gray-300 mb-3 mx-auto" />
        <div class="text-sm">暂无项目</div>
        <router-link to="/admin/product/edit/0" class="text-primary-500 text-sm mt-2 inline-block">+ 新增项目</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Package } from 'lucide-vue-next'
import { useProductsStore } from '@/store/products.js'

const router = useRouter()
const store = useProductsStore()

function toggleStatus(product) {
  store.toggleProductStatus(product.id)
  showToast(product.isActive ? '已上架' : '已下架')
}

function confirmDelete(product) {
  if (window.confirm(`确定删除「${product.name}」吗？此操作不可恢复。`)) {
    store.deleteProduct(product.id)
    showToast('已删除')
  }
}

function showToast(msg) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
</script>
