<template>
    <div class="img-demo">
        <h3>基础用法（默认 square, size=100）</h3>
        <TyImage :src="imgSrc" />

        <h3>圆形图片（shape=circle）</h3>
        <TyImage :src="imgSrc" shape="circle" />

        <h3>不同尺寸</h3>
        <div class="row">
            <TyImage :src="imgSrc" size="50" />
            <TyImage :src="imgSrc" size="100" />
            <TyImage :src="imgSrc" size="150" />
            <TyImage :src="imgSrc" size="200" />
        </div>

        <h3>不同 fit 填充方式</h3>
        <div class="row">
            <div class="fit-item">
                <TyImage :src="imgSrc" size="120" fit="none" />
                <span>none</span>
            </div>
            <div class="fit-item">
                <TyImage :src="imgSrc" size="120" fit="fill" />
                <span>fill</span>
            </div>
            <div class="fit-item">
                <TyImage :src="imgSrc" size="120" fit="contain" />
                <span>contain</span>
            </div>
            <div class="fit-item">
                <TyImage :src="imgSrc" size="120" fit="cover" />
                <span>cover</span>
            </div>
            <div class="fit-item">
                <TyImage :src="imgSrc" size="120" fit="scale-down" />
                <span>scale-down</span>
            </div>
        </div>

        <h3>alt 替代文本</h3>
        <TyImage :src="imgSrc" alt="Vue.js Logo 图片" />

        <h3>组合使用（圆形 + 自定义尺寸 + cover）</h3>
        <TyImage :src="imgSrc" size="160" shape="circle" fit="cover" alt="圆形头像" />
    </div>
</template>

<script setup>
defineOptions({ name: 'ImageDemo' })

const getAssetsFile = (url) => {
    return new URL(url, import.meta.url).href
}
const imgSrc = getAssetsFile('../js.jpg')
</script>

<style scoped>
.img-demo {
    padding: 16px;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}

.row {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}

.fit-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.fit-item span {
    font-size: 12px;
    color: #999;
}
</style>
