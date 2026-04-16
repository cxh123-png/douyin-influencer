<template>
  <div class="influencer-card" @click="handleClick" :class="{ selected: props.isSelected }">
    <!-- 复选框 -->
    <div v-if="props.showCheckbox" class="checkbox-wrapper" @click.stop>
      <input 
        type="checkbox" 
        :checked="props.isSelected"
        @change="handleSelect"
        class="card-checkbox"
      />
    </div>
    
    <div class="card-header">
      <img :src="props.influencer.avatar" :alt="props.influencer.name" class="avatar" @error="handleImageError" />
      <div class="basic-info">
        <h3 class="name">{{ props.influencer.name }}</h3>
        <span class="category">{{ props.influencer.category }}</span>
      </div>
    </div>
    
    <div class="card-body">
      <p class="description">{{ props.influencer.description }}</p>
      
      <div class="tags">
        <span v-for="tag in props.influencer.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
      
      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">粉丝</span>
          <span class="stat-value">{{ props.influencer.followers }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">作品</span>
          <span class="stat-value">{{ props.influencer.videos }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">获赞</span>
          <span class="stat-value">{{ props.influencer.likes }}</span>
        </div>
      </div>
    </div>
    
    <div class="card-footer">
      <button class="view-btn">查看详情</button>
      <button class="delete-btn" @click.stop="handleDelete">🗑️ 删除</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  influencer: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  showCheckbox: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'delete', 'select'])

const handleClick = () => {
  console.log('卡片被点击，传递 influencer:', props.influencer)
  emit('click', props.influencer)
}

const handleDelete = () => {
  if (confirm(`确定要删除网红 "${props.influencer.name}" 吗？`)) {
    emit('delete', props.influencer.id)
  }
}

const handleSelect = (event) => {
  emit('select', props.influencer.id)
}

// 处理图片加载错误
const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgZmlsbD0iIzY2N2VlYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIzMiI+8J+RjTwvdGV4dD48L3N2Zz4='
}
</script>

<style scoped>
.influencer-card {
  position: relative;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 3px solid transparent;
}

.influencer-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.influencer-card.selected {
  border: 3px solid #667eea;
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
}

.checkbox-wrapper {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

.card-checkbox {
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: #667eea;
}

.card-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.basic-info {
  flex: 1;
  color: white;
}

.name {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.category {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  font-size: 0.85rem;
  backdrop-filter: blur(10px);
}

.card-body {
  padding: 1.5rem;
}

.description {
  margin: 0 0 1rem 0;
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  padding: 0.3rem 0.8rem;
  background: #f0f0f0;
  border-radius: 15px;
  font-size: 0.85rem;
  color: #667eea;
  transition: all 0.3s;
}

.tag:hover {
  background: #667eea;
  color: white;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 0.3rem;
}

.stat-value {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.card-footer {
  padding: 0 1.5rem 1.5rem;
}

.view-btn {
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.view-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.view-btn:active {
  transform: scale(0.98);
}

.delete-btn {
  width: 100%;
  padding: 0.6rem;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
}

.delete-btn:hover {
  background: #ff3344;
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
}

.delete-btn:active {
  transform: scale(0.98);
}
</style>
