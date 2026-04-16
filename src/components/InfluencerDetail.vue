<template>
  <div class="detail-overlay" @click="handleOverlayClick">
    <div class="detail-modal" @click.stop>
      <button class="close-btn" @click="handleClose">✕</button>
      
      <div class="modal-content">
        <div class="profile-header">
          <img :src="avatarUrl" :alt="props.influencer.name" class="profile-avatar" @error="handleImageError" />
          <div class="profile-info">
            <h2 class="profile-name">{{ props.influencer.name }}</h2>
            <span class="profile-category">{{ props.influencer.category }}</span>
            <p class="profile-id">抖音号: {{ props.influencer.douyinId }}</p>
          </div>
        </div>
        
        <div class="profile-stats">
          <div class="profile-stat">
            <div class="profile-stat-value">{{ props.influencer.followers }}</div>
            <div class="profile-stat-label">粉丝</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">{{ props.influencer.videos }}</div>
            <div class="profile-stat-label">作品</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-value">{{ props.influencer.likes }}</div>
            <div class="profile-stat-label">获赞</div>
          </div>
        </div>
        
        <div class="profile-bio">
          <h3>个人简介</h3>
          <p>{{ props.influencer.bio }}</p>
        </div>
        
        <div class="profile-description">
          <h3>详细介绍</h3>
          <p>{{ props.influencer.description }}</p>
        </div>
        
        <div class="profile-tags">
          <h3>标签</h3>
          <div class="tags-list">
            <span v-for="tag in props.influencer.tags" :key="tag" class="profile-tag">
              {{ tag }}
            </span>
          </div>
        </div>
        
        <div class="action-buttons">
          <button 
            @click="editInfluencer"
            class="edit-btn"
          >
            <span class="btn-icon">✏️</span>
            编辑信息
          </button>
          
          <button 
            @click="openNote"
            class="note-btn"
          >
            <span class="btn-icon">📝</span>
            备注
          </button>
          
          <button 
            @click="copyDouyinId"
            class="copy-btn"
          >
            <span class="btn-icon">📋</span>
            {{ copied ? '已复制' : '复制抖音号' }}
          </button>
          
          <button 
            @click="openDouyin"
            class="douyin-link-btn"
          >
            <span class="btn-icon">🎵</span>
            {{ isMobile ? '打开抖音APP' : '复制并打开抖音' }}
          </button>
          
          <button 
            @click="handleDelete"
            class="delete-detail-btn"
          >
            <span class="btn-icon">🗑️</span>
            删除网红
          </button>
          
          <div class="tip-text" v-if="!isMobile">
            💡 提示：点击按钮会自动复制抖音号并跳转到抖音网页版搜索页
          </div>
          <div class="tip-text" v-else>
            💡 提示：点击按钮将尝试打开抖音APP，如果未安装请手动搜索抖音号
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  influencer: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'delete', 'edit', 'note'])
const copied = ref(false)

// 检测是否为移动设备
const isMobile = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
})

// 使用计算属性获取默认头像
const avatarUrl = computed(() => {
  return props.influencer.avatar || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iNjAiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iNDgiPvCfkY08L3RleHQ+PC9zdmc+'
})

const handleClose = () => {
  emit('close')
}

const handleOverlayClick = () => {
  emit('close')
}

// 处理图片加载错误
const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iNjAiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iNDgiPvCfkY08L3RleHQ+PC9zdmc+'
}

