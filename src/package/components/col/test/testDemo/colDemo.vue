<template>
    <div class="col-demo">
        <h3>基础栅格（24 列）</h3>
        <TyRow>
            <TyCol :span="12"><div class="content">col-12</div></TyCol>
            <TyCol :span="12"><div class="content">col-12</div></TyCol>
        </TyRow>
        <TyRow>
            <TyCol :span="8"><div class="content">col-8</div></TyCol>
            <TyCol :span="8"><div class="content">col-8</div></TyCol>
            <TyCol :span="8"><div class="content">col-8</div></TyCol>
        </TyRow>
        <TyRow>
            <TyCol :span="6"><div class="content">col-6</div></TyCol>
            <TyCol :span="6"><div class="content">col-6</div></TyCol>
            <TyCol :span="6"><div class="content">col-6</div></TyCol>
            <TyCol :span="6"><div class="content">col-6</div></TyCol>
        </TyRow>

        <h3>偏移（offset）</h3>
        <TyRow>
            <TyCol :span="6" :offset="6"><div class="content">col-6 offset-6</div></TyCol>
            <TyCol :span="6" :offset="6"><div class="content">col-6 offset-6</div></TyCol>
        </TyRow>
        <TyRow>
            <TyCol :span="12" :offset="6"><div class="content">col-12 offset-6</div></TyCol>
        </TyRow>

        <h3>间距（gutter）</h3>
        <TyRow :gutter="20">
            <TyCol :span="8"><div class="content">gutter=20</div></TyCol>
            <TyCol :span="8"><div class="content">gutter=20</div></TyCol>
            <TyCol :span="8"><div class="content">gutter=20</div></TyCol>
        </TyRow>

        <h3>响应式</h3>
        <TyRow>
            <TyCol :span="{ xs: 24, md: 12, lg: 8 }">
                <div class="content">Responsive</div>
            </TyCol>
            <TyCol :span="{ xs: 24, md: 12, lg: 8 }">
                <div class="content">Responsive</div>
            </TyCol>
            <TyCol :span="{ xs: 24, md: 12, lg: 8 }">
                <div class="content">Responsive</div>
            </TyCol>
        </TyRow>
    </div>
</template>

<script setup>
defineOptions({ name: 'ColDemo' })
import { TyRow, TyCol } from '@/package/index.ts'
</script>

<style scoped>
.col-demo {
    padding: 16px;
}

.content {
    background: #f0f0f0;
    padding: 16px 8px;
    text-align: center;
    border-radius: 4px;
    color: #666;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}
</style>
