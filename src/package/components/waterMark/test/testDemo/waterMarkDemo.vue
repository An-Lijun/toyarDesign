<template>
    <div class="wm-demo">
        <h3>基础用法（文本水印）</h3>
        <TyWaterMark mark-info="toyarDesign" class="block">
            <div class="content">这是受水印保护的内容区域</div>
        </TyWaterMark>

        <h3>数组水印（两行文本）</h3>
        <TyWaterMark :mark-info="['公司名称', '员工工号']" class="block">
            <div class="content">双行水印示例</div>
        </TyWaterMark>

        <h3>自定义样式</h3>
        <TyWaterMark mark-info="CONFIDENTIAL" :options="{
            fontSize: 40,
            fontColor: 'rgba(255,0,0,0.3)',
            rotate: -45 * Math.PI / 180,
            width: 300,
            height: 300
        }" class="block">
            <div class="content">自定义字体大小、颜色、旋转角度</div>
        </TyWaterMark>

        <h3>防篡改水印</h3>
        <TyWaterMark mark-info="PROTECTED" :options="{
            antiTamper: true,
            fontColor: 'rgba(0,0,0,0.1)'
        }" class="block">
            <div class="content">开启防篡改保护（修改 DOM 会自动恢复）</div>
        </TyWaterMark>

        <h3>偏移设置</h3>
        <TyWaterMark mark-info="OFFSET" :options="{
            offsetX: 20,
            offsetY: 20
        }" class="block">
            <div class="content">自定义偏移量</div>
        </TyWaterMark>
    </div>
</template>

<script setup>
defineOptions({ name: 'WaterMarkDemo' })
</script>

<style scoped>
.wm-demo {
    padding: 16px;
}

.block {
    position: relative;
    overflow: hidden;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    margin-bottom: 16px;
}

.content {
    padding: 40px 20px;
    color: #666;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}
</style>
