<template>
  <div :class="nm.b()" :style="{
    height: height + 'px',
  }" @mouseenter="handlerMouseEnter" @mouseleave="handlerMouseLeave">
    <div :class="nm.e('header')">
        <div :class="nm.e('icon')">
            
        </div>
    </div>
    <div ref="contentRef" :class="nm.e('content')">
      <div v-for="(item, inx) in logArr" :key="inx" :class="nm.e('item')">
          <div :class="nm.e('index')">
              {{ inx+1 }}
          </div>
          <div v-text="itemContent(item)" :class="[nm.e(item.type), nm.e('info')]">
            
          </div>
      </div>
    </div>
    <div :class="nm.e('line')">
</div>
    <div v-if="isClear" :class="nm.e('footer')">
      <slot name="footer">
        <TySpace>
          <TyButton @click="handlerExport" style="margin-right: 10px;">导出</TyButton>

          <TyButton @click="handlerClear" type="secondary" style="margin-right: 10px;">清除</TyButton>
        </TySpace>
      </slot>
    </div>
  </div>
</template>
<script setup>
import { nm, useProps, useEmits } from './context'
import TySpace from '../../space'
import TyButton from '../../button'
import useLogConsole from './use-logConsole'

defineOptions({
  name: 'TyLogConsole'
})

const props = defineProps(useProps)
defineEmits(useEmits)

const { contentRef, logArr, log, handlerMouseEnter, handlerMouseLeave, handlerClear, handlerExport, itemContent } = useLogConsole()

defineExpose({
  log,
  clearLog: handlerClear,
  exportLog: handlerExport
})
</script>
