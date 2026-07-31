<template>
    <div class="button-group-demo">
        <h3>基础用法</h3>
        <TyButtonGroup>
            <TyButton state="primary">查询</TyButton>
            <TyButton state="primary">重置</TyButton>
            <TyButton state="primary">取消</TyButton>
        </TyButtonGroup>

        <h3>不同状态</h3>
        <TyButtonGroup>
            <TyButton state="primary">Primary</TyButton>
            <TyButton state="success">Success</TyButton>
            <TyButton state="warning">Warning</TyButton>
            <TyButton state="danger">Danger</TyButton>
        </TyButtonGroup>

        <h3>不同类型</h3>
        <TyButtonGroup>
            <TyButton type="outline">Outline</TyButton>
            <TyButton type="outline">Outline</TyButton>
            <TyButton type="outline">Outline</TyButton>
        </TyButtonGroup>

        <h3>带禁用按钮</h3>
        <TyButtonGroup>
            <TyButton state="primary">启用</TyButton>
            <TyButton state="primary" disabled>禁用</TyButton>
            <TyButton state="primary">启用</TyButton>
        </TyButtonGroup>

        <h3>带加载按钮</h3>
        <TyButtonGroup>
            <TyButton state="primary">正常</TyButton>
            <TyButton state="primary" loading>加载中</TyButton>
            <TyButton state="primary">正常</TyButton>
        </TyButtonGroup>

        <h3>不同尺寸</h3>
        <TyButtonGroup>
            <TyButton size="mini">Mini</TyButton>
            <TyButton size="small">Small</TyButton>
            <TyButton size="medium">Medium</TyButton>
            <TyButton size="large">Large</TyButton>
        </TyButtonGroup>
    </div>
</template>

<script setup>
defineOptions({ name: 'ButtonGroupDemo' })
</script>

<style scoped>
.button-group-demo {
    padding: 16px;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}
</style>
