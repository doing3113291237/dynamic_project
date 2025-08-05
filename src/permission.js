import { useUserStore } from '@/stores/user.js'
import { useMenuStore } from '@/stores/menu.js'
import router from '@/router/index.js'
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
