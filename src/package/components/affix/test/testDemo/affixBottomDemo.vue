<template>
    <div class="affix-bottom-demo">
        <h3>底部偏移（offsetBottom）</h3>
        <p>offsetBottom = 20：距离底部 20px 时固定</p>
        <TyAffix :offsetBottom="20" class="demo-affix">
            <div class="demo-block">offsetBottom: 20</div>
        </TyAffix>

        <p>offsetBottom = 80：距离底部 80px 时固定</p>
        <TyAffix :offsetBottom="80" class="demo-affix">
            <div class="demo-block">offsetBottom: 80</div>
        </TyAffix>
    </div>
</template>

<script setup>
defineOptions({ name: 'AffixBottomDemo' })
</script>

<style scoped>
.affix-bottom-demo {
    padding: 12px;
}

.demo-affix {
    margin: 16px 0;
}

.demo-block {
    padding: 8px 16px;
    background: var(--color-success-600, #52c41a);
    color: #fff;
    border-radius: 4px;
}
</style>
