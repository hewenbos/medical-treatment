export type tabType = 'like' | 'recommend' | 'fatReduction' | 'food'

//首页tab数据参数 问诊记录参数
export type searchKnowledge = {
  type: string | number
  current: number
  pageSize: number
}

//首页tab接口返回数据
export type KnowledgeList = {
  id: string
  title: string
  coverUrl: string[]
  topics: string[]
  collectionNumber: number
  commentNumber: number
  creatorName: string
  creatorAvatar: string
  creatorHospatalName: string
  likeFlag: 0 | 1
  content: string
  creatorDep: string
  creatorTitles: string
  creatorId: string
}

export type Knowledge = {
  pageTotal: number
  total: number
  rows: KnowledgeList[]
}

//推荐关注 分类
export type FollowType = 'doc' | 'knowledge' | 'topic' | 'disease'

//推荐关注
export type PageParams = {
  // 当前⻚码
  current: number
  // 每⻚条数
  pageSize: number
}

//推荐关注返回的数据
export type Doctor = {
  // 医⽣ID
  id: string
  // 医⽣名称
  name: string
  // 头像
  avatar: string
  // 医院名称
  hospitalName: string
  // 医院等级
  gradeName: string
  // 科室
  depName: string
  // 职称
  positionalTitles: string
  // 是否关注，0 未关注 1 已关注
  likeFlag: 0 | 1
  // 接诊服务费
  serviceFee: number
  // 接诊⼈数
  consultationNum: number
  // 评分
  score: number
  // 主攻⽅向
  major: string
}
// 医⽣分⻚
export type DoctorPage = {
  pageTotal: number
  total: number
  rows: Doctor[]
}
