<template>
    <div class="circle-demo">
        <h3>不同百分比</h3>
        <div class="circle-row">
            <TyCircle :percent="0">
                <span>0%</span>
            </TyCircle>
            <TyCircle :percent="25">
                <span>25%</span>
            </TyCircle>
            <TyCircle :percent="50">
                <span>50%</span>
            </TyCircle>
            <TyCircle :percent="75">
                <span>75%</span>
            </TyCircle>
            <TyCircle :percent="100">
                <span>100%</span>
            </TyCircle>
        </div>

        <h3>不同尺寸</h3>
        <div class="circle-row">
            <TyCircle :percent="60" :size="80">
                <span>80px</span>
            </TyCircle>
            <TyCircle :percent="60" :size="120">
                <span>120px</span>
            </TyCircle>
            <TyCircle :percent="60" :size="180">
                <span>180px</span>
            </TyCircle>
        </div>

        <h3>不同进度条宽度</h3>
        <div class="circle-row">
            <TyCircle :percent="70" :stroke-width="4">
                <span>4</span>
            </TyCircle>
            <TyCircle :percent="70" :stroke-width="8">
                <span>8</span>
            </TyCircle>
            <TyCircle :percent="70" :stroke-width="12">
                <span>12</span>
            </TyCircle>
        </div>

        <h3>自定义颜色</h3>
        <div class="circle-row">
            <TyCircle :percent="50" stroke-color="#52c41a" trail-color="#f6ffed">
                <span>绿色</span>
            </TyCircle>
            <TyCircle :percent="50" stroke-color="#ff4d4f" trail-color="#fff1f0">
                <span>红色</span>
            </TyCircle>
            <TyCircle :percent="50" stroke-color="#722ed1" trail-color="#f9f0ff">
                <span>紫色</span>
            </TyCircle>
        </div>

        <h3>端点样式</h3>
        <div class="circle-row">
            <TyCircle :percent="65" stroke-linecap="round">
                <span>round</span>
            </TyCircle>
            <TyCircle :percent="65" stroke-linecap="square">
                <span>square</span>
            </TyCircle>
        </div>
    </div>
</template>

<script setup>
defineOptions({ name: 'CircleDemo' })
</script>

<style scoped>
.circle-demo {
    padding: 16px;
}

.circle-row {
    display: flex;
    gap: 24px;
    align-items: center;
    margin-bottom: 16px;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}

.circle-row span {
    font-size: 14px;
    color: #666;
}
</style>
