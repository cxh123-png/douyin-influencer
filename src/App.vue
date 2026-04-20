<template>
  <div class="app">
    <!-- 头部导航 -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">🎵</span>
          <h1>抖音网红推荐</h1>
        </div>
        <div class="header-actions">
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchKeyword" 
              placeholder="搜索网红..."
              @input="handleSearch"
            />
            <span class="search-icon">🔍</span>
          </div>
          <!-- 图标按钮组（PC端显示） -->
          <div class="icon-buttons-group">
            <button class="icon-btn view-toggle-btn" @click="toggleView" :title="currentView === 'card' ? '切换到列表视图' : '切换到卡片视图'">
              <span>{{ currentView === 'card' ? '📋' : '🎴' }}</span>
            </button>
            <button class="icon-btn export-btn" @click="handleExport('csv')" title="导出为CSV">
              <span>📤</span>
            </button>
            <button class="icon-btn advanced-filter-btn" @click="showAdvancedFilter = true" title="高级筛选">
              <span>🔍</span>
            </button>
            <button class="icon-btn stats-btn" @click="showDataStats = true" title="数据统计">
              <span>📊</span>
            </button>
            <button class="icon-btn import-btn" @click="showImportModal = true" title="批量导入">
              <span>📥</span>
            </button>
            <button class="icon-btn share-btn" @click="showShareModal = true" title="分享数据">
              <span>🔗</span>
            </button>
            <button class="icon-btn dark-mode-btn" @click="toggleDarkMode" :title="darkMode ? '切换到亮色模式' : '切换到深色模式'">
              <span>{{ darkMode ? '☀️' : '🌙' }}</span>
            </button>
            <button class="icon-btn reset-btn" @click="resetData" title="重置为初始数据">
              <span>🔄</span>
            </button>
          </div>
          <!-- 主要操作按钮 -->
          <div class="main-action-buttons">
            <button class="batch-mode-btn" @click="enterBatchMode" v-if="!showBatchToolbar">
              <span class="btn-icon">☑️</span>
              <span class="btn-text">批量管理</span>
            </button>
            <button class="manage-category-btn" @click="showCategoryManager = true">
              <span class="btn-icon">⚙️</span>
              <span class="btn-text">管理分类</span>
            </button>
            <button class="add-btn" @click="showAddForm = true">
              <span class="btn-icon">➕</span>
              <span class="btn-text">添加网红</span>
            </button>
          </div>
        </div>
      </div>
      <!-- 移动端图标按钮组 -->
      <div class="mobile-icon-buttons">
        <button class="mobile-icon-btn" @click="toggleView" title="切换视图">
          <span>{{ currentView === 'card' ? '📋' : '🎴' }}</span>
          <span class="btn-label">视图</span>
        </button>
        <button class="mobile-icon-btn" @click="handleExport('csv')" title="导出">
          <span>📤</span>
          <span class="btn-label">导出</span>
        </button>
        <button class="mobile-icon-btn" @click="showAdvancedFilter = true" title="筛选">
          <span>🔍</span>
          <span class="btn-label">筛选</span>
        </button>
        <button class="mobile-icon-btn" @click="showDataStats = true" title="统计">
          <span>📊</span>
          <span class="btn-label">统计</span>
        </button>
        <button class="mobile-icon-btn" @click="showImportModal = true" title="导入">
          <span>📥</span>
          <span class="btn-label">导入</span>
        </button>
        <button class="mobile-icon-btn" @click="showShareModal = true" title="分享">
          <span>🔗</span>
          <span class="btn-label">分享</span>
        </button>
        <button class="mobile-icon-btn" @click="toggleDarkMode" title="主题">
          <span>{{ darkMode ? '☀️' : '🌙' }}</span>
          <span class="btn-label">主题</span>
        </button>
        <button class="mobile-icon-btn" @click="resetData" title="重置">
          <span>🔄</span>
          <span class="btn-label">重置</span>
        </button>
      </div>
    </header>

    <!-- 分类筛选 -->
    <nav class="category-nav">
      <div class="category-list">
        <button
          v-for="category in categories"
          :key="category.id"
          :class="['category-btn', { active: selectedCategory === category.id }]"
          @click="selectCategory(category.id)"
        >
          {{ category.name }}
        </button>
      </div>
    </nav>

    <!-- 网红列表 -->
    <main class="main-content">
      <!-- 批量操作工具栏 -->
      <div v-if="showBatchToolbar" class="batch-toolbar">
        <div class="batch-info">
          <span class="selected-count">已选择 {{ selectedInfluencerIds.length }} 个网红</span>
        </div>
        <div class="batch-actions">
          <button class="select-all-btn" @click="toggleSelectAll">
            {{ isAllSelected ? '取消全选' : '全选' }}
          </button>
          <button class="batch-delete-btn" @click="batchDelete" :disabled="selectedInfluencerIds.length === 0">
            🗑️ 批量删除 ({{ selectedInfluencerIds.length }})
          </button>
          <button class="cancel-batch-btn" @click="cancelBatchMode">取消</button>
        </div>
      </div>
      
      <!-- 排序提示 -->
      <div v-if="sortField" class="sort-indicator">
        <span>📊 当前排序：{{ getSortFieldText() }} {{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
        <button @click="sortField = ''; sortOrder = 'asc'">清除</button>
      </div>
      
      <!-- 卡片视图 -->
      <div v-if="currentView === 'card'" class="influencer-grid">
        <InfluencerCard
          v-for="influencer in filteredInfluencers"
          :key="influencer.id"
          :influencer="influencer"
          :is-selected="selectedInfluencerIds.includes(influencer.id)"
          :show-checkbox="showBatchToolbar"
          @click="(influencerData) => handleCardClick(influencerData)"
          @delete="deleteInfluencer"
          @select="toggleSelection"
        />
      </div>
      
      <!-- 列表视图 -->
      <InfluencerListView
        v-else
        :influencers="filteredInfluencers"
        :selected-ids="selectedInfluencerIds"
        :show-checkbox="showBatchToolbar"
        :sort-field="sortField"
        :sort-order="sortOrder"
        @select="toggleSelection"
        @select-all="toggleSelectAll"
        @view="showDetail"
        @delete="deleteInfluencer"
        @sort="handleSort"
        @toggle-favorite="toggleFavorite"
      />
      
      <!-- 空状态提示 -->
      <div v-if="filteredInfluencers.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <p>没有找到相关网红</p>
        <p class="empty-hint">试试调整搜索条件或添加新网红</p>
      </div>
    </main>

    <!-- Toast 提示 -->
    <Toast ref="toast" />

    <!-- 详情弹窗 -->
    <InfluencerDetail
      v-if="selectedInfluencer"
      :influencer="selectedInfluencer"
      @close="closeDetail"
      @delete="deleteInfluencer"
      @edit="editInfluencer"
      @note="openNoteEditor"
    />

    <!-- 备注编辑器 -->
    <NoteEditor
      v-if="showNoteEditor"
      :influencer-name="influencers.find(i => i.id === editingNoteId)?.name || ''"
      :initial-note="noteContent"
      :last-updated="influencers.find(i => i.id === editingNoteId)?.noteUpdatedAt || ''"
      @close="showNoteEditor = false"
      @save="saveNote"
    />

    <!-- 高级筛选 -->
    <AdvancedFilter
      v-if="showAdvancedFilter"
      :initial-filters="advancedFilters"
      @close="showAdvancedFilter = false"
      @apply="applyAdvancedFilter"
    />

    <!-- 分享弹窗 -->
    <ShareModal
      v-if="showShareModal"
      :influencers="influencers"
      :categories="categories"
      @close="showShareModal = false"
    />

    <!-- 添加网红弹窗 -->
    <div v-if="showAddForm" class="add-modal-overlay" @click="closeAddForm">
      <div class="add-modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ isEditMode ? '编辑网红' : '添加新网红' }}</h2>
          <button class="close-btn" @click="closeAddForm">✕</button>
        </div>
        <form @submit.prevent="isEditMode ? updateInfluencer() : addInfluencer()" class="add-form">
          <div class="form-group">
            <label for="name">昵称 *</label>
            <input 
              id="name"
              v-model="newInfluencer.name" 
              type="text" 
              required 
              placeholder="请输入网红昵称"
            />
          </div>
          
          <div class="form-group">
            <label for="avatar">头像</label>
            <div class="avatar-upload-container">
              <!-- 图片预览 -->
              <div v-if="avatarPreview" class="avatar-preview">
                <img :src="avatarPreview" alt="头像预览" />
                <button type="button" class="remove-avatar-btn" @click="removeAvatar" title="移除图片">✕</button>
              </div>
              
              <!-- 上传区域 -->
              <div class="avatar-input-group">
                <input 
                  id="avatar"
                  v-model="newInfluencer.avatar" 
                  type="url" 
                  placeholder="或输入图片链接"
                  @input="handleAvatarUrlChange"
                />
                <div class="upload-divider">或</div>
                <label for="avatarUpload" class="upload-btn">
                  <span class="upload-icon">📷</span>
                  <span>{{ avatarPreview ? '更换图片' : '上传图片' }}</span>
                </label>
                <input 
                  id="avatarUpload"
                  type="file" 
                  accept="image/*"
                  @change="handleImageUpload"
                  style="display: none;"
                />
              </div>
              
              <p class="upload-hint">💡 支持 JPG、PNG、GIF 等格式，建议尺寸 300x300px</p>
            </div>
          </div>
          
          <div class="form-group">
            <label for="category">分类 *</label>
            <select id="category" v-model="newInfluencer.category" required>
              <option value="">请选择分类</option>
              <option v-for="cat in categories.filter(c => c.id !== 'all')" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="followers">粉丝数</label>
            <input 
              id="followers"
              v-model="newInfluencer.followers" 
              type="text" 
              placeholder="例如: 100万"
            />
          </div>
          
          <div class="form-group">
            <label for="description">简介 *</label>
            <textarea 
              id="description"
              v-model="newInfluencer.description" 
              required 
              rows="3"
              placeholder="请输入网红简介"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="tags">标签（用逗号分隔）</label>
            <input 
              id="tags"
              v-model="tagsInput" 
              type="text" 
              placeholder="例如: 美食, 探店, 测评"
            />
          </div>
          
          <div class="form-group">
            <label for="douyinId">抖音号</label>
            <input 
              id="douyinId"
              v-model="newInfluencer.douyinId" 
              type="text" 
              placeholder="请输入抖音号"
            />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="videos">作品数</label>
              <input 
                id="videos"
                v-model.number="newInfluencer.videos" 
                type="number" 
                placeholder="0"
              />
            </div>
            
            <div class="form-group">
              <label for="likes">获赞数</label>
              <input 
                id="likes"
                v-model="newInfluencer.likes" 
                type="text" 
                placeholder="例如: 1000万"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="bio">个人签名</label>
            <textarea 
              id="bio"
              v-model="newInfluencer.bio" 
              rows="2"
              placeholder="请输入个人签名"
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="closeAddForm">取消</button>
            <button type="submit" class="submit-btn">{{ isEditMode ? '保存' : '添加' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 分类管理弹窗 -->
    <div v-if="showCategoryManager" class="category-modal-overlay" @click="closeCategoryManager">
      <div class="category-modal-content" @click.stop>
        <div class="modal-header">
          <h2>管理分类</h2>
          <button class="close-btn" @click="closeCategoryManager">✕</button>
        </div>
        <div class="category-manager">
          <div class="category-list-manager">
            <div 
              v-for="category in categories.filter(c => c.id !== 'all')" 
              :key="category.id"
              class="category-item"
            >
              <div class="category-item-info">
                <span class="category-name">{{ category.name }}</span>
                <span class="category-count">({{ getCategoryCount(category.id) }}个网红)</span>
              </div>
              <div class="category-item-actions">
                <button class="edit-cat-btn" @click="startEditCategory(category)">✏️ 编辑</button>
                <button class="delete-cat-btn" @click="deleteCategory(category.id)">🗑️ 删除</button>
              </div>
            </div>
          </div>
          
          <div class="add-category-section">
            <h3>{{ editingCategory ? '编辑分类' : '添加新分类' }}</h3>
            <form @submit.prevent="editingCategory ? updateCategory() : addCategory()" class="add-category-form">
              <div class="form-group">
                <label for="catName">分类名称 *</label>
                <input 
                  id="catName"
                  v-model="newCategoryName" 
                  type="text" 
                  required 
                  placeholder="请输入分类名称"
                />
              </div>
              <div class="form-actions">
                <button type="button" class="cancel-btn" @click="cancelEditCategory">取消</button>
                <button type="submit" class="submit-btn">{{ editingCategory ? '保存' : '添加' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { influencers as initialInfluencers, categories as initialCategories } from './data/influencers.js'
import InfluencerCard from './components/InfluencerCard.vue'
import InfluencerDetail from './components/InfluencerDetail.vue'
import InfluencerListView from './components/InfluencerListView.vue'
import Toast from './components/Toast.vue'
import NoteEditor from './components/NoteEditor.vue'
import AdvancedFilter from './components/AdvancedFilter.vue'
import DataStats from './components/DataStats.vue'
import ShareModal from './components/ShareModal.vue'
import { parseCount, exportToCSV, exportToJSON } from './utils/helpers.js'

const searchKeyword = ref('')
const selectedCategory = ref('all')
const selectedInfluencer = ref(null)
const showAddForm = ref(false)
const showCategoryManager = ref(false)
const showBatchToolbar = ref(false)
const tagsInput = ref('')
const isEditMode = ref(false)
const editingCategoryId = ref(null)
const newCategoryName = ref('')
const editingCategory = ref(null)
const selectedInfluencerIds = ref([])

// 新增功能状态
const currentView = ref('card') // 'card' | 'list'
const sortField = ref('') // 'name' | 'followers' | 'videos' | 'likes'
const sortOrder = ref('asc') // 'asc' | 'desc'
const toast = ref(null)
const darkMode = ref(false)
const showNoteEditor = ref(false)
const editingNoteId = ref(null)
const noteContent = ref('')
const showAdvancedFilter = ref(false)
const advancedFilters = ref({})
const showDataStats = ref(false)
const showImportModal = ref(false)
const showShareModal = ref(false) // 分享弹窗

// 从 localStorage 加载数据，如果没有则使用初始数据
const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch (error) {
    console.error(`读取 ${key} 失败:`, error)
    return defaultValue
  }
}

// 保存数据到 localStorage
const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`保存 ${key} 失败:`, error)
  }
}

// 使用响应式数组存储网红数据和分类数据
const influencers = ref(loadFromStorage('douyin_influencers', initialInfluencers))
const categories = ref(loadFromStorage('douyin_categories', initialCategories))

// 从 localStorage 加载深色模式和备注数据
darkMode.value = loadFromStorage('douyin_dark_mode', false)

// 监听数据变化，自动保存到 localStorage
watch(influencers, (newValue) => {
  saveToStorage('douyin_influencers', newValue)
}, { deep: true })

watch(categories, (newValue) => {
  saveToStorage('douyin_categories', newValue)
}, { deep: true })

// 监听深色模式变化
watch(darkMode, (newValue) => {
  saveToStorage('douyin_dark_mode', newValue)
  if (newValue) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }
})

// 新网红表单数据
const newInfluencer = ref({
  name: '',
  avatar: '',
  category: '',
  followers: '',
  description: '',
  tags: [],
  douyinId: '',
  videos: 0,
  likes: '',
  bio: ''
})

// 筛选和排序网红列表
const filteredInfluencers = computed(() => {
  let result = influencers.value
  
  // 按分类筛选
  if (selectedCategory.value !== 'all') {
    result = result.filter(item => item.category === selectedCategory.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(item => 
      item.name.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.tags.some(tag => tag.toLowerCase().includes(keyword))
    )
  }
  
  // 应用高级筛选
  if (Object.keys(advancedFilters.value).length > 0) {
    const filters = advancedFilters.value
    
    // 粉丝数范围
    if (filters.minFollowers !== null && filters.minFollowers !== undefined) {
      result = result.filter(item => parseCount(item.followers) >= filters.minFollowers)
    }
    if (filters.maxFollowers !== null && filters.maxFollowers !== undefined) {
      result = result.filter(item => parseCount(item.followers) <= filters.maxFollowers)
    }
    
    // 获赞数范围
    if (filters.minLikes !== null && filters.minLikes !== undefined) {
      result = result.filter(item => parseCount(item.likes) >= filters.minLikes)
    }
    if (filters.maxLikes !== null && filters.maxLikes !== undefined) {
      result = result.filter(item => parseCount(item.likes) <= filters.maxLikes)
    }
    
    // 作品数范围
    if (filters.minVideos !== null && filters.minVideos !== undefined) {
      result = result.filter(item => (item.videos || 0) >= filters.minVideos)
    }
    if (filters.maxVideos !== null && filters.maxVideos !== undefined) {
      result = result.filter(item => (item.videos || 0) <= filters.maxVideos)
    }
    
    // 标签筛选
    if (filters.tagFilter && filters.tagFilter.trim()) {
      const filterTags = filters.tagFilter.split(',').map(t => t.trim().toLowerCase()).filter(t => t)
      if (filterTags.length > 0) {
        result = result.filter(item => {
          const itemTags = item.tags.map(t => t.toLowerCase())
          if (filters.tagLogic === 'AND') {
            // 包含全部标签
            return filterTags.every(ft => itemTags.some(it => it.includes(ft)))
          } else {
            // 包含任一标签
            return filterTags.some(ft => itemTags.some(it => it.includes(ft)))
          }
        })
      }
    }
    
    // 仅显示收藏
    if (filters.onlyFavorite) {
      result = result.filter(item => item.isFavorite)
    }
    
    // 仅显示有备注
    if (filters.hasNote) {
      result = result.filter(item => item.note && item.note.trim())
    }
  }
  
  // 按条件排序
  if (sortField.value) {
    result = [...result].sort((a, b) => {
      let valueA, valueB
      
      switch(sortField.value) {
        case 'name':
          valueA = a.name || ''
          valueB = b.name || ''
          break
        case 'followers':
          valueA = parseCount(a.followers)
          valueB = parseCount(b.followers)
          break
        case 'videos':
          valueA = a.videos || 0
          valueB = b.videos || 0
          break
        case 'likes':
          valueA = parseCount(a.likes)
          valueB = parseCount(b.likes)
          break
        default:
          return 0
      }
      
      if (valueA < valueB) return sortOrder.value === 'asc' ? -1 : 1
      if (valueA > valueB) return sortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }
  
  return result
})

// 计算是否全选
const isAllSelected = computed(() => {
  if (filteredInfluencers.value.length === 0) return false
  return filteredInfluencers.value.every(item => selectedInfluencerIds.value.includes(item.id))
})

// 选择分类
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  // 切换分类时清空选择
  selectedInfluencerIds.value = []
}

// 搜索处理
const handleSearch = () => {
  // 搜索逻辑已在computed中实现
}

// 显示详情
const showDetail = (influencer) => {
  console.log('显示详情:', influencer)
  selectedInfluencer.value = influencer
  console.log('selectedInfluencer:', selectedInfluencer.value)
}

// 处理卡片点击
const handleCardClick = (influencer) => {
  if (showBatchToolbar.value) {
    // 批量模式下，点击卡片切换选择状态
    toggleSelection(influencer.id)
  } else {
    // 正常模式下，显示详情
    showDetail(influencer)
  }
}

// 关闭详情
const closeDetail = () => {
  selectedInfluencer.value = null
}

// 关闭添加表单
const closeAddForm = () => {
  showAddForm.value = false
  isEditMode.value = false
  resetForm()
}

// 重置表单
const resetForm = () => {
  newInfluencer.value = {
    name: '',
    avatar: '',
    category: '',
    followers: '',
    description: '',
    tags: [],
    douyinId: '',
    videos: 0,
    likes: '',
    bio: ''
  }
  tagsInput.value = ''
  avatarPreview.value = '' // 清空头像预览
}

// 添加网红
const addInfluencer = () => {
  // 处理标签
  const tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
  
  // 创建新网红对象
  const influencer = {
    ...newInfluencer.value,
    id: Date.now(), // 使用时间戳作为唯一ID
    tags: tags.length > 0 ? tags : [newInfluencer.value.category],
    avatar: newInfluencer.value.avatar || 'https://p3-pc.douyinpic.com/img/aweme-avatar/default~c5_300x300.jpeg',
    videos: newInfluencer.value.videos || 0
  }
  
  // 添加到列表
  influencers.value.push(influencer)
  
  // 关闭表单并重置
  closeAddForm()
  
  // 显示成功提示
  if (toast.value) toast.value.success('添加成功！')
}

// 删除网红
const deleteInfluencer = (id) => {
  const index = influencers.value.findIndex(item => item.id === id)
  if (index !== -1) {
    influencers.value.splice(index, 1)
    if (toast.value) toast.value.success('删除成功！')
  }
}

// 编辑网红（从详情页）
const editInfluencer = (influencer) => {
  // 填充表单数据
  newInfluencer.value = { ...influencer }
  tagsInput.value = influencer.tags.join(', ')
  isEditMode.value = true
  showAddForm.value = true
  // 设置头像预览
  avatarPreview.value = influencer.avatar || ''
  closeDetail()
}

// 处理图片上传
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    if (toast.value) toast.value.error('请选择图片文件！')
    return
  }
  
  // 验证文件大小（限制为 5MB）
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    if (toast.value) toast.value.error('图片大小不能超过 5MB！')
    return
  }
  
  // 读取文件并转换为 Base64
  const reader = new FileReader()
  reader.onload = (e) => {
    const base64 = e.target.result
    newInfluencer.value.avatar = base64
    avatarPreview.value = base64
    if (toast.value) toast.value.success('图片上传成功！')
  }
  reader.onerror = () => {
    if (toast.value) toast.value.error('图片读取失败，请重试！')
  }
  reader.readAsDataURL(file)
  
  // 清空 input，允许重复选择同一文件
  event.target.value = ''
}

