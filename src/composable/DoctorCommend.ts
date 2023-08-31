import { getFollowRecommendedApi } from '@/services/Knowledge'
import type { FollowType } from '@/types/knowledge'
import { ref } from 'vue'
export default function doctorFun(type: FollowType = 'doc') {
  const loading = ref(false)

  const doctorFollow = async (item: { id: string; likeFlag: number }) => {
    loading.value = true
    await getFollowRecommendedApi({ id: item.id, type })
    item.likeFlag = item.likeFlag === 1 ? 0 : 1
    loading.value = false
  }
  return {
    loading,
    doctorFollow
  }
}
