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

<style lang="scss" scoped>
// 加载动画
@keyframes load {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

// 按钮基础样式
.ty-button {
  display: inline-block;
  line-height: var(--line-height);
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: var(--time-1);
  font-weight: var(--font-weight-5);
  user-select: none;
  border: var(--border-1) solid;
  font-size: var(--font-body-3);
  border-radius: var(--border-radius-4);
  position: relative;

  // 按钮状态主题（primary/success等）
  @mixin btn-state-mixin($state) {
    // 实心按钮
    &--normal.ty-button--#{$state} {
      color: #fff;
      background-color: var(--#{$state}-6);
      border-color: var(--#{$state}-6);

      &:hover, &:focus {
        background: var(--#{$state}-5);
        border-color: var(--#{$state}-5);
      }
      &:active {
        background: var(--#{$state}-7);
        border-color: var(--#{$state}-7);
      }

      // 禁用状态
      &.is-disabled, &.is-readonly {
        cursor: not-allowed;
        color: #fff;
        background: var(--#{$state}-3);
        border-color: var(--#{$state}-3);
      }
    }

    // 次级按钮
    &--secondary.ty-button--#{$state} {
      background: var(--#{$state}-1);
      color: var(--#{$state}-6);
      border-color: var(--#{$state}-1);

      &:hover, &:focus { background: var(--#{$state}-2); }
      &:active {
        background: var(--#{$state}-6);
        color: var(--#{$state}-7);
      }

      // 禁用
      &.is-disabled, &.is-readonly {
        cursor: not-allowed;
        color: var(--#{$state}-3);
        background: var(--#{$state}-1);
        border-color: var(--#{$state}-1);
      }
    }

    // 边框按钮
    &--outline.ty-button--#{$state} {
      background: transparent;
      color: var(--#{$state}-6);
      border-color: var(--#{$state}-6);

      &:hover, &:focus { color: var(--#{$state}-5); border-color: var(--#{$state}-5); }
      &:active { color: var(--#{$state}-7); border-color: var(--#{$state}-7); }
    }

    // 虚线按钮
    &--dashed.ty-button--#{$state} {
      border-style: dashed;
      background: transparent;
      color: var(--#{$state}-6);

      &:hover, &:focus { color: var(--#{$state}-5); }
      &:active { color: var(--#{$state}-7); }
    }

    // 文字按钮
    &--text.ty-button--#{$state} {
      border: none;
      background: transparent;
      color: var(--#{$state}-6);

      &:hover, &:focus { color: var(--#{$state}-5); }
      &:active { color: var(--#{$state}-7); }
    }

    // 统一禁用（边框/虚线/文字）
    &--outline.ty-button--#{$state}.is-disabled,
    &--outline.ty-button--#{$state}.is-readonly,
    &--dashed.ty-button--#{$state}.is-disabled,
    &--dashed.ty-button--#{$state}.is-readonly,
    &--text.ty-button--#{$state}.is-disabled,
    &--text.ty-button--#{$state}.is-readonly {
      cursor: not-allowed;
      color: var(--#{$state}-3);
      border-color: var(--#{$state}-3);
    }

    // 链接按钮
    &--link.ty-button--#{$state} {
      border: none;
      background: transparent;
      color: var(--#{$state}-6);

      span { border-bottom: var(--border-1) solid var(--#{$state}-6); }
      &:hover, &:focus { color: var(--#{$state}-5); span { border-color: var(--#{$state}-5); } }
      &:active { color: var(--#{$state}-7); span { border-color: var(--#{$state}-7); } }

      // 链接禁用
      &.is-disabled, &.is-readonly {
        cursor: not-allowed;
        color: var(--#{$state}-3);
        span { border-color: var(--#{$state}-3); }
      }
    }
  }

  // 循环生成所有主题
  @each $state in primary, success, warning, danger {
    @include btn-state-mixin($state);
  }

  // 按钮形状
  $btn-shape: (
    square: 2,
    round: 16,
    circle: circle
  );
  @each $name, $radius in $btn-shape {
    &--#{$name} {
      border-radius: var(--border-radius-#{$radius});
    }
  }

  // 按钮尺寸
  $btn-size: (
    mini: 1,
    small: 3,
    medium: 3,
    large: 4
  );
  @each $name, $padding in $btn-size {
    &--#{$name} {
      height: var(--size-#{$name});
      line-height: var(--size-#{$name});
      padding: 0 var(--padding-#{$padding});
    }
    // 圆形按钮特殊处理
    &--#{$name}.ty-button--circle {
      width: var(--size-#{$name});
      padding: 0;
    }
  }

  // 通用状态
  &.is-block { width: 100%; }

  // 加载动画
  .is-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: load 1s linear infinite;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .is-opacity { opacity: 0; }
}
</style>