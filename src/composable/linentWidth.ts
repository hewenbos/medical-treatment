import { onMounted, onUnmounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
//兼容性太差
export default function ReSize() {
  const { width } = useWindowSize()
  const widthValue = ref(0)
  onMounted(() => {
    window.addEventListener('resize', WidthSize)
  })

  onUnmounted(() => {
    window.addEventListener('resize', WidthSize)
  })

  const WidthSize = () => {
    widthValue.value = width.value
  }
  return {
    widthValue,
    WidthSize
  }
}
