<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  menu: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <el-sub-menu :index="title">
    <template #title>{{ title }}</template>
    <template v-for="item in menu">
      <sub-menu
        v-if="item.children && item.children.length > 0"
        :menu="item.children"
        :title="item.meta.title"
      />
      <el-menu-item v-else :index="item.meta.fullPath">
        {{ item.meta.fullPath }}
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>

<style scoped></style>
