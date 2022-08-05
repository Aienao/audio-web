import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import axios from 'axios';
import store from './store';

const app = createApp(App);
// 使用ElementPlus
app.use(ElementPlus);
// 注册element-plus全局图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store);
// 先获取uuid
axios.get('/api/rest/config/get').finally(() => {
    app.mount('#app')
})
