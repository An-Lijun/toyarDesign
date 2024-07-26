<template>
  <div v-show="scollHeight >= vHeight" :class="[
    nm.b(),
    nm.is('circle', circle)
  ]" @click="back()" ref="backTop">
    <slot>
      <TyIcon icon="ty-arrow-up-s-fill" style="color:#fff;"></TyIcon>
    </slot>
  </div>
</template>
<script lang='ts' setup name='TyBackTop'>
import { onMounted, onBeforeUnmount, ref,shallowRef } from "vue";
import { backTopProps, nm } from './context'

defineOptions({
  name: 'TyBackTop'
})
const props = defineProps(backTopProps)
const backTop = ref();
const el = shallowRef<HTMLElement>()

let scollHeight = ref(0);
let scrollFn = () => {
  scollHeight.value =  el.value?.scrollTop || 0;
}
onMounted(() => {
  el.value = document.querySelector(props.target)
  if(!el.value){
    throw new Error('target is not found')
  }

  if ( el.value ) {
    backTop.value.style.right = props.right + "px";
    backTop.value.style.bottom = props.bottom + "px";
    el.value.addEventListener('scroll', scrollFn)
  }
  
});

function back() {
  el.value?.scrollTo({ top: 0, behavior: 'smooth' })
}
onBeforeUnmount(() => {
  el.value.removeEventListener('scroll', scrollFn)
})
</script>
<style lang="scss" scoped>
.ty-backTop {
  position: absolute ;
  z-index: 97;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-6);
  color: var(--text-white);
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  border-radius: 5px;

  &.is-circle {
    border-radius: var(--border-radius-circle);
  }
}
</style>
