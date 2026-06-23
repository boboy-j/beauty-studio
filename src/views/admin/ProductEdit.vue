<template>
  <div class="min-h-screen bg-skin-50 pb-24">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">{{ isEdit ? '编辑项目' : '新增项目' }}</div>
      </div>
    </div>

    <div class="px-3 mt-3 space-y-3">
      <!-- 图片上传 & 裁剪 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3"><Camera :size="18" class="inline-block mr-1" />项目图片</h3>

        <!-- 已选图片列表 -->
        <div class="flex gap-2 flex-wrap mb-3">
          <div v-for="(img, i) in form.images" :key="i" class="relative group">
            <div class="w-20 h-20 rounded-xl overflow-hidden border border-gray-100">
              <img :src="img" class="w-full h-full object-cover" />
            </div>
            <button
              class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-400 text-white rounded-full text-xs leading-none opacity-0 group-hover:opacity-100 transition-opacity"
              @click="form.images.splice(i, 1)">×</button>
          </div>
          <div v-if="form.images.length < 6"
            class="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary-300 transition-colors text-gray-300 text-2xl"
            @click="triggerUpload">
            +
          </div>
        </div>

        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileSelect" />
      </div>

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
          <label class="form-label">适用肤质</label>
          <div class="flex flex-wrap gap-2">
            <div v-for="skin in skinTypeOptions" :key="skin"
              class="px-3 py-1.5 rounded-full text-xs cursor-pointer border transition-colors"
              :class="form.skinTypes.includes(skin) ? 'bg-rose-100 text-rose-600 border-rose-200' : 'border-gray-100 text-gray-400'"
              @click="toggleSkinType(skin)">
              {{ skin }}
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

    <!-- ===== 裁剪弹窗 ===== -->
    <Teleport to="body">
      <div v-if="showCropper" class="fixed inset-0 z-[999] flex flex-col bg-black/80">
        <div class="flex items-center justify-between px-4 py-3 text-white">
          <button class="text-sm opacity-70" @click="closeCropper">取消</button>
          <span class="text-sm font-medium">裁剪图片</span>
          <button class="text-sm text-primary-300 font-medium" @click="confirmCrop">确定</button>
        </div>

        <!-- 预设裁剪比例 -->
        <div class="flex justify-center gap-2 px-4 pb-3">
          <button v-for="ratio in presetRatios" :key="ratio.key"
            class="px-3 py-1 rounded-full text-xs border transition-colors"
            :class="selectedRatio === ratio.key ? 'bg-primary-500 text-white border-primary-500' : 'text-white/70 border-white/30'"
            @click="setRatio(ratio.key)">
            {{ ratio.label }}
          </button>
        </div>

        <!-- 裁剪容器 -->
        <div ref="cropperContainerRef" class="flex-1 flex items-center justify-center p-4 overflow-hidden">
          <img v-if="cropperSrc" ref="cropperImageRef" :src="cropperSrc" class="max-w-full max-h-full" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Camera } from 'lucide-vue-next'
import { categories } from '@/mock/data.js'
import { useProductsStore } from '@/store/products.js'
import Cropper from 'cropperjs'

const route = useRoute()
const router = useRouter()
const store = useProductsStore()

const tagOptions = ['引流价', '热门', '套餐', '超值', '新客']
const skinTypeOptions = ['油皮', '干皮', '混合', '敏感', '痘痘肌']
const isEdit = computed(() => route.params.id !== '0' && route.params.id)
const editProduct = computed(() => store.getProductById(route.params.id))

// 预设裁剪比例
const presetRatios = [
  { key: 'free', label: '自由', ratio: NaN },
  { key: '1:1', label: '1:1 方形', ratio: 1 },
  { key: '4:3', label: '4:3 横幅', ratio: 4 / 3 },
  { key: '3:4', label: '3:4 竖版', ratio: 3 / 4 },
  { key: '16:9', label: '16:9 横屏', ratio: 16 / 9 },
]
const selectedRatio = ref('free')

