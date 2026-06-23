<template>
  <div class="page-container bg-skin-50">
    <!-- 登录页 -->
    <div class="flex flex-col items-center justify-center min-h-screen px-6" style="background: linear-gradient(180deg, #fdf8f3 0%, #fff 100%);">
      <!-- Logo区域 -->
      <div class="w-24 h-24 rounded-3xl flex items-center justify-center mb-6" style="background: linear-gradient(135deg, #d4a574, #e8a0bf);">
        <span class="text-4xl">🌸</span>
      </div>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">颜美工作室</h1>
      <p class="text-sm text-gray-400 mb-10">皮肤管理 · 专业呵护你的美</p>

      <!-- 授权按钮 -->
      <button class="btn btn-primary btn-lg btn-block mb-4" style="max-width: 300px;" @click="handleLogin">
        <span class="mr-2">💬</span> 微信一键登录
      </button>
      <button class="btn btn-outline btn-lg btn-block" style="max-width: 300px;" @click="handlePhoneLogin">
        <span class="mr-2">📱</span> 获取手机号授权
      </button>

      <p class="text-xs text-gray-300 mt-6 text-center px-6 leading-relaxed">
        登录即表示同意 <span class="text-primary-500">《用户协议》</span>和<span class="text-primary-500">《隐私政策》</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

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
