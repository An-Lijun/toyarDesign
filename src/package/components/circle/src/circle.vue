<template>
  <div :style="{ width: size + 'px', height: size + 'px' }" :class="nm.b()">
    <svg viewBox="0 0 100 100">
      <path :d="pathString" :stroke="trailColor" :stroke-width="trailWidth" fill-opacity="0" />
      <path :d="pathString" :stroke-linecap="strokeLinecap" :stroke="colors" :stroke-width="strokeWidth"
        fill-opacity="0" :style="{
          strokeDasharray: `${Math.PI * 2 * radius}px ${Math.PI * 2 * radius}px`,
          strokeDashoffset: `${((100 - percent) / 100) * Math.PI * 2 * radius}px`,
          transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
        }" />
    </svg>
    <div :class="nm.e('inner')">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { nm, useProps } from "./context";
import useCircle from './use-circle'

defineOptions({
  name: "TyCircle",
});

const props = defineProps(useProps);
const { radius, pathString, colors } = useCircle(props);
</script>
