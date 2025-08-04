import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { useMenuStore } from '@/stores/menu.js'

const staticRoute = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import('@/login/login.vue'),
  },
  { path: '/' },
]
export const dynamicRouter = {
  path: '/layout',
  name: 'layout',
  meta: {
    title: '首页',
  },
  children: [],
  component: () => import('@/layout/index.vue'),
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoute, dynamicRouter],
})

router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.path === '/') {
    let menuStore = useMenuStore()
    console.log(menuStore.firstMenu)
    return next(menuStore.firstMenu || '/login')
  }

  const userStore = useUserStore()
  if (to.path === '/login') {
    return userStore.token ? next(false) : next()
  }

  if (!userStore.token) {
    // 如果身份不合法重置数据
    userStore.$reset()
    localStorage.clear()
    sessionStorage.clear()
    return next('/login')
  }
  return next()
})

export default router
