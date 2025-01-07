<template>
    <TyLogConsole :logs="logs" style="height: 300px;" ref="logRef">

    </TyLogConsole>
</template>
<script setup>
import { ref, onMounted } from 'vue'

let logs = ref([]);
let index = 0
let timer1
const logRef = ref()
const pushData = () => {
    let item = ["error", "debugger", "warn", "info"];
    let obj = {};
    obj.info = index;
    index++
    obj.type = item[Math.floor(Math.random() * item.length)];
    logRef.value.log(obj)
    if (index > 1010) {
        clearInterval(timer1);
    }
}
onMounted(() => {
    timer1 = setInterval(() => {
        pushData()
    }, 100)
})


</script>
<style lang="scss" scoped></style>