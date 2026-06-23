<template>
  <div class="page-container-admin">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">客户管理</div>
        <button class="text-primary-500 text-sm font-medium" @click="showAddDialog = true">+ 录入</button>
      </div>
    </div>

    <!-- 搜索 -->
    <div class="px-3 pt-3">
      <div class="relative">
        <Search :size="16" class="text-gray-300 absolute left-3 top-1/2 -translate-y-1/2" />
        <input v-model="searchQuery" type="text" class="form-input pl-9" placeholder="搜索客户姓名/手机号..." />
      </div>
    </div>

    <!-- 客户列表 -->
    <div class="px-3 mt-3 space-y-2">
      <div v-for="customer in filteredCustomers" :key="customer.id" class="bg-white rounded-2xl p-4 cursor-pointer" @click="router.push(`/admin/customer/${customer.id}`)">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-sm text-primary-500 font-medium">
            {{ customer.name[0] }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-800">{{ customer.name }}</span>
              <span class="text-xs text-gray-400">{{ customer.phone }}</span>
            </div>
            <div class="flex items-center gap-3 mt-1 text-xs text-gray-400">
              <span>到店 {{ customer.visitCount }}次</span>
              <span>消费 ¥{{ customer.totalSpent }}</span>
              <span>{{ customer.source }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredCustomers.length === 0" class="empty-state">
        <Users :size="48" class="text-gray-300" />
        <div class="empty-text">暂无客户数据</div>
      </div>
    </div>

    <!-- 手工录入弹窗 -->
    <div v-if="showAddDialog" class="fixed inset-0 bg-black/40 z-50 flex items-end justify-center pb-20" @click="showAddDialog = false">
      <div class="bg-white rounded-2xl w-full max-w-[400px] mx-4 p-6" @click.stop>
        <h3 class="text-base font-bold text-gray-800 mb-4">手工录入客户</h3>
        <div class="space-y-3">
          <input v-model="newCustomer.name" type="text" class="form-input" placeholder="客户姓名 *" />
          <input v-model="newCustomer.phone" type="text" class="form-input" placeholder="手机号 *" />
          <input v-model="newCustomer.note" type="text" class="form-input" placeholder="备注（如：线下老客）" />
        </div>
        <button class="btn btn-primary btn-lg btn-block mt-4" @click="addCustomer">确认录入</button>
        <button class="mt-3 text-sm text-gray-400 w-full text-center" @click="showAddDialog = false">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Users } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { customers } from '@/mock/data.js'

const router = useRouter()
const searchQuery = ref('')
const showAddDialog = ref(false)

const newCustomer = ref({ name: '', phone: '', note: '' })

const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers
  const q = searchQuery.value.toLowerCase()
  return customers.filter(c => c.name.includes(q) || c.phone.includes(q))
})

function addCustomer() {
  if (!newCustomer.value.name || !newCustomer.value.phone) {
    showToast('请填写姓名和手机号')
    return
  }
  customers.unshift({
    id: Date.now(),
    name: newCustomer.value.name,
    phone: newCustomer.value.phone,
    totalSpent: 0,
    visitCount: 0,
    registerTime: new Date().toLocaleDateString('zh-CN'),
    source: '线下录入',
  })
  showAddDialog.value = false
  newCustomer.value = { name: '', phone: '', note: '' }
  showToast('客户录入成功')
}

function showToast(msg) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
</script>
