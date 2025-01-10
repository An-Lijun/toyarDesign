<template>
  <div :style="{
    width: size + 'px',
    height: size + 'px',

  }" :class="nm.b()">
    <svg viewBox="0 0 100 100">
      <path :d="pathString" :stroke="trailColor" :stroke-width="trailWidth" :fill-opacity="0" />
      <path :d="pathString" :stroke-linecap="strokeLinecap" :stroke="colors" :stroke-width="strokeWidth"
        fill-opacity="0" :style="{
          strokeDasharray: `${Math.PI * 2 * radius}px ${Math.PI * 2 * radius}px`,
          strokeDashoffset: `${((100 - percent) / 100) * Math.PI * 2 * radius}px`,
          transition : 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
        }" />
   
    </svg>
    <div :class="nm.e('inner')">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import { nm, circleProps } from './context'

defineOptions({
  name: 'TyCircle'
})
const props = defineProps(circleProps)

const colors = ref('')

const radius = computed(() => 50 - props.strokeWidth / 2);

const pathString = computed(() => {
  return `M 50,50 m 0,-${radius.value}
        a ${radius.value},${radius.value} 0 1 1 0,${2 * radius.value}
        a ${radius.value},${radius.value} 0 1 1 0,-${2 * radius.value}`;
});

const changeColor = () => {
  colors.value = props.strokeColor;
  if (props.percent == 0) {
    colors.value = props.trailColor;
  }
}
watch(() => props.percent, () => {
  changeColor()
}, { immediate: true })


</script>
<style lang="scss" scoped>
.ty-circle {
  display: inline-block;
  position: relative;

  &__inner {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    line-height: 1;
  }
}
</style>
