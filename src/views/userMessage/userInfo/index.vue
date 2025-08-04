<template>
  <el-tree
    ref="treeRef"
    style="max-width: 600px"
    :data="data"
    default-expand-all
    node-key="id"
    highlight-current
    show-checkbox
    :props="defaultProps"
    :render-content="renderContent"
  />

  <div class="mt-2">
    <el-button @click="getCheckedNodes">get by node</el-button>
    <el-button @click="getCheckedKeys">get by key</el-button>
    <el-button @click="setCheckedNodes">set by node</el-button>
    <el-button @click="setCheckedKeys">set by key</el-button>
    <el-button @click="resetChecked">reset</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'
import { ElCheckbox } from 'element-plus'

import type { RenderContentContext, TreeInstance } from 'element-plus'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}
type Node = RenderContentContext['node']

const treeRef = ref<TreeInstance>()

const getCheckedNodes = () => {
  console.log(treeRef.value!.getCheckedNodes(true, false).filter((item) => item.disabled !== true))
}
const getCheckedKeys = () => {
  console.log(treeRef.value!.getCheckedKeys(false))
}
const setCheckedNodes = () => {
  treeRef.value!.setCheckedNodes(
    [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 9,
        label: 'Level three 1-1-1',
      },
    ] as Node[],
    false,
  )
}
const setCheckedKeys = () => {
  treeRef.value!.setCheckedKeys([3], false)
}
const resetChecked = () => {
  treeRef.value!.setCheckedKeys([], false)
}

const defaultProps = {
  children: 'children',
  label: 'label',
}

const data: any[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',

        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
const renderContent = (_h: any, { node, data, store }) => {
  console.log(node)
  return h(
    'span',
    { style: 'display: flex; align-items: center;justify-content:space-between;width: 100%;' },
    [
      h('span', node.label),
      h(ElCheckbox, {
        modelValue: node.checked,
        disabled: node.data.disabled,
        indeterminate: node.indeterminate,
        checked: node.data.checked,
        onChange: (val: any) => {
          store.setChecked(data, val, true)
        },
        onClick: (event: Event) => {
          event.stopPropagation()
        },
        style: 'margin-left: 8px;',
      }),
    ],
  )
}
</script>
<style lang="scss" scoped>
.el-tree {
  //background-color: #9292ef;
}
</style>
