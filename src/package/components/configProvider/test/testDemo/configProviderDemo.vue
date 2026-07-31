<template>
    <div class="cp-demo">
        <h3>基础用法</h3>
        <TyConfigProvider>
            <div class="content">默认主题（light）</div>
        </TyConfigProvider>

        <h3>自定义主色（resetPrimary）</h3>
        <TyConfigProvider :options="{ resetPrimary: '#52c41a' }">
            <div class="content primary-box">绿色主色</div>
        </TyConfigProvider>

        <h3>自定义令牌（tokens）</h3>
        <TyConfigProvider :tokens="{
            radius: { sm: '12px', md: '20px' },
            fontSize: { base: '16px' },
            shadow: { sm: '0 4px 12px rgba(0,0,0,.15)' }
        }">
            <div class="content token-box">圆角 + 字体 + 阴影</div>
        </TyConfigProvider>

        <h3>自定义颜色调色板</h3>
        <TyConfigProvider :tokens="{
            colors: { brand: ['#e6f7ff', '#bae7ff', '#91d5ff', '#69c0ff', '#40a9ff'] },
            themeColorMap: { primary: 'brand' }
        }">
            <div class="content brand-box">品牌色映射</div>
        </TyConfigProvider>

        <h3>文本层级</h3>
        <TyConfigProvider :tokens="{
            textLevels: { 1: 9, 2: 7, 3: 5 }
        }">
            <div class="content">
                <p style="color: var(--text-1)">文本层级 1</p>
                <p style="color: var(--text-2)">文本层级 2</p>
                <p style="color: var(--text-3)">文本层级 3</p>
            </div>
        </TyConfigProvider>
    </div>
</template>

<script setup>
defineOptions({ name: 'ConfigProviderDemo' })
</script>

<style scoped>
.cp-demo {
    padding: 16px;
}

.content {
    padding: 16px;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    margin-bottom: 8px;
}

.primary-box {
    color: var(--primary-6);
    border-color: var(--primary-5);
}

.token-box {
    border-radius: var(--border-radius-md, 20px);
    font-size: var(--font-base, 16px);
    box-shadow: var(--shadow-sm, none);
}

.brand-box {
    color: var(--primary-6);
    background: var(--primary-1);
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}
</style>
