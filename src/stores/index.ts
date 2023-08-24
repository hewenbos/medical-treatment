import { createPinia } from 'pinia'

import storeStorage from '@/utils/piniaStorage'

const pinia = createPinia()

pinia.use(storeStorage())

export default pinia
