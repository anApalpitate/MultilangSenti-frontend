<script lang="ts" name="SideBar" setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {HomeFilled, Lollipop, Notebook, Setting, SwitchButton, User} from '@element-plus/icons-vue'

// 当前激活菜单
const active = ref('home')
const router = useRouter()

// 菜单项定义
const mainMenu = [
  {cn_name: '首页', icon: HomeFilled, name: 'home', route: '/home'},
  {cn_name: '语料库', icon: Notebook, name: 'corpus', route: '/corpus'},
  {cn_name: '情感分析', icon: Lollipop, name: 'analysis', route: '/analysis'},
  {cn_name: '用户信息', icon: User, name: 'profile', route: '/profile'},
  {cn_name: '设置', icon: Setting, name: 'setting', route: '/setting'},
]

// 点击菜单项
const handleClick = (item: any) => {
  active.value = item.name
  router.push("/MultiLangSenti" + item.route)
}

// 退出登录逻辑
const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
  console.log("退出登录")
}
const openGithub = () => {
  window.open("https://github.com/anApalpitate")
}
</script>

<template>
  <el-aside class="SideBar">
    <!-- 顶部 logo 区域 -->
    <div class="sidebar-title">多语言新闻情感识别平台</div>
    <el-divider style="margin: 0;"/>

    <!-- 主菜单 -->
    <el-menu v-model:selected="active" class="sidebar-menu">
      <template v-for="item in mainMenu" :key="item.name">
        <el-menu-item :index="item.name" @click="handleClick(item)">
          <el-icon>
            <component :is="item.icon"/>
          </el-icon>
          <span>{{ item.cn_name }}</span>
        </el-menu-item>
      </template>
    </el-menu>

    <!-- 底部按钮 -->
    <div class="sidebar-footer">
      <el-button class="logout-btn" @click="handleLogout">
        <el-icon class="logout-ico">
          <SwitchButton/>
        </el-icon>
        退出登录
      </el-button>
      <el-button class="github-btn" @click="openGithub">
        <img alt="GitHub" class="icon-img" src="/github.png?url"/>
        Github
      </el-button>
    </div>
  </el-aside>
</template>

<style scoped>
.SideBar {
  width: 14rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
  border: 1px solid #e5e5e5;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: white;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar-title {
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem;
  color: #303133;
  text-align: center;
}

.sidebar-menu {
  flex: 1;
  border: none;
  padding: 6px 12px;
  margin-bottom: 4px;
  border-radius: 4px;
}

.el-menu-item {
  --el-menu-item-height: 2.5rem;
  border-radius: 0.25rem;
  padding: 0 12px;
  --el-menu-base-level-padding: 1rem;
}

.sidebar-menu .el-menu-item {
  color: #000;
  background-color: white;
}

.el-menu-item:hover {
  background-color: #f4f4f4;
}

.el-menu-item.is-active {
  color: #fff;
  background-image: linear-gradient(195deg, #42424a, #191919);
}

.sidebar-footer {
  display: flex;
  flex-direction: column;
  padding: 0 1rem 1rem;

}

.sidebar-footer .el-button + .el-button {
  margin-left: 0 !important;
}

.github-btn, .logout-btn {
  background-color: white;
  color: #24292f;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
}

.logout-btn {
  margin-bottom: 0.5rem;
}

.logout-btn:hover {
  background-color: #b71c1c;
  color: white;
  cursor: pointer;
}

.icon-img {
  width: 1rem;
  height: 1rem;
  object-fit: contain;
  z-index: 1;
  margin-right: 0.25rem;
}

.logout-ico {
  color: #d32f2f;
  margin-right: .2rem;
}

.logout-btn:hover .logout-ico {
  color: white;
}

</style>