<template>
  <div
    class="ty-backTop"
    :class="[
      nm.is('circle',circle)
    ]"
    @click="back()"
    ref="backTop"
    v-show="scollHeight >= vHeight"
  >
    <TyIcon icon="ty-arrow-up-s-fill"></TyIcon>
  </div>
</template>
<script lang='ts' setup name='TyBackTop'>
import { onMounted,onBeforeUnmount,ref} from "vue";
import {backTopProps,nm} from './context'
defineOptions({
  name:'TyBackTop'
})
const props = defineProps(backTopProps)
const backTop = ref();
let scollHeight = ref(0);
let parentNode:Element;
let scrollFn=()=>{
  scollHeight.value = backTop.value.parentNode.scrollTop;
}
onMounted(() => {
  parentNode =backTop.value.parentNode
  if(parentNode){
    backTop.value.style.right = props.right + "px";
    backTop.value.style.bottom = props.bottom + "px";
    parentNode.addEventListener('scroll',scrollFn)
  }
});

function back() {
  var timer = setInterval(() => {
    let top = backTop.value.parentNode.scrollTop;
    let move = parseInt(top/10)
    move= move<=1? 1 :move
    parentNode.scrollTop -= move;
    if (top <= 0) {
      clearInterval(timer);
    }
  }, 50);
}
onBeforeUnmount(()=>{
  parentNode.removeEventListener('scroll',scrollFn)

})
</script>
<style lang="scss" scoped>
.ty-backTop {
  position: fixed;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-1);
  color: var(--text-1);
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  border-radius: 5px;
  &.is-circle {
    border-radius: var(--border-radius-circle);
  }
}

</style>

