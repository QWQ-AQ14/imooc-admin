import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 导入全局样式
import './styles/index.scss'
// 导入 svgIcon
import installIcons from '@/icons'
// 导入路由守卫
import './permission'
// filter
import installFilter from '@/filters'
import installDirective from '@/directives'
// 引入echarts
import * as echarts from 'echarts'
import VueTianditu from 'vue-tianditu'

const app = createApp(App)
app.use(echarts)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)
app.use(store).use(router).mount('#app')
app.use(VueTianditu, {
  v: '4.0',
  tk: '2fd531ec7b1b08115c1cd8a665b0a4ea'
})