// 处理头像 URL 变化
const handleAvatarUrlChange = () => {
  avatarPreview.value = newInfluencer.value.avatar
}

// 移除头像
const removeAvatar = () => {
  newInfluencer.value.avatar = ''
  avatarPreview.value = ''
}

// 更新网红
const updateInfluencer = () => {
  // 处理标签
  const tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
  
  // 查找并更新
  const index = influencers.value.findIndex(item => item.id === newInfluencer.value.id)
  if (index !== -1) {
    influencers.value[index] = {
      ...newInfluencer.value,
      tags: tags.length > 0 ? tags : [newInfluencer.value.category]
    }
    
    // 关闭表单并重置
    closeAddForm()
    
    // 显示成功提示
    if (toast.value) toast.value.success('更新成功！')
  }
}

// 获取分类下的网红数量
const getCategoryCount = (categoryId) => {
  return influencers.value.filter(item => item.category === categoryId).length
}

// 分类管理相关函数
const closeCategoryManager = () => {
  showCategoryManager.value = false
  cancelEditCategory()
}

const addCategory = () => {
  // 检查是否已存在
  if (categories.value.some(cat => cat.id === newCategoryName.value)) {
    alert('❌ 该分类已存在！')
    return
  }
  
  categories.value.push({
    id: newCategoryName.value,
    name: newCategoryName.value
  })
  
  newCategoryName.value = ''
  alert('✅ 分类添加成功！')
}

