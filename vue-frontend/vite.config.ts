import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * Vite 配置
 * 文档: https://vite.dev/config/
 */
export default defineConfig({
  plugins: [
    vue(), // Vue插件
    visualizer({
      open: true, // 构建完成后自动打开分析报告
      gzipSize: true, // 显示gzip压缩后的大小
      brotliSize: true, // 显示brotli压缩后的大小
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve((globalThis as any).process?.cwd() || __dirname, 'src'), // 设置路径别名
    },
  },
  build: {
    sourcemap: process.env.NODE_ENV !== 'production', // 生产环境不生成sourcemap
    minify: 'terser', // 使用terser进行代码压缩
    terserOptions: {
      compress: {
        drop_console: true, // 移除console
        drop_debugger: true, // 移除debugger
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'], // 将vue相关库单独打包
          vendor: ['pinia'], // 将状态管理库单独打包
        },
        chunkFileNames: 'js/[name]-[hash].js', // 输出文件名格式，带hash防止缓存
        assetFileNames: 'assets/[name]-[hash][extname]', // 静态资源文件名格式，带hash防止缓存
      },
    },
    outDir: 'dist', // 输出目录
    assetsDir: 'assets', // 静态资源目录
    emptyOutDir: true, // 构建前清空输出目录
  },
})
