<template>
  <Teleport to="body">
    <div :class="[nm.bem('container')]">

      <div :class="[nm.bem('shadow')]" @click="close" v-show="model">
      </div>
      <Transition name="drawer" mode="out-in" :style="{
          width: width + 'px',
          '--setWidth': width + 'px'
        }" v-show="model">
            
        <div :class="[nm.b()]">
          <!-- <div :class="nm.e('handleBar')">
            <slot name="handleBar"></slot>
          </div> -->
          <header :class="nm.e('header')">
            <slot name="header"></slot>
          </header>
          <main :class="nm.e('main')">
            <slot />
          </main>
          <footer :class="nm.e('footer')">
            <slot name="footer"></slot>
          </footer>
        </div>
      </Transition>
    </div>
  </Teleport>

</template>
<script setup>
import { dProps, nm, dEmits } from './context'
import { onMounted, onUnmounted } from 'vue';
defineOptions({
  name: 'TyDrawer'
})

const props = defineProps(dProps)
const emit = defineEmits(dEmits)
const model = defineModel('modelValue',{
  required:true
})

let close = () => {
  model.value = false
}


</script>
<style lang="scss" scoped>
.ty-drawer-container {
  .drawer-enter-active {
    transition: all 0.5s ease-out;
  }

  .drawer-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .drawer-enter-from,
  .drawer-leave-to {
    transform: translateX(var(--setWidth));
  }

  .ty-drawer-shadow {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background-color: var(--opcity-5);
    z-index: 1000;
  }

  .ty-drawer {
    height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
    background-color: var(--color-bg-3);
    z-index: 1001;
    display: flex;
    flex-direction: column;
  }
  // .ty-drawer__handleBar{
  //   position: absolute;
  //   left: -50px;
  //   width: 50px;
  //   height: 80px;
  //   background-color: red;
  //   top: 50%;
  //   transform: translateY(-50%);
  // }
  
  .ty-drawer__header {
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    border-bottom: 1px solid var(--border-color-3);
    color: var(--text-1);
  }

  .ty-drawer__main {
    position: relative;
    flex: 1;
    box-sizing: border-box;
    height: 100%;
    padding: 12px 16px;
    overflow: auto;
    color: var(--text-2);
    flex: 1;
  }

  .ty-drawer__footer {
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 16px;
    text-align: right;
    border-top: 1px solid var(--border-color-3);
  }
}
</style>
