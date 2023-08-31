import axios from '@/utils/request'
import type {
  searchKnowledge,
  Knowledge,
  FollowType,
  PageParams,
  DoctorPage
} from '@/types/knowledge'
export const getKnowLedgeApi = (params: searchKnowledge) => {
  return axios.get<Knowledge>('/patient/home/knowledge', params)
}

//推荐关注接口
export const getFllowListApi = (params: PageParams) => {
  return axios.get<DoctorPage>('/home/page/doc', params)
}

//推荐关注分类
export const getFollowRecommendedApi = (data: { id: string; type: FollowType }) => {
  return axios.post('/like', data)
}
