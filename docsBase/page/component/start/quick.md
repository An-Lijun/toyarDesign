# 快速上手

## 引入 Toyar
您可以直接引入整个Toyar或者是根据需要仅引入部分组件。

### 全量引入
```JavaScript
import { createApp } from 'vue'
import App from './App.vue'
import toyar from 'toyar-design/dist'
import 'toyar-design/dist/style.css'

createApp(App).use(toyar).mount('#app')

```
### 按需引入
```JavaScript
import { createApp } from 'vue'
import 'toyar-design/dist/style.css'
import {TyButton} from 'toyar-design/dist'

createApp(App).use(TyButton).mount('#app')
```