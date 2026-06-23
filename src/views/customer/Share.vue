<template>
  <div class="min-h-screen bg-skin-50 pb-24">
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
        <div class="bg-white rounded-2xl p-4 text-center cursor-pointer" @click="shareQR">
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
        <div class="relative rounded-xl overflow-hidden" style="aspect-ratio: 3/4; background: linear-gradient(135deg, #fdf8f3, #f0e6d8);">
          <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div class="w-16 h-16 rounded-full bg-primary-200 flex items-center justify-center mb-3">
              <span class="text-2xl">🌸</span>
            </div>
            <h3 class="text-lg font-bold text-primary-700 mb-1">颜美工作室</h3>
            <p class="text-xs text-primary-400 mb-4">皮肤管理 · 专业呵护你的美</p>
            <div class="bg-white rounded-xl p-3 mb-3 shadow-sm">
              <div class="text-xs text-gray-400">扫码注册，享新客专享价</div>
              <div class="mt-2 w-24 h-24 mx-auto bg-gray-100 rounded flex items-center justify-center text-gray-300 text-xs">[二维码]</div>
            </div>
            <p class="text-xs text-primary-400">邀请人：{{ currentUser.nickname }}</p>
          </div>
        </div>
        <button class="btn btn-primary btn-sm mt-3 w-full" @click="shareQR">保存海报到相册</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { currentUser, referralRanking } from '@/mock/data.js'

const router = useRouter()

function shareQR() {
  showToast('二维码已保存到相册')
}

function shareLink() {
  navigator.clipboard?.writeText(`https://beauty-studio.app/invite/${currentUser.inviteCode}`)
    .then(() => showToast('邀请链接已复制'))
    .catch(() => showToast('链接已生成'))
}

function showToast(msg) {
  const el = document.createElement('div')
  el.className = 'toast'
  el.textContent = msg
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 1500)
}
</script>
