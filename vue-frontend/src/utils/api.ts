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
  
  // 封装文件上传请求
  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB分片大小

const uploadChunk = async (file: File, chunk: Blob, chunkIndex: number, totalChunks: number, fileId: string) => {
  const formData = new FormData();
  formData.append('file', chunk);
  formData.append('chunkIndex', chunkIndex.toString());
  formData.append('totalChunks', totalChunks.toString());
  formData.append('fileId', fileId);
  formData.append('originalName', file.name);
  
  
  return api.post('/file/upload-chunk', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const uploadFile = async (file: File, onProgress?: (progress: number) => void) => {
  try {
    const fileId = Math.random().toString(36).substring(2);
    const fileSize = file.size;
    const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
    
    // 上传所有分片
    const uploadPromises = [];
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(fileSize, start + CHUNK_SIZE);
      const chunk = file.slice(start, end);
      
      uploadPromises.push(uploadChunk(file, chunk, i, totalChunks, fileId));
      
      // 更新进度
      if (onProgress) {
        const progress = ((i + 1) / totalChunks) * 100;
        onProgress(progress);
      }
    }
    
    await Promise.all(uploadPromises);
    
    // 合并分片
    const response = await api.post('/file/merge-chunks', {
      fileId,
      fileName: file.name,
      totalChunks
    });
    
    return response.data;
  } catch (error) {
    console.error('文件上传请求失败:', error);
    throw error;
  }
};
  
  // 封装查询文件列表请求
  const getFileList = async () => {
    try {
      const response = await api.get('/file/list');
      return response.data;
    } catch (error) {
      console.error('查询文件列表请求失败:', error);
      throw error;
    }
  };
  
  export { login, uploadFile, getFileList };