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
<style lang="scss" scoped>
.ty-logConsole {
  width: 100%;
  border: solid 1px var(--toyar-gray-10);
  background-color: var(--toyar-gray-10);
  color: var(--toyar-gray-1);
  position: relative;

  &__header {
    height: 40px;
    .ty-logConsole__icon{
      &:before {
				content: "";
				display: inline-block;
				width: 12px;
				height: 12px;
				border-radius: 50%;
        margin:14px 0 0 20px;
				background-color: var(--toyar-red-6);
				box-shadow: 20px 0 0 var(--toyar-orange-6), 40px 0 0 var(--toyar-green-6), 60px 0 0 var(--toyar-yellow-6);
			}
    }
  }
  &__content {
    overflow: auto;
    height: calc(100% - 80px);
  }
  &__item {
    display: flex;
    height: 30px;
    .ty-logConsole__index{
      width: 50px;
      margin-right: 10px;
      text-align: center;
      color: var(--toyar-gray-4);
      font-size: 12px;
      line-height: 30px;
    }
    .ty-logConsole__info{
      line-height: 30px;
    }
  }

  &__line {
    border-right: 1px solid var(--toyar-gray-1);
    height: calc(100% - 80px);
    width: 1px;
    top: 40px;
    position: absolute;
    left: 50px;
  }
  &__warn {
    color: var(--toyar-orange-6);
  }

  &__error {
    color: var(--toyar-red-6);
  }

  &__debugger {
    color: var(--toyar-green-6);
  }

  &__footer {
    position: absolute;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid var(--toyar-gray-1);
  }
}
</style>