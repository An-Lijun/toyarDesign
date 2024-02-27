<template>
  <div :class="['ty-avatar', `ty-avatar-${shape}`]">
    <img :src="src" :alt="alt" :style="{
      width: `${size}px`, 
      height: `${size}px`, 
      objectFit: fit
    }"></div>
</template>
<script setup>

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '100'
  },
  shape: {
    type: String,
    default: 'square',
    validator(value) {
      return ['square', 'circle'].includes(value)
    }
  },
  fit: {
    type: String,
    default:'none',
    validator(value) {
      return ['none', 'fill', 'contain', 'cover', 'scale-down'].includes(value)
    }
  },
  alt: {
    type: String
  }
})
</script>
<style lang="scss" scoped>
.ty-avatar {
  display: inline-flex;

  &.ty-avatar-square {
    border-radius: 4px;
    &>img{
      border-radius: 4px;
    }
  }

  &.ty-avatar-circle {
    border-radius: 50%;
    &>img{
      border-radius: 50%;
    }
  }
}
</style>
