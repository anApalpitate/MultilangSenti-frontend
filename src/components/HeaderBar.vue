<script lang="ts" name="HeaderBar" setup>
import {computed, onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import {ElAvatar, ElBreadcrumb, ElBreadcrumbItem} from 'element-plus'
import dayjs from 'dayjs'
import {getMe} from "@/api/auth.ts";
import type {UserDetail} from "@/interface/UserInter.ts";
import {extractRole} from "@/util/userUtil.ts";

// ---------- 路由信息 ----------
const route = useRoute()
const breadcrumb = computed(() => {
  const matched = route.matched.filter(r => r.name)
  return matched.map(item => ({
    name: item.name,
    path: item.path,
  }))
})

// ---------- 时钟 ----------
const currentTime = ref(dayjs().format('YYYY年MM月DD日 HH:mm:ss'))
setInterval(() => {
  currentTime.value = dayjs().format('YYYY年MM月DD日 HH:mm:ss')
}, 1000)

// ---------- 用户信息 ----------
const userInfo = ref<UserDetail | null>(null)
const role = ref<string | null>(null)
onMounted(async () => {
  const res = await getMe()
  userInfo.value = res.data
  role.value = extractRole('cn')
})
</script>

<template>
  <el-header class="header-bar">
    <div class="header-left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
            v-for="(item, index) in breadcrumb"
            :key="index"
            :class="{ active: index === breadcrumb.length - 1 }"
        >
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="header-right">
      <span class="clock">{{ currentTime }}</span>

      <div v-if="userInfo" class="user-info">
        <div class="user-text">
          <div class="user-name">{{ userInfo.username }}</div>
          <div class="user-role">{{ role }}</div>
        </div>
        <el-avatar :size="30" icon="UserFilled"/>
      </div>

    </div>
  </el-header>
</template>

<style scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: transparent;
  height: 60px;
}

.header-left {
  display: flex;
  align-items: center;
}

::v-deep(.el-breadcrumb__item.active .el-breadcrumb__inner) {
  font-weight: bold;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.clock {
  font-size: 14px;
  color: #666;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-text {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #222;
  line-height: 1.4;
  margin-right: .5rem;
}

.user-name {
  font-weight: 600;
  font-size: 15px;
}

.user-role {
  font-size: 13px;
  color: #666;
}
</style>