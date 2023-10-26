
import { createApp } from 'vue'
import App from './App.vue'
import toyarUI from './package';

document.getElementsByTagName('html')[0].setAttribute('toyar-theme','light');

const app=createApp(App)
app.use(toyarUI)
app.mount('#app')