const startEditCategory = (category) => {
  editingCategory.value = category
  newCategoryName.value = category.name
}

const updateCategory = () => {
  if (!editingCategory.value) return
  
  const oldId = editingCategory.value.id
  const newId = newCategoryName.value
  
  // 检查新名称是否与其他分类冲突
  if (categories.value.some(cat => cat.id === newId && cat.id !== oldId)) {
    alert('❌ 该分类名称已存在！')
    return
  }
  
  // 更新分类
  const index = categories.value.findIndex(cat => cat.id === oldId)
  if (index !== -1) {
    categories.value[index] = {
      id: newId,
      name: newId
    }
    
    // 更新所有使用该分类的网红
    influencers.value.forEach(influencer => {
      if (influencer.category === oldId) {
        influencer.category = newId
      }
    })
    
    // 如果当前选中的是被修改的分类，更新选中状态
    if (selectedCategory.value === oldId) {
      selectedCategory.value = newId
    }
    
    cancelEditCategory()
    alert('✅ 分类更新成功！')
  }
}

const deleteCategory = (categoryId) => {
  // 检查是否有网红使用该分类
  const count = getCategoryCount(categoryId)
  if (count > 0) {
    if (!confirm(`该分类下有 ${count} 个网红，删除后这些网红的分类将变为空。确定要删除吗？`)) {
      return
    }
  } else {
    if (!confirm('确定要删除这个分类吗？')) {
      return
    }
  }
  
  // 删除分类
  const index = categories.value.findIndex(cat => cat.id === categoryId)
  if (index !== -1) {
    categories.value.splice(index, 1)
    
    // 如果当前选中的是被删除的分类，切换到全部
    if (selectedCategory.value === categoryId) {
      selectedCategory.value = 'all'
    }
    
    alert('✅ 分类删除成功！')
  }
}

