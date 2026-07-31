<template>
    <div class="badge-demo">
        <h3>不同状态</h3>
        <TySpace>
            <TyBadge :text="1" status="primary">
                <TyButton>primary</TyButton>
            </TyBadge>
            <TyBadge :text="1" status="success">
                <TyButton>success</TyButton>
            </TyBadge>
            <TyBadge :text="1" status="warning">
                <TyButton>warning</TyButton>
            </TyBadge>
            <TyBadge :text="1" status="danger">
                <TyButton>danger</TyButton>
            </TyBadge>
        </TySpace>

        <h3>数字超过 max</h3>
        <TySpace>
            <TyBadge :text="10" :max="5" status="primary">
                <TyButton>max=5, text=10</TyButton>
            </TyBadge>
            <TyBadge :text="150" :max="99" status="danger">
                <TyButton>max=99, text=150</TyButton>
            </TyBadge>
            <TyBadge :text="99" :max="99" status="success">
                <TyButton>max=99, text=99</TyButton>
            </TyBadge>
        </TySpace>

        <h3>点状（dot）</h3>
        <TySpace>
            <TyBadge :dot="true" :text="10" status="primary">
                <TyButton>primary</TyButton>
            </TyBadge>
            <TyBadge :dot="true" :text="10" status="success">
                <TyButton>success</TyButton>
            </TyBadge>
            <TyBadge :dot="true" :text="10" status="warning">
                <TyButton>warning</TyButton>
            </TyBadge>
            <TyBadge :dot="true" :text="10" status="danger">
                <TyButton>danger</TyButton>
            </TyBadge>
        </TySpace>

        <h3>文本内容</h3>
        <TySpace>
            <TyBadge text="新" status="primary">
                <TyButton>新</TyButton>
            </TyBadge>
            <TyBadge text="优化" status="success">
                <TyButton>优化</TyButton>
            </TyBadge>
            <TyBadge :text="0" status="warning">
                <TyButton>0</TyButton>
            </TyBadge>
        </TySpace>

        <h3>自定义图标</h3>
        <TySpace>
            <TyBadge text="优化" status="primary">
                <TyButton>icon</TyButton>
                <template #icon>
                    <TyiArrowDownCircleFill color="#fff" />
                </template>
            </TyBadge>
        </TySpace>
    </div>
</template>

<script setup>
import { TyiArrowDownCircleFill } from 'toyaricon'

defineOptions({ name: 'BadgeDemo' })
</script>

<style scoped>
.badge-demo {
    padding: 16px;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}
</style>
