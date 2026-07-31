<template>
    <div class="button-demo">
        <h3>不同状态（state）</h3>
        <TySpace>
            <TyButton state="primary">Primary</TyButton>
            <TyButton state="success">Success</TyButton>
            <TyButton state="warning">Warning</TyButton>
            <TyButton state="danger">Danger</TyButton>
        </TySpace>

        <h3>不同类型（type）</h3>
        <TySpace>
            <TyButton type="normal">Normal</TyButton>
            <TyButton type="secondary">Secondary</TyButton>
            <TyButton type="outline">Outline</TyButton>
            <TyButton type="dashed">Dashed</TyButton>
            <TyButton type="text">Text</TyButton>
            <TyButton type="link">Link</TyButton>
        </TySpace>

        <h3>不同尺寸（size）</h3>
        <TySpace>
            <TyButton size="mini">Mini</TyButton>
            <TyButton size="small">Small</TyButton>
            <TyButton size="medium">Medium</TyButton>
            <TyButton size="large">Large</TyButton>
        </TySpace>

        <h3>不同形状（shape）</h3>
        <TySpace>
            <TyButton shape="square">Square</TyButton>
            <TyButton shape="round">Round</TyButton>
            <TyButton shape="circle">C</TyButton>
        </TySpace>

        <h3>禁用状态</h3>
        <TySpace>
            <TyButton disabled>Disabled</TyButton>
            <TyButton state="success" disabled>Success Disabled</TyButton>
            <TyButton type="outline" disabled>Outline Disabled</TyButton>
        </TySpace>

        <h3>加载中</h3>
        <TySpace>
            <TyButton loading>Loading</TyButton>
            <TyButton state="success" loading>Success Loading</TyButton>
            <TyButton type="outline" loading>Outline Loading</TyButton>
        </TySpace>

        <h3>块级按钮（block）</h3>
        <TyButton block>Block Button</TyButton>

        <h3>HTML 类型</h3>
        <TySpace>
            <TyButton html-type="button">Button</TyButton>
            <TyButton html-type="submit">Submit</TyButton>
            <TyButton html-type="reset">Reset</TyButton>
        </TySpace>

        <h3>自定义标签</h3>
        <TySpace>
            <TyButton tag="div">Div Button</TyButton>
            <TyButton tag="a">A Button</TyButton>
        </TySpace>
    </div>
</template>

<script setup>
defineOptions({ name: 'ButtonDemo' })
</script>

<style scoped>
.button-demo {
    padding: 16px;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}
</style>
