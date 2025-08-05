<script setup>
import { useMenuStore } from '@/stores/menu.js'
import subMenu from './subMenu.vue'
import { ref } from 'vue'
import { computed } from 'vue'
const menuStore = useMenuStore()
// 当前选中的一级菜单path
const activeToMenu = ref('')
// 默认选中第一个一级菜单
if (menuStore.menuList.length > 0) {
  activeToMenu.value = menuStore.menuList[0].meta.fullPath
}
// 根据当前一级菜单获取对应子菜单
const getSubMenu = computed(() => {
  const selected = menuStore.menuList.find(item => item.meta.fullPath === activeToMenu.value)
  return selected?.children || []
})
// 切换一级菜单
const changeSubMenu = (key) => {
  activeToMenu.value = key
}
</script>

<template>
  <el-container>
    <!-- 左侧logo和子菜单 -->
    <el-aside width="300px" class="sidebar">
      <!-- logo -->
      <div class="header-left">logo</div>
      <!-- 子菜单 -->
      <el-menu :default-active="activeToMenu" router class="el-menu" :unique-opened="true" mode="vertical">
        <template v-for="item in getSubMenu" :key="item.meta.fullPath">
          <sub-menu v-if="item.children && item.children.length > 0" :menu="item.children"
            :title="item.meta.fullPath" />
          <el-menu-item v-else :index="item.meta.fullPath">
            {{ item.meta.fullPath }}
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 右侧顶部一级菜单和主内容 -->
      <el-header class="el-header">
        <div class="header-right">
          <el-menu mode="horizontal" :default-active="activeToMenu" @select="changeSubMenu">
            <el-menu-item v-for="menu in menuStore.menuList" :key="menu.meta.fullPath" :index="menu.meta.fullPath">
              {{ menu.meta.fullPath }}
            </el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>


<style scoped lang="scss">
.el-container {
  height: 100vh;
  width: 100vw;

  .el-header {
    width: 1400px;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;

    .header-right {
      width: 100%;
      background-color: pink;
    }
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    background-color: #f0f2f5;

    .header-left {
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-weight: bold;
      background-color: #a0efd7;
    }

    .el-menu {
      flex: 1;
      border-right: none;
      background-color: #9292ef;
    }
  }
}

:deep(.el-sub-menu__icon-more) {
  &::after {
    content: '更多';
    font-weight: 400;
    font-size: 16px;
  }
}
</style>
