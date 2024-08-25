<template>
  <div :class="nm.b()" >
    <slot />
  </div>
</template>
<script setup>
import { cProps, nm } from './context'
import light from './light.module.scss'
import dark from './dark.module.scss'
import generate from '../../../color/index.js'
import {ref,watch} from 'vue'
defineOptions({
  name: 'TyConfigProvider'
})
const props = defineProps(cProps)
let defaultColor = {
  light,
  dark
}
let html = document.querySelector('html')
let nowColor = html.getAttribute('toyar-theme')
if (props.options.resetTheme) {
  if (props.light && props.dark) {
    Object.assign(defaultColor, { light: props.light, dark: props.dark })
  }
  let colorObj = {
    light: {},
    dark: {}
  }
  for (const key in defaultColor.light) {
    if (Object.hasOwnProperty.call(defaultColor.light, key)) {
      colorObj.light[key] = generate(defaultColor.light[key], { list: true })
    }
  }
  for (const key in defaultColor.dark) {
    if (Object.hasOwnProperty.call(defaultColor.dark, key)) {
      colorObj.dark[key] = generate(defaultColor.dark[key], { list: true, dark: true })
    }
  }
  watch(
    () => props.theme,
    (newVal, oldVal) => {
      let obj = colorObj[newVal]
      if (!obj) {
        return
      }
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          let nowColorArr = obj[key]
          let len = nowColorArr.length
          for (let index = 0; index < len; index++) {
            html.style.setProperty(`--toyar-${key}-${index + 1}`, nowColorArr[index])
          }
        }
      }

    },
    { immediate: true }
  )
}
const changeParmary = (newVal=props.options.resetPrimary) => {
  let value = newVal
  let theme = html.getAttribute('toyar-theme')
  let arr = generate(value, { list: true ,dark:theme==='dark'?true:false})
  let len = arr.length;
  for (let index = 0; index < len; index++) {
    html.style.setProperty(`--primary-${index + 1}`, arr[index])
  }
}
  const observer = new MutationObserver(mutations => {
    if(nowColor !==  html.getAttribute('toyar-theme')){
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
    ()=>{
      changeParmary()
    }
  )


</script>
<style lang="less" scoped></style>
