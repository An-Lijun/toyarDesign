import './package/assets/base.css'
import './package/assets/light.css'
import './package/assets/dark.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'remixicon/fonts/remixicon.css'//字体图标
import toyarUI from './package';

document.getElementsByTagName('html')[0].setAttribute('toyar-theme','light');

const app=createApp(App)
app.use(toyarUI)
app.mount('#app')

