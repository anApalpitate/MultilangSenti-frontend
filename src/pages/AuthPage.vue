<script lang="ts" name="AuthPage" setup>
import LoginForm from "@/features/auth/loginForm.vue";
import RegisterForm from "@/features/auth/registerForm.vue";

//定义props
defineProps({
  mode: {
    type: String,
    required: true,
    validator: (value: string) => ['login', 'register'].includes(value)
  }
})
</script>

<template>
  <el-container class="auth-page">
    <div class="auth-bg-mask"></div>
    <login-form v-if="mode === 'login'"/>
    <register-form v-else-if="mode === 'register'"/>
  </el-container>
</template>
<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--el-bg-color);
  padding: 2rem;
  box-sizing: border-box;

  background-image: url('/auth-bg.jpg');
}

.auth-bg-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 0;
}
</style>