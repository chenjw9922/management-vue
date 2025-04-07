<template>
  <el-container class="user-management">
    <el-header height="auto">
      <el-card shadow="hover">
        <el-form :inline="true" class="search-section">
          <el-form-item>
            <el-input v-model="searchQuery" placeholder="搜索用户" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-header>
    
    <el-main>
      <el-card shadow="hover">
        <div class="action-buttons">
          <el-button type="primary" @click="handleAddUser">新增用户</el-button>
          <el-button @click="handleBatchImport">批量导入</el-button>
          <el-button @click="handleExport">导出数据</el-button>
        </div>
        
        <el-table :data="userList" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="department" label="部门" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="phone" label="电话" />
          <el-table-column prop="position" label="职位" />
          <el-table-column label="操作" width="180">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <el-pagination
          class="pagination"
          layout="prev, pager, next"
          :total="100"
          :page-size="10"
          @current-change="handlePageChange"
        />
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const searchQuery = ref('');
const userList = ref([
  { id: 1, name: '张三', department: '技术部', email: 'zhangsan@example.com', phone: '13800138001', position: '前端开发' },
  { id: 2, name: '李四', department: '市场部', email: 'lisi@example.com', phone: '13800138002', position: '市场经理' },
  { id: 3, name: '王五', department: '人事部', email: 'wangwu@example.com', phone: '13800138003', position: 'HR主管'}
]);

const handleSearch = () => {
  ElMessage.success('搜索成功');
};

const handleAddUser = () => {
  ElMessage.info('新增用户');
};

const handleBatchImport = () => {
  ElMessage.info('批量导入');
};

const handleExport = () => {
  ElMessage.info('导出数据');
};

const handleEdit = (row: any) => {
  ElMessage.info(`编辑用户 ${row.name}`);
};

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确认删除用户 ${row.name}?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功');
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

const handlePageChange = (currentPage: number) => {
  console.log('当前页:', currentPage);
};
</script>

<style scoped>
.user-management {
  height: 100%;
}

.search-section {
  margin-bottom: 20px;
}

.action-buttons {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>