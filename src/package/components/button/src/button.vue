<template>
  <button
    :type="htmlType"
    :class="[
      nm.b(),
      nm.m(state),
      nm.m(type),
      nm.m(size),
      nm.m(shape),
      nm.is('disabled',mergeDisabled),
      nm.is('block',block),
    ]"
    :disabled="mergeDisabled"
    @click="handleClick"
  >
    <span v-if="type === 'link'">
      <slot></slot>
    </span>
    <slot v-else></slot>
  </button>
</template>

<script setup lang='ts' name="TyButton">
import { computed } from 'vue'
import { buttonProps ,nm} from './context.ts'
import {  inject  } from 'vue'
import {configProviderDisabled} from '../../../hooks/symbolNm'

const props = defineProps(buttonProps)
const inputInject = inject(configProviderDisabled,null)

const mergeDisabled = computed(() => {
  return inputInject?.disabled || props?.disabled
})
</script>
<style lang="scss" scoped>
// ------------------------  按钮base样式  ------------------------
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
  // ------------------------  按钮状态样式  ------------------------
  @mixin addBtnState($state) {
    //基础按钮
    &--normal.ty-button--#{$state} {
      color: var(--text-0);
      background-color: var(--#{$state}-6);
      border-color: var(--#{$state}-6);
      &:hover,
      &:focus {
        background: var(--#{$state}-5);
        border-color: var(--#{$state}-5);
        color: var(--text-0);
      }
      &:active {
        border-color: var(--#{$state}-7);
        background-color: var(--#{$state}-7);
      }
    }
    //基础按钮的禁用样式
    &--normal.ty-button--#{$state}.is-disabled {
      &,
      &:hover,
      &:focus,
      &:active {
        color: var(--text-0);
        cursor: no-drop;
        background-color: var(--#{$state}-3);
        border-color: var(--#{$state}-3);
      }
    }
    //次级按钮
    &--secondary.ty-button--#{$state} {
      background-color: unset;
      color: var(--#{$state}-6);
      border-color: var(--#{$state}-6);

      &:hover,
      &:focus {
        background: unset;
        color: var(--#{$state}-5);
        border-color: var(--#{$state}-5);
      }
      &:active {
        background-color: unset;
        color: var(--#{$state}-7);
        border-color: var(--#{$state}-7);
      }
    }
    // 虚线按钮
    &--dashed.ty-button--#{$state} {
      border: var(--border-1) dashed;
      background-color: unset;
      color: var(--#{$state}-6);
      &:hover,
      &:focus {
        background: unset;
        color: var(--#{$state}-5);
      }
      &:active {
        background-color: unset;
        color: var(--#{$state}-7);
      }
    }
    // 文字按钮
    &--text.ty-button--#{$state} {
      color: var(--#{$state}-6);
      border: unset;
      background: unset;
      &:hover,
      &:focus {
        background: unset;
        color: var(--#{$state}-5);
      }
      &:active {
        color: var(--#{$state}-7);
      }
    }
    //次级按钮 虚线按钮 文字按钮 的禁用状态
    &--secondary.ty-button--#{$state}.is-disabled,
    &--dashed.ty-button--#{$state}.is-disabled,
    &--text.ty-button--#{$state}.is-disabled {
      &,
      &:hover,
      &:focus,
      &:active {
        color: var(--#{$state}-3);
        cursor: no-drop;
        border-color: var(--#{$state}-3);
      }
    }
    // 链接按钮
    &--link.ty-button--#{$state} {
      color: var(--#{$state}-6);
      border: unset;
      background: unset;
      span {
        border-bottom: var(--border-1) solid var(--#{$state}-6);
      }
      &:hover,
      &:focus {
        background: unset;
        color: var(--#{$state}-5);
        span {
          border-bottom: var(--border-1) solid var(--#{$state}-5);
        }
      }
      &:active {
        color: var(--#{$state}-7);
        span {
          border-bottom: var(--border-1) solid var(--#{$state}-7);
        }
      }
    }
    // 链接按钮 的禁用状态
    &--link.ty-button--#{$state}.is-disabled {
      &,
      &:hover,
      &:focus,
      &:active {
        color: var(--#{$state}-3);
        cursor: no-drop;
        border-color: var(--#{$state}-3);
        span {
          border-bottom: var(--border-1) solid var(--#{$state}-3);
        }
      }
    }
  }
  @each $state in 'primary', 'link', 'success', 'warning', 'danger' {
    @include addBtnState($state);
  }

  // ------------------------  按钮圆角样式  ------------------------
  $btnShape: (
    square: (
      2
    ),
    round: (
      8
    ),
    circle: (
      circle
    )
  );

  @mixin addBtnShape($name, $value) {
    &--#{$name} {
      border-radius: var(--border-radius-#{$value});
    }
  }

  @each $name, $value in $btnShape {
    @include addBtnShape($name, $value);
  }

  // ------------------------  按钮尺寸样式  ------------------------
  $btnSize: (
    mini: (
      1
    ),
    small: (
      3
    ),
    medium: (
      3
    ),
    large: (
      4
    )
  );
  @mixin addBtnSize($name, $value) {
    &--#{$name} {
      height: var(--size-#{$name});
      line-height: var(--size-#{$name});
      padding: 0 var(--padding-#{$value});
    }
    &--#{$name}.ty-button-circle {
      height: var(--size-#{$name});
      width: var(--size-#{$name});
      padding: unset;
    }
  }
  @each $name, $value in $btnSize {
    @include addBtnSize($name, $value);
  }

  // ------------------------  按钮block  ------------------------

  &.is-block {
    width: 100%;
  }
}
</style>