const cancelEditCategory = () => {
  editingCategory.value = null
  newCategoryName.value = ''
}

// 重置数据为初始状态
const resetData = () => {
  if (confirm('⚠️ 确定要重置所有数据吗？这将恢复为初始的网红和分类数据，所有自定义修改都将丢失！')) {
    // 清除 localStorage
    localStorage.removeItem('douyin_influencers')
    localStorage.removeItem('douyin_categories')
    
    // 重置为初始数据
    influencers.value = [...initialInfluencers]
    categories.value = [...initialCategories]
    
    // 重置选中状态
    selectedCategory.value = 'all'
    selectedInfluencer.value = null
    
    alert('✅ 数据已重置为初始状态！')
  }
}

// 批量管理相关函数
const enterBatchMode = () => {
  showBatchToolbar.value = true
  selectedInfluencerIds.value = []
}

const cancelBatchMode = () => {
  showBatchToolbar.value = false
  selectedInfluencerIds.value = []
}

const toggleSelection = (id) => {
  const index = selectedInfluencerIds.value.indexOf(id)
  if (index > -1) {
    selectedInfluencerIds.value.splice(index, 1)
  } else {
    selectedInfluencerIds.value.push(id)
  }
}

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    // 取消全选
    selectedInfluencerIds.value = []
  } else {
    // 全选当前筛选结果
    selectedInfluencerIds.value = filteredInfluencers.value.map(item => item.id)
  }
}