// 打开抖音
const openDouyin = async () => {
  if (isMobile.value) {
    // 移动端：尝试使用 Scheme 协议唤起 APP
    const schemeUrl = `snssdk1128://user/profile/${encodeURIComponent(props.influencer.douyinId)}`
    const universalUrl = `https://www.douyin.com/search/${encodeURIComponent(props.influencer.douyinId)}?type=user`
    
    // 先尝试打开 Scheme
    window.location.href = schemeUrl
    
    // 延迟后如果还没跳转，打开网页版
    setTimeout(() => {
      window.location.href = universalUrl
    }, 2000)
  } else {
    // 桌面端：先复制抖音号，然后跳转到抖音搜索页
    try {
      await navigator.clipboard.writeText(props.influencer.douyinId)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
      
      // 跳转到抖音搜索页
      window.open(
        `https://www.douyin.com/search/${encodeURIComponent(props.influencer.douyinId)}?type=user`,
        '_blank'
      )
    } catch (err) {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = props.influencer.douyinId
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      
      window.open(
        `https://www.douyin.com/search/${encodeURIComponent(props.influencer.douyinId)}?type=user`,
        '_blank'
      )
    }
  }
}

// 复制抖音号
const copyDouyinId = async () => {
  try {
    await navigator.clipboard.writeText(props.influencer.douyinId)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    // 降级方案：使用传统方法复制
    const textArea = document.createElement('textarea')
    textArea.value = props.influencer.douyinId
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      alert('复制失败，请手动复制抖音号：' + props.influencer.douyinId)
    }
    document.body.removeChild(textArea)
  }
}

// 删除网红
const handleDelete = () => {
  if (confirm(`确定要删除网红 "${props.influencer.name}" 吗？此操作不可恢复！`)) {
    emit('delete', props.influencer.id)
    emit('close')
  }
}

// 编辑网红
const editInfluencer = () => {
  emit('edit', props.influencer)
}

// 打开备注
const openNote = () => {
  emit('note', props.influencer)
}
</script>

<style scoped>
.detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.detail-modal {
  background: white;
  border-radius: 20px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.2);
  transform: rotate(90deg);
}

.modal-content {
  padding: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 5px solid #667eea;
  object-fit: cover;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.profile-info {
  flex: 1;
}

.profile-name {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  color: #333;
}

.profile-category {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.profile-id {
  margin: 0;
  color: #999;
  font-size: 0.9rem;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.profile-stat {
  text-align: center;
}

.profile-stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.profile-stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.profile-bio,
.profile-description,
.profile-tags {
  margin-bottom: 2rem;
}

.profile-bio h3,
.profile-description h3,
.profile-tags h3 {
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  color: #333;
  position: relative;
  padding-left: 1rem;
}

.profile-bio h3::before,
.profile-description h3::before,
.profile-tags h3::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.profile-bio p,
.profile-description p {
  margin: 0;
  color: #666;
  line-height: 1.8;
  font-size: 1rem;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.profile-tag {
  padding: 0.5rem 1.2rem;
  background: #f0f0f0;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #667eea;
  transition: all 0.3s;
}

.profile-tag:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px);
}

.action-buttons {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  padding: 1rem;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.copy-btn:hover {
  background: #f0f4ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.copy-btn:active {
  transform: translateY(0);
}

.douyin-link-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  border: none;
  cursor: pointer;
}

.douyin-link-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.5);
}

.douyin-link-btn:active {
  transform: translateY(0);
}

.tip-text {
  padding: 1rem;
  background: #fff9e6;
  border-left: 4px solid #ffa500;
  border-radius: 8px;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-top: 0.5rem;
}

.edit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(245, 87, 108, 0.3);
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(245, 87, 108, 0.4);
}

.edit-btn:active {
  transform: translateY(0);
}

.note-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(79, 172, 254, 0.3);
}

.note-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(79, 172, 254, 0.4);
}

.note-btn:active {
  transform: translateY(0);
}

.delete-detail-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  padding: 1rem;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(255, 71, 87, 0.3);
}

.delete-detail-btn:hover {
  background: #ff3344;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 71, 87, 0.4);
}

.delete-detail-btn:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-avatar {
    width: 100px;
    height: 100px;
  }
  
  .profile-name {
    font-size: 1.5rem;
  }
  
  .profile-stats {
    gap: 1rem;
    padding: 1rem;
  }
  
  .profile-stat-value {
    font-size: 1.4rem;
  }
}
</style>
