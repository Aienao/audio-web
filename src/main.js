import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import store from './store';

const app = createApp(App);
// 使用ElementPlus
app.use(ElementPlus);
// 注册element-plus全局图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store);
app.mount('#app');
