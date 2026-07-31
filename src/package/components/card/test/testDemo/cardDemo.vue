<template>
    <div class="card-demo">
        <h3>基础用法</h3>
        <TyCard>
            <template #header>
                <div>卡片标题</div>
            </template>
            这是卡片的内容区域
        </TyCard>

        <h3>无边框</h3>
        <TyCard :border="false">
            <template #header>
                <div>无边框卡片</div>
            </template>
            没有边框的卡片内容
        </TyCard>

        <h3>常驻阴影</h3>
        <TyCard shadow="shadow">
            <template #header>
                <div>阴影卡片</div>
            </template>
            带常驻阴影的卡片内容
        </TyCard>

        <h3>悬浮阴影</h3>
        <TyCard shadow="hover">
            <template #header>
                <div>悬浮阴影卡片</div>
            </template>
            鼠标悬浮时显示阴影
        </TyCard>

        <h3>加载中</h3>
        <TyCard :isLoading="loading">
            <template #header>
                <div>加载状态卡片</div>
            </template>
            加载完成后显示的内容
        </TyCard>

        <h3>无 header</h3>
        <TyCard>
            只有内容没有标题的卡片
        </TyCard>

        <h3>复杂 header</h3>
        <TyCard shadow="hover">
            <template #header>
                <div class="complex-header">
                    <span class="title">复杂标题</span>
                    <span class="extra">附加信息</span>
                </div>
            </template>
            <p>段落内容一</p>
            <p>段落内容二</p>
        </TyCard>
    </div>
</template>

<script setup>
defineOptions({ name: 'CardDemo' })

const loading = ref(true)
setTimeout(() => {
  loading.value = false
}, 3000)
</script>

<style scoped>
.card-demo {
    padding: 16px;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}

.complex-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    font-weight: bold;
}

.extra {
    color: #999;
    font-size: 12px;
}
</style>
