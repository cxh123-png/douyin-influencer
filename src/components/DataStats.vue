<template>
  <div class="stats-modal-overlay" @click="$emit('close')">
    <div class="stats-modal" @click.stop>
      <div class="modal-header">
        <h2>📊 数据统计</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      
      <div class="modal-body">
        <!-- 统计概览 -->
        <div class="stats-overview">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-content">
              <div class="stat-value">{{ totalInfluencers }}</div>
              <div class="stat-label">总网红数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📹</div>
            <div class="stat-content">
              <div class="stat-value">{{ totalVideos }}</div>
              <div class="stat-label">总作品数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">❤️</div>
            <div class="stat-content">
              <div class="stat-value">{{ totalLikes }}</div>
              <div class="stat-label">总获赞数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-content">
              <div class="stat-value">{{ favoriteCount }}</div>
              <div class="stat-label">已收藏</div>
            </div>
          </div>
        </div>

        <!-- 分类分布图表 -->
        <div class="chart-section">
          <h3>📂 分类分布</h3>
          <div class="chart-container">
            <canvas ref="categoryChartRef"></canvas>
          </div>
        </div>

        <!-- Top 10 网红 -->
        <div class="top-list-section">
          <h3>🏆 Top 10 网红（按粉丝数）</h3>
          <div class="top-list">
            <div v-for="(item, index) in topInfluencers" :key="item.id" class="top-item">
              <div class="rank" :class="`rank-${index + 1}`">{{ index + 1 }}</div>
              <img :src="item.avatar" :alt="item.name" class="top-avatar" @error="handleImageError" />
              <div class="top-info">
                <div class="top-name">{{ item.name }}</div>
                <div class="top-category">{{ item.category }}</div>
              </div>
              <div class="top-followers">{{ item.followers }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import { parseCount } from '../utils/helpers.js'

Chart.register(...registerables)

const props = defineProps({
  influencers: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close'])

const categoryChartRef = ref(null)
let categoryChart = null

// 统计概览
const totalInfluencers = computed(() => props.influencers.length)

const totalVideos = computed(() => {
  return props.influencers.reduce((sum, item) => sum + (item.videos || 0), 0)
})

const totalLikes = computed(() => {
  const total = props.influencers.reduce((sum, item) => sum + parseCount(item.likes), 0)
  if (total >= 100000000) {
    return (total / 100000000).toFixed(1) + '亿'
  } else if (total >= 10000) {
    return (total / 10000).toFixed(1) + '万'
  }
  return total
})

const favoriteCount = computed(() => {
  return props.influencers.filter(item => item.isFavorite).length
})

// Top 10 网红
const topInfluencers = computed(() => {
  return [...props.influencers]
    .sort((a, b) => parseCount(b.followers) - parseCount(a.followers))
    .slice(0, 10)
})

// 分类分布
const categoryData = computed(() => {
  const categoryMap = {}
  props.influencers.forEach(item => {
    const cat = item.category || '未分类'
    categoryMap[cat] = (categoryMap[cat] || 0) + 1
  })
  return Object.entries(categoryMap).map(([name, value]) => ({ name, value }))
})

// 渲染分类图表
const renderCategoryChart = () => {
  if (!categoryChartRef.value) return
  
  if (categoryChart) {
    categoryChart.destroy()
  }

  const data = categoryData.value
  if (data.length === 0) return

  const ctx = categoryChartRef.value.getContext('2d')
  
  const colors = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c',
    '#4facfe', '#00f2fe', '#fa709a', '#fee140',
    '#a8edea', '#fed6e3'
  ]

  categoryChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.map(d => d.name),
      datasets: [{
        data: data.map(d => d.value),
        backgroundColor: colors.slice(0, data.length),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || ''
              const value = context.parsed
              const total = context.dataset.data.reduce((a, b) => a + b, 0)
              const percentage = ((value / total) * 100).toFixed(1)
              return `${label}: ${value} (${percentage}%)`
            }
          }
        }
      }
    }
  })
}

// 图片错误处理
const handleImageError = (e) => {
  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgZmlsbD0iIzY2N2VlYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIzMiI+8J+RjTwvdGV4dD48L3N2Zz4='
}

onMounted(() => {
  nextTick(() => {
    renderCategoryChart()
  })
})

watch(() => props.influencers, () => {
  nextTick(() => {
    renderCategoryChart()
  })
}, { deep: true })
</script>

<style scoped>
.stats-modal-overlay {
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

.stats-modal {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
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

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.chart-section,
.top-list-section {
  margin-bottom: 2rem;
}

.chart-section h3,
.top-list-section h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.2rem;
}

.chart-container {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
}

.chart-container canvas {
  max-height: 350px;
}

.top-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.top-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s;
}

.top-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.rank {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  background: #e0e0e0;
  color: #666;
  flex-shrink: 0;
}

.rank-1 {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #fff;
}

.rank-2 {
  background: linear-gradient(135deg, #c0c0c0, #e8e8e8);
  color: #fff;
}

.rank-3 {
  background: linear-gradient(135deg, #cd7f32, #e8a860);
  color: #fff;
}

.top-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.top-info {
  flex: 1;
}

.top-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.3rem;
}

.top-category {
  font-size: 0.85rem;
  color: #999;
}

.top-followers {
  font-weight: 600;
  color: #667eea;
  font-size: 1.1rem;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .stats-modal {
    max-height: 100vh;
    border-radius: 0;
  }
  
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stat-icon {
    font-size: 2rem;
  }
  
  .stat-value {
    font-size: 1.4rem;
  }
}
</style>
