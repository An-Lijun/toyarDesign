<template>
  <div :class="nm.b()" :style="{
    height: height + 'px',
  }">
    <div ref="contentRef" :class="nm.e('content')">
      <div v-for="(item, inx) in showLogs" :key="inx" :class="nm.e(item.type)" v-html="itemContent(item)"></div>
    </div>
    <div v-if="isClear" :class="nm.e('footer')">
      <slot name="footer">
        <TyButton @click="handlerClear" style="margin-right: 10px;">清除</TyButton>
      </slot>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { nm, logProps } from "./context";

defineOptions({
  name: "TyLogConsole",
});
const props = defineProps(logProps);
const contentRef = ref()
let showLogs = ref([]);


const log = (data) => {
  showLogs.value.push(data)
  if (contentRef.value) {
    contentRef.value.scrollTop = contentRef.value.scrollHeight;
  }
}


const handlerClear = () => {
  showLogs.value = [];
};
const itemContent = (item) => {
  let pre = null;
  let custom = "";
  if (item.custom) {
    custom = "【" + item.custom + "】";
  } else {
    switch (item.type.toLowerCase(0)) {
      case "custom":
        pre = custom;
        break;
      case "warn":
        pre = "【WARN】";
        break;
      case "error":
        pre = "【ERROR】";
        break;
      case "debugger":
        pre = "【DEBUGGER】";
        break;
      default:
        pre = "【INFO】";
    }
  }

  return pre + " " + item.info;
};

defineExpose({
  log
})
</script>
<style lang="scss" scoped>
.ty-logConsole {
  width: 100%;
  border: solid 1px var(--toyar-gray-10);
  background-color: var(--toyar-gray-10);
  color: var(--toyar-gray-1);
  position: relative;
  padding: 0 5px;

  &__content {
    overflow: auto;
    height: calc(100% - 40px);
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