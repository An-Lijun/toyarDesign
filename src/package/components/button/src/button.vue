<template>
  <component :is="tag" :type="htmlType" :class="buttonClasses" :disabled="mergeDisabled" :readonly="mergeReadonly"
    :aria-disabled="mergeDisabled" @click="handleClick">
    <span>
      <!-- 加载图标 -->
      <span v-if="loading" class="is-loading">
        <slot name="loading">
          <TyiLoader2Line />
        </slot>
      </span>
      <!-- 按钮内容 -->
      <span :class="{ 'is-opacity': loading }" v-if="$slots.default">
        <slot />
      </span>
    </span>
  </component>
</template>

<script setup lang="ts" name="TyButton">
import { TyiLoader2Line } from 'toyaricon'
import { buttonProps, nm } from './context.ts'
import useButton from './use-button'
// 组件配置
defineOptions({ name: 'TyButton' })

// Props 定义
const props = defineProps(buttonProps)

// 事件定义
const emits = defineEmits<{
  click: [event: MouseEvent]
}>()

const { htmlType, buttonClasses, loading, handleClick } = useButton(props, emits, nm)

</script>
