<template>
  <div class="note-editor-modal-overlay" @click="$emit('close')">
    <div class="note-editor-modal" @click.stop>
      <div class="modal-header">
        <h2>📝 备注 - {{ influencerName }}</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body">
        <textarea
          v-model="noteText"
          class="note-textarea"
          placeholder="在此输入备注内容...&#10;&#10;例如：&#10;- 合作历史&#10;- 联系方式&#10;- 注意事项"
          rows="10"
        ></textarea>
        <div class="note-info">
          <span class="char-count">{{ noteText.length }} 字</span>
          <span class="last-updated" v-if="lastUpdated">最后更新: {{ lastUpdated }}</span>
        </div>
      </div>
      <div class="modal-footer">
        <button class="cancel-btn" @click="$emit('close')">取消</button>
        <button class="save-btn" @click="handleSave">💾 保存备注</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  influencerName: {
    type: String,
    required: true
  },
  initialNote: {
    type: String,
    default: ''
  },
  lastUpdated: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'save'])

const noteText = ref(props.initialNote)

watch(() => props.initialNote, (newVal) => {
  noteText.value = newVal
})

const handleSave = () => {
  emit('save', noteText.value)
}
</script>

<style scoped>
.note-editor-modal-overlay {
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

.note-editor-modal {
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
  font-size: 1.3rem;
  color: #333;
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
  flex: 1;
  overflow-y: auto;
}

.note-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s;
  line-height: 1.6;
}

.note-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.note-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;
  font-size: 0.85rem;
  color: #999;
}

.char-count {
  color: #667eea;
  font-weight: 600;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 1rem;
}

.cancel-btn,
.save-btn {
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

.save-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.save-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .note-editor-modal {
    max-height: 100vh;
    border-radius: 0;
  }
}
</style>
