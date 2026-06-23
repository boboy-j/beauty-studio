<template>
  <div class="min-h-screen bg-skin-50 pb-24">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">{{ isEdit ? '编辑项目' : '新增项目' }}</div>
      </div>
    </div>

    <div class="px-3 mt-3 space-y-3">
      <!-- 基本信息 -->
      <div class="bg-white rounded-2xl p-4 space-y-4">
        <h3 class="text-sm font-bold text-gray-700">基本信息</h3>

        <div>
          <label class="form-label">项目名称 *</label>
          <input v-model="form.name" type="text" class="form-input" placeholder="最多30字" maxlength="30" />
        </div>

        <div>
          <label class="form-label">分类 *</label>
          <select v-model="form.category" class="form-input">
            <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
          </select>
        </div>

        <div>
          <label class="form-label">项目描述</label>
          <textarea v-model="form.desc" class="form-input h-24 resize-none py-3" placeholder="描述项目详情..."></textarea>
        </div>

        <div>
          <label class="form-label">价格设置</label>
          <div class="flex gap-3">
            <div class="flex-1">
              <input v-model="form.price" type="number" class="form-input" placeholder="实际售价" />
            </div>
            <div class="flex-1">
              <input v-model="form.originalPrice" type="number" class="form-input" placeholder="划线原价" />
            </div>
          </div>
        </div>

        <div>
          <label class="form-label">标签</label>
          <div class="flex flex-wrap gap-2">
            <div v-for="tag in tagOptions" :key="tag"
              class="px-3 py-1.5 rounded-full text-xs cursor-pointer border transition-colors"
              :class="form.tags.includes(tag) ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-100 text-gray-400'"
              @click="toggleTag(tag)">
              {{ tag }}
            </div>
          </div>
        </div>

        <div>
          <label class="form-label">有效期（天）</label>
          <input v-model="form.validityDays" type="number" class="form-input" placeholder="默认365天" />
        </div>
      </div>

      <!-- 套餐内容 -->
      <div class="bg-white rounded-2xl p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-bold text-gray-700">套餐内容</h3>
          <button class="text-xs text-primary-500" @click="addItem">+ 添加子项目</button>
        </div>
        <div v-for="(item, i) in form.items" :key="i" class="flex items-center gap-2 mb-2">
          <input v-model="item.name" type="text" class="form-input flex-1" placeholder="子项目名称" />
          <input v-model="item.count" type="number" class="form-input w-20 text-center" placeholder="次数" />
          <button class="text-red-300 text-lg" @click="form.items.splice(i, 1)">×</button>
        </div>
      </div>

      <!-- 注意事项 -->
      <div class="bg-white rounded-2xl p-4">
        <label class="form-label">注意事项</label>
        <textarea v-model="form.notes" class="form-input h-20 resize-none py-3" placeholder="到店须知、禁忌症说明..."></textarea>
      </div>
    </div>

    <!-- 底部 -->
    <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 px-4 py-3 z-50">
      <button class="btn btn-primary btn-lg btn-block" @click="saveProduct">
        {{ isEdit ? '保存修改' : '创建项目' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products, categories } from '@/mock/data.js'

const route = useRoute()
const router = useRouter()

const tagOptions = ['引流价', '热门', '套餐', '超值', '新客']
const isEdit = computed(() => route.params.id !== '0' && route.params.id)
const editProduct = computed(() => products.find(p => p.id === Number(route.params.id)))

const form = ref({
  name: editProduct.value?.name || '',
  category: editProduct.value?.category || '祛痘',
  desc: editProduct.value?.desc || '',
  price: editProduct.value?.price || '',
  originalPrice: editProduct.value?.originalPrice || '',
  tags: editProduct.value?.tags || [],
  validityDays: editProduct.value?.validityDays || 365,
  items: editProduct.value?.items?.map(i => ({ name: i.name, count: i.count })) || [{ name: '', count: 1 }],
  notes: editProduct.value?.notes || '',
})

function toggleTag(tag) {
  const idx = form.value.tags.indexOf(tag)
  if (idx >= 0) form.value.tags.splice(idx, 1)
  else form.value.tags.push(tag)
}

function addItem() {
  form.value.items.push({ name: '', count: 1 })
}

function saveProduct() {
  if (!form.value.name) {
    showToast('请填写项目名称')
    return
  }
  showToast(isEdit.value ? '保存成功！' : '项目创建成功！')
  setTimeout(() => router.push('/admin/products'), 500)
}

function showToast(msg) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
</script>
