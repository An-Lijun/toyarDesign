<template>
  <button
    :type="htmlType"
    :class="buttonClasses"
    :disabled="mergeDisabled"
    :readonly="mergeReadonly"
    :aria-disabled="mergeDisabled"
    @click="handleClick"
  >
    <span>
      <!-- 加载图标 -->
      <span v-if="loading" class="is-loading">
        <slot name="loading">
          <TyiLoader2Line />
        </slot>
      </span>
      <!-- 按钮内容 -->
      <span :class="{ 'is-opacity': loading }">
        <slot />
      </span>
    </span>
  </button>
</template>

<script setup lang="ts" name="TyButton">
import { computed, inject } from 'vue'
import { TyiLoader2Line } from 'toyaricon'
import { buttonProps, nm } from './context.ts'
import { configProviderDisabled } from '../../../hooks/symbolNm'

// 组件配置
defineOptions({ name: 'TyButton' })

// Props 定义
const props = defineProps(buttonProps)

// 事件定义
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// 注入禁用/只读状态
const inputInject = inject(configProviderDisabled, () => ({
  disabled: false,
  readonly: false
}))

// 合并最终状态（loading 自动禁用 + 继承注入状态）
const mergeDisabled = computed(() =>
  inputInject.disabled || props.disabled || props.loading
)
const mergeReadonly = computed(() =>
  inputInject.readonly || props.loading
)

// 计算按钮 HTML 类型
const htmlType = computed(() => props.type === 'link' ? 'button' : props.type)

// 统一计算所有类名（性能最优）
const buttonClasses = computed(() => [
  nm.b(),
  nm.m(props.state),
  nm.m(props.type),
  nm.m(props.size),
  nm.m(props.shape),
  nm.is('disabled', mergeDisabled.value),
  nm.is('readonly', mergeReadonly.value),
  nm.is('block', props.block),
])

// 加载状态
const loading = computed(() => props.loading)

// 点击事件处理（禁用时不触发）
const handleClick = (event: MouseEvent) => {
  if (mergeDisabled.value || mergeReadonly.value) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

