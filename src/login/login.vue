<script setup>
import { ref } from 'vue'
import { dynamicRoute, dynamic } from '@/router/dynamic.js'
import { useMenuStore } from '@/stores/menu.js'
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'

const loginForm = ref({
  username: '11',
  password: '11',
})
const formRef = ref()
const formRule = ref({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const login = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('发送登录请求')
      new Promise((resolve, reject) => {
        resolve(dynamic)
      }).then((res) => {
        const menuStore = useMenuStore()
        const userStore = useUserStore()
        userStore.token = res.token
        menuStore.menuList = res.data
        // 已经将请求的动态路由存储在menuStore的menuList中,在执行完构建动态路由后,直接router.push(menuStore.firstMenu)
        dynamicRoute(res.data)
        console.log(router.getRoutes())
        router.push('/layout/userMessage/userInfo')
      })
    }
  })
}
</script>

<template>
  <div class="login-form">
    <el-card>
      <template #header>登&nbsp;&nbsp;录</template>
      <el-form :model="loginForm" ref="formRef" :rules="formRule">
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username">
            <template #prefix>
              <i class="iconfont">&#xe60d;</i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password">
            <template #prefix>
              <i class="iconfont">&#xe8b2;</i>
            </template>
          </el-input>
        </el-form-item>
        <el-row style="text-align: center">
          <el-col><el-button type="primary" @click="login">确定</el-button></el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.login-form {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  :deep(.el-card) {
    .el-card__header {
      text-align: center;
      border-bottom: none;
      padding: 20px;
      font-family:
        'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
        '微软雅黑', Arial, sans-serif;
      font-size: 28px;
      font-weight: 700;
    }
    .el-card__body {
      padding: 0 30px 20px 30px;
    }
  }
  :deep(.el-form) {
    width: 30vw;
    //height: 20vh;
    .el-form-item {
      margin-bottom: 20px;
    }
  }
  :deep(.el-input) {
    width: 100%;
  }
}
</style>
