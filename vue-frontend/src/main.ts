import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import store from './store/index.ts';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.mount('#app')

// 这里可以根据具体的导入导出结构添加相应的代码
