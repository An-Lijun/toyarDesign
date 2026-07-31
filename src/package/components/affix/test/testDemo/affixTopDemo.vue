<template>
    <div class="affix-top-demo">
        <h3>顶部偏移（offsetTop）</h3>
        <p>offsetTop = 0：滚动到顶部即固定</p>
        <TyAffix :offsetTop="0" class="demo-affix">
            <div class="demo-block">offsetTop: 0</div>
        </TyAffix>

        <p>offsetTop = 100：距离顶部 100px 时固定</p>
        <TyAffix :offsetTop="100" class="demo-affix">
            <div class="demo-block">offsetTop: 100</div>
        </TyAffix>

        <p>offsetTop = 200：距离顶部 200px 时固定</p>
        <TyAffix :offsetTop="200" class="demo-affix">
            <div class="demo-block">offsetTop: 200</div>
        </TyAffix>
    </div>
</template>

<script setup>
defineOptions({ name: 'AffixTopDemo' })
</script>

<style scoped>
.affix-top-demo {
    padding: 12px;
}

.demo-affix {
    margin: 16px 0;
}

.demo-block {
    padding: 8px 16px;
    background: var(--color-primary-600, #1677ff);
    color: #fff;
    border-radius: 4px;
}
</style>
