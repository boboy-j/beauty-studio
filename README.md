# 颜美工作室 - 美容工作室私域小程序 H5 Demo

> 一个基于 Vue 3 + Vite 构建的移动端 H5 应用，模拟美容工作室私域小程序的完整功能流程。

[![Vue 3](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)
[![Deploy on Railway](https://img.shields.io/badge/Railway-Deploy-7C3AED?logo=railway)](https://railway.app)

## 🌸 项目简介

本项目为 **颜美工作室（皮肤管理美容工作室）** 的私域小程序 H5 Demo，基于产品需求文档（PRD V1.1）开发。

**核心功能：**
- **C端（顾客）**：项目浏览、在线下单、微信支付模拟、预约日历、订单管理、分享引流、个人中心
- **B端（店主）**：数据仪表盘、核销管理、项目管理、预约配置、客户管理、引流溯源、数据统计、消息推送

## 🚀 在线预览

部署后访问：`https://your-app-name.railway.app`

## 📱 功能展示

### C端顾客
| 功能 | 说明 |
|------|------|
| 🏠 首页 | Banner轮播、分类导航、项目卡片列表 |
| 📋 项目详情 | 图文详情、套餐内容、效果图集、立即购买 |
| 💳 下单支付 | 订单确认、模拟微信支付、支付成功引导 |
| 📅 预约系统 | 日历选择、时间段选择、预约确认 |
| 📦 我的订单 | 订单列表、状态筛选、订单详情、核销记录 |
| 🎁 分享引流 | 专属邀请码、分享二维码/链接、分享海报 |
| 👤 个人中心 | 用户信息、订单概览、快捷入口、管理切换 |

### B端店主管理
| 功能 | 说明 |
|------|------|
| 📊 管理首页 | 今日数据卡片、快捷操作、预约概览 |
| 📋 今日预约 | 预约列表、一键核销操作 |
| 📦 项目管理 | 项目列表、上下架、新增/编辑项目 |
| ⏰ 预约配置 | 营业时段设置、时段预览 |
| 👥 客户管理 | 客户搜索、详情查看、手工录入 |
| 🏆 引流溯源 | 邀请排行、渠道分布 |
| 📈 数据统计 | 营收/客户概览、项目销量排行、增长趋势 |
| 📨 消息推送 | 编辑并发送推送消息 |

## 🛠️ 技术栈

| 层级 | 技术选型 |
|------|----------|
| 框架 | Vue 3 (Composition API + `<script setup>`) |
| 构建工具 | Vite 5 |
| 路由 | Vue Router 4 |
| 状态管理 | Pinia (预留) |
| 样式 | Tailwind CSS 3 + 自定义样式 |
| 日期处理 | dayjs |
| 数据 | Mock 数据（本地模拟，无需后端） |

## 🏗️ 项目结构

```
beauty-studio/
├── index.html                 # 入口 HTML
├── package.json               # 依赖配置
├── vite.config.js             # Vite 配置
├── tailwind.config.js         # Tailwind 配置（含品牌色）
├── railway.json               # Railway 部署配置
├── postcss.config.js          # PostCSS 配置
├── public/
│   └── favicon.svg            # Favicon
└── src/
    ├── main.js                # 应用入口
    ├── App.vue                # 根组件（含 Tab 导航）
    ├── router/
    │   └── index.js           # 路由配置（21条路由）
    ├── mock/
    │   └── data.js            # Mock 数据
    ├── styles/
    │   └── main.css           # 全局样式
    ├── views/
    │   ├── customer/          # C端页面（12个）
    │   │   ├── Home.vue
    │   │   ├── Login.vue
    │   │   ├── ProductDetail.vue
    │   │   ├── OrderConfirm.vue
    │   │   ├── OrderResult.vue
    │   │   ├── MyOrders.vue
    │   │   ├── OrderDetail.vue
    │   │   ├── AppointmentCalendar.vue
    │   │   ├── AppointmentConfirm.vue
    │   │   ├── MyAppointments.vue
    │   │   ├── Share.vue
    │   │   └── Profile.vue
    │   └── admin/             # B端页面（11个）
    │       ├── Dashboard.vue
    │       ├── Appointments.vue
    │       ├── Verifications.vue
    │       ├── Products.vue
    │       ├── ProductEdit.vue
    │       ├── Schedule.vue
    │       ├── Customers.vue
    │       ├── CustomerDetail.vue
    │       ├── Referral.vue
    │       ├── Stats.vue
    │       └── Push.vue
    └── components/            # 公共组件（预留）
```

## 🚀 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 打开浏览器访问
# http://localhost:5173
```

## 📦 构建部署

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录。

### Railway 部署（推荐）

本项目已配置 `railway.json`，支持一键部署到 Railway：

1. 将代码推送到 GitHub 仓库
2. 在 [Railway](https://railway.app) 点击 `New Project` → `Deploy from GitHub repo`
3. 选择你的仓库
4. Railway 会自动检测 `railway.json` 配置，运行 `npm install && npm run build`
5. 部署完成后即可访问

### 其他平台部署

项目构建后为纯静态文件，可部署到任意静态托管平台：

- **Vercel**：连接 GitHub 仓库后自动部署
- **Netlify**：拖拽 `dist/` 文件夹或连接 GitHub
- **GitHub Pages**：将 `dist/` 目录上传到 `gh-pages` 分支

## 🌐 浏览器兼容

- 微信内置浏览器（最新版）
- iOS Safari 14+
- Chrome 90+
- 移动端主流机型适配

## 📄 关于 PRD

本项目基于 [美容工作室私域小程序 PRD V1.1](./PRD_V1.1.md) 开发，完整实现了 Phase 1 的全部核心功能需求。数据模型、页面清单、用户旅程均与 PRD 保持一致。

Phase 2（Web管理端、分销返佣、多店管理）为后续迭代范围，本项目后端 API 设计已预留扩展空间。

## 📝 许可证

MIT License

---

<p align="center">🌸 颜美工作室 · 皮肤管理专家 🌸</p>
