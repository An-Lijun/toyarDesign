<template>
    <div class="alert-demo">
        <h3>Alert 命令式弹窗</h3>
        <p>点击按钮触发不同类型的 alert 弹窗</p>

        <div class="btn-group">
            <TyButton @click="showInfo">Info 提示</TyButton>
            <TyButton type="success" @click="showSuccess">Success 成功</TyButton>
            <TyButton type="warning" @click="showWarning">Warning 警告</TyButton>
            <TyButton type="danger" @click="showError">Error 错误</TyButton>
        </div>

        <h3>带回调的 Alert</h3>
        <div class="btn-group">
            <TyButton @click="showWithSure">仅确认按钮</TyButton>
            <TyButton @click="showWithCancel">仅取消按钮</TyButton>
            <TyButton @click="showWithBoth">确认 + 取消</TyButton>
        </div>

        <h3>下划线样式</h3>
        <div class="btn-group">
            <TyButton @click="showWithUnderLine">有下划线</TyButton>
            <TyButton @click="showWithoutUnderLine">无下划线</TyButton>
        </div>
    </div>
</template>

<script setup>
import AlertJs from '../../index.ts'

defineOptions({ name: 'AlertDemo' })

const showInfo = () => {
    AlertJs('这是一条普通提示信息', { title: '信息提示', type: 'info', isUnderLine: false })
}

const showSuccess = () => {
    AlertJs('操作已成功完成', { title: '成功', type: 'success', isUnderLine: false })
}

const showWarning = () => {
    AlertJs('请注意此操作可能存在风险', { title: '警告', type: 'warning', isUnderLine: false })
}

const showError = () => {
    AlertJs('操作失败，请重试', { title: '错误', type: 'error', isUnderLine: false })
}

const showWithSure = () => {
    AlertJs('确认要执行此操作吗？', {
        title: '操作确认',
        type: 'info',
        isUnderLine: false,
        sure: {
            text: '确认执行',
            code: () => {
                console.log('用户点击了确认')
            }
        }
    })
}

const showWithCancel = () => {
    AlertJs('确定要取消此操作吗？', {
        title: '取消确认',
        type: 'warning',
        isUnderLine: false,
        cancel: {
            text: '取消操作',
            code: () => {
                console.log('用户点击了取消')
            }
        }
    })
}

const showWithBoth = () => {
    AlertJs('此操作不可撤销，是否继续？', {
        title: '危险操作',
        type: 'error',
        isUnderLine: true,
        sure: {
            text: '继续',
            code: () => {
                console.log('用户选择继续')
            }
        },
        cancel: {
            text: '放弃',
            code: () => {
                console.log('用户选择放弃')
            }
        }
    })
}

const showWithUnderLine = () => {
    AlertJs('标题下方有分割线', { title: '下划线样式', type: 'info', isUnderLine: true })
}

const showWithoutUnderLine = () => {
    AlertJs('标题下方无分割线', { title: '无下划线', type: 'info', isUnderLine: false })
}
</script>

<style scoped>
.alert-demo {
    padding: 16px;
}

.btn-group {
    display: flex;
    gap: 12px;
    margin: 12px 0 24px;
    flex-wrap: wrap;
}

h3 {
    margin-top: 16px;
    color: var(--text-1, #333);
}
</style>