const batchDelete = () => {
  if (selectedInfluencerIds.value.length === 0) {
    if (toast.value) toast.value.warning('请先选择要删除的网红！')
    return
  }
  
  if (confirm(`⚠️ 确定要删除选中的 ${selectedInfluencerIds.value.length} 个网红吗？此操作不可恢复！`)) {
    // 过滤掉被选中的网红
    influencers.value = influencers.value.filter(
      item => !selectedInfluencerIds.value.includes(item.id)
    )
    
    // 清空选择
    selectedInfluencerIds.value = []
    
    if (toast.value) toast.value.success('批量删除成功！')
  }
}

// 新增功能函数
// 切换视图
const toggleView = () => {
  currentView.value = currentView.value === 'card' ? 'list' : 'card'
}

// 排序处理
const handleSort = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortOrder.value = 'asc'
  }
}

// 切换收藏
const toggleFavorite = (id) => {
  const influencer = influencers.value.find(item => item.id === id)
  if (influencer) {
    influencer.isFavorite = !influencer.isFavorite
    if (toast.value) {
      toast.value.success(influencer.isFavorite ? '已收藏' : '已取消收藏')
    }
  }
}

// 导出数据
const handleExport = (format = 'csv') => {
  const dataToExport = filteredInfluencers.value
  if (dataToExport.length === 0) {
    if (toast.value) toast.value.warning('没有数据可导出！')
    return
  }
  
  const filename = `influencers_${new Date().getTime()}`
  if (format === 'csv') {
    exportToCSV(dataToExport, `${filename}.csv`)
    if (toast.value) toast.value.success(`已导出 ${dataToExport.length} 条数据为 CSV 格式`)
  } else if (format === 'json') {
    exportToJSON(dataToExport, `${filename}.json`)
    if (toast.value) toast.value.success(`已导出 ${dataToExport.length} 条数据为 JSON 格式`)
  }
}

