<template>
  <div class="min-h-screen bg-skin-50 pb-24">
    <!-- 顶部导航 -->
    <div class="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
      <div class="flex items-center justify-between">
        <span class="text-lg font-bold text-gray-800">我的分享</span>
        <router-link to="/home" class="text-gray-400 text-sm">返回首页</router-link>
      </div>
    </div>

    <!-- 我的邀请码 -->
    <div class="mx-3 mt-3 bg-gradient-to-br from-primary-500 to-rose-400 rounded-2xl p-6 text-white text-center">
      <div class="text-sm opacity-80 mb-2">我的专属邀请码</div>
      <div class="text-2xl font-bold tracking-widest mb-3">{{ currentUser.inviteCode }}</div>
      <div class="text-xs opacity-60">新用户注册时输入邀请码，双方各得优惠</div>
    </div>

    <!-- 邀请统计 -->
    <div class="mx-3 mt-3 bg-white rounded-2xl p-5">
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <div class="text-2xl font-bold text-primary-500">{{ referralRanking.find(r => r.name === currentUser.nickname)?.count || 0 }}</div>
          <div class="text-xs text-gray-400 mt-1">已邀请</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-primary-500">¥50</div>
          <div class="text-xs text-gray-400 mt-1">我的奖励</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-primary-500">Top{{ referralRanking.findIndex(r => r.name === currentUser.nickname) + 1 || '-' }}</div>
          <div class="text-xs text-gray-400 mt-1">邀请排行</div>
        </div>
      </div>
    </div>

    <!-- 分享方式 -->
    <div class="mx-3 mt-3">
      <h3 class="text-sm font-bold text-gray-700 mb-3 px-1">分享给好友</h3>
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white rounded-2xl p-4 text-center cursor-pointer" @click="showQRModal = true">
          <div class="text-3xl mb-2">📱</div>
          <div class="text-sm text-gray-700 font-medium">分享二维码</div>
          <div class="text-xs text-gray-400 mt-1">保存图片发给好友</div>
        </div>
        <div class="bg-white rounded-2xl p-4 text-center cursor-pointer" @click="shareLink">
          <div class="text-3xl mb-2">🔗</div>
          <div class="text-sm text-gray-700 font-medium">分享链接</div>
          <div class="text-xs text-gray-400 mt-1">复制链接发给好友</div>
        </div>
      </div>
    </div>

    <!-- 分享海报 -->
    <div class="mx-3 mt-3 mb-6">
      <div class="bg-white rounded-2xl p-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3">分享海报</h3>
        <div ref="posterRef" class="relative rounded-xl overflow-hidden" style="aspect-ratio: 3/4; background: linear-gradient(135deg, #fdf8f3, #f0e6d8);">
          <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div class="w-16 h-16 rounded-full bg-primary-200 flex items-center justify-center mb-3">
              <span class="text-2xl">🌸</span>
            </div>
            <h3 class="text-lg font-bold text-primary-700 mb-1">颜美工作室</h3>
            <p class="text-xs text-primary-400 mb-4">皮肤管理 · 专业呵护你的美</p>
            <div class="bg-white rounded-xl p-3 mb-3 shadow-sm">
              <div class="text-xs text-gray-400">扫码注册，享新客专享价</div>
              <div class="mt-2 w-24 h-24 mx-auto flex items-center justify-center">
                <img v-if="qrDataUrl" :src="qrDataUrl" class="w-24 h-24" alt="二维码" />
                <div v-else class="w-24 h-24 bg-gray-100 rounded flex items-center justify-center text-gray-300 text-xs">生成中...</div>
              </div>
            </div>
            <p class="text-xs text-primary-400">邀请人：{{ currentUser.nickname }}</p>
          </div>
        </div>
        <button class="btn btn-primary btn-sm mt-3 w-full" @click="savePoster" :disabled="saving">
          {{ saving ? '保存中...' : '保存海报到相册' }}
        </button>
      </div>
    </div>

    <!-- 二维码弹窗 -->
    <Teleport to="body">
      <div v-if="showQRModal" class="fixed inset-0 z-[999] flex items-center justify-center bg-black/50" @click.self="showQRModal = false">
        <div class="bg-white rounded-2xl p-6 mx-4 max-w-xs w-full text-center">
          <div class="text-lg font-bold text-gray-800 mb-4">扫码访问</div>
          <div class="bg-white p-3 rounded-xl inline-block shadow-sm mx-auto">
            <img v-if="qrDataUrl" :src="qrDataUrl" class="w-48 h-48" alt="二维码" />
            <div v-else class="w-48 h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">生成中...</div>
          </div>
          <div class="text-xs text-gray-400 mt-3 break-all">{{ inviteUrl }}</div>
          <div class="flex gap-3 mt-4">
            <button class="flex-1 btn btn-outline btn-sm" @click="showQRModal = false">关闭</button>
            <button class="flex-1 btn btn-primary btn-sm" @click="downloadQR">保存图片</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { currentUser, referralRanking } from '@/mock/data.js'
import { SHARE, STUDIO } from '@/config.js'
import QRCode from 'qrcode'
import html2canvas from 'html2canvas'

const router = useRouter()
const showQRModal = ref(false)
const qrDataUrl = ref('')
const saving = ref(false)
const posterRef = ref(null)
const inviteUrl = SHARE.getInviteUrl(currentUser.inviteCode)

onMounted(async () => {
  try {
    qrDataUrl.value = await QRCode.toDataURL(inviteUrl, {
      width: 400,
      margin: 2,
      color: { dark: '#3b3b3b', light: '#ffffff' }
    })
  } catch (err) {
    console.error('二维码生成失败', err)
  }
})

function shareLink() {
  navigator.clipboard?.writeText(inviteUrl)
    .then(() => showToast('邀请链接已复制'))
    .catch(() => showToast('链接已生成'))
}

async function downloadQR() {
  if (!qrDataUrl.value) return
  const a = document.createElement('a')
  a.href = qrDataUrl.value
  a.download = `颜美工作室-${currentUser.inviteCode}.png`
  a.click()
  showToast('二维码已保存')
}

async function savePoster() {
  if (!posterRef.value) return
  saving.value = true
  try {
    const canvas = await html2canvas(posterRef.value, {
      scale: 2,
      useCORS: true,
      backgroundColor: null
    })
    const link = document.createElement('a')
    link.download = `颜美工作室海报-${currentUser.inviteCode}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    showToast('海报已保存到相册')
  } catch (err) {
    console.error('海报生成失败', err)
    showToast('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

function showToast(msg) {
  const existing = document.querySelector('.custom-toast')
  if (existing) existing.remove()
  const el = document.createElement('div')
  el.className = 'custom-toast'
  el.textContent = msg
  Object.assign(el.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0,0,0,0.78)',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    zIndex: '9999',
    transition: 'opacity 0.3s'
  })
  document.body.appendChild(el)
  setTimeout(() => {
    el.style.opacity = '0'
    setTimeout(() => el.remove(), 300)
  }, 1500)
}
</script>

<style scoped>
/* 覆盖组件内的 Toast 样式 */
:global(.custom-toast) {
  animation: toastIn 0.25s ease-out;
}
@keyframes toastIn {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
</style>
