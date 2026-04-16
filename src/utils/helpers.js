/**
 * 解析粉丝数/获赞数字符串为数字
 * 例如: "100万" -> 1000000, "1.5亿" -> 150000000
 */
export const parseCount = (countStr) => {
  if (!countStr) return 0
  if (typeof countStr === 'number') return countStr
  
  const str = String(countStr)
  
  if (str.includes('亿')) {
    return parseFloat(str.replace('亿', '')) * 100000000
  } else if (str.includes('万')) {
    return parseFloat(str.replace('万', '')) * 10000
  }
  
  return parseFloat(str) || 0
}

/**
 * 格式化数字为易读格式
 */
export const formatCount = (num) => {
  if (!num) return '0'
  
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '亿'
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  
  return String(num)
}

/**
 * 导出数据为 CSV 格式
 */
export const exportToCSV = (data, filename = 'influencers.csv') => {
  if (!data || data.length === 0) return
  
  // CSV 表头
  const headers = ['昵称', '抖音号', '分类', '粉丝数', '作品数', '获赞数', '简介', '标签', '个人签名']
  
  // CSV 内容
  const rows = data.map(item => [
    item.name || '',
    item.douyinId || '',
    item.category || '',
    item.followers || '',
    item.videos || 0,
    item.likes || '',
    item.description || '',
    (item.tags || []).join('; '),
    item.bio || ''
  ])
  
  // 添加 BOM 头以支持中文
  const BOM = '\uFEFF'
  const csvContent = BOM + [headers, ...rows].map(row => 
    row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
  ).join('\n')
  
  // 下载文件
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

/**
 * 导出数据为 JSON 格式
 */
export const exportToJSON = (data, filename = 'influencers.json') => {
  if (!data || data.length === 0) return
  
  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}