// 获取排序字段文本
const getSortFieldText = () => {
  const fieldMap = {
    'name': '名称',
    'followers': '粉丝数',
    'videos': '作品数',
    'likes': '获赞数'
  }
  return fieldMap[sortField.value] || ''
}

// 深色模式切换
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}

// 备注功能
const openNoteEditor = (influencer) => {
  editingNoteId.value = influencer.id
  noteContent.value = influencer.note || ''
  showNoteEditor.value = true
  closeDetail()
}

const saveNote = (note) => {
  const influencer = influencers.value.find(item => item.id === editingNoteId.value)
  if (influencer) {
    influencer.note = note
    influencer.noteUpdatedAt = new Date().toLocaleString('zh-CN')
    if (toast.value) toast.value.success('备注保存成功！')
  }
  showNoteEditor.value = false
  editingNoteId.value = null
  noteContent.value = ''
}

// 快捷键支持
const handleKeyDown = (event) => {
  // Ctrl/Cmd + F: 聚焦搜索框
  if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
    event.preventDefault()
    const searchInput = document.querySelector('.search-box input')
    if (searchInput) searchInput.focus()
  }
  
  // Ctrl/Cmd + A: 全选（在批量模式下）
  if ((event.ctrlKey || event.metaKey) && event.key === 'a' && showBatchToolbar.value) {
    event.preventDefault()
    toggleSelectAll()
  }
  
  // Delete: 批量删除（在批量模式下）
  if (event.key === 'Delete' && showBatchToolbar.value && selectedInfluencerIds.value.length > 0) {
    event.preventDefault()
    batchDelete()
  }
  
  // Escape: 关闭弹窗
  if (event.key === 'Escape') {
    if (showNoteEditor.value) {
      showNoteEditor.value = false
    } else if (showAddForm.value) {
      closeAddForm()
    } else if (showCategoryManager.value) {
      closeCategoryManager()
    } else if (selectedInfluencer.value) {
      closeDetail()
    }
  }
  
  // V: 切换视图
  if (event.key === 'v' && !event.ctrlKey && !event.metaKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    toggleView()
  }
}

