<template>
  <div :class="nm.b()" :style="{
    height: height + 'px',
  }">
    <div ref="contentRef" :class="nm.e('content')">
      <div v-for="(item, inx) in logArr" :key="inx" :class="nm.e(item.type)" v-text="itemContent(item)"></div>
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
let logArr = ref([]);

const log = (data) => {
  logArr.value.push(data)
  if (contentRef.value) {
    contentRef.value.scrollTop = contentRef.value.scrollHeight;
  }
}

const handlerClear = () => {
  logArr.value = [];
};
const itemContent = (item) => {
  let pre = '';
  if (item.custom) {
    pre = "【" + item.custom + "】"
  } else if (['warn', 'error', 'debugger'].includes(item.type.toLowerCase(0))) {
    pre = "【" + item.type.toUpperCase() + "】";
  } else {
    pre = "【INFO】";
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