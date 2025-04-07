<script setup lang="ts">
import Sidebar from '../../components/Sidebar.vue';
</script>

<template>
  <div class="home-page">
    <Sidebar class="siderbar" />
    <div class="content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  height: 100vh;

  justify-content: space-evenly; /* 尝试均匀分布子元素间距，但可能受子元素布局影响未生效 */
  /* background-color: #f9f9f9; */
}
.siderbar {
 width: 200px; /* 侧边栏宽度 */; 
}

.home-page h1 {
  color: #333;
}

.home-page p {
  color: #666;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
  min-width: 0; /* 防止内容溢出 */
}


</style>