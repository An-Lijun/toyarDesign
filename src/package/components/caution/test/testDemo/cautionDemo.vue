<template>
    <div class="caution-demo">
        <h3>不同类型</h3>
        <TyCaution type="info" title="信息提示">
            这是一条信息提示内容
        </TyCaution>
        <TyCaution type="success" title="成功提示">
            这是一条成功提示内容
        </TyCaution>
        <TyCaution type="warning" title="警告提示">
            这是一条警告提示内容
        </TyCaution>
        <TyCaution type="error" title="错误提示">
            这是一条错误提示内容
        </TyCaution>

        <h3>隐藏图标</h3>
        <TyCaution type="info" title="无图标提示" :isShowIcon="false">
            这条提示没有图标
        </TyCaution>

        <h3>自定义图标尺寸</h3>
        <TyCaution type="success" title="大图标" :size="40">
            图标尺寸为 40
        </TyCaution>
        <TyCaution type="success" title="小图标" :size="16">
            图标尺寸为 16
        </TyCaution>

        <h3>仅标题</h3>
        <TyCaution type="info" title="只有标题没有详情" />
        <TyCaution type="warning" title="警告标题" />
    </div>
</template>

<script setup>
defineOptions({ name: 'CautionDemo' })
</script>

<style scoped>
.caution-demo {
    padding: 16px;
}

.caution-demo > * {
    margin-bottom: 12px;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}
</style>
