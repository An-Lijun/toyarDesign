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
import { nm, useProps, useEmits } from './context'
import useDrawer from './use-drawer'

defineOptions({
  name: 'TyDrawer'
})

const props = defineProps(useProps)
const emit = defineEmits(useEmits)
const model = defineModel('modelValue', {
  required: true
})

const { close } = useDrawer(props, model)
</script>
