/**
 * 应用全局配置
 * 部署后请修改 APP_URL 为实际的线上地址
 */

// 生产环境地址（部署到 Railway 后替换此值）
const PRODUCTION_URL = 'https://beauty-studio.up.railway.app'

// 开发环境地址
const DEV_URL = 'http://localhost:5173'

export const APP_URL = import.meta.env.PROD ? PRODUCTION_URL : DEV_URL

// 分享相关
export const SHARE = {
  getInviteUrl(/*inviteCode*/) {
    // 暂不拼接路径，Railway SPA 部署下只有主页能访问
    return APP_URL
  },
  getAppUrl() {
    return APP_URL
  }
}

// 工作室信息
export const STUDIO = {
  name: '颜美工作室',
  slogan: '皮肤管理 · 专业呵护你的美',
  logo: '🌸'
}
