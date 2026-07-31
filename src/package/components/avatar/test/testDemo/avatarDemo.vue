<template>
    <div class="avatar-demo">
        <h3>基础用法</h3>
        <TySpace>
            <TyAvatar style="background-color: aqua;" :width="50">123456789</TyAvatar>
            <TyAvatar style="background-color: chocolate;">A</TyAvatar>
            <TyAvatar style="background-color: skyblue;" :width="50">你好</TyAvatar>
        </TySpace>

        <h3>不同形状</h3>
        <TySpace>
            <TyAvatar style="background-color: skyblue;" shape="circle">圆形</TyAvatar>
            <TyAvatar style="background-color: skyblue;" shape="square">方形</TyAvatar>
            <TyAvatar style="background-color: skyblue;">默认</TyAvatar>
        </TySpace>

        <h3>不同尺寸</h3>
        <TySpace align="center">
            <TyAvatar style="background-color: mediumpurple;" :width="30">S</TyAvatar>
            <TyAvatar style="background-color: mediumpurple;" :width="50">M</TyAvatar>
            <TyAvatar style="background-color: mediumpurple;" :width="80">L</TyAvatar>
            <TyAvatar style="background-color: mediumpurple;" :width="120">XL</TyAvatar>
        </TySpace>

        <h3>带触发器</h3>
        <TySpace>
            <TyAvatar style="background-color: skyblue;" shape="square" :width="60">
                666
                <template #trigger>
                    <TyiInformationFill :size="14" />
                </template>
            </TyAvatar>
            <TyAvatar style="background-color: skyblue;" shape="square" :width="150">
                666
                <template #trigger>
                    <TyiInformationFill :size="14" />
                </template>
            </TyAvatar>
        </TySpace>

        <h3>autoSize 关闭</h3>
        <TySpace>
            <TyAvatar style="background-color: salmon;" :width="50" :autoSize="false">很长的文字</TyAvatar>
            <TyAvatar style="background-color: salmon;" :width="50" :autoSize="true">很长的文字</TyAvatar>
        </TySpace>
    </div>
</template>

<script setup>
import TyiInformationFill from 'toyaricon/TyiInformationFill'

defineOptions({ name: 'AvatarDemo' })
</script>

<style scoped>
.avatar-demo {
    padding: 16px;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}
</style>
