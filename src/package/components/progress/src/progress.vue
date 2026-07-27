<template>
  <div :class="[nm.b(), nm.m(type)]" :style="style">
    <div
      v-if="type === 'line'"
      :class="nm.e('inner')"
      :style="{
        width: model + '%',
        height: props.strokeWidth + 'px',
        fontSize: props.strokeWidth - 2 + 'px',
        lineHeight: props.strokeWidth + 'px'
      }"
    >
      <span v-if="isShowPer"> {{ model }}% </span>
    </div>
    <div
      v-else
      :style="{
        width: props.width - props.strokeWidth + 'px',
        height: props.width - props.strokeWidth + 'px',
        borderRadius: '50%',
        position: 'absolute',
        background: '#fff',
        textAlign: 'center',
        lineHeight: props.width - props.strokeWidth + 'px',
        color: 'var(--primary-6)'
      }"
    >
      {{ model }}%
    </div>
  </div>
</template>
<script setup>
import { nm, useProps, useEmits } from './context'
import useProgress from './use-progress'

defineOptions({
  name: 'TyProgress'
})

const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const { model, style } = useProgress(props, emit)
</script>
<style lang="scss" scoped>
.ty-progress {
  &--line {
    border-radius: 16px;
    background-color: var(--fill-4);
    display: block;
    width: 100%;
    box-sizing: border-box;

  }
  &__inner {
      background-color: var(--primary-6);
      border-radius: 16px;
      min-height: 5px;
      text-align: right;
      font-size: 5px;
      box-sizing: border-box;
      padding-right: 5px;
      color: #fff;
      transition: width 0.5s;
    }
  &--circle {
    position: relative;
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    border-radius: 50%;
  }
}
</style>
