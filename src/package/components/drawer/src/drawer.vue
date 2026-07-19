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
import { onMounted, onUnmounted,ref } from 'vue';
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
