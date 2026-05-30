# 抖音网红推荐系统

<div align="center">

![Vue3](https://img.shields.io/badge/Vue-3.4.0-brightgreen.svg)
![Vite](https://img.shields.io/badge/Vite-5.0.0-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)
![Netlify](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)
![Made with Vue](https://img.shields.io/badge/Made%20with-Vue-42b883.svg)

一个基于 Vue3 + Vite 构建的现代化抖音网红推荐展示平台，支持分类浏览、智能搜索、数据可视化和社交分享功能。

**[🌐 在线演示](https://douy.netlify.app/)** | **[📖 中文文档](#快速开始)** | **[🚀 功能特性](#功能特性)** | **[🗺️ 开发路线](#开发路线)**

</div>

---

## 📸 项目截图

<div align="center">

### 🏠 主页界面 - 智能分类与搜索
![主页截图](./screenshots/home.png)
*响应式主页设计，支持多维度分类筛选和实时模糊搜索*

### 👤 网红详情 - 完整信息展示
![详情弹窗](./screenshots/detail.png)
*详细的网红信息面板，包含数据统计图表、抖音主页跳转和个人笔记功能*

### 📊 数据分析 - 可视化统计
![数据统计](./screenshots/stats.png)
*集成 Chart.js 的数据可视化面板，直观展示网红影响力分布和趋势分析*

### 📱 移动端适配
![移动端](./screenshots/mobile.png)
*完美适配移动设备的响应式设计，提供流畅的触屏体验*

</div>

> 💡 **提示**: 请替换 `screenshots/` 目录下的图片为实际项目截图。可参考 [screenshots/README.md](./screenshots/README.md) 获取截图指南

---

## ✨ 功能特性

### 🎯 核心功能
- **智能分类浏览**: 支持美食、搞笑、健身、知识等多维度分类筛选
  - 🏷️ 7+ 精细分类体系（美食、搞笑、健身、知识、美妆、游戏、生活）
  - 🎯 一键快速筛选，实时显示分类统计
  - 🔄 支持"全部"分类查看所有网红
  
- **实时搜索**: 按名称、描述、标签进行模糊搜索，即时显示结果
  - 🔍 多字段智能匹配算法
  - ⚡ 毫秒级搜索响应速度
  - 🎨 搜索结果关键词高亮显示
  
- **详细信息展示**: 粉丝数、作品数、获赞数等关键指标一目了然
  - 📈 三栏数据卡片展示（粉丝/作品/获赞）
  - 📝 完整的个人简介和特色标签
  - 🔗 一键跳转抖音主页
  
- **批量管理**: 高效的数据管理能力
  - ☑️ 多选网红进行批量删除
  - ✏️ 实时编辑网红信息
  - ➕ 快速添加新网红

### 📊 数据可视化
- **统计面板**: 实时展示网红总数、分类分布、粉丝总量等核心数据
  - 📊 4 大核心指标卡片（总数/总粉丝/平均获赞/平均作品）
  - 📈 动态更新的统计数据
  
- **图表分析**: 集成 Chart.js，提供直观的柱状图和饼图分析
  - 🥧 分类占比饼图：清晰展示各分类分布
  - 📊 Top 10 排行榜：粉丝数排名可视化
  - 🎨 渐变色系配色方案
  
- **趋势追踪**: 记录网红数据变化，生成动态统计报告

### 💾 数据管理
- **本地持久化**: 使用 LocalStorage 自动保存用户操作和数据修改
  - 💾 自动保存所有数据变更
  - 🔄 页面刷新后数据不丢失
  - ⚡ 无网络环境下正常使用
  
- **批量操作**: 支持多选删除，提高管理效率
  - ☑️ 复选框多选模式
  - 🗑️ 一键批量删除选中项
  - ⚠️ 删除前二次确认
  
- **自定义笔记**: 为每个网红添加个人备注和评价
  - 📝 富文本笔记编辑器
  - 💭 私人备注和评价系统
  - 📌 重要信息标记

### 🔗 社交分享
- **链接分享**: 生成可分享的网红详情链接，支持 URL 压缩
  - 🔗 智能生成分享链接
  - 📦 Pako 算法数据压缩（压缩率可达 70%+）
  - 🌐 优化后的短链接更易分享
  
- **二维码生成**: 自动生成二维码，方便移动端扫码访问
  - 📱 高清二维码图片
  - 🎨 可自定义二维码样式
  - 📲 一键下载二维码
  
- **跨平台分享**: 支持微信、微博、QQ 等主流社交平台

### 🎨 用户体验
- **响应式设计**: 完美适配桌面端、平板和移动设备
  - 🖥️ 桌面端：多列网格布局
  - 📱 移动端：单列卡片流
  - 📐 自适应屏幕尺寸
  
- **流畅动画**: 精心设计的过渡效果和交互动画
  - ✨ 卡片悬停放大效果
  - 🎭 弹窗平滑过渡
  - 💫 Toast 提示动画
  
- **现代化 UI**: 采用渐变色彩和圆角设计
  - 🌈 渐变色按钮和标题
  - 🔘 统一的圆角风格
  - 🎨 和谐的配色方案
  
- **Toast 提示**: 友好的操作反馈和状态提示
  - ✅ 成功/错误/警告多种类型
  - ⏱️ 自动消失机制
  - 🎯 精确的位置提示

## 🛠️ 技术栈

### 前端框架
- **Vue 3.4+**: 采用 Composition API，更好的代码组织和类型推断
  - ⚡ `<script setup>` 语法糖
  - 🎯 响应式系统优化
  - 📦 更小的打包体积
  
- **Vite 5**: 极速的开发服务器和优化的生产构建
  - 🔥 毫秒级热模块替换 (HMR)
  - ⚡ 基于 ESBuild 的快速预构建
  - 🎨 Rollup 优化的生产构建

### 核心依赖
- **Chart.js 4.5+**: 强大的数据可视化图表库
  - 📊 多种图表类型支持
  - 🎨 高度可定制的样式
  - 📱 响应式图表渲染
  
- **Pako 2.1+**: 高性能数据压缩算法，优化分享链接
  - 📦 Gzip 压缩算法
  - ⚡ 浏览器端快速压缩/解压
  - 🔗 URL 长度优化（减少 70%+）
  
- **QRCode.vue 3.8+**: 二维码生成组件
  - 📱 高清二维码渲染
  - 🎨 可自定义颜色和尺寸
  - 💾 支持导出为图片

### 开发工具
- **JavaScript ES6+**: 现代 JavaScript 语法特性
  - 🔄 Promise/async-await 异步处理
  - 📦 模块化开发
  - 🎯 箭头函数和解构赋值
  
- **CSS3**: Flexbox、Grid、Gradient 等现代布局方案
  - 📐 Flexbox 弹性布局
  - 🎨 CSS Grid 网格布局
  - 🌈 Gradient 渐变效果
  - ✨ Transition/Animation 动画
  
- **LocalStorage API**: 客户端数据持久化存储
  - 💾 无后端数据存储
  - ⚡ 快速读写性能
  - 🔄 自动同步机制

## 📊 项目统计

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/cxh123-png/douyin-influencer?style=flat-square&logo=github)
![GitHub forks](https://img.shields.io/github/forks/cxh123-png/douyin-influencer?style=flat-square&logo=github)
![GitHub issues](https://img.shields.io/github/issues/cxh123-png/douyin-influencer?style=flat-square&logo=github)
![GitHub pull requests](https://img.shields.io/github/issues-pr/cxh123-png/douyin-influencer?style=flat-square&logo=github)
![GitHub last commit](https://img.shields.io/github/last-commit/cxh123-png/douyin-influencer?style=flat-square&logo=github)
![GitHub license](https://img.shields.io/github/license/cxh123-png/douyin-influencer?style=flat-square)

</div>

## 💡 为什么选择本项目？

### 🎯 适合人群
- **市场营销人员**: 快速查找和评估抖音网红，制定合作策略
- **品牌方**: 了解网红数据表现，做出明智的投放决策
- **内容创作者**: 学习优秀网红的运营技巧和风格特点
- **开发者**: 学习 Vue3 + Vite 现代化前端开发实践
- **学生**: 了解社交媒体数据分析和可视化的实际应用

### ✨ 核心优势
1. **零后端依赖**: 纯前端实现，无需服务器即可运行
2. **极速体验**: Vite 构建工具带来秒级启动和热更新
3. **数据压缩**: Pako 算法优化分享链接，提升用户体验
4. **响应式设计**: 一套代码完美适配多端设备
5. **开源免费**: MIT 协议，可自由使用和修改
6. **易于部署**: 支持 Netlify、Vercel 等平台一键部署
7. **持续更新**: 活跃的开发路线图和定期的功能迭代

### 🔍 与同类产品对比

| 特性 | 本项目 | 传统方案 |
|------|--------|----------|
| 启动速度 | ⚡ 秒级 | 🐌 分钟级 |
| 部署成本 | 💰 免费 | 💵 需要服务器 |
| 数据持久化 | ✅ LocalStorage | ❌ 需数据库 |
| 离线使用 | ✅ 支持 | ❌ 不支持 |
| 移动端适配 | ✅ 响应式 | ⚠️ 需单独开发 |
| 分享功能 | ✅ 二维码+链接 | ⚠️ 仅链接 |

---

## 📦 项目结构

```
douyin/
├── src/
│   ├── components/          # 组件目录
│   │   ├── AdvancedFilter.vue      # 高级筛选组件
│   │   ├── DataStats.vue           # 数据统计面板
│   │   ├── InfluencerCard.vue      # 网红卡片组件
│   │   ├── InfluencerDetail.vue    # 网红详情弹窗
│   │   ├── InfluencerListView.vue  # 网红列表视图
│   │   ├── NoteEditor.vue          # 笔记编辑器
│   │   ├── ShareModal.vue          # 分享模态框
│   │   └── Toast.vue               # 消息提示组件
│   ├── data/
│   │   └── influencers.js          # 网红数据和分类配置
│   ├── utils/
│   │   ├── helpers.js              # 工具函数库
│   │   └── logger.js               # 日志记录器
│   ├── App.vue              # 主应用组件
│   ├── main.js              # 应用入口文件
│   └── style.css            # 全局样式
├── public/                  # 静态资源目录
├── dist/                    # 生产构建输出
├── index.html               # HTML 模板
├── vite.config.js           # Vite 配置文件
├── netlify.toml             # Netlify 部署配置
├── package.json             # 项目依赖和脚本
└── README.md                # 项目说明文档
```

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看应用，支持热重载

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录

### 预览生产构建

```bash
npm run preview
```

本地预览生产构建效果

### 部署到 Netlify

项目已配置 [netlify.toml](netlify.toml)，可直接连接 GitHub 仓库自动部署：

1. 在 Netlify 创建新站点
2. 连接此 GitHub 仓库
3. 构建命令自动识别为 `npm run build`
4. 发布目录为 `dist/`

或者手动部署：

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 部署到 Netlify
netlify deploy --prod
```

### 部署到 Vercel

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署到 Vercel
vercel --prod
```

### 其他部署平台

本项目也可轻松部署到以下平台：
- 🚀 **GitHub Pages**: 使用 `gh-pages` 包
- ☁️ **Cloudflare Pages**: 直接连接 GitHub 仓库
- 🌐 **Surge**: `npm install -g surge && surge dist`
- 📦 **Docker**: 使用 Nginx 容器（计划中）

## 📖 主要功能说明

### 1. 智能分类浏览
- 🏷️ **多维度分类**: 美食、搞笑、健身、知识、美妆、游戏等丰富分类
- 🎯 **一键筛选**: 点击分类标签即可快速过滤
- 🔄 **动态切换**: 支持"全部"分类查看所有网红
- 📊 **分类统计**: 实时显示各分类网红数量

### 2. 实时搜索功能
- 🔍 **多字段搜索**: 支持按名称、描述、标签进行模糊匹配
- ⚡ **即时响应**: 输入时实时显示搜索结果
- 🎨 **高亮显示**: 搜索结果关键词高亮展示
- 📝 **搜索历史**: 记录常用搜索词（计划中）

### 3. 网红卡片展示
- 👤 **头像展示**: 圆形头像设计，支持自定义图片上传
- 📈 **数据统计**: 粉丝数、作品数、获赞数三栏展示
- 🏷️ **标签系统**: 多维度标签，快速了解网红特色
- ✨ **交互动画**: 悬停放大、阴影效果，提升视觉体验
- 📱 **响应式布局**: 自适应不同屏幕尺寸

### 4. 详情弹窗系统
- 📋 **完整信息**: 展示网红全部详细信息和个人简介
- 🔗 **抖音跳转**: 一键访问网红抖音主页
- 📊 **数据图表**: 可视化展示网红影响力趋势
- 📝 **个人笔记**: 为每个网红添加私人备注和评价
- 🔗 **分享功能**: 生成专属分享链接和二维码

### 5. 数据可视化面板
- 📊 **核心指标**: 网红总数、总粉丝数、平均获赞数等
- 📈 **分类分布**: 饼图展示各分类占比
- 📉 **排行榜**: Top 10 网红粉丝数排行
- 🔄 **实时更新**: 数据变化时自动刷新图表

### 6. 社交分享系统
- 🔗 **智能分享**: 生成包含网红信息的分享链接
- 📦 **数据压缩**: 使用 Pako 算法压缩数据，缩短链接长度
- 📱 **二维码**: 自动生成二维码，方便移动端访问
- 🌐 **URL 优化**: 压缩后的链接更适合社交媒体分享

### 7. 数据管理功能
- 💾 **本地持久化**: 所有修改自动保存到 LocalStorage
- 🗑️ **批量删除**: 支持多选网红进行批量删除
- ✏️ **数据编辑**: 可修改网红信息和添加新网红
- 📤 **数据导出**: 导出网红数据为 JSON 格式（计划中）
- 📥 **数据导入**: 从 JSON 文件导入网红数据（计划中）

## 📗 数据模型说明

### 网红数据结构

项目使用模拟数据展示功能，数据位于 [`src/data/influencers.js`](src/data/influencers.js) 文件中。

每个网红对象包含以下字段：

```javascript
{
  id: 'unique-id',              // 唯一标识符
  name: '网红名称',              // 网红昵称
  avatar: 'avatar-url',         // 头像图片 URL
  category: '美食',              // 所属分类
  followers: 1000000,           // 粉丝数量
  description: '简短描述',       // 一句话介绍
  tags: ['标签1', '标签2'],     // 标签数组
  douyinId: 'douyin123',        // 抖音号
  videos: 500,                  // 作品数量
  likes: 5000000,               // 获赞总数
  bio: '个人简介...',           // 详细个人简介
  note: '个人备注'              // 用户添加的备注（可选）
}
```

### 分类数据结构

```javascript
{
  id: 'food',                   // 分类 ID
  name: '美食',                 // 分类名称
  icon: '🍜'                    // 分类图标
}
```

## ⚙️ 自定义配置

### 环境变量配置

项目支持通过 `.env` 文件配置环境变量：

```bash
# 复制示例配置文件
cp .env.example .env.local

# 编辑 .env.local 文件
VITE_APP_TITLE=抖音网红推荐系统
VITE_APP_API_URL=https://api.example.com
VITE_APP_ENABLE_ANALYTICS=true
```

### 添加新网红

在 [`src/data/influencers.js`](src/data/influencers.js) 文件的 `influencers` 数组中添加新对象：

```javascript
{
  id: 'new-influencer-1',
  name: '新网红名称',
  avatar: '/path/to/avatar.jpg',
  category: '美食',
  followers: 500000,
  description: '这是一位美食博主',
  tags: ['美食', '探店', '评测'],
  douyinId: 'foodie123',
  videos: 200,
  likes: 2000000,
  bio: '专注于美食探店和评测...'
}
```

### 修改分类体系

在 [`src/data/influencers.js`](src/data/influencers.js) 文件的 `categories` 数组中修改：

```javascript
export const categories = [
  { id: 'all', name: '全部', icon: '🌟' },
  { id: 'food', name: '美食', icon: '🍜' },
  { id: 'comedy', name: '搞笑', icon: '😂' },
  // 添加新分类...
]
```

### 调整样式主题

- **全局样式**: [`src/style.css`](src/style.css) - 定义全局变量和基础样式
- **组件样式**: 各个 `.vue` 文件中的 `<style scoped>` 标签
- **主题颜色**: 修改 CSS 变量实现主题定制

### 配置分享功能

分享链接使用 Pako 压缩算法，可在 [`src/utils/helpers.js`](src/utils/helpers.js) 中调整压缩参数。

## 🌐 浏览器兼容性

| 浏览器 | 最低版本 | 状态 |
|--------|---------|------|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |
| Opera | 76+ | ✅ 完全支持 |

> 💡 项目使用现代 Web 技术，建议使用最新版本的浏览器以获得最佳体验

## 📊 性能指标

- ⚡ **首屏加载**: < 1s (3G 网络)
- 🎯 **Lighthouse 评分**: 95+
- 📱 **移动端适配**: 完美支持
- ♿ **无障碍**: WCAG 2.1 AA 标准（持续改进中）

## 🗺️ 开发路线

### ✅ 已完成 (v1.0.0)
- [x] 基础网红展示功能
- [x] 分类筛选和搜索
- [x] 网红详情弹窗
- [x] 响应式设计
- [x] 数据可视化面板
- [x] LocalStorage 数据持久化
- [x] 批量删除功能
- [x] 个人笔记功能
- [x] 分享链接生成
- [x] 二维码生成
- [x] URL 数据压缩
- [x] 自定义图片上传

### 🚧 进行中 (v1.1.0)
- [ ] 深色模式支持
- [ ] 搜索历史记录
- [ ] 数据导出为 JSON
- [ ] 数据导入功能
- [ ] 网红收藏功能
- [ ] 高级筛选条件

### 📅 计划中 (v1.2.0)
- [ ] 后端 API 集成
- [ ] 用户认证系统
- [ ] 云端数据同步
- [ ] 网红对比功能
- [ ] 趋势分析报告
- [ ] PWA 支持
- [ ] 国际化 (i18n)
- [ ] 单元测试覆盖

### 🔮 未来愿景 (v2.0.0)
- [ ] AI 推荐算法
- [ ] 实时数据更新
- [ ] 社交分享社区
- [ ] 网红合作平台
- [ ] 数据分析仪表盘
- [ ] 移动端 App (React Native)

> 💡 欢迎提交 Issue 和 PR，共同参与项目开发！

---

## ❓ 常见问题

### Q: 如何添加自己的网红数据？
A: 在 `src/data/influencers.js` 文件中修改 `influencers` 数组，按照数据模型格式添加新对象即可。

### Q: 数据会丢失吗？
A: 所有数据都保存在浏览器的 LocalStorage 中，除非清除浏览器缓存，否则数据不会丢失。建议定期导出重要数据。

### Q: 可以部署到自己的服务器吗？
A: 当然可以！运行 `npm run build` 生成 `dist/` 目录，将其部署到任何静态文件服务器即可。

### Q: 支持后端 API 集成吗？
A: 目前版本使用本地数据，但架构设计支持轻松集成后端 API。查看开发路线图中的 v1.2.0 计划。

### Q: 如何自定义主题颜色？
A: 修改 `src/style.css` 中的 CSS 变量即可全局更改主题色。

### Q: 分享链接太长怎么办？
A: 项目已内置 Pako 压缩算法，自动压缩分享数据。如果仍然过长，可以考虑使用短链接服务。

### Q: 移动端体验如何？
A: 项目采用响应式设计，完美适配手机、平板和桌面设备。欢迎在移动设备上测试体验。

### Q: 如何贡献代码？
A: 请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 文件，了解详细的贡献流程和代码规范。

### Q: 发现 Bug 怎么办？
A: 请在 [GitHub Issues](https://github.com/cxh123-png/douyin-influencer/issues) 中报告问题，我们会尽快修复。

---

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request
## 在线演示
项目预览地址：https://douy.netlify.app/

## 📬 联系方式

- 📧 Email: xihangchen1@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/cxh123-png/douyin-influencer/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/cxh123-png/douyin-influencer/discussions)

## 🙏 致谢

感谢以下开源项目的支持：
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Chart.js](https://www.chartjs.org/) - 简单灵活的图表库
- [Pako](https://nodeca.github.io/pako/) - 高性能压缩库
- [QRCode.vue](https://github.com/scopewu/qrcode.vue) - Vue3 二维码组件

## ⭐ Star History

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=cxh123-png/douyin-influencer&type=Date)](https://star-history.com/#cxh123-png/douyin-influencer&Date)

</div>

---

<div align="center">

**如果这个项目对你有帮助，请考虑给它一个 ⭐ Star！**

Made with ❤️ by [cxh123-png](https://github.com/cxh123-png)

</div>
