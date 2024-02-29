
import { createApp } from 'vue'
import App from './App.vue'
import toyarUI from './package';


const app=createApp(App)
app.use(toyarUI)
app.mount('#app')

