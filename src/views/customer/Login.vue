<template>
  <div class="page-container bg-skin-50">
    <!-- 登录页 -->
    <div class="flex flex-col items-center justify-center min-h-screen px-6" style="background: linear-gradient(180deg, #fdf8f3 0%, #fff 100%);">
      <!-- Logo区域 -->
      <div class="w-24 h-24 rounded-3xl flex items-center justify-center mb-6" style="background: linear-gradient(135deg, #d4a574, #e8a0bf);">
        <svg viewBox="0 0 24 24" width="40" height="40" fill="#fff" class="opacity-90">
          <path d="M12 3c0 0-3 5-3 8c0 3 1.5 5 3 5s3-2 3-5c0-3-3-8-3-8z" opacity="0.85"/>
          <path d="M6 9c0 0 4 3 6 3s6-3 6-3c0 0-2 5-2 7c0 2-1.5 4-4 4s-4-2-4-4c0-2-2-7-2-7z" opacity="0.85"/>
          <path d="M3 17c0 0 5-1 7 0c2 1 3 3 2 4c-1 1-3 0-4-1c-1-1-5-3-5-3z" opacity="0.85"/>
          <circle cx="12" cy="12" r="1.5" fill="#d4a574" opacity="0.6"/>
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">颜美工作室</h1>
      <p class="text-sm text-gray-400 mb-10">皮肤管理 · 专业呵护你的美</p>

      <!-- 授权按钮 -->
      <button class="btn btn-primary btn-lg btn-block mb-4" style="max-width: 300px;" @click="handleLogin">
        <MessageSquare class="inline-block mr-2" :size="18" /> 微信一键登录
      </button>
      <button class="btn btn-outline btn-lg btn-block" style="max-width: 300px;" @click="handlePhoneLogin">
        <Smartphone class="inline-block mr-2" :size="18" /> 获取手机号授权
      </button>

      <p class="text-xs text-gray-300 mt-6 text-center px-6 leading-relaxed">
        登录即表示同意 <span class="text-primary-500">《用户协议》</span>和<span class="text-primary-500">《隐私政策》</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { MessageSquare, Smartphone } from 'lucide-vue-next'

const router = useRouter()

function handleLogin() {
  // 模拟微信登录
  showToast('登录成功！')
  setTimeout(() => router.push('/home'), 500)
}

function handlePhoneLogin() {
  showToast('手机号授权成功！')
  setTimeout(() => router.push('/home'), 500)
}

function showToast(msg) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
</script>
