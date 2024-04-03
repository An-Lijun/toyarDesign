<template>
  <div :class="[nm.b(),nm.is('fixed',isFixed)]"
  >
    <div :class="nm.e('box')" style="position:absolute;left: 50%; top: 50%; transform: translate(-50%,-50%);"> 
      <TyIcon class="load" color="var(--primary-6)" icon="ty-loader-2-line" ></TyIcon>
    </div>
  </div>
</template>
<script setup>
import TyIcon from '../../icon';
import {lodProps,nm} from './context'
const props = defineProps(lodProps)

</script>
<style lang="scss" scoped>
@keyframes load{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.ty-loading{
  z-index: 99;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: var(--opcity-5);
  position: absolute;
  &__box{
    display: flex;
    align-items: center;
    justify-content: center;
    animation: load 2s linear infinite ;
  }
  &.is-fixed{
    position: fixed;
  }
}
</style>