// 组件挂载时添加快捷键监听
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  
  // 检查 URL 中是否有分享数据
  loadSharedData()
})

// 加载分享数据
const loadSharedData = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const shareData = urlParams.get('data')
    
    if (shareData) {
      // 解码数据
      const jsonString = decodeURIComponent(escape(atob(shareData)))
      const data = JSON.parse(jsonString)
      
      // 验证数据格式
      if (data.influencers && Array.isArray(data.influencers)) {
        if (confirm(`📥 检测到分享数据！\n\n包含 ${data.influencers.length} 个网红\n\n是否导入这些数据？`)) {
          // 导入网红数据
          influencers.value = [...data.influencers]
          
          // 如果有分类数据，也导入
          if (data.categories && Array.isArray(data.categories)) {
            // 保留"全部"分类，添加其他分类
            const allCategory = categories.value.find(c => c.id === 'all')
            categories.value = [allCategory, ...data.categories]
          }
          
          // 清除 URL 中的分享参数
          window.history.replaceState({}, document.title, window.location.pathname)
          
          if (toast.value) {
            toast.value.success(`成功导入 ${data.influencers.length} 个网红！`)
          }
        } else {
          // 用户取消，清除 URL 参数
          window.history.replaceState({}, document.title, window.location.pathname)
        }
      }
    }
  } catch (error) {
    console.error('加载分享数据失败:', error)
    // 如果解析失败，清除 URL 参数
    window.history.replaceState({}, document.title, window.location.pathname)
  }
}

// 高级筛选
const applyAdvancedFilter = (filters) => {
  advancedFilters.value = filters
  showAdvancedFilter.value = false
  
  if (toast.value) toast.value.success('筛选条件已应用！')
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: background 0.3s;
}

.app.dark-mode {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 2rem;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  justify-content: flex-end;
  flex-wrap: wrap;
}

/* PC端图标按钮组 */
.icon-buttons-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 主要操作按钮组 */
.main-action-buttons {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.search-box {
  position: relative;
  max-width: 400px;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.add-btn:active {
  transform: translateY(0);
}

.manage-category-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.manage-category-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
}

.manage-category-btn:active {
  transform: translateY(0);
}

/* 移动端图标按钮组 */
.mobile-icon-buttons {
  display: none;
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-top: 1px solid #e0e0e0;
  overflow-x: auto;
  scrollbar-width: none;
}

.mobile-icon-buttons::-webkit-scrollbar {
  display: none;
}

.mobile-icon-btn {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  min-width: 60px;
  padding: 0.5rem;
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s;
  color: #667eea;
  white-space: nowrap;
}

.mobile-icon-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
}

.mobile-icon-btn:active {
  transform: scale(0.9);
}

.btn-label {
  font-size: 0.7rem;
  color: #666;
}

/* 按钮文本 */
.btn-text {
  display: inline;
}

.btn-icon {
  display: inline;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
}

/* 图标按钮颜色 - 蓝色系列 */
.view-toggle-btn,
.export-btn,
.advanced-filter-btn,
.stats-btn,
.import-btn,
.share-btn,
.dark-mode-btn {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  box-shadow: 0 2px 8px rgba(79, 172, 254, 0.3);
}

.view-toggle-btn:hover,
.export-btn:hover,
.advanced-filter-btn:hover,
.stats-btn:hover,
.import-btn:hover,
.share-btn:hover,
.dark-mode-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.5);
}

.view-toggle-btn:active,
.export-btn:active,
.advanced-filter-btn:active,
.stats-btn:active,
.import-btn:active,
.share-btn:active,
.dark-mode-btn:active {
  transform: scale(0.95);
}

/* 重置按钮 - 特殊样式 */
.reset-btn {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  box-shadow: 0 2px 8px rgba(250, 112, 154, 0.3);
}

.reset-btn:hover {
  transform: rotate(180deg) scale(1.1);
  box-shadow: 0 4px 12px rgba(250, 112, 154, 0.5);
}

.reset-btn:active {
  transform: rotate(180deg) scale(0.95);
}

.batch-mode-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.batch-mode-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.4);
}

.batch-mode-btn:active {
  transform: translateY(0);
}

/* 排序指示器样式 */
.sort-indicator {
  background: white;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sort-indicator span {
  color: #667eea;
  font-weight: 600;
}

.sort-indicator button {
  padding: 0.4rem 1rem;
  background: #f0f0f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.sort-indicator button:hover {
  background: #e0e0e0;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
}

.category-nav {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  margin: 1rem 0;
}

.category-list {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.category-list::-webkit-scrollbar {
  display: none;
}

.category-btn {
  padding: 0.6rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 25px;
  background: white;
  color: #666;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  font-weight: 500;
}

.category-btn:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.category-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.influencer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: white;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state p {
  margin: 0.5rem 0;
  font-size: 1.2rem;
}

.empty-hint {
  font-size: 0.95rem !important;
  opacity: 0.8;
}

/* 添加网红模态框样式 */
.add-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.add-modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  transition: color 0.3s;
  padding: 0.5rem;
}

.close-btn:hover {
  color: #333;
}

.add-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
  font-size: 0.95rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* 头像上传容器 */
.avatar-upload-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.avatar-preview {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #667eea;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-avatar-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 71, 87, 0.9);
  color: white;
  border: 2px solid white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  padding: 0;
}

.remove-avatar-btn:hover {
  background: #ff3344;
  transform: scale(1.1);
}

.avatar-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.upload-divider {
  text-align: center;
  color: #999;
  font-size: 0.9rem;
  position: relative;
}

.upload-divider::before,
.upload-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background: #e0e0e0;
}

