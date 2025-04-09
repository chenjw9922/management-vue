<template>
  <div class="archive-container">
    <el-card class="user-info-card">
      <div class="user-info">
        <div class="avatar">
          <el-avatar :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </div>
        <div class="info">
          <h3>张三</h3>
          <p>技术部 | 前端开发工程师</p>
          <p>员工ID: 10001</p>
        </div>
      </div>
    </el-card>
    <div class="upload-section">
      <el-upload
        class="upload-demo"
        drag
        action="#"
        multiple
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            支持上传单个或多个文件
          </div>
        </template>
      </el-upload>
    </div>
    
    <div class="file-list-section">
      <h3>已上传文件</h3>
      <el-table :data="fileList" style="width: 100%">
        <el-table-column prop="name" label="文件名" width="180" />
        <el-table-column prop="size" label="大小" width="100" />
        <el-table-column prop="date" label="上传时间" width="180" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handlePreview(scope.row)">
              预览
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'



interface FileItem {
  name: string
  size: string
  date: string
}

const fileList = ref<FileItem[]>([
  {
    name: '档案文件1.pdf',
    size: '2.5MB',
    date: '2023-11-15 10:30'
  },
  {
    name: '档案文件2.docx',
    size: '1.8MB',
    date: '2023-11-14 14:15'
  }
]);




const handlePreview = (file: FileItem) => {
  console.log('预览文件:', file)
}
</script>

<style scoped>
.archive-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.user-info-card {
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info .info h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.user-info .info p {
  margin: 4px 0;
  color: #606266;
  font-size: 14px;
}

.upload-section {
  flex: 1;
  padding: 20px;
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
  background-color: #f5f7fa;
}

.file-list-section {
  flex: 2;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #ffffff;
}

.el-upload {
  width: 100%;
}

.el-upload-dragger {
  width: 100%;
  padding: 40px 0;
}
</style>