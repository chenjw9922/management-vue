import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(null);
  const userInfo = ref<{
    username?: string;
    email?: string;
  }>({});

  const setToken = (newToken: string) => {
    token.value = newToken;
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