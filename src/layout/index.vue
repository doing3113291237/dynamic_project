<script setup>
import { useMenuStore } from '@/stores/menu.js'
const menuStore = useMenuStore()
console.log(menuStore.menuList)
</script>

<template>
  <el-container>
    <el-header>
      <div class="header-left">测试系统</div>
      <el-menu class="horizontal-menu" mode="horizontal">
        <!--        <el-menu-item v-for="menu in menuStore.menuList">{{ menu.meta.title }}</el-menu-item>-->
        <template v-for="(item, index) in menuStore.menuList" :key="index">
          <el-menu-item :index="item.path">
            <template #title>{{ item.meta.title }}</template>
          </el-menu-item>
        </template>
      </el-menu>
      <div class="header-right"></div>
    </el-header>
    <el-container>
      <el-aside></el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
  <!--  <router-view></router-view>-->
</template>

<style scoped lang="scss">
.el-container {
  height: 100vh;
  width: 100vw;
  .el-header {
    padding: 0;
    display: flex;
    .header-left {
      width: 200px;
      background-color: #a0efd7;
    }
    .el-menu {
      flex: 1;
      background-color: #9292ef;
      max-width: 600px;
    }
    .header-right {
      width: 200px;
      background-color: pink;
    }
  }
  .el-aside {
    width: 200px;
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
