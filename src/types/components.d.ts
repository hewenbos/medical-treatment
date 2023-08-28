import MyNavBar from '@/components/MyNavBar.vue'
import MyIcons from '@/components/MyIcons.vue'
import MyTabBar from '@/components/MyTabBar.vue'
//给组件定义类型
declare module 'vue' {
  interface GlobalComponents {
    MyNavBar: typeof MyNavBar
    MyIcons: typeof MyIcons
    MyTabBar: typeof MyTabBar
  }
}
