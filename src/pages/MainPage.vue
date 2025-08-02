<script lang="ts" name="HomePage" setup>

import HeaderBar from "@/components/HeaderBar.vue";
import SideBar from "@/components/SideBar.vue";
</script>

<template>
  <div class="main-page">
    <SideBar/>
    <div class="content-area">
      <HeaderBar/>
      <main class="main-content">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: var(--bg-white);
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-white);
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: var(--bg-white);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

</style>