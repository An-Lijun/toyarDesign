<template>
    <div class="avatar-group-demo">
        <h3>圆形头像组</h3>
        <TyAvatarGroup>
            <TyAvatar style="background-color: aqua;" shape="circle">A</TyAvatar>
            <TyAvatar style="background-color: chocolate;" shape="circle">B</TyAvatar>
            <TyAvatar style="background-color: skyblue;" shape="circle">C</TyAvatar>
            <TyAvatar style="background-color: salmon;" shape="circle">D</TyAvatar>
            <TyAvatar style="background-color: mediumpurple;" shape="circle">E</TyAvatar>
        </TyAvatarGroup>

        <h3>方形头像组</h3>
        <TyAvatarGroup>
            <TyAvatar style="background-color: aqua;" shape="square">A</TyAvatar>
            <TyAvatar style="background-color: chocolate;" shape="square">B</TyAvatar>
            <TyAvatar style="background-color: skyblue;" shape="square">C</TyAvatar>
            <TyAvatar style="background-color: salmon;" shape="square">D</TyAvatar>
            <TyAvatar style="background-color: mediumpurple;" shape="square">E</TyAvatar>
        </TyAvatarGroup>

        <h3>最大显示数（max=3）</h3>
        <TyAvatarGroup :max="3">
            <TyAvatar style="background-color: aqua;" shape="circle">1</TyAvatar>
            <TyAvatar style="background-color: chocolate;" shape="circle">2</TyAvatar>
            <TyAvatar style="background-color: skyblue;" shape="circle">3</TyAvatar>
            <TyAvatar style="background-color: salmon;" shape="circle">4</TyAvatar>
            <TyAvatar style="background-color: mediumpurple;" shape="circle">5</TyAvatar>
            <TyAvatar style="background-color: pink;" shape="circle">6</TyAvatar>
        </TyAvatarGroup>

        <h3>自定义偏移量（offset=20）</h3>
        <TyAvatarGroup :offset="20">
            <TyAvatar style="background-color: aqua;" shape="circle">A</TyAvatar>
            <TyAvatar style="background-color: chocolate;" shape="circle">B</TyAvatar>
            <TyAvatar style="background-color: skyblue;" shape="circle">C</TyAvatar>
        </TyAvatarGroup>
    </div>
</template>

<script setup>
defineOptions({ name: 'AvatarGroupDemo' })
</script>

<style scoped>
.avatar-group-demo {
    padding: 16px;
}

h3 {
    margin-top: 24px;
    margin-bottom: 12px;
    color: var(--text-1, #333);
}
</style>
