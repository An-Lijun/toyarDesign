<template>
  <div :class="nm.b()" v-on="eventMaps">
    <div v-show="isShowConfirm">
        <main :style="style" :class="[nm.e('content')]">
          <slot name="content">
            {{ props.content }}
          </slot>
        </main>
      <div :class="[nm.e('arrows'), nm.is(placement)]">
      </div>
    </div>
    <span ref="defaultSlot" style="display: inline-block;">
      <slot></slot>
    </span>
  </div>
</template>
<script setup>
import { useProps, nm, useEmits } from './context'
import useTrigger from './use-trigger'

defineOptions({
  name: 'TyTrigger'
})

const props = defineProps(useProps)

const {
  defaultSlot,
  eventMaps,
  isShowConfirm,
  style
} = useTrigger(props)
</script>

<style lang="scss" scoped>
.ty-trigger {
  position: relative;
  display: inline;
  color: var(--text-2);

  &__arrows {
    display: inline-block;
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid var(--toyar-gray-3);
    bottom: -20px;
    background-color: var(--bg-5);
    transform: rotate(45deg);
    z-index: 95;
    border-radius: 3px;

    &.is-tl {
      position: absolute;
      bottom: 0px;
      left: 50%;
      border-top-color: var(--bg-5);
      transform: translate(-50%, -33px) rotate(45deg);
      border: 1px solid var(--toyar-gray-3);
    }

    &.is-top {
      position: absolute;
      bottom: unset;
      bottom: 0px;
      left: 50%;
      border-top-color: var(--bg-5);
      transform: translate(-50%, -33px) rotate(45deg);
    }

    &.is-tr {
      position: absolute;
      bottom: unset;
      bottom: 0px;
      border-top-color: var(--bg-5);
      transform: translate(-50%, -33px) rotate(45deg);
      right: 0%;
    }

    &.is-bl {
      position: absolute;
      bottom: unset;
      top: 0px;
      left: 0px;
      border-bottom-color: var(--bg-5);
      transform: translate(50%, 39px) rotate(45deg);
    }

    &.is-bottom {
      position: absolute;
      bottom: unset;
      top: 0px;
      left: 50%;
      border-bottom-color: var(--bg-5);
      transform: translate(-50%, 39px) rotate(45deg);
    }

    &.is-br {
      position: absolute;
      bottom: unset;
      top: 0px;
      left: 50%;
      border-bottom-color: var(--bg-5);
      right: 0;
      transform: translate(-50%, 39px) rotate(45deg);
    }
  }

  &__content {
    position: absolute;
    display: block;
    z-index: 99;
    min-width: 180px;
    padding: 20px;
    background-color: var(--bg-5);
    border-radius: 4px;
    border: 1px solid var(--toyar-gray-3);

    &>main {
      margin-bottom: 20px;
      text-align: left;
    }
  }
}
</style>
