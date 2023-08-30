import axios from '@/utils/request'
import type { searchKnowledge, Knowledge } from '@/types/knowledge'
export const getKnowLedgeApi = (params: searchKnowledge) => {
  return axios.get<Knowledge>('/patient/home/knowledge', params)
}
