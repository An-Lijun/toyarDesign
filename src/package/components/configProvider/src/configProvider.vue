<template>
  <div :class="nm.b()">
    <slot />
  </div>
</template>
<script setup>
import { configProps, nm } from './context'
// import light from './light.module.scss'
// import dark from './dark.module.scss'
import generate from '../../../color/index.js'
import { ref, watch } from 'vue'
defineOptions({
  name: 'TyConfigProvider'
})
const props = defineProps(configProps)
// let defaultColor = {
//   light,
//   dark
// }
let html = document.querySelector('html')
let nowColor = html.getAttribute('toyar-theme')


const changeParmary = (newVal = props.options.resetPrimary) => {
  let value = newVal
  let theme = html.getAttribute('toyar-theme')
  let arr = generate(value, { list: true, dark: theme === 'dark' ? true : false })
  let len = arr.length;
  for (let index = 0; index < len; index++) {
    html.style.setProperty(`--primary-${index + 1}`, arr[index])
  }
}
const observer = new MutationObserver(mutations => {
  if (nowColor !== html.getAttribute('toyar-theme')) {
    nowColor = html.getAttribute('toyar-theme')
    changeParmary()
  }
});
observer.observe(html, {
  childList: false, // 监视元素 第一级直接子节点 的变动
  subtree: false, // 监视元素 所有后代节点 的变动（前提要求 childList = true）
  attributes: true, // 监视元素 属性 的变动
});

watch(
  () => props.options.resetPrimary,
  () => {
    changeParmary()
  }
)


</script>
<style lang="less" scoped></style>
