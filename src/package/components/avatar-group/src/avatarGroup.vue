<template>
  <div :class="[nm.b()]">
    <template v-for="(avatar, index) in avatars" :key="index">
      <component :is="avatar" />
    </template>
  </div>
</template>

<script setup lang="ts" name="TyAvatarGroup">
import { useProps, nm } from './context.ts'
import useAvatarGroup from './use-avatar-group.ts'

// 组件配置
defineOptions({ name: 'TyAvatarGroup' })

// Props 定义
const props = defineProps(useProps)

// 逻辑处理
const { avatars } = useAvatarGroup(props)
</script>