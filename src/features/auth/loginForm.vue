<script lang="ts" name="LoginForm" setup>
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {login} from '@/api/auth'
import {ElMessage} from "element-plus";

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const router = useRouter()

const handleLogin = async () => {
  if (!username.value || !password.value) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  try {
    const response = await login(username.value, password.value)
    const token = response.data.access_token
    localStorage.setItem('token', token)
    localStorage.setItem('role', token)

    if (rememberMe.value) {
      localStorage.setItem('rememberedUsername', username.value)
      localStorage.setItem('rememberedPassword', password.value)
    } else {
      localStorage.removeItem('rememberedUsername')
      localStorage.removeItem('rememberedPassword')
    }

    ElMessage.success('登录成功，正在跳转...')
    await router.push('/multiLangSenti/home')
  } catch (err: any) {
    const msg = err?.response?.data?.detail || '登录失败，请稍后重试'
    if (msg === '用户名或密码不能为空') {
      ElMessage.warning('用户名和密码不能为空')
    } else if (msg === '请先注册') {
      ElMessage.info('账号不存在，请先注册')
    } else if (msg === '用户名或密码错误') {
      ElMessage.error('用户名或密码错误')
    } else {
      ElMessage.error(msg)
    }
  }
}
onMounted(() => {
  const savedUsername = localStorage.getItem('rememberedUsername')
  const savedPassword = localStorage.getItem('rememberedPassword')
  if (savedUsername && savedPassword) {
    username.value = savedUsername
    password.value = savedPassword
    rememberMe.value = true
  }
})
</script>

<template>
  <div class="login-form">
    <h2 class="title">登录</h2>
    <el-input
        v-model="username"
        class="form-input"
        clearable
        maxlength="20"
        placeholder="用户名"
        prefix-icon="User"
    />
    <el-input
        v-model="password"
        class="form-input"
        maxlength="20"
        placeholder="密码"
        prefix-icon="Lock"
        show-password
        type="password"
    />
    <el-checkbox v-model="rememberMe" class="remember-checkbox">
      记住密码
    </el-checkbox>
    <el-button class="form-button" type="primary" @click="handleLogin">
      登录
    </el-button>
    <el-button class="text-style" @click="() => router.push('/register')">
      没有账号？前往注册
    </el-button>
  </div>
</template>

<style scoped>
.login-form {
  width: 360px;
  padding: 2rem;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  z-index: 1;
}

.title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #303133;
}

.form-input {
  width: 80%;
  margin-bottom: 1rem;
}

.form-button {
  width: 80%;
  margin-top: 0.5rem;

}

.text-style {
  width: 80%;
  margin-top: 0.5rem;
  margin-left: 0;
  background: none;
  border: none;
  color: #409EFF;
  padding: 0;
  cursor: pointer;
  font-weight: normal;
}

.text-style:hover {
  text-decoration: underline;
  background-color: transparent;
}

.remember-checkbox {
  width: 80%;
  margin-bottom: 0.5rem;
  text-align: left;
  justify-content: flex-end;
}
</style>