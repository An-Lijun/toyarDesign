<template>
  <Teleport to="body" v-if="isTeleport">
    <div :class="[nm.e('wrapper'),nm.is('mask',mask)]" @click.self="handleClose" v-show="model||showValue">
      <transition name="dialog-fade">
        <div
          :class="nm.b()"
          :style="{ width, top }"
          ref="tyDialog"
          v-show="model||showValue"
        >
          <div :class="[nm.e('header'),nm.is('underLine',isUnderLine)]" ref="tyDialogHeader" >
            <slot name="title">
              <span :class="nm.e('title')">
                {{ title }}
              </span>
            </slot>
            <button :class="nm.e('headerBtn')" @click="handleClose">
              <TyiCloseFill ></TyiCloseFill>
            </button>
          </div>
          <div :class="nm.e('body')">
            <slot>
              {{ info }}
            </slot>
          </div>
          <div :class="nm.e('footer')" v-if="useSlots().footer">
            <slot name="footer"> </slot>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
  <div v-else :class="[nm.e('wrapper'),nm.is('mask',mask)]" @click.self="handleClose" v-show="model||showValue">
      <transition name="dialog-fade">
        <div
          :class="nm.b()"
          :style="{ width, top }"
          ref="tyDialog"
          v-show="model||showValue"
        >
          <div :class="[nm.e('header'),nm.is('underLine',isUnderLine)]" ref="tyDialogHeader" >
            <slot name="title">
              <span :class="nm.e('title')">
                {{ title }}
              </span>
            </slot>
            <button :class="nm.e('headerBtn')" @click="handleClose">
              <TyiCloseFill/>
            </button>
          </div>
          <div :class="nm.e('body')">
            <slot>
              {{ info }}
            </slot>
          </div>
          <div :class="nm.e('footer')" v-if="useSlots().footer">
            <slot name="footer"> </slot>
          </div>
        </div>
      </transition>
    </div>
</template>
<script lang="ts" setup>
import { TyiCloseFill } from 'toyaricon'
import { useSlots } from 'vue'
import { useProps, nm, useEmits } from './context'
import useDialog from './use-dialog'

defineOptions({
  name: 'TyDialog'
})

const model = defineModel('modelValue')
const props = defineProps(useProps)
defineEmits(useEmits)

const { showValue, tyDialogHeader, tyDialog, handleClose } = useDialog(model,props)

defineExpose({
  showValue
})
</script>
