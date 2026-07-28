<template>
  <div :class="nm.b()" draggable="" @click="uploadClick" @dragover="dragover($event)" @drop="drop($event)">
    <input id="" ref="uploadRef" type="file" hidden @change="uploadChange($event)" :accept="props.accept">
    <div>
      <i class="el-icon-upload2" style="color: #999999;font-size: 20px;" />
    </div>
    <div>
      点击或拖拽文件到此区域
    </div>
  </div>
</template>
<script setup>
import { useProps, nm, useEmits } from './context'
import useUpload from './use-upload'

defineOptions({
  name: 'TyUpload'
})

const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const {
  uploadRef,
  uploadClick,
  uploadChange,
  dragover,
  drop
} = useUpload(props, emit)
</script>
<style lang="scss" scoped></style>
