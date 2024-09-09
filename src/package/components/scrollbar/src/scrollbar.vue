<template>
  <div :class="nm.b()">
    <div :class="nm.e('container')" ref="container" @scroll="handleScroll($event)">
      <slot />
    </div>
    <div :class="nm.e('rightBarContainer')">
      <div ref="rightBar" :class="nm.e('rightBar')" @mousedown="rightMouseDown($event)" :style="{
    top: rightTopV
  }
    ">
      </div>
    </div>
    <div :class="nm.e('bottomBarContainer')">
      <div :class="nm.e('bottomBar')" ref="bottomBar" @mousedown="bottomMouseDown($event)" :style="{
    left: bottomV
  }">
      </div>
    </div>
  </div>
</template>
<script setup>
import { nm } from './context';
import { ref, onMounted } from 'vue';

defineOptions({
  name: 'TyScrollBar'
})
let containerHeight = 0
let containerWidth = 0
let scrollHeight = 0
let scrollWidth = 0
let compHeight = 0
let compWidth = 0 
let rightTopV = ref('')
let bottomV = ref('')


const container = ref('')
const rightBar = ref('')
const bottomBar = ref('')
let left=0
let stop = false
onMounted(() => {
  containerHeight = container.value.clientHeight
  containerWidth = container.value.clientWidth
  scrollHeight = container.value.scrollHeight
  scrollWidth = container.value.scrollWidth
  compHeight = scrollHeight - containerHeight
  compWidth= scrollWidth - containerWidth

})

const handleScroll = (ev) => {
  if (stop) {
    return
  }
  let leftV= ev.target.scrollLeft
  if(left !== leftV){
    let value = Math.floor(ev.target.scrollLeft / compWidth * 100)
    bottomV.value = value <= 20 ? `${value}px` : `calc( ${value}% - 25px)`
    left = leftV
    return
  }
  let value = Math.floor(ev.target.scrollTop / compHeight * 100)
  rightTopV.value = value <= 20 ? `${value}px` : `calc( ${value}% - 35px)`
}

let x, y

const rightMove = (e) => {
  stop = true
  e.preventDefault();
  let moveY = e.pageY - y;
  moveY = moveY > (containerHeight - 35) ? containerHeight - 35 : moveY
  moveY = moveY <= 0 ? 0 : moveY
  rightTopV.value = `${moveY}px`

  let coucent = moveY / (containerHeight)
  container.value.scrollTop = `${scrollHeight * coucent}`
}
const rightMouseDown = (e) => {
  y = e.pageY - rightBar.value.offsetTop;
  if (document) {
    document?.addEventListener("mousemove", rightMove)
    document?.addEventListener("mouseup", () => {
      document.removeEventListener('mousemove', rightMove)
      stop = false
    });
  }
}

const bottomMove = (e) => {
  stop = true
  e.preventDefault();
  let moveX = e.pageX - x;
  moveX = moveX > (containerWidth - 35) ? containerWidth - 35 : moveX
  moveX = moveX <= 0 ? 0 : moveX
  let coucent = moveX / (containerWidth)
  bottomV.value = `${moveX}px`
  container.value.scrollLeft = `${containerWidth * coucent}`
}
const bottomMouseDown = (e) => {
  x = e.pageX - bottomBar.value.offsetLeft;

  if (document) {
    document?.addEventListener("mousemove", bottomMove)
    document?.addEventListener("mouseup", () => {
      document.removeEventListener('mousemove', bottomMove)
      stop = false
    });
  }
}

</script>
<style lang="scss" scoped>
.ty-scrollbar {
  overflow: hidden;
  position: relative;

  &__container {
    height: 100%;
    max-height: 100%;
    overflow: auto;
    position: relative;
    scrollbar-width: none;
  }

  &__rightBarContainer {
    position: absolute;
    right: 0px;
    top: 0;
    width: 12px;
    height: 100%;
    z-index: 15;
    background-color: rgba(0, 0, 0, .4);
    opacity: 0;
    transition: opacity .5s;
    padding-bottom: 20px;
    box-sizing: border-box;
  }

  &__rightBar {
    width: 8px;
    height: 20px;
    background-color: var(--toyar-gray-4);
    border-radius: 4px;
    position: absolute;
    box-sizing: border-box;
    right: 2px;
  }

  &__bottomBarContainer {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 12px;
    width: calc(100% - 12px);
    z-index: 15;
    background-color: rgba(0, 0, 0, .4);
    opacity: 0;
    transition: opacity .5s;
  }

  &__bottomBar {
    height: 8px;
    width: 20px;
    background-color: var(--toyar-gray-4);
    border-radius: 4px;
    position: absolute;
    box-sizing: border-box;
    top: 2px;
    user-select: none;
  }

  &:hover {

    .ty-scrollbar__rightBarContainer,
    .ty-scrollbar__bottomBarContainer {
      opacity: 1;
    }
  }
}
</style>
