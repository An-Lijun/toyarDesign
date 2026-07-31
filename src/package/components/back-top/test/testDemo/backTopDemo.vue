<template>
    <div class="back-top-demo" style="position: relative;">
        <div class="scroll-container">
            <div v-for="item in 100" :key="item" class="scroll-item">
                <h1>滚动内容 {{ item }}</h1>
            </div>
        </div>

        <h3 class="demo-title">基础用法（文字插槽）</h3>
        <TyBackTop vHeight="450" right="280" bottom="50" target=".scroll-container">
            UP
        </TyBackTop>

        <h3 class="demo-title">默认图标</h3>
        <TyBackTop vHeight="450" right="220" bottom="50" target=".scroll-container">
        </TyBackTop>

        <h3 class="demo-title">圆形样式</h3>
        <TyBackTop vHeight="450" right="160" bottom="50" circle target=".scroll-container">
        </TyBackTop>

        <h3 class="demo-title">低阈值（vHeight=50）</h3>
        <TyBackTop vHeight="50" right="100" bottom="50" circle target=".scroll-container">
            <span style="color: #fff; font-size: 12px;">顶部</span>
        </TyBackTop>
    </div>
</template>

<script setup>
defineOptions({ name: 'BackTopDemo' })
</script>

<style scoped>
.back-top-demo {
    padding: 16px;
}

.scroll-container {
    height: 800px;
    max-height: 500px;
    overflow: scroll;
    border: 1px solid #eee;
    border-radius: 4px;
}

.scroll-item {
    padding: 8px 16px;
}

.demo-title {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 4px 12px;
    border-radius: 0 0 4px 4px;
    font-size: 12px;
    z-index: 9999;
}
</style>
