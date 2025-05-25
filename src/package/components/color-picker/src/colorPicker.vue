<template>
  <div :class="nm.b()">
    <div :class="nm.e('container')">
      <div :class="nm.e('wrap')" ref="wrapRef">
        <div class="draggable" ref="wrapDraggerRef"></div>
      </div>
      <div :class="nm.e('hue')">
        <div class="draggable" ref="hueDraggerRef"></div>

      </div>
      <div :class="nm.e('alpha')" ref="alphaRef">
        <div class="draggable" ref="alphaDraggerRef"></div>
      </div>
    </div>
    {{ color }}
    {{ colorFormat }}
  </div>
</template>
<script setup>
import { nm } from './context'
import Draggable from '../../../utils/draggable'
import { rgbToHsv, hsvToRgb, rgbToHex,transformColorFormat } from './color.js'
defineOptions({
  name: 'TyColorPicker'
})

const wrapRef = ref(null)
const wrapDraggerRef = ref(null)
const hueDraggerRef = ref(null)
const alphaDraggerRef = ref(null)
const alphaRef = ref(null)
let containerHeight, containerWidth

const initColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 1,
};
let color = ref({
  ...initColor,
  ...rgbToHsv(initColor),
})
let colorFormat = ref({
  ...transformColorFormat(color.value),
})


function handleChangeSaturationValue(dx, dy) {
  const s = 100 * dx / containerWidth;
  const v = 100 * (1 - (dy / containerHeight));
  const rgb = hsvToRgb({
    h: color.value.h,
    s,
    v,
  });
  const colorResult = {
    ...color.value,
    ...rgb,
    s,
    v,
  };
  color.value = colorResult;
  colorFormat.value = transformColorFormat(colorResult);
};
function handleChangeHue(dx) {
  const h = (dx / containerWidth) * 360;
  const rgb = hsvToRgb({
    h,
    s: color.value.s,
    v: color.value.v,
  });
  const colorResult = {
    ...color.value,
    ...rgb,
    h,
  };
  color.value = colorResult;
  colorFormat.value = transformColorFormat(colorResult);
}

function handleChangeAlpha(dx) {
  const a = dx / containerWidth;
  const colorResult = {
    ...color.value,
    a,
  };
  color.value = colorResult;
  colorFormat.value = transformColorFormat(colorResult);
}
function updatePageView(dx) {
  wrapRef.value.style.backgroundColor = colorFormat.value.hslColor;
  alphaRef.value.style.background = `linear-gradient(to right, rgb(${color.value.r} ${color.value.g} ${color.value.b} / 0), rgb(${color.value.r} ${color.value.g} ${color.value.b} / 1)) top left / 100% 100%,conic-gradient(
						#666 0.25turn,
						#999 0.25turn 0.5turn,
						#666 0.5turn 0.75turn,
						#999 0.75turn ) top left / 16px 16px repeat`
}

onMounted(() => {
  const draggableInstance = new Draggable(wrapDraggerRef.value);
  const { width, height } = wrapRef.value.getBoundingClientRect();
  containerWidth = width;
  containerHeight = height;
  draggableInstance.on('mousemove', ({ dx, dy }) => {
    handleChangeSaturationValue(dx, dy);
    wrapDraggerRef.value.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    updatePageView();
  });


  const draggableHueInstance = new Draggable(hueDraggerRef.value);
  draggableHueInstance.on('mousemove', ({ dx }) => {
    handleChangeHue(dx);
    hueDraggerRef.value.style.transform = `translate(${dx}px, 0)`;
    updatePageView();
  });


  const draggableAlphaInstance = new Draggable(alphaDraggerRef.value);
  draggableAlphaInstance.on('mousemove', ({ dx }) => {
    handleChangeAlpha(dx);
    alphaDraggerRef.value.style.transform = `translate(${dx}px, 0)`;
    updatePageView(dx);
  });


})

</script>
<style lang="scss" scoped>
.ty-colorPicker {
  &__container {
    width: 250px;
    height: 270px;
    background-color: var(--color-bg-2);
    border: var(--border-1) solid var(--border-color-2);

    border-radius: var(--border-radius-4);
  }

  .draggable {
    border: 2px solid #fff;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    left: -10px;
    transform: translate(0, 0);
    width: 20px;
    height: 20px;
    cursor: move;
    user-select: none;
    touch-action: none;
    box-sizing: border-box;
  }

  &__wrap {
    border-radius: 4px;
    position: relative;
    width: 250px;
    height: 200px;
    box-sizing: border-box;
    background-image: linear-gradient(to bottom, transparent, black),
      linear-gradient(to right, white, transparent);
    background-color: hsl(0, 100%, 50%);
    margin-bottom: 15px;
  }

  &__hue {
    width: 250px;
    height: 16px;
    border-radius: 4px;
    margin-bottom: 15px;
    position: relative;
    background-image: linear-gradient(to right,
        rgb(255 0 0),
        rgb(255 255 0),
        rgb(0 255 0),
        rgb(0 255 255),
        rgb(0 0 255),
        rgb(255 0 255),
        rgb(255 0 0));

    &>.draggable {
      width: 16px;
      height: 16px;
      top: 0;
      left: -8px;
    }
  }

  &__alpha {
    border-radius: 4px;
    width: 250px;
    height: 16px;
    margin-bottom: 20px;
    position: relative;
    background: linear-gradient(to right, rgb(0 0 0 / 0), rgb(0 0 0 / 1)) top left / auto auto,
      conic-gradient(#666 0.25turn,
        #999 0.25turn 0.5turn,
        #666 0.5turn 0.75turn,
        #999 0.75turn) top left / 16px 16px repeat;

    & .draggable {
      width: 16px;
      height: 16px;
      top: 0;
      left: -8px;
      background-color: #000;
    }
  }

}
</style>
