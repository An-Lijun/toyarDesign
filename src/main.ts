
import { createApp } from 'vue'
import App from './App.vue'
import toyarUI from './package';
import router from './router';

const app=createApp(App)
app.use(router)
app.use(toyarUI)
app.mount('#app')

