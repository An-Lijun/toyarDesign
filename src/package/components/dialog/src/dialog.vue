<template>
  <Teleport to="body" :disabled="!isTeleport">
    <div v-show="model || showValue" :class="[nm.e('wrapper'), nm.is('mask', mask)]" @click.self="handleMaskClick">
      <transition name="dialog-fade">
        <div
          v-if="!destroyOnClose || model || showValue"
          v-show="model || showValue"
          ref="tyDialog"
          :class="nm.b()"
          :style="{ width, top }"
        >
          <div ref="tyDialogHeader" :class="[nm.e('header'), nm.is('underLine', isUnderLine)]">
            <slot name="title">
              <span :class="nm.e('title')">
                {{ title }}
              </span>
            </slot>
            <button v-if="isShowClose" :class="nm.e('headerBtn')" @click="handleClose">
              <TyiCloseFill></TyiCloseFill>
            </button>
          </div>
          <div :class="nm.e('body')">
            <slot>
              {{ info }}
            </slot>
          </div>
          <div v-if="useSlots().footer" :class="nm.e('footer')">
            <slot name="footer"> </slot>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
import { TyiCloseFill } from 'toyaricon'
import { useSlots } from 'vue'
import { useProps, nm, useEmits } from './context'
import useDialog from './use-dialog'

defineOptions({
  name: 'TyDialog'
})

const model = defineModel<boolean>('modelValue')
const props = defineProps(useProps)
defineEmits(useEmits)

const { showValue, tyDialogHeader, tyDialog, handleClose, handleMaskClick } = useDialog(model, props)

defineExpose({
  showValue
})
</script>
