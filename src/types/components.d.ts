import MyNavBar from '@/components/MyNavBar.vue'
//给组件定义类型
declare module 'vue' {
  interface GlobalComponents {
    MyNavBar: typeof MyNavBar
  }
}
