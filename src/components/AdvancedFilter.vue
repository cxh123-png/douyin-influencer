<template>
  <div class="advanced-filter-modal-overlay" @click="$emit('close')">
    <div class="advanced-filter-modal" @click.stop>
      <div class="modal-header">
        <h2>🔍 高级筛选</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      
      <div class="modal-body">
        <!-- 粉丝数范围 -->
        <div class="filter-section">
          <h3>📊 粉丝数范围</h3>
          <div class="range-inputs">
            <div class="range-input">
              <label>最小值</label>
              <input 
                v-model.number="minFollowers" 
                type="number" 
                placeholder="0"
                min="0"
              />
            </div>
            <span class="range-separator">-</span>
            <div class="range-input">
              <label>最大值</label>
              <input 
                v-model.number="maxFollowers" 
                type="number" 
                placeholder="不限"
                min="0"
              />
            </div>
          </div>
        </div>

        <!-- 获赞数范围 -->
        <div class="filter-section">
          <h3>❤️ 获赞数范围</h3>
          <div class="range-inputs">
            <div class="range-input">
              <label>最小值</label>
              <input 
                v-model.number="minLikes" 
                type="number" 
                placeholder="0"
                min="0"
              />
            </div>
            <span class="range-separator">-</span>
            <div class="range-input">
              <label>最大值</label>
              <input 
                v-model.number="maxLikes" 
                type="number" 
                placeholder="不限"
                min="0"
              />
            </div>
          </div>
        </div>

        <!-- 作品数范围 -->
        <div class="filter-section">
          <h3>📹 作品数范围</h3>
          <div class="range-inputs">
            <div class="range-input">
              <label>最小值</label>
              <input 
                v-model.number="minVideos" 
                type="number" 
                placeholder="0"
                min="0"
              />
            </div>
            <span class="range-separator">-</span>
            <div class="range-input">
              <label>最大值</label>
              <input 
                v-model.number="maxVideos" 
                type="number" 
                placeholder="不限"
                min="0"
              />
            </div>
          </div>
        </div>

        <!-- 标签筛选 -->
        <div class="filter-section">
          <h3>🏷️ 标签筛选</h3>
          <div class="tag-filter-input">
            <input 
              v-model="tagFilter" 
              type="text" 
              placeholder="输入标签，多个标签用逗号分隔"
            />
            <div class="tag-hint">
              <span>示例: 美食,探店</span>
              <span>逻辑: </span>
              <select v-model="tagLogic">
                <option value="OR">包含任一</option>
                <option value="AND">包含全部</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 其他筛选 -->
        <div class="filter-section">
          <h3>⭐ 其他条件</h3>
          <div class="checkbox-group">
            <label class="checkbox-item">
              <input type="checkbox" v-model="onlyFavorite" />
              <span>仅显示收藏的网红</span>
            </label>
            <label class="checkbox-item">
              <input type="checkbox" v-model="hasNote" />
              <span>仅显示有备注的网红</span>
            </label>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="reset-btn" @click="resetFilters">重置</button>
        <button class="apply-btn" @click="applyFilters">应用筛选</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  initialFilters: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'apply'])

const minFollowers = ref(props.initialFilters.minFollowers || null)
const maxFollowers = ref(props.initialFilters.maxFollowers || null)
const minLikes = ref(props.initialFilters.minLikes || null)
const maxLikes = ref(props.initialFilters.maxLikes || null)
const minVideos = ref(props.initialFilters.minVideos || null)
const maxVideos = ref(props.initialFilters.maxVideos || null)
const tagFilter = ref(props.initialFilters.tagFilter || '')
const tagLogic = ref(props.initialFilters.tagLogic || 'OR')
const onlyFavorite = ref(props.initialFilters.onlyFavorite || false)
const hasNote = ref(props.initialFilters.hasNote || false)

const resetFilters = () => {
  minFollowers.value = null
  maxFollowers.value = null
  minLikes.value = null
  maxLikes.value = null
  minVideos.value = null
  maxVideos.value = null
  tagFilter.value = ''
  tagLogic.value = 'OR'
  onlyFavorite.value = false
  hasNote.value = false
}

const applyFilters = () => {
  emit('apply', {
    minFollowers: minFollowers.value,
    maxFollowers: maxFollowers.value,
    minLikes: minLikes.value,
    maxLikes: maxLikes.value,
    minVideos: minVideos.value,
    maxVideos: maxVideos.value,
    tagFilter: tagFilter.value,
    tagLogic: tagLogic.value,
    onlyFavorite: onlyFavorite.value,
    hasNote: hasNote.value
  })
}
</script>

<style scoped>
.advanced-filter-modal-overlay {
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

.advanced-filter-modal {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 650px;
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

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.filter-section {
  margin-bottom: 2rem;
}

.filter-section:last-child {
  margin-bottom: 0;
}

.filter-section h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
}

.range-inputs {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.range-input {
  flex: 1;
}

.range-input label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.range-input input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
}

.range-input input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.range-separator {
  font-size: 1.5rem;
  color: #999;
  margin-top: 1.5rem;
}

.tag-filter-input {
  position: relative;
}

.tag-filter-input input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
}

.tag-filter-input input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.tag-hint {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #999;
}

.tag-hint select {
  padding: 0.3rem 0.6rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
}

.checkbox-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #667eea;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 1rem;
}

.reset-btn,
.apply-btn {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.reset-btn {
  background: #f0f0f0;
  color: #666;
}

.reset-btn:hover {
  background: #e0e0e0;
}

.apply-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.apply-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.apply-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .advanced-filter-modal {
    max-height: 100vh;
    border-radius: 0;
  }
  
  .range-inputs {
    flex-direction: column;
    align-items: stretch;
  }
  
  .range-separator {
    margin: 0;
    text-align: center;
  }
}
</style>
