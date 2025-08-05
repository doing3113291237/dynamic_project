import router, { dynamicRouter } from './index.js'
import { useMenuStore } from '@/stores/menu.js'
// 引入view文件夹所有的vue文件
const modules = import.meta.glob('/src/views/**/*.vue')

/**
 * router在添加时,必须从父级路由到子级路由依次添加
 * */
export const dynamicRoute = (data) => {
  const route = generateDynamicRouter('/', data)
  const menuStore = useMenuStore()

  for (const item of route) {
    // dynamicRouter.children.push(item)
    console.log(item)
    router.addRoute('layout', item)
  }
  menuStore.menuList = route
}

const generateDynamicRouter = (path, children) => {
  let result = []
  for (const child of children) {
    let leaf = !(child.children && child.children.length > 0)
    result.push({
      path: child.path,
      name: child.name,
      meta: {
        title: child.meta.title,
        fullPath: `/layout${path + child.path}`,
      },
      component: leaf ? modules[`/src/views${path + child.path}/index.vue`] : undefined,
      children: leaf ? [] : generateDynamicRouter(path + child.path + '/', child.children),
    })
  }
  return result
}

const getFirstLeaf = (routes) => {
  return routes.length > 0
    ? routes[0].children
      ? getFirstLeaf(routes[0].children.fullPath)
      : routes.meta.title
    : ''
}

export const dynamic = {
  statusCode: 200,
  data: [
    {
      path: 'article',
      name: 'article',
      meta: {
        title: '文章',
      },
      children: [
        {
          // 认为从父级到子级path的拼接最终组件的访问push路径
          path: 'content',
          name: 'content',
          meta: {
            title: '内容',
          },
        },
        {
          path: 'comment',
          name: 'comment',
          meta: {
            title: '评论',
          },
        },
      ],
    },
    {
      path: 'user',
      name: 'user',
      meta: {
        title: '用户',
      },
      children: [
        {
          // 认为从父级到子级path的拼接最终组件的访问push路径
          path: 'userInfo',
          name: 'userInfo',
          meta: {
            title: '用户信息',
          },
        },
      ],
    },
  ],
  token: 'token',
}