// 表单
const form = ref({
  name: editProduct.value?.name || '',
  category: editProduct.value?.category || '祛痘',
  desc: editProduct.value?.desc || '',
  price: editProduct.value?.price || '',
  originalPrice: editProduct.value?.originalPrice || '',
  images: editProduct.value?.images?.map(i => i) || [],
  skinTypes: editProduct.value?.skinTypes?.map(s => s) || [],
  tags: editProduct.value?.tags?.map(t => t) || [],
  validityDays: editProduct.value?.validityDays || 365,
  items: editProduct.value?.items?.map(i => ({ name: i.name, count: i.count })) || [{ name: '', count: 1 }],
  notes: editProduct.value?.notes || '',
})

// ===== 图片上传 & 裁剪 (cropperjs v2) =====
const fileInput = ref(null)
const showCropper = ref(false)
const cropperSrc = ref('')
const cropperImageRef = ref(null)
const cropperContainerRef = ref(null)
let cropperInstance = null

function triggerUpload() {
  fileInput.value?.click()
}

function onFileSelect(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    cropperSrc.value = reader.result
    showCropper.value = true
    nextTick(() => initCropper())
  }
  reader.readAsDataURL(file)
  e.target.value = ''
}

function initCropper() {
  destroyCropper()
  if (!cropperImageRef.value || !cropperContainerRef.value) return
  cropperInstance = new Cropper(cropperImageRef.value, {
    container: cropperContainerRef.value,
  })
  setRatio(selectedRatio.value)
}

function setRatio(key) {
  selectedRatio.value = key
  if (!cropperInstance) return
  const entry = presetRatios.find(r => r.key === key)
  const selection = cropperInstance.getCropperSelection()
  if (selection) {
    selection.aspectRatio = entry?.ratio || NaN
  }
}

async function confirmCrop() {
  if (!cropperInstance) return
  const selection = cropperInstance.getCropperSelection()
  if (!selection) return
  try {
    const canvas = await selection.$toCanvas({ width: 800, height: 800 })
    form.value.images.push(canvas.toDataURL('image/jpeg', 0.9))
  } catch (e) {
    console.error('裁剪失败', e)
  }
  closeCropper()
}

function closeCropper() {
  destroyCropper()
  showCropper.value = false
  cropperSrc.value = ''
}

function destroyCropper() {
  if (cropperInstance) {
    try { cropperInstance.destroy() } catch (e) { /* ignore */ }
    cropperInstance = null
  }
}

// ===== 表单逻辑 =====
function toggleTag(tag) {
  const idx = form.value.tags.indexOf(tag)
  if (idx >= 0) form.value.tags.splice(idx, 1)
  else form.value.tags.push(tag)
}

function toggleSkinType(skin) {
  const idx = form.value.skinTypes.indexOf(skin)
  if (idx >= 0) form.value.skinTypes.splice(idx, 1)
  else form.value.skinTypes.push(skin)
}

function addItem() {
  form.value.items.push({ name: '', count: 1 })
}

function saveProduct() {
  if (!form.value.name) {
    showToast('请填写项目名称')
    return
  }
  if (form.value.images.length === 0) {
    showToast('请至少上传一张图片')
    return
  }

  const data = {
    name: form.value.name,
    category: form.value.category,
    desc: form.value.desc,
    price: Number(form.value.price) || 0,
    originalPrice: Number(form.value.originalPrice) || 0,
    images: form.value.images,
    skinTypes: form.value.skinTypes,
    tags: form.value.tags,
    validityDays: Number(form.value.validityDays) || 365,
    items: form.value.items.filter(i => i.name),
    notes: form.value.notes,
  }

  if (isEdit.value) {
    store.updateProduct(route.params.id, data)
    showToast('保存成功！')
  } else {
    store.addProduct(data)
    showToast('项目创建成功！')
  }

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
