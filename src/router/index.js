import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
import Setting from '@/views/setting'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/setting', name: 'setting', component: Setting }
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})
// 加上全局前置导航守卫
router.beforeEach((to, from, next) => {
  // // 1. 如果是登录路由  放行
  // if (to.path === '/login') return next()
  // // 2. 获取用户信息 如果没有 拦截登录
  // if (!store.getUser().token) return next('/login')
  // // 3. 放行
  // next()
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
