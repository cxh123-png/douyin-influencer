// 默认头像
const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTUwIiByPSIxNTAiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTIwIj7wn5GNPC90ZXh0Pjwvc3ZnPg=='

// 网红数据
export const influencers = [
  {
    id: 1,
    name: '李子柒',
    avatar: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_6e8e5e5e5e5e5e5e5e5e5e5e5e5e5e5e~c5_300x300.jpeg',
    category: '美食',
    followers: '5800万',
    description: '专注传统美食文化，展现田园生活之美',
    tags: ['美食', '传统文化', '田园'],
    douyinId: 'liziqi',
    videos: 156,
    likes: '3.2亿',
    bio: '用双手创造美好生活，传承中华传统美食文化'
  },
  {
    id: 2,
    name: '疯狂小杨哥',
    avatar: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_7f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f~c5_300x300.jpeg',
    category: '搞笑',
    followers: '1.2亿',
    description: '家庭情景喜剧创作者，带来欢乐每一天',
    tags: ['搞笑', '家庭', '剧情'],
    douyinId: 'xiaoyangge',
    videos: 523,
    likes: '8.5亿',
    bio: '记录生活中的欢笑与感动'
  },
  {
    id: 3,
    name: '刘畊宏',
    avatar: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a8a~c5_300x300.jpeg',
    category: '健身',
    followers: '7500万',
    description: '全民健身教练，带你一起运动起来',
    tags: ['健身', '运动', '健康'],
    douyinId: 'liugenghong',
    videos: 289,
    likes: '5.6亿',
    bio: '健康是最大的财富，一起动起来！'
  },
  {
    id: 4,
    name: '董宇辉',
    avatar: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b~c5_300x300.jpeg',
    category: '知识',
    followers: '3200万',
    description: '知识分享者，用文字温暖人心',
    tags: ['知识', '读书', '文化'],
    douyinId: 'dongyuhui',
    videos: 412,
    likes: '2.8亿',
    bio: '在知识的海洋里遨游，分享生活的智慧'
  },
  {
    id: 5,
    name: 'papi酱',
    avatar: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_acacacacacacacacacacacacacacacaca~c5_300x300.jpeg',
    category: '搞笑',
    followers: '4500万',
    description: '原创短视频创作者，吐槽生活百态',
    tags: ['搞笑', '原创', '吐槽'],
    douyinId: 'papijiang',
    videos: 678,
    likes: '4.1亿',
    bio: '用幽默的视角看待生活'
  },
  {
    id: 6,
    name: '密子君',
    avatar: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_bdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbd~c5_300x300.jpeg',
    category: '美食',
    followers: '2800万',
    description: '美食探店达人，发现城市美味',
    tags: ['美食', '探店', '测评'],
    douyinId: 'mizijun',
    videos: 834,
    likes: '2.3亿',
    bio: '吃遍天下美食，分享味蕾体验'
  },
  {
    id: 7,
    name: '张同学',
    avatar: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_cececececececececececececececece~c5_300x300.jpeg',
    category: '生活',
    followers: '6200万',
    description: '记录农村日常生活，展现真实乡村',
    tags: ['生活', '农村', '日常'],
    douyinId: 'zhangtongxue',
    videos: 245,
    likes: '4.8亿',
    bio: '用最真实的镜头记录生活'
  },
  {
    id: 8,
    name: '瑜伽老师',
    avatar: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_dfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdf~c5_300x300.jpeg',
    category: '健身',
    followers: '1800万',
    description: '专业瑜伽教练，教你优雅塑形',
    tags: ['健身', '瑜伽', '塑形'],
    douyinId: 'yujiaolaoshi',
    videos: 567,
    likes: '1.5亿',
    bio: '身心合一，遇见更好的自己'
  },
  {
    id: 9,
    name: '科技美学',
    avatar: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0~c5_300x300.jpeg',
    category: '科技',
    followers: '2500万',
    description: '数码产品评测，科技资讯分享',
    tags: ['科技', '数码', '评测'],
    douyinId: 'kejimeixue',
    videos: 923,
    likes: '2.1亿',
    bio: '用专业的态度解读科技'
  },
  {
    id: 10,
    name: '旅行摄影师',
    avatar: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1~c5_300x300.jpeg',
    category: '旅行',
    followers: '3100万',
    description: '走遍世界美景，用镜头记录旅途',
    tags: ['旅行', '摄影', '风景'],
    douyinId: 'lvxingsheyingshi',
    videos: 456,
    likes: '2.9亿',
    bio: '世界那么大，一起去看看'
  },
  {
    id: 11,
    name: '美妆博主',
    avatar: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2~c5_300x300.jpeg',
    category: '美妆',
    followers: '4200万',
    description: '专业化妆教程，分享美妆技巧',
    tags: ['美妆', '化妆', '护肤'],
    douyinId: 'meizhuangbozhu',
    videos: 712,
    likes: '3.5亿',
    bio: '让每个女孩都成为自己的女神'
  },
  {
    id: 12,
    name: '历史讲师',
    avatar: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3~c5_300x300.jpeg',
    category: '知识',
    followers: '1900万',
    description: '趣味历史讲解，让历史活起来',
    tags: ['知识', '历史', '教育'],
    douyinId: 'lishijiangshi',
    videos: 389,
    likes: '1.7亿',
    bio: '以史为鉴，可以知兴替'
  }
]

// 分类列表
export const categories = [
  { id: 'all', name: '全部' },
  { id: '美食', name: '美食' },
  { id: '搞笑', name: '搞笑' },
  { id: '健身', name: '健身' },
  { id: '知识', name: '知识' },
  { id: '生活', name: '生活' },
  { id: '科技', name: '科技' },
  { id: '旅行', name: '旅行' },
  { id: '美妆', name: '美妆' }
]
