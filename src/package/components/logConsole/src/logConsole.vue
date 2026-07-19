<template>
  <div :class="nm.b()" :style="{
    height: height + 'px',
  }" @mouseenter="handlerMouseEnter" @mouseleave="handlerMouseLeave">
    <div :class="nm.e('header')">
        <div :class="nm.e('icon')">
            
        </div>
    </div>
    <div ref="contentRef" :class="nm.e('content')">
      <div v-for="(item, inx) in logArr" :key="inx" :class="nm.e('item')">
          <div :class="nm.e('index')">
              {{ inx+1 }}
          </div>
          <div v-text="itemContent(item)"  :class="[nm.e(item.type),nm.e('info')]">
            
          </div>
      </div>
    </div>
    <div :class="nm.e('line')">
</div>
    <div v-if="isClear" :class="nm.e('footer')">
      <slot name="footer">
        <TySpace>
          <TyButton @click="handlerExport" style="margin-right: 10px;">导出</TyButton>

          <TyButton @click="handlerClear" type="secondary" style="margin-right: 10px;">清除</TyButton>
        </TySpace>
      </slot>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { nm, logProps } from "./context";
import { downloadByBlob } from 'robinson'
defineOptions({
  name: "TyLogConsole",
});
const props = defineProps(logProps);
const contentRef = ref()
let logArr = ref([]);
let notRoll = true
const log = (data) => {
  logArr.value.push(data)
  if (contentRef.value && !notRoll) {
    contentRef.value.scrollTop = contentRef.value.scrollHeight;
  }
}
const handlerMouseEnter = () => {
  notRoll = true
}
const handlerMouseLeave = () => {
  notRoll = false
}
const handlerClear = () => {
  logArr.value = [];
};


const handlerExport = () => {
  function downloadText(fileName, text) {
    downloadByBlob(text, fileName, 'text/plain')
  }
  downloadText('logs11', logArr.value.map(item => {
    return `${itemContent(item)}`
  }).join('\n'))
}
const itemContent = (item) => {
  let pre = '';
  if (item.custom) {
    pre = "【" + item.custom + "】"
  } else if (['warn', 'error', 'debugger'].includes(item.type.toLowerCase(0))) {
    pre = "【" + item.type.toUpperCase() + "】";
  } else {
    pre = "【INFO】";
  }
  return pre + (item.time ? item.time : "") + " " + item.info;
};

defineExpose({
  log,
  clearLog: handlerClear,
  exportLog: handlerExport,
})
</script>
