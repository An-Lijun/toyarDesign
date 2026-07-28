<template>
  <transition>
    <div :class="nm.b()" ref="containerRef" v-on="eventMaps">
      <div :class="nm.e('tip')" v-show="isShowTip" ref="popRef">
        {{ props.content }}
        <div ref="arrowRef" data-popper-arrow :class="nm.e('arrow')">
        </div>
      </div>
      <span>
        <slot></slot>
      </span>
    </div>
  </transition>
</template>
<script setup>
import { useProps, nm, useEmits } from './context'
import useTooltip from './use-tooltip'

defineOptions({
  name: 'TyTooltip'
})

const props = defineProps(useProps)

const {
  eventMaps,
  isShowTip,
  popRef,
  arrowRef,
  containerRef
} = useTooltip(props)
</script>

<style lang="scss" scoped>
.ty-tooltip {
  position: relative;
  display: inline-block;

  &:hover {
    cursor: pointer;
  }

  &__tip {
    position: absolute;
    display: inline-block;
    z-index: 99;
    background-color: var(--tooltip);
    border-radius: 5px;
    min-height: 30px;
    line-height: 30px;
    padding: 0 5px;
    white-space: auto;
    color: #fff;
    text-align: center;
  }

  &__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    border-color: transparent transparent var(--tooltip) transparent;
    z-index: 999;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity .3s ease-out, transform .3s ease-out;
  opacity: 1;
  transform: scaleY(1);
  transform-origin: center top;
}

[data-popper-placement="right"] {
  .ty-tooltip__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    border-color: transparent var(--tooltip) transparent transparent;
    left: -13px;
    z-index: 999;
  }
}

[data-popper-placement="top"] {
  .ty-tooltip__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    border-color: var(--tooltip) transparent transparent transparent;
    z-index: 999;
    bottom: -13px;
  }
}

[data-popper-placement="bottom"] {
  .ty-tooltip__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    border-color: transparent transparent var(--tooltip) transparent;
    top: -13px;
    z-index: 999;
  }
}

[data-popper-placement="left"] {
  .ty-tooltip__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    border-color: transparent transparent transparent var(--tooltip);
    right: -13px;
    z-index: 999;
  }
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
