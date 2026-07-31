<template>
    <div class="dialog-demo">
        <h3>基础用法</h3>
        <TyButton @click="visible1 = true">打开对话框</TyButton>
        <TyDialog v-model="visible1" title="提示" info="这是一个对话框" :is-teleport="false">
        </TyDialog>

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
        <TyDialog v-model="visible3" :mask="false" title="无遮罩" info="没有遮罩层" :is-teleport="false">
        </TyDialog>

        <h3>无下划线</h3>
        <TyButton @click="visible4 = true">无下划线</TyButton>
        <TyDialog v-model="visible4" :is-under-line="false" title="无下划线" info="header无下划线" :is-teleport="false">
        </TyDialog>

        <h3>自定义宽高位置</h3>
        <TyButton @click="visible5 = true">自定义尺寸</TyButton>
        <TyDialog v-model="visible5" title="自定义" width="500px" top="50px" info="500px宽，50px顶部" :is-teleport="false">
        </TyDialog>

        <h3>Teleport 模式（默认）</h3>
        <TyButton @click="visible6 = true">Teleport</TyButton>
        <TyDialog v-model="visible6" title="Teleport" info="渲染到body">
        </TyDialog>

        <h3>不可拖拽</h3>
        <TyButton @click="visible7 = true">不可拖拽</TyButton>
        <TyDialog v-model="visible7" :draggable="false" title="不可拖拽" info="header不可拖拽" :is-teleport="false">
        </TyDialog>
    </div>
</template>

<script setup>
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
</style>
