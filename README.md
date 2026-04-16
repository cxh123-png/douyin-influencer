# 抖音网红推荐页面

一个基于 Vue3 + Vite 构建的抖音网红推荐展示平台，支持分类浏览、搜索和查看详情功能。

## 功能特性

- 🎯 **分类筛选**: 支持按美食、搞笑、健身、知识等多个分类浏览网红
- 🔍 **搜索功能**: 可根据网红名称、描述、标签进行搜索
- 📊 **详细信息**: 展示网红的粉丝数、作品数、获赞数等详细数据
- 🔗 **快速跳转**: 一键跳转到网红的抖音主页
- 📱 **响应式设计**: 完美适配桌面端和移动端
- ✨ **精美UI**: 现代化渐变设计，流畅的动画效果

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **开发语言**: JavaScript
- **样式方案**: CSS3 (Gradient, Flexbox, Grid)

## 项目结构

```
douyin/
├── src/
│   ├── components/          # 组件目录
│   │   ├── InfluencerCard.vue      # 网红卡片组件
│   │   └── InfluencerDetail.vue    # 网红详情弹窗
│   ├── data/
│   │   └── influencers.js          # 网红数据和分类数据
│   ├── App.vue              # 主应用组件
│   ├── main.js              # 入口文件
│   └── style.css            # 全局样式
├── index.html               # HTML模板
├── vite.config.js           # Vite配置
└── package.json             # 项目依赖
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 主要功能说明

### 1. 分类浏览
- 顶部导航栏提供多个分类选项
- 点击分类按钮即可筛选对应类型的网红
- 支持"全部"分类查看所有网红

### 2. 搜索功能
- 在搜索框输入关键词
- 支持按网红名称、描述、标签进行模糊搜索
- 实时显示搜索结果

### 3. 网红卡片
- 展示网红头像、名称、分类
- 显示简要介绍和标签
- 展示粉丝数、作品数、获赞数统计
- 悬停动画效果

### 4. 详情弹窗
- 点击卡片或"查看详情"按钮打开
- 展示完整的网红信息
- 包含个人简介和详细介绍
- 提供"访问抖音主页"按钮，点击可跳转到该网红的抖音页面

## 数据说明

项目使用模拟数据展示功能，数据位于 `src/data/influencers.js` 文件中。

每个网红对象包含以下字段：
- `id`: 唯一标识
- `name`: 网红名称
- `avatar`: 头像URL
- `category`: 分类
- `followers`: 粉丝数
- `description`: 简短描述
- `tags`: 标签数组
- `douyinId`: 抖音号
- `videos`: 作品数量
- `likes`: 获赞数
- `bio`: 个人简介

## 自定义配置

### 添加新网红

在 `src/data/influencers.js` 文件的 `influencers` 数组中添加新对象即可。

### 修改分类

在 `src/data/influencers.js` 文件的 `categories` 数组中修改分类列表。

### 调整样式

- 全局样式: `src/style.css`
- 组件样式: 各个 `.vue` 文件中的 `<style>` 标签

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎反馈！
