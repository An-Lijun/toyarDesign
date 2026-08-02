<template>
  <div class="dialog-demo">
    <h3>基础用法</h3>
    <TyButton @click="visible1 = true">打开对话框</TyButton>
    <TyDialog v-model="visible1" title="提示" content="这是一个对话框" :is-teleport="false"> </TyDialog>

    <h3>自定义内容（插槽）</h3>
    <TyButton @click="visible2 = true">自定义内容</TyButton>
    <TyDialog v-model="visible2" title="用户协议" :is-teleport="false">
      <p>这里是自定义内容区域</p>
      <p>可以放置任意内容</p>
      <template #footer>
        <TyButton @click="visible2 = false">取消</TyButton>
        <TyButton state="primary" @click="visible2 = false">确定</TyButton>
      </template>
    </TyDialog>

    <h3>无遮罩层</h3>
    <TyButton @click="visible3 = true">无遮罩</TyButton>
    <TyDialog v-model="visible3" :mask="false" title="无遮罩" content="没有遮罩层" :is-teleport="false"> </TyDialog>

    <h3>无下划线</h3>
    <TyButton @click="visible4 = true">无下划线</TyButton>
    <TyDialog v-model="visible4" :is-under-line="false" title="无下划线" content="header无下划线" :is-teleport="false">
    </TyDialog>

    <h3>自定义宽高位置</h3>
    <TyButton @click="visible5 = true">自定义尺寸</TyButton>
    <TyDialog
      v-model="visible5"
      title="自定义"
      width="500px"
      top="50px"
      content="500px宽，50px顶部"
      :is-teleport="false"
    >
    </TyDialog>

    <h3>Teleport 模式（默认）</h3>
    <TyButton @click="visible6 = true">Teleport</TyButton>
    <TyDialog v-model="visible6" title="Teleport" content="渲染到body"> </TyDialog>

    <h3>不可拖拽</h3>
    <TyButton @click="visible7 = true">不可拖拽</TyButton>
    <TyDialog v-model="visible7" :draggable="false" title="不可拖拽" content="header不可拖拽" :is-teleport="false">
    </TyDialog>

    <h3>点击遮罩关闭</h3>
    <TyButton @click="visible8 = true">点击遮罩可关闭</TyButton>
    <TyDialog
      v-model="visible8"
      :mask-closable="true"
      title="点击遮罩关闭"
      content="点击遮罩层可关闭对话框"
      :is-teleport="false"
    >
    </TyDialog>

    <h3>关闭即销毁 vs 保留状态</h3>
    <TyButton @click="visible9 = true">销毁（默认）</TyButton>
    <TyDialog v-model="visible9" :destroy-on-close="true" title="关闭即销毁" :is-teleport="false">
      <p>输入内容后关闭再打开，内容会被清空</p>
      <input class="demo-input" placeholder="输入点内容" />
    </TyDialog>
    <TyButton @click="visible10 = true">保留状态</TyButton>
    <TyDialog v-model="visible10" :destroy-on-close="false" title="保留状态" :is-teleport="false">
      <p>输入内容后关闭再打开，内容仍保留</p>
      <input class="demo-input" placeholder="输入点内容" />
    </TyDialog>

    <h3>按 ESC 关闭</h3>
    <TyButton @click="visible11 = true">按 ESC 可关闭</TyButton>
    <TyDialog
      v-model="visible11"
      :close-on-esc="true"
      title="按 ESC 关闭"
      content="打开后按键盘 ESC 键即可关闭"
      :is-teleport="false"
    >
    </TyDialog>

    <h3>隐藏关闭按钮</h3>
    <TyButton @click="visible12 = true">无关闭按钮</TyButton>
    <TyDialog
      v-model="visible12"
      :is-show-close="false"
      :close-on-esc="true"
      title="无关闭按钮"
      content="header 右侧无 X 按钮，按 ESC 可关闭"
      :is-teleport="false"
    >
    </TyDialog>

    <h3>关闭前回调（二次确认）</h3>
    <TyButton @click="visible13 = true">二次确认关闭</TyButton>
    <TyDialog v-model="visible13" title="关闭前确认" :is-teleport="false" :before-close="handleBeforeClose">
      <p>点击关闭按钮或遮罩时会弹出确认框</p>
      <p>确认后才会真正关闭</p>
    </TyDialog>

    <h3>关闭前回调（异步）</h3>
    <TyButton @click="visible14 = true">异步关闭</TyButton>
    <TyDialog v-model="visible14" title="异步关闭" :is-teleport="false" :before-close="handleAsyncBeforeClose">
      <p>点击关闭后延迟 1 秒再关闭</p>
    </TyDialog>

    <h3>嵌套对话框</h3>
    <TyButton @click="visible15 = true">打开外层对话框</TyButton>
    <TyDialog v-model="visible15" title="外层对话框" :is-teleport="false">
      <p>这是外层对话框内容</p>
      <TyButton @click="visible16 = true">打开内层对话框</TyButton>
      <TyDialog v-model="visible16" title="内层对话框">
        <p>这是内层对话框内容</p>
        <template #footer>
          <TyButton @click="visible16 = false">关闭内层</TyButton>
        </template>
      </TyDialog>
    </TyDialog>

    <h3>全屏对话框</h3>
    <TyButton @click="visible17 = true">打开全屏对话框</TyButton>
    <TyDialog v-model="visible17" :fullscreen="true" title="全屏对话框" content="铺满整个视口" :is-teleport="false">
      <template #footer>
        <TyButton @click="visible17 = false">关闭</TyButton>
      </template>
    </TyDialog>

    <h3>动态切换全屏</h3>
    <TyButton @click="visible18 = true">打开对话框</TyButton>
    <TyButton @click="isFullscreen = !isFullscreen">切换全屏：{{ isFullscreen }}</TyButton>
    <TyDialog
      v-model="visible18"
      :fullscreen="isFullscreen"
      title="动态全屏"
      content="可动态切换全屏状态"
      :is-teleport="false"
    >
    </TyDialog>
  </div>
</template>

<script setup lang="ts">
import { TyButton, TyDialog } from '@/package/index.ts'
defineOptions({ name: 'DialogDemo' })
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
const visible5 = ref(false)
const visible6 = ref(false)
const visible7 = ref(false)
const visible8 = ref(false)
const visible9 = ref(false)
const visible10 = ref(false)
const visible11 = ref(false)
const visible12 = ref(false)
const visible13 = ref(false)
const visible14 = ref(false)
const visible15 = ref(false)
const visible16 = ref(false)
const visible17 = ref(false)
const visible18 = ref(false)
const isFullscreen = ref(false)

// 二次确认：确认后才调用 done 关闭
const handleBeforeClose = done => {
  if (window.confirm('确认要关闭对话框吗？')) {
    done()
  }
}

// 异步关闭：延迟 1 秒后调用 done
const handleAsyncBeforeClose = done => {
  setTimeout(() => {
    done()
  }, 1000)
}
</script>

<style scoped>
.dialog-demo {
  padding: 16px;
}

button {
  margin-right: 8px;
}

h3 {
  margin-top: 24px;
  margin-bottom: 12px;
  color: var(--text-1, #333);
}

.demo-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-2, #d9d9d9);
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
}

.demo-input:focus {
  border-color: var(--primary-6, #165dff);
}
</style>
