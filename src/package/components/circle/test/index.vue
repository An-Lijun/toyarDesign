<template>
    <div class="divRoot">
        <TyCircle :percent="80">
            <span class="demo-circle-inner" style="font-size: 24px;">80%</span>
        </TyCircle>

        <TyCircle :percent="20">
        </TyCircle>

        <TyCircle :percent="10" strokeColor="red">
        </TyCircle>
    </div>
</template>
<script setup>

</script>
<style lang="scss" scoped></style>