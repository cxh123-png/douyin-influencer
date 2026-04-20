<template>
  <div class="share-modal-overlay" @click="$emit('close')">
    <div class="share-modal-content" @click.stop>
      <div class="modal-header">
        <h2>📤 分享网红数据</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      
      <div class="share-modal-body">
        <!-- 分享方式选择 -->
        <div class="share-tabs">
          <button 
            :class="['tab-btn', { active: activeTab === 'link' }]"
            @click="activeTab = 'link'"
          >
            🔗 链接分享
          </button>
          <button 
            :class="['tab-btn', { active: activeTab === 'qrcode' }]"
            @click="activeTab = 'qrcode'"
          >
            📱 二维码
          </button>
          <button 
            :class="['tab-btn', { active: activeTab === 'file' }]"
            @click="activeTab = 'file'"
          >
            📁 文件导出
          </button>
        </div>

        <!-- 链接分享 -->
        <div v-if="activeTab === 'link'" class="share-panel">
          <div class="share-info">
            <p class="info-text">
              💡 点击下方按钮生成分享链接，其他人打开链接即可查看您的网红数据
            </p>
            <p class="warning-text" v-if="isLocalhost">
              ⚠️ 检测到您正在使用本地地址 (localhost)，生成的链接只能在您的电脑上访问
            </p>
            <p class="solution-text" v-if="isLocalhost">
              📌 <strong>推荐方案：</strong>切换到「文件导出」标签页，导出为CSV或JSON文件分享给他人
            </p>
            <p class="info-text" v-else>
              ✨ 已启用数据压缩，链接更短更易分享
            </p>
          </div>

          <div class="share-link-box">
            <textarea 
              v-model="shareUrl" 
              readonly 
              placeholder="点击生成按钮创建分享链接..."
              class="share-url-input"
            ></textarea>
            <div class="link-actions">
              <button 
                class="generate-btn" 
                @click="generateShareLink"
                :disabled="influencers.length === 0"
              >
                🔄 生成链接
              </button>
              <button 
                class="copy-btn" 
                @click="copyShareLink"
                :disabled="!shareUrl"
              >
                {{ copied ? '✅ 已复制' : '📋 复制链接' }}
              </button>
            </div>
          </div>

          <div class="share-stats">
            <div class="stat-item">
              <span class="stat-label">网红数量:</span>
              <span class="stat-value">{{ influencers.length }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">预计链接长度:</span>
              <span class="stat-value">{{ estimatedLength }}</span>
            </div>
          </div>
        </div>

        <!-- 二维码分享 -->
        <div v-if="activeTab === 'qrcode'" class="share-panel">
          <div class="share-info">
            <p class="info-text">
              📱 扫描二维码即可查看分享的网红数据
            </p>
            <p class="warning-text">
              ⚠️ 需要先生成分享链接
            </p>
          </div>

          <div class="qrcode-container">
            <div v-if="shareUrl" class="qrcode-wrapper">
              <QrcodeVue 
                :value="shareUrl" 
                :size="250" 
                level="M"
                class="qrcode"
              />
              <p class="qrcode-hint">扫描二维码查看数据</p>
            </div>
            <div v-else class="qrcode-placeholder">
              <div class="placeholder-icon">📱</div>
              <p>请先生成分享链接</p>
              <button class="generate-btn" @click="generateShareLink">
                生成链接和二维码
              </button>
            </div>
          </div>
        </div>

        <!-- 文件导出 -->
        <div v-if="activeTab === 'file'" class="share-panel">
          <div class="share-info">
            <p class="info-text">
              📁 导出数据为文件，方便离线分享和备份
            </p>
          </div>

          <div class="export-options">
            <button class="export-btn csv" @click="exportData('csv')">
              <span class="export-icon">📊</span>
              <div class="export-info">
                <strong>导出为 CSV</strong>
                <span>Excel 可打开的表格格式</span>
              </div>
            </button>

            <button class="export-btn json" @click="exportData('json')">
              <span class="export-icon">📄</span>
              <div class="export-info">
                <strong>导出为 JSON</strong>
                <span>结构化数据格式</span>
              </div>
            </button>
          </div>

          <div class="import-hint">
            <p>💡 提示：对方可以通过"批量导入"功能导入此文件</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import QrcodeVue from 'qrcode.vue'
import pako from 'pako'
import { exportToCSV, exportToJSON } from '../utils/helpers.js'

const props = defineProps({
  influencers: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close'])

const activeTab = ref('link')
const shareUrl = ref('')
const copied = ref(false)

// 估算链接长度
const estimatedLength = computed(() => {
  if (!shareUrl.value) return '0 字符'
  const len = shareUrl.value.length
  if (len < 1000) return `${len} 字符`
  if (len < 10000) return `${(len / 1000).toFixed(1)}K 字符`
  return `${(len / 10000).toFixed(1)}W 字符`
})

// 检测是否为本地地址
const isLocalhost = computed(() => {
  const hostname = window.location.hostname
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1'
})

// 生成分享链接
const generateShareLink = () => {
  try {
    // 准备要分享的数据（只保留必要字段，减少数据量）
    const shareData = {
      influencers: props.influencers.map(inf => ({
        id: inf.id,
        name: inf.name,
        avatar: inf.avatar,
        category: inf.category,
        followers: inf.followers,
        description: inf.description,
        tags: inf.tags,
        douyinId: inf.douyinId,
        videos: inf.videos,
        likes: inf.likes,
        bio: inf.bio,
        isFavorite: inf.isFavorite,
        note: inf.note,
        noteUpdatedAt: inf.noteUpdatedAt
      })),
      categories: props.categories.filter(c => c.id !== 'all'),
      timestamp: new Date().toISOString(),
      version: '2.0'  // 升级版本号，表示使用压缩
    }

    // 转换为 JSON
    const jsonString = JSON.stringify(shareData)
    
    // 使用 pako 压缩数据
    const compressed = pako.deflate(jsonString, { to: 'string' })
    
    // Base64 编码（使用 URL 安全的 base64url）
    const encoded = btoa(compressed)
      .replace(/\+/g, '-')  // + -> -
      .replace(/\//g, '_')  // / -> _
      .replace(/=/g, '')    // 移除填充 =
    
    // 生成完整URL
    const baseUrl = window.location.origin + window.location.pathname
    shareUrl.value = `${baseUrl}?d=${encoded}`  // 使用更短的参数名 d
    
    // 计算压缩率
    const originalSize = jsonString.length
    const compressedSize = encoded.length
    const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(1)
    
    console.log(`压缩前: ${originalSize} 字符, 压缩后: ${compressedSize} 字符, 压缩率: ${compressionRatio}%`)
    
    // 显示成功提示
    alert(`✅ 分享链接生成成功！\n\n压缩率: ${compressionRatio}%\n链接长度: ${compressedSize} 字符\n\n您可以复制链接或切换到二维码标签页`)
  } catch (error) {
    console.error('生成分享链接失败:', error)
    alert('❌ 生成链接失败，数据可能过大\n\n建议使用文件导出方式分享')
  }
}

// 复制分享链接
const copyShareLink = async () => {
  if (!shareUrl.value) return
  
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = shareUrl.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// 导出数据
const exportData = (format) => {
  const dataToExport = props.influencers
  if (dataToExport.length === 0) {
    alert('没有数据可导出！')
    return
  }
  
  const filename = `influencers_share_${new Date().getTime()}`
  if (format === 'csv') {
    exportToCSV(dataToExport, `${filename}.csv`)
  } else if (format === 'json') {
    exportToJSON(dataToExport, `${filename}.json`)
  }
}
</script>

<style scoped>
.share-modal-overlay {
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
  z-index: 10000;
  padding: 1rem;
}

.share-modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
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

.share-modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

/* 标签页 */
.share-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.tab-btn {
  flex: 1;
  padding: 0.8rem;
  border: none;
  background: #f0f0f0;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  color: #666;
}

.tab-btn:hover {
  background: #e0e0e0;
}

.tab-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* 分享面板 */
.share-panel {
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

.share-info {
  margin-bottom: 1.5rem;
}

.info-text {
  margin: 0 0 0.5rem 0;
  padding: 1rem;
  background: #e8f4f8;
  border-left: 4px solid #4facfe;
  border-radius: 8px;
  color: #333;
  line-height: 1.6;
}

.warning-text {
  margin: 0;
  padding: 0.8rem;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 8px;
  color: #856404;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* 链接分享 */
.share-link-box {
  margin-bottom: 1.5rem;
}

.share-url-input {
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: 'Courier New', monospace;
  resize: vertical;
  margin-bottom: 1rem;
  transition: all 0.3s;
}

.share-url-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.link-actions {
  display: flex;
  gap: 1rem;
}

.generate-btn,
.copy-btn {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.generate-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.generate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.copy-btn {
  background: #4facfe;
  color: white;
}

.copy-btn:hover:not(:disabled) {
  background: #3a9bfe;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.4);
}

.copy-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 分享统计 */
.share-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.stat-value {
  color: #667eea;
  font-weight: 600;
  font-size: 1rem;
}

/* 二维码 */
.qrcode-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.qrcode-wrapper {
  text-align: center;
}

.qrcode {
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.qrcode-hint {
  margin-top: 1rem;
  color: #666;
  font-size: 0.95rem;
}

.qrcode-placeholder {
  text-align: center;
  color: #999;
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.qrcode-placeholder p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

/* 文件导出 */
.export-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.export-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.export-btn.csv:hover {
  border-color: #4facfe;
  background: #f0f9ff;
}

.export-btn.json:hover {
  border-color: #667eea;
  background: #f0f4ff;
}

.export-icon {
  font-size: 2.5rem;
}

.export-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.export-info strong {
  font-size: 1.1rem;
  color: #333;
}

.export-info span {
  font-size: 0.9rem;
  color: #666;
}

.import-hint {
  padding: 1rem;
  background: #e8f5e9;
  border-left: 4px solid #4caf50;
  border-radius: 8px;
  color: #2e7d32;
  font-size: 0.9rem;
  line-height: 1.6;
}

.import-hint p {
  margin: 0;
}

@media (max-width: 768px) {
  .share-modal-content {
    max-height: 95vh;
    margin: 1rem;
  }
  
  .share-tabs {
    flex-direction: column;
  }
  
  .link-actions {
    flex-direction: column;
  }
  
  .share-stats {
    grid-template-columns: 1fr;
  }
}
</style>
