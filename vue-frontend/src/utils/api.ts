import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
});

// 封装登录请求
const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/users/login', {
      username,
      password,
    });
    return {
      ...response.data,
      token: response.data.access_token
    };
  } catch (error) {
    console.error('登录请求失败:', error);
    throw error;
  }
};

export { login };