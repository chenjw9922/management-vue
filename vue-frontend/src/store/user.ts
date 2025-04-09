import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(null);
  const userInfo = ref<{
    username?: string;
    email?: string;
    role?: string;
  }>({});

  const setToken = (newToken: string, role?: string) => {
    token.value = newToken;
    if (role) {
      userInfo.value.role = role;
    }
  };

  const clearToken = () => {
    token.value = null;
  };

  const setUserInfo = (info: { username?: string; email?: string }) => {
    userInfo.value = info;
  };

  const clearUserInfo = () => {
    userInfo.value = {};
  };

  return {
    token,
    userInfo,
    setToken,
    clearToken,
    setUserInfo,
    clearUserInfo
  };
});