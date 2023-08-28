import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default ({ mode }) => {
  console.log(mode)

  const env = loadEnv(mode, process.cwd())
  console.log(env)

  return defineConfig({
    plugins: [
      vue(),
      Components({
        //不需要vant组件类型
        dts: false,
        //应为已经单独导入了 全局vant样式所以不需要按需导入
        resolvers: [VantResolver({ importStyle: false })]
      }),
      createSvgIconsPlugin({
        // 指定图标⽂件夹，绝对路径（NODE代码）
        iconDirs: [path.resolve(process.cwd(), 'src/icons')]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        [env.VITE_APP_API]: {
          target: 'https://consult-api.itheima.net',
          changeOrigin: true,
          rewrite(path) {
            return path.replace(/^\/dev-api/, '')
          }
        }
      }
    }
  })
}
