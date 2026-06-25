<template>
  <div class="page-container bg-skin-50">
    <div class="flex flex-col items-center justify-center min-h-screen px-6" style="background: linear-gradient(180deg, #fdf8f3 0%, #fff 100%);">
      <!-- Logo -->
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

      <!-- 手机号+验证码登录 -->
      <div class="w-full max-w-xs space-y-3 mb-6">
        <div class="flex items-center bg-white rounded-xl px-4 py-3 border border-gray-100">
          <Phone :size="18" class="text-gray-400 mr-3 shrink-0" />
          <input v-model="phone" type="tel" placeholder="请输入手机号" class="flex-1 text-sm outline-none bg-transparent" maxlength="11" />
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center bg-white rounded-xl px-4 py-3 border border-gray-100 flex-1">
            <input v-model="code" type="text" placeholder="请输入验证码" class="flex-1 text-sm outline-none bg-transparent" maxlength="6" />
          </div>
          <button class="btn btn-sm whitespace-nowrap" :class="codeSending ? 'btn-disabled' : 'btn-outline'" @click="sendCode" :disabled="codeSending">
            {{ codeSending ? `${codeCountdown}s` : '发送验证码' }}
          </button>
        </div>
        <button class="btn btn-primary btn-lg btn-block" @click="handleCodeLogin">
          登录
        </button>
      </div>

      <!-- 分隔线 -->
      <div class="flex items-center gap-3 w-full max-w-xs mb-6">
        <div class="flex-1 h-px bg-gray-100"></div>
        <span class="text-xs text-gray-300">其他方式</span>
        <div class="flex-1 h-px bg-gray-100"></div>
      </div>

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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MessageSquare, Smartphone, Phone } from 'lucide-vue-next'

const router = useRouter()
const phone = ref('')
const code = ref('')
const codeSending = ref(false)
const codeCountdown = ref(60)
let countdownTimer = null

function sendCode() {
  if (!/^1\d{10}$/.test(phone.value)) {
    showToast('请输入正确的手机号')
    return
  }
  codeSending.value = true
  codeCountdown.value = 60
  showToast('验证码已发送（123456）')
  countdownTimer = setInterval(() => {
    codeCountdown.value--
    if (codeCountdown.value <= 0) {
      clearInterval(countdownTimer)
      codeSending.value = false
    }
  }, 1000)
}

function handleCodeLogin() {
  if (!/^1\d{10}$/.test(phone.value)) {
    showToast('请输入正确的手机号')
    return
  }
  if (code.value.length < 4) {
    showToast('请输入验证码')
    return
  }
  showToast('登录成功！')
  setTimeout(() => router.push('/home'), 500)
}

function handleLogin() {
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