.upload-divider::before {
  left: 0;
}

.upload-divider::after {
  right: 0;
}

.upload-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: 2px dashed transparent;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.upload-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  border-color: #667eea;
}

.upload-btn:active {
  transform: translateY(0);
}

.upload-icon {
  font-size: 1.3rem;
}

.upload-hint {
  margin: 0;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #666;
  text-align: center;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-btn,
.submit-btn {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn {
  background: #f0f0f0;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

/* 分类管理模态框样式 */
.category-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.category-modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

.category-manager {
  padding: 1.5rem;
}

.category-list-manager {
  margin-bottom: 2rem;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 0.8rem;
  transition: all 0.3s;
}

.category-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.category-item-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.category-name {
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
}

.category-count {
  color: #999;
  font-size: 0.9rem;
}

.category-item-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-cat-btn,
.delete-cat-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.edit-cat-btn {
  background: #667eea;
  color: white;
}

.edit-cat-btn:hover {
  background: #5568d3;
  transform: scale(1.05);
}

.delete-cat-btn {
  background: #ff4757;
  color: white;
}

.delete-cat-btn:hover {
  background: #ff3344;
  transform: scale(1.05);
}

.add-category-section {
  padding-top: 1.5rem;
  border-top: 2px solid #e0e0e0;
}

.add-category-section h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.2rem;
}

.add-category-form {
  max-width: 500px;
}

/* 批量操作工具栏样式 */
.batch-toolbar {
  background: white;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.batch-info {
  display: flex;
  align-items: center;
}

.selected-count {
  font-size: 1.1rem;
  font-weight: 600;
  color: #667eea;
}

.batch-actions {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}

.select-all-btn,
.batch-delete-btn,
.cancel-batch-btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.select-all-btn {
  background: #667eea;
  color: white;
}

.select-all-btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.batch-delete-btn {
  background: linear-gradient(135deg, #ff4757 0%, #ff3344 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
}

.batch-delete-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
}

.batch-delete-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cancel-batch-btn {
  background: #f0f0f0;
  color: #666;
}

.cancel-batch-btn:hover {
  background: #e0e0e0;
}

@media (max-width: 768px) {
  /* 头部布局优化 */
  .header-content {
    flex-direction: column;
    padding: 0.8rem 1rem;
    gap: 0.8rem;
  }
  
  /* Logo缩小 */
  .logo h1 {
    font-size: 1.2rem;
  }
  
  .logo-icon {
    font-size: 1.5rem;
  }
  
  /* 搜索框全宽 */
  .header-actions {
    width: 100%;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .search-box {
    max-width: 100%;
    width: 100%;
  }
  
  /* 隐藏PC端图标按钮组 */
  .icon-buttons-group {
    display: none;
  }
  
  /* 显示移动端图标按钮组 */
  .mobile-icon-buttons {
    display: flex;
    justify-content: space-around;
    padding: 0.5rem;
  }
  
  /* 主要操作按钮水平排列 */
  .main-action-buttons {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 0.3rem;
  }
  
  .main-action-buttons::-webkit-scrollbar {
    display: none;
  }
  
  /* 按钮只显示图标，文字隐藏 */
  .btn-text {
    display: none;
  }
  
  .batch-mode-btn,
  .manage-category-btn,
  .add-btn {
    flex: 1;
    min-width: 80px;
    justify-content: center;
    padding: 0.8rem 0.5rem;
    font-size: 1.3rem;
  }
  
  /* 卡片网格单列 */
  .influencer-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  /* 内容区padding减小 */
  .main-content {
    padding: 0.8rem;
  }
  
  /* 表单单列 */
  .form-row {
    grid-template-columns: 1fr;
  }
  
  /* 分类项纵向 */
  .category-item {
    flex-direction: column;
    gap: 0.8rem;
    align-items: flex-start;
  }
  
  .category-item-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  /* 批量工具栏优化 */
  .batch-toolbar {
    flex-direction: column;
    gap: 0.8rem;
    padding: 0.8rem;
  }
  
  .batch-actions {
    width: 100%;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .select-all-btn,
  .batch-delete-btn,
  .cancel-batch-btn {
    flex: 1;
    min-width: 80px;
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
  }
  
  /* 弹窗优化 */
  .add-modal-content,
  .category-modal-content {
    width: 95%;
    max-height: 95vh;
    margin: 1rem;
  }
  
  /* 头像预览移动端调整 */
  .avatar-preview {
    width: 120px;
    height: 120px;
  }
  
  .upload-btn {
    padding: 0.7rem 1rem;
    font-size: 0.95rem;
  }
  
  /* 分类导航 */
  .category-list {
    padding: 0 0.8rem;
  }
  
  .category-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}
</style>
