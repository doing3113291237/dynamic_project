import router, { dynamicRouter } from './index.js'

// 引入view文件夹所有的vue文件
const modules = import.meta.glob('/src/views/**/*.vue')

/**
 * router在添加时,必须从父级路由到子级路由依次添加
 * */
export const dynamicRoute = (data) => {
  const route = generateDynamicRouter('', data)
  console.log(route)

  for (const item of route) {
    router.addRoute('layout', item)
  }
  // dynamicRouter.children.push(route)
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
        fullPath: `/layout${path ? '/' + path : ''}/${child.path}`,
      },
      component: leaf ? modules[`/src/views/${path}/${child.path}/index.vue`] : undefined,
      children: leaf ? [] : generateDynamicRouter(path + child.path, child.children),
    })
  }
  return result
}

export const dynamic = {
  statusCode: 200,
  data: [
    {
      path: 'userMessage',
      name: 'userMessage',
      meta: {
        title: '第一个孩子',
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
        {
          path: 'userAvatar',
          name: 'userAvatar',
          meta: {
            title: '用户头像',
          },
        },
      ],
    },
    {
      path: 'brother',
      name: 'brother',
      meta: {
        title: '第二个孩子',
      },
      children: [
        {
          // 认为从父级到子级path的拼接最终组件的访问push路径
          path: 'bro',
          name: 'bro',
          meta: {
            title: 'bro',
          },
        },
      ],
    },
  ],
  token: 'token',
}
