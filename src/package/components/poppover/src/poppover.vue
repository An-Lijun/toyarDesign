<template>
  <div :class="nm.b()" v-on="eventMaps" ref="containerRef">
    <div :class="[nm.e('content')]" v-show="isShowConfirm" ref="popRef">
      <main>
        <slot name="content">
          {{ props.content }}
        </slot>
      </main>
      <div ref="arrowRef" data-popper-arrow :class="nm.e('arrow')">
      </div>
    </div>

    <span ref="defaultSlot" style="display: inline-block;">
      <slot></slot>
    </span>
  </div>
</template>
<script setup>
import { useProps, nm, useEmits } from './context'
import usePoppover from './use-poppover'

defineOptions({
  name: 'TyPoppover'
})

const props = defineProps(useProps)

const {
  popRef,
  arrowRef,
  containerRef,
  defaultSlot,
  eventMaps,
  isShowConfirm
} = usePoppover(props)
</script>

<style lang="scss" scoped>
.ty-poppover {
  position: relative;
  display: inline-block;
  color: var(--text-2);

  &__content {
    position: absolute;
    display: block;
    z-index: 99;
    min-width: 180px;
    padding: 20px;
    background-color: var(--tooltip);
    border-radius: 4px;
    border: 1px solid var(--toyar-gray-3);
    z-index: 999;
    color: #fff;

    &>main {
      margin-bottom: 20px;
      text-align: left;
    }
  }
}



[data-popper-placement="right"] {
  .ty-poppover__arrow {
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
  .ty-poppover__arrow {
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
  .ty-poppover__arrow {
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
  .ty-poppover__arrow {
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

[data-popper-placement="right"] {
  .ty-poppover__arrow {
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

[data-popper-placement="top-end"] {
  .ty-poppover__arrow {
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
[data-popper-placement="top-end"] {
  .ty-poppover__arrow {
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
[data-popper-placement="top-start"] {
  .ty-poppover__arrow {
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
[data-popper-placement="bottom-end"] {
  .ty-poppover__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    border-color: transparent transparent var(--tooltip) transparent;

    z-index: 999;
    top: -13px;
  }
}
[data-popper-placement="bottom-start"] {
  .ty-poppover__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    border-color: transparent transparent var(--tooltip) transparent;

    z-index: 999;
    top: -13px;
  }
}
</style>
