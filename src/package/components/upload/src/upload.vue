<template>
  <div :class="nm.b()" draggable="" @click="uploadClick" @dragover="dragover($event)" @drop="drop($event)">
    <input id="" ref="uploadRef" type="file" hidden @change="uploadChange($event)" :accept="accept">
    <div>
      <i class="el-icon-upload2" style="color: #999999;font-size: 20px;" />
    </div>
    <div>
      点击或拖拽文件到此区域
    </div>
  </div>
</template>
<script setup>
import { nm, upProps } from './context'
defineOptions({
  name:'TyUpload'
})
const emit = defineEmits(['change'])
const props = defineProps(upProps)

const uploadRef = ref()
const uploadClick = () => {
  if (!props.disabled) {
    uploadRef.value.click()
  }
}
const uploadChange = (e) => {
  if (!props.disabled) {
   emit('change', e.target.files[0])
  }
}
const dragover = (e) => {
  if (!props.disabled && props.drag) {
    e.stopPropagation()
    // 阻止默认事件（与drop事件结合，阻止拖拽文件在浏览器打开的默认行为）
    e.preventDefault()
  }
}
const drop = (e) => {
  if (!props.disabled && !props.dragger) {
    e.stopPropagation()
    // 阻止默认事件（与dragover事件结合，阻止拖拽文件在浏览器打开的默认行为）
    e.preventDefault()
    // 获取拖拽上传的文件（files是个数组 此处默认限制只能上传一个）
   emit('change', e.dataTransfer.files[0])
  }
}
</script>
<style lang="scss" scoped></style>
