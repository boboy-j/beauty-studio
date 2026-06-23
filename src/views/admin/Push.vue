<template>
  <div class="page-container-admin">
    <div class="nav-bar">
      <div class="nav-bar-inner">
        <div class="nav-back" @click="router.back()">← 返回</div>
        <div class="nav-title">消息推送</div>
      </div>
    </div>

    <div class="px-3 mt-3 space-y-3">
      <!-- 推送编辑 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3"><Mail :size="18" class="inline-block mr-1" /> 编辑推送内容</h3>
        <div class="space-y-3">
          <div>
            <label class="form-label">推送标题</label>
            <input v-model="pushForm.title" type="text" class="form-input" placeholder="如：夏日特惠活动" />
          </div>
          <div>
            <label class="form-label">推送内容</label>
            <textarea v-model="pushForm.content" class="form-input h-28 resize-none py-3" placeholder="输入要推送给用户的消息内容..."></textarea>
          </div>
          <div>
            <label class="form-label">推送对象</label>
            <div class="flex gap-2">
              <div v-for="opt in targetOptions" :key="opt"
                class="px-4 py-2 rounded-full text-xs cursor-pointer border transition-colors"
                :class="pushForm.target === opt ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-100 text-gray-400'"
                @click="pushForm.target = opt">
                {{ opt }}
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary btn-lg btn-block mt-4" @click="sendPush">
          发送推送（{{ pushForm.target }}）
        </button>
      </div>

      <!-- 历史推送 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3"><ClipboardList :size="18" class="inline-block mr-1" /> 历史推送记录</h3>
        <div v-for="(item, i) in history" :key="i" class="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
          <div class="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
            <Mail :size="16" class="text-primary-500" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm text-gray-700">{{ item.title }}</div>
            <div class="text-xs text-gray-400 mt-0.5">{{ item.time }} · 发送至{{ item.target }}</div>
          </div>
        </div>
      </div>

      <!-- 订阅消息模板 -->
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3"><Settings :size="18" class="inline-block mr-1" /> 订阅消息模板</h3>
        <div class="space-y-2">
          <div class="flex items-center justify-between py-2 border-b border-gray-50">
            <span class="text-sm text-gray-600">预约确认通知</span>
            <span class="text-xs text-green-500">已启用</span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-gray-50">
            <span class="text-sm text-gray-600">核销成功通知</span>
            <span class="text-xs text-green-500">已启用</span>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-gray-600">营销活动通知</span>
            <span class="text-xs text-gray-400">待申请</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Mail, ClipboardList, Settings } from 'lucide-vue-next'

const router = useRouter()

const pushForm = ref({
  title: '',
  content: '',
  target: '全部用户',
})

const targetOptions = ['全部用户', '近30天活跃用户', '仅新用户']

const history = [
  { title: '夏日美白季活动开启', time: '2026-06-15 10:00', target: '全部用户' },
  { title: '新客专享8折优惠', time: '2026-06-10 14:30', target: '仅新用户' },
]

function sendPush() {
  if (!pushForm.value.title || !pushForm.value.content) {
    showToast('请填写标题和内容')
    return
  }
  history.unshift({
    title: pushForm.value.title,
    time: new Date().toLocaleString('zh-CN'),
    target: pushForm.value.target,
  })
  showToast('推送已发送！')
  pushForm.value = { title: '', content: '', target: '全部用户' }
}

function showToast(msg) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
</script>
