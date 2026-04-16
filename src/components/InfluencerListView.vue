<template>
  <div :class="['influencer-list-view', { 'dark-mode': darkMode }]">
    <table class="list-table">
      <thead>
        <tr>
          <th v-if="showCheckbox" width="50">
            <input type="checkbox" :checked="isAllSelected" @change="$emit('select-all')" />
          </th>
          <th width="80">头像</th>
          <th @click="$emit('sort', 'name')" class="sortable">
            昵称 <span class="sort-icon">{{ getSortIcon('name') }}</span>
          </th>
          <th>分类</th>
          <th @click="$emit('sort', 'followers')" class="sortable">
            粉丝数 <span class="sort-icon">{{ getSortIcon('followers') }}</span>
          </th>
          <th @click="$emit('sort', 'videos')" class="sortable">
            作品数 <span class="sort-icon">{{ getSortIcon('videos') }}</span>
          </th>
          <th @click="$emit('sort', 'likes')" class="sortable">
            获赞数 <span class="sort-icon">{{ getSortIcon('likes') }}</span>
          </th>
          <th>标签</th>
          <th v-if="showFavorite">收藏</th>
          <th width="150">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="influencer in influencers" :key="influencer.id" 
            :class="{ selected: isSelected(influencer.id), 'favorite-row': influencer.isFavorite }">
          <td v-if="showCheckbox">
            <input type="checkbox" :checked="isSelected(influencer.id)" @change="$emit('select', influencer.id)" />
          </td>
          <td>
            <img :src="influencer.avatar" :alt="influencer.name" class="list-avatar" @error="handleImageError" />
          </td>
          <td>
            <div class="list-name">{{ influencer.name }}</div>
            <div class="list-id">@{{ influencer.douyinId }}</div>
          </td>
          <td><span class="category-tag">{{ influencer.category }}</span></td>
          <td class="number-cell">{{ influencer.followers }}</td>
          <td class="number-cell">{{ influencer.videos }}</td>
          <td class="number-cell">{{ influencer.likes }}</td>
          <td>
            <div class="tags-cell">
              <span v-for="tag in influencer.tags.slice(0, 2)" :key="tag" class="tag-small">{{ tag }}</span>
              <span v-if="influencer.tags.length > 2" class="tag-more">+{{ influencer.tags.length - 2 }}</span>
            </div>
          </td>
          <td v-if="showFavorite">
            <button class="fav-btn" @click="$emit('toggle-favorite', influencer.id)">
              {{ influencer.isFavorite ? '⭐' : '☆' }}
            </button>
          </td>
          <td>
            <div class="action-btns">
              <button class="btn-view" @click="$emit('view', influencer)">详情</button>
              <button class="btn-delete" @click="$emit('delete', influencer.id)">删除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  influencers: {
    type: Array,
    required: true
  },
  selectedIds: {
    type: Array,
    default: () => []
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  showFavorite: {
    type: Boolean,
    default: true
  },
  sortField: {
    type: String,
    default: ''
  },
  sortOrder: {
    type: String,
    default: 'asc'
  },
  darkMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'select-all', 'view', 'delete', 'sort', 'toggle-favorite'])

const isSelected = (id) => props.selectedIds.includes(id)
const isAllSelected = props.influencers.length > 0 && props.influencers.every(i => props.selectedIds.includes(i.id))

const handleImageError = (e) => {
  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgZmlsbD0iIzY2N2VlYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIzMiI+8J+RjTwvdGV4dD48L3N2Zz4='
}

// 获取排序图标
const getSortIcon = (field) => {
  if (props.sortField === field) {
    return props.sortOrder === 'asc' ? '↑' : '↓'
  }
  return '⇅'
}
</script>

<style scoped>
.influencer-list-view {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.influencer-list-view.dark-mode {
  background: #1e1e1e;
}

.list-table {
  width: 100%;
  border-collapse: collapse;
}

.list-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.list-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
}

.sortable {
  cursor: pointer;
  user-select: none;
  transition: background 0.3s;
}

.sortable:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sort-icon {
  margin-left: 4px;
  font-size: 0.85rem;
}

.list-table tbody tr {
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.list-table tbody tr:hover {
  background: #f8f9fa;
}

.list-table tbody tr.selected {
  background: #e8eaf6;
}

.list-table tbody tr.favorite-row {
  background: #fff9e6;
}

.list-table td {
  padding: 1rem;
  vertical-align: middle;
}

.influencer-list-view.dark-mode .list-table td {
  color: #e0e0e0;
  border-bottom-color: #333;
}

.influencer-list-view.dark-mode .list-table tbody tr:hover {
  background: #2a2a2a;
}

.list-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.list-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.influencer-list-view.dark-mode .list-name {
  color: #e0e0e0;
}

.list-id {
  font-size: 0.85rem;
  color: #999;
}

.category-tag {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: #f0f0f0;
  border-radius: 15px;
  font-size: 0.85rem;
  color: #667eea;
}

.number-cell {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.tags-cell {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag-small {
  padding: 0.2rem 0.6rem;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 12px;
  font-size: 0.8rem;
}

.tag-more {
  padding: 0.2rem 0.6rem;
  background: #f0f0f0;
  color: #666;
  border-radius: 12px;
  font-size: 0.8rem;
}

.fav-btn {
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.3s;
}

.fav-btn:hover {
  transform: scale(1.2);
}

.action-btns {
  display: flex;
  gap: 0.5rem;
}

.btn-view,
.btn-delete {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-view {
  background: #667eea;
  color: white;
}

.btn-view:hover {
  background: #5568d3;
}

.btn-delete {
  background: #ff4757;
  color: white;
}

.btn-delete:hover {
  background: #ff3344;
}

@media (max-width: 768px) {
  .list-table {
    font-size: 0.85rem;
  }
  
  .list-table th,
  .list-table td {
    padding: 0.6rem;
  }
  
  .list-avatar {
    width: 40px;
    height: 40px;
  }
}
</style>
