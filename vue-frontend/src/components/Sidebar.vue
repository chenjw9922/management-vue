<template>
  <div class="sidebar">
    <div class="main-menu">
      <div class="menu-item" @click="toggleCollapse2">
        系统导航
      </div>
      <transition name="slide">
        <div v-if="!collapsed2" class="sub-menu">
          <router-link to="/home">当前首页</router-link>
          <router-link @click="handleLogout" to="/login">返回登录</router-link>
        </div>
      </transition>
    </div>
    <div class="main-menu">
      <div class="menu-item" @click="toggleCollapse">
        后台管理
      </div>
      <transition name="slide">
        <div v-if="!collapsed" class="sub-menu">
          <router-link to="/home/user-management">人员管理</router-link>
          <router-link to="/home/settings">系统设置</router-link>
          <router-link to="/home/reports">报表统计</router-link>
        </div>
      </transition>
    </div>
    
    <div class="main-menu">
      <div class="menu-item" @click="toggleCollapse3">
        页面管理
      </div>
      <transition name="slide">
        <div v-if="!collapsed3" class="sub-menu">
          <router-link to="/home/page1">Page1</router-link>
          <router-link to="/home/page2">Page2</router-link>
          <router-link to="/home/page3">Page3</router-link>
        </div>
      </transition>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import  {useUserStore}  from '../store/user';
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';

const router = useRouter();
const userStore = useUserStore();
const collapsed = ref(true);
const collapsed2 = ref(false);
const collapsed3 = ref(true);
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm(
      '确认退出登录吗?',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    userStore.clearToken();
    router.push('/login');
  } catch {
    // 用户点击取消
  }
};

const toggleCollapse = () => {
  collapsed.value = !collapsed.value;
};
const toggleCollapse2 = () => {
  collapsed2.value =!collapsed2.value; 
}
const toggleCollapse3 = () => {
  collapsed3.value = !collapsed3.value;
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  height: 100vh;
  padding: 6px;
  padding-top: 0;
  background-color: #f5f5f7;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}
.main-menu {
  margin-bottom: 10px;
}

.auth-menu {
  margin-bottom: 10px;
}
.sidebar a {
  display: block;
  margin-bottom: 10px;
  color: #333;
  text-decoration: none;
}
.sidebar a:hover {
  color: #65aff8;
}
.menu-item {
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #dbebe8;
  border-radius: 4px;
}
.menu-item:hover {
  background-color: #83ecfa;
}

.sub-menu {
  overflow: hidden;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>