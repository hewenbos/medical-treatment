import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PartialCoulst } from '@/types/couslt'
import { ConsultType, IllnessType } from '@/enum/couslt'
export const useCoulstStore = defineStore('coulst', () => {
  const coulstInfo = ref<PartialCoulst>({})

  //设置问诊类型
  const setType = (type: ConsultType) => {
    coulstInfo.value.type = type
  }

  //设置极速问诊类型
  const setIllnessType = (illnessType: IllnessType) => {
    coulstInfo.value.illnessType = illnessType
  }

  //设置图文问诊 (详情 时间 是否就诊 图片)
  const setIllness = (
    illness: Pick<PartialCoulst, 'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'>
  ) => {
    coulstInfo.value.illnessDesc = illness.illnessDesc
    coulstInfo.value.illnessTime = illness.illnessTime
    coulstInfo.value.consultFlag = illness.consultFlag
    coulstInfo.value.pictures = illness.pictures
  }

  //设置患者id
  const setPatient = (id: string) => {
    coulstInfo.value.patientId = id
  }

  //设置优惠卷
  const setCoupon = (id: string) => {
    coulstInfo.value.couponId = id
  }

  //科室ID
  const setDepId = (depId: string) => {
    coulstInfo.value.depId = depId
  }
  return {
    setType,
    coulstInfo,
    setIllnessType,
    setIllness,
    setPatient,
    setCoupon,
    setDepId
  }
})
