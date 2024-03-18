import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/less/index.less'
import store from './store'
import './api/mock.js'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
store.commit('addMenu', router)
function checkRouter(path){
  console.log(router.getRoutes());
  let hasCheck=router.getRoutes().filter(route=>route.path==path).length
  if(hasCheck){
    return true
  }else{
    return false
  }
}
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token=store.state.token
  if(!token&&to.name!=='login'){
    next({name:'login'})
  }else if(!checkRouter(to.path)){
    next({name:'home'})
  }else{
    next()
  }
})
app.use(router).use(store)
app.mount('#app')
