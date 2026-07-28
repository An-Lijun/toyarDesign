<template>
  <div :class="nm.b()" @click.stop="handleShow" ref="containerRef">
    <div ref="popRef" :class="nm.e('confirm')" v-show="isShowConfirm">
      <main>
        <slot name="content">
          {{ props.content }}
        </slot>
      </main>
      <div :class="nm.e('btnList')">
        <TyButton @click.stop="handleReject" type="secondary" size="mini" v-if="props.showRejectBtn">
          {{ props.rejectText }}
        </TyButton>
        <TyButton @click.stop="handleReslove" size="mini" v-if="props.showResloveBtn">
          {{ props.resloveText }}
        </TyButton>
      </div>
      <div ref="arrowRef" data-popper-arrow :class="nm.e('arrow')">
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script setup>
import { useProps, nm, useEmits } from './context'
import usePopconfirm from './use-popconfirm'

defineOptions({
  name: 'TyPopconfirm'
})

const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const {
  isShowConfirm,
  popRef,
  arrowRef,
  containerRef,
  handleReslove,
  handleReject,
  handleShow
} = usePopconfirm(props, emit)
</script>

<style lang="scss" scoped>
.ty-popconfirm {
  position: relative;
  display: inline;

  &__confirm {
    position: absolute;
    display: block;
    z-index: 99;
    min-width: 180px;
    padding: 20px;
    background-color: var(--tooltip);
    box-shadow: var(--box-shadow-2);
    border-radius: 5px;
    color: #fff;

    &>main {
      text-align: left;
      margin-bottom: 20px;
    }
  }

  &__btnList {
    display: flex;
    justify-content: center;
    align-items: center;

    .ty-button {
      margin: 0 5px;
    }
  }
}


[data-popper-placement="right"] {
  .ty-popconfirm__arrow {
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
  .ty-popconfirm__arrow {
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
  .ty-popconfirm__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    border-color: var(--tooltip) transparent transparent transparent;
    border-color: transparent transparent var(--tooltip) transparent;

    top: -13px;
    z-index: 999;
  }
}

[data-popper-placement="left"] {
  .ty-popconfirm__arrow {
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
  .ty-popconfirm__arrow {
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

</style>
