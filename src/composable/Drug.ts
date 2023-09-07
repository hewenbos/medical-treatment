import { getDrugDetailApi } from '@/services/drug'
import type { DrugInfoResponseType } from '@/types/drug'
import { ref } from 'vue'
export const getDrugDetailInfo = (id: string) => {
  const drugInfo = ref<DrugInfoResponseType>()
  const getDrugDetail = async () => {
    const res = await getDrugDetailApi(id)
    drugInfo.value = res.data
    console.log(res)
  }

  return {
    getDrugDetail,
    drugInfo
  }
}
