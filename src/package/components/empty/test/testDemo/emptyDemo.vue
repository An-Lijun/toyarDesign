<template>
    <div class="empty-demo">
        <h3>基础用法（默认 title + size=54）</h3>
        <TyEmpty />

        <h3>自定义 title</h3>
        <TyEmpty title="列表为空，请先添加数据" />

        <h3>自定义图标尺寸 size</h3>
        <div class="size-row">
            <div class="size-item">
                <TyEmpty :size="24" title="size=24" />
            </div>
            <div class="size-item">
                <TyEmpty :size="40" title="size=40" />
            </div>
            <div class="size-item">
                <TyEmpty :size="54" title="size=54(默认)" />
            </div>
            <div class="size-item">
                <TyEmpty :size="80" title="size=80" />
            </div>
            <div class="size-item">
                <TyEmpty :size="120" title="size=120" />
            </div>
        </div>

        <h3>自定义 icon 插槽</h3>
        <TyEmpty title="网络错误，点击重试">
            <template #icon>
                <TyiEmotionUnhappyLine size="54" />
            </template>
        </TyEmpty>

        <h3>自定义 icon 插槽 + 大尺寸</h3>
        <TyEmpty title="暂无消息" :size="100">
            <template #icon>
                <TyiMailLine size="100" />
            </template>
        </TyEmpty>

        <h3>组合使用（自定义 title + size + icon）</h3>
        <TyEmpty title="购物车为空，快去挑选商品吧" :size="64">
            <template #icon>
                <TyiShoppingBagLine size="64" />
            </template>
        </TyEmpty>
    </div>
</template>

<script setup>
defineOptions({ name: 'EmptyDemo' })
import {
    TyiEmotionUnhappyLine,
    TyiMailLine,
    TyiShoppingBagLine
} from 'toyaricon'
</script>

<style scoped>
.empty-demo {
    padding: 16px;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}

.size-row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    flex-wrap: wrap;
}

.size-item {
    flex: 1;
    min-width: 120px;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 4px;
}
</style>
