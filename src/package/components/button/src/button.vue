<template>
  <button :type="htmlType" :class="[
    nm.b(),
    nm.m(state),
    nm.m(type),
    nm.m(size),
    nm.m(shape),
    nm.is('disabled', mergeDisabled),
    nm.is('readonly', mergeReadonly),
    nm.is('block', block),
  ]" :disabled="mergeDisabled" :readonly="mergeReadonly">
    <span>
      <span v-show="loading" :class="nm.is('loading', loading)">
        <TyIcon style="color: #fff;" icon="ty-loader-2-line"> </TyIcon>
      </span>
      <span :class="nm.is('opacity', loading)">
        <slot></slot>
      </span>
    </span>
  </button>
</template>

<script setup lang='ts' name="TyButton">
import { computed } from 'vue'
import { buttonProps, nm } from './context.ts'
import { inject } from 'vue'
import TyIcon from '../../icon/src/icon.vue'
import { configProviderDisabled } from '../../../hooks/symbolNm'
defineOptions({
  name: 'TyButton'
})
const props = defineProps(buttonProps)

// 当处于input时候需要被input的disabled readonly控制
const inputInject = inject(configProviderDisabled, null) as {
  disabled: boolean,
  readonly: boolean
} | null

const mergeDisabled = computed(() => {
  return inputInject?.disabled || props?.disabled || props?.loading
})

const mergeReadonly = computed(() => {
  return inputInject?.readonly || props?.loading
})
</script>

<style lang="scss" scoped>

@keyframes load{
  0%{
    transform: translate(-50%,-50%) rotate(0deg);
  }
  100%{
    transform:  translate(-50%,-50%) rotate(360deg);
  }
}
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
      color: #fff;
      background-color: var(--#{$state}-6);
      border-color: var(--#{$state}-6);
      &:hover,
      &:focus {
        background: var(--#{$state}-5);
        border-color: var(--#{$state}-5);
        color: #fff;
      }
      &:active {
        border-color: var(--#{$state}-7);
        background-color: var(--#{$state}-7);
      }
    }
    //基础按钮的禁用样式
    &--normal.ty-button--#{$state}.is-readonly,
    &--normal.ty-button--#{$state}.is-disabled {
      &,
      &:hover,
      &:focus,
      &:active {
        color: #fff;
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
    &--secondary.ty-button--#{$state}.is-readonly,
    &--dashed.ty-button--#{$state}.is-readonly,
    &--text.ty-button--#{$state}.is-readonly,
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
    &--link.ty-button--#{$state}.is-readonly,
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
      16
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
    &--#{$name}.ty-button--circle {
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
  .is-loading{
    display: inline-block;
    animation: load 2s linear infinite ;
    position: absolute;
    left: 50%;
    top: 50%;
    
  }
  .is-opacity{
    opacity: 0;
  }
}
</style>
