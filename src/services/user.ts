import axios from '@/utils/request'
import type { patientType } from '@/types/user'
export const getUserPatientApi = () => {
  return axios.get<patientType[]>('/patient/mylist')
}
