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
  {
    path: '/home',
    name: 'home',
  },
  { path: '/' },
]
export const dynamicRoute = {
  path: '/layout',
  name: 'layout',
  meta: {
    title: '登录',
  },
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoute, dynamicRoute],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    console.log('看当前用户的menuStore的firstMenu是否有值,有则跳转至firstMenu,没有则/login')
    let menuStore = useMenuStore()
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
