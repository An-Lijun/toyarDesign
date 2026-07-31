<template>
    <div class="divRoot">
        <!-- 顶部留白，便于观察固定效果 -->
        <div v-for="item in 5" :key="`top-${item}`">
            <br>
            <hr>
        </div>

        <!-- 顶部偏移 demo -->
        <AffixTopDemo />

        <div v-for="item in 8" :key="`mid-${item}`">
            <br>
            <hr>
        </div>

        <!-- 底部偏移 demo -->
        <AffixBottomDemo />

        <div v-for="item in 8" :key="`mid2-${item}`">
            <br>
            <hr>
        </div>

        <!-- Headless Hook demo -->
        <AffixHookDemo />

        <!-- 底部留白，便于观察底部固定效果 -->
        <div v-for="item in 30" :key="`bottom-${item}`">
            <br>
            <hr>
        </div>
    </div>
</template>

<script setup>
import AffixTopDemo from './testDemo/affixTopDemo.vue'
import AffixBottomDemo from './testDemo/affixBottomDemo.vue'
import AffixHookDemo from './testDemo/affixHookDemo.vue'
</script>

<style>
.mg {
    margin: 0 10px;
}
</style>
