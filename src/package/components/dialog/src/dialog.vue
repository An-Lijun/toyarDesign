<template>
  <Teleport to="body" v-if="isTeleport">
    <!-- @click.self避免冒泡，只有点击自己时才能触发   -->
    <div :class="nm.e('wrapper')" @click.self="handleClose" v-show="model||showValue">
      <transition name="dialog-fade">
        <div
          :class="nm.b()"
          :style="{ width, top }"
          ref="tyDialog"
          v-show="model||showValue"
        >
          <div :class="[nm.e('header'),nm.is('underLine',isUnderLine)]" ref="tyDialogHeader" >
            <slot name="title">
              <!-- 将span放到slot内，这样不仅可以定义title文本，还可以定义样式等 -->
              <span :class="nm.e('title')">
                {{ title }}
              </span>
            </slot>
            <button :class="nm.e('headerBtn')" @click="handleClose">
              <TyiCloseFill ></TyiCloseFill>
            </button>
          </div>
          <div :class="nm.e('body')">
            <!-- 内容可能是除span以外的其他内容，比如列表等，所以在这里使用插槽，并且不规定插槽内具体的标签 -->
            <!-- 并且在这里使用匿名插槽，使用匿名插槽的好处就是不用指定名称，这样在不使用<template v-slot>指定插槽内容的时候，也可以自定义内容 -->
            <slot>
              {{ info }}
            </slot>
          </div>
          <div :class="nm.e('footer')" v-if="useSlots().footer">
            <!-- 如果footer不传递内容，则不显示footer -->
            <slot name="footer"> </slot>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
  <div v-else :class="nm.e('wrapper')" @click.self="handleClose" v-show="model||showValue">
      <transition name="dialog-fade">
        <div
          :class="nm.b()"
          :style="{ width, top }"
          ref="tyDialog"
          v-show="model||showValue"
        >
          <div :class="[nm.e('header'),nm.is('underLine',isUnderLine)]" ref="tyDialogHeader" >
            <slot name="title">
              <!-- 将span放到slot内，这样不仅可以定义title文本，还可以定义样式等 -->
              <span :class="nm.e('title')">
                {{ title }}
              </span>
            </slot>
            <button :class="nm.e('headerBtn')" @click="handleClose">
              <TyiCloseFill/>
            </button>
          </div>
          <div :class="nm.e('body')">
            <!-- 内容可能是除span以外的其他内容，比如列表等，所以在这里使用插槽，并且不规定插槽内具体的标签 -->
            <!-- 并且在这里使用匿名插槽，使用匿名插槽的好处就是不用指定名称，这样在不使用<template v-slot>指定插槽内容的时候，也可以自定义内容 -->
            <slot>
              {{ info }}
            </slot>
          </div>
          <div :class="nm.e('footer')" v-if="useSlots().footer">
            <!-- 如果footer不传递内容，则不显示footer -->
            <slot name="footer"> </slot>
          </div>
        </div>
      </transition>
    </div>
</template>
<script lang="ts" setup name="TyDialog">

import { TyiCloseFill} from 'toyaricon'
import { onMounted, useSlots, ref } from 'vue'
import { dialogProp, dialogEmit, nm } from './context'
defineOptions({
  name:'TyDialog'
})
defineProps(dialogProp)
const emits = defineEmits(dialogEmit)
const model = defineModel('modelValue',{
  required:true
})

let showValue= ref(false)
const tyDialogHeader = ref()
const tyDialog = ref()
let x = 0
let y = 0
onMounted(() => {
  const moveDialog = e => {
    //先获取鼠标在dialog头上点击的位置
    tyDialog.value.style.margin = 0
    let moveX = e.pageX - x
    let moveY = e.pageY - y
    tyDialog.value.style.left = moveX + 'px'
    tyDialog.value.style.top = moveY + 'px'
  }
  tyDialogHeader.value.addEventListener('mousedown', e => {
    x = e.pageX - tyDialog.value.offsetLeft
    y = e.pageY - tyDialog.value.offsetTop
    if (document) {
      document?.addEventListener('mousemove', moveDialog)
    }
  })
  tyDialogHeader.value.addEventListener('mouseup', () => {
    if (document) {
      document?.removeEventListener('mousemove', moveDialog)
    }
  })
})
function handleClose () {
   model.value=false
}
defineExpose({
  showValue
})
</script>