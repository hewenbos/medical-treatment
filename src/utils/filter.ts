import { IllnessTime, ConsultFlag } from '@/enum/couslt'

export const FilterTime = (time: number): string => {
  const timeList = [
    { value: IllnessTime.Week, label: '一周内' },
    { value: IllnessTime.Month, label: '一月内' },
    { value: IllnessTime.HalfYear, label: '半年以内' },
    { value: IllnessTime.More, label: '半年以上' }
  ]

  return timeList.find((item) => item.value == time)?.label as string
}

export const FilterFlag = (flag: number): string => {
  const flagList = [
    { value: ConsultFlag.NoInspect, label: '未就诊' },
    { value: ConsultFlag.YesInspect, label: '以就诊' }
  ]

  return flagList.find((item) => item.value == flag)?.label as string
}
