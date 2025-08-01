<script lang="ts" name="RegisterForm" setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {register} from '@/api/auth'
import {ElMessage} from 'element-plus'

const username = ref('')
const password = ref('')
const router = useRouter()

const handleRegister = async () => {
  if (!username.value || !password.value) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  try {
    await register(username.value, password.value)
    ElMessage.success('注册成功！正在跳转登录页...')
    await router.push('/login')
  } catch (err: any) {
    const msg = err?.response?.data?.detail || '注册失败，请稍后重试'
    if (msg === '用户名已被注册')
      ElMessage.error('该用户名已被注册，请更换')
    else if (msg === '用户名不符合规范')
      ElMessage.warning('用户名格式不合法，仅允许字母、数字，长度 4-20,不能以下划线开头')
    else if (msg === '密码不符合规范')
      ElMessage.warning('密码须为6-20位')
    else if (msg === '用户名或密码不能为空')
      ElMessage.warning('请填写完整用户名和密码')
    else
      ElMessage.error(msg)
  }
}

</script>

<template>
  <div class="register-form">
    <h2 class="title">注册</h2>
    <el-input
        v-model="username"
        class="form-input"
        clearable
        maxlength="20"
        placeholder="请输入用户名"
        prefix-icon="User"
    />
    <el-input
        v-model="password"
        class="form-input"
        maxlength="20"
        placeholder="请输入密码"
        prefix-icon="Lock"
        show-password
        type="password"
    />

    <el-button class="form-button" type="primary" @click="handleRegister">
      注册
    </el-button>
    <el-button class="form-button" type="text" @click="() => router.push('/login')">
      已有账号？前往登录
    </el-button>
  </div>
</template>

<style scoped>
.register-form {
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
</style>