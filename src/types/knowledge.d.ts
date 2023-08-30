export type tabType = 'like' | 'recommend' | 'fatReduction' | 'food'

//首页tab数据参数
export type searchKnowledge = {
  type: string
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
