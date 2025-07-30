import { useMenuStore } from '@/stores/menu.js'
import {dynamicRoute} from './index.js'
export const generateDynamicRoute = () => {
  const menuStore = useMenuStore()
  // 在login时已经将返回值存储在menuStore的menuList中
  if (menuStore.menuList) {
    // 如果有值,则需要遍历生成store,并存放在router文件夹下的index.js暴露的dynamicRoute对象
    dynamicRoute.children = getLeaf('/layout',menuStore.menuList)
  }
}

/**
 * @param parentPath 父阶段的path
 * @param children 父节点的孩子
 * @return router 构建完成的子路由数组
 * */
const getLeaf = (parentPath, children) => {
  // 遍历数组
  for (const item of children) {
    // 如果有孩子代表不是叶子节点,把当前节点的path丢进去,继续遍历,期待的返回值为处理好的router对象,且该router对象应该拼会item.children上
    if (item.children) {
      item.children = getLeaf(parentPath + item.path, item.children)
      continue
    }
    // 如果没有孩子代表当前节点为孩子节点,使用parentPath+item.path为当前页面的push路径,components引入也使用该路径
    // 由于login后进入的所有页面都在layout下,因此push时,应该相对于/layout进行全路径拼接, 如 /layout/parent/child
    item.components = import()
  }
}

export const dynamicRoute = {
  statusCode: 200,
  data: [
    {
      path: '/parent',
      name: 'parent',
      meta: {
        title: '第一个孩子',
      },
      children: [
        {
          // 认为从父级到子级path的拼接最终组件的访问push路径
          path: '/child',
          name: 'child',
        },
      ],
    },
  ],
}
