<template>
  <div ref="affixRef">
      <div :class="[nm.b(), nm.is('fixed', isFixed)]" :style="styles">
          <slot></slot>
      </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
import { nm, affixProps } from "./context";
import { on, off } from '../../../utils/dom';

defineOptions({
  name: "TyAffix",
});

const props = defineProps(affixProps);
const affixRef = ref(null);
let isFixed = ref(false);
let styles = ref({});
const targetDom = props.target || window;

// 校验并获取滚动值
const getScrollVal = (target, top) => {
  if (!target || !(target instanceof HTMLElement || target === window)) return 0;
  let val = top ? (target === window ? target.pageYOffset : target.scrollTop) : (target === window ? target.pageXOffset : target.scrollLeft);
  return typeof val === 'number' ? val : 0;
};

// 校验并获取元素偏移值
const getOffsetVal = (element) => {
  if (!element || !(element instanceof HTMLElement)) return { top: 0, left: 0 };
  const { top, left } = element.getBoundingClientRect();
  const { clientTop = 0, clientLeft = 0 } = window.document.body;
  return {
      top: top + getScrollVal(window, true) - clientTop,
      left: left + getScrollVal(window) - clientLeft
  };
};

// 计算 offset 类型
const offsetType = computed(() => props.offsetBottom >= 0 ? 'bottom' : 'top');

// 设置固定状态
const setIsFixed = (value, style = {}) => {
  isFixed.value = value;
  styles.value = style;
};

// 缓存滚动值和偏移值
let cachedScrollTop = 0;
let cachedElOffset = { top: 0, left: 0 };

// 防抖函数
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
  };
};

// 处理滚动逻辑
const handleScroll = () => {
  if (!affixRef.value) return;

  const scrollTop = getScrollVal(targetDom, true);
  const elOffset = getOffsetVal(affixRef.value);

  // 缓存滚动值和偏移值
  if (scrollTop === cachedScrollTop && elOffset.top === cachedElOffset.top) return;
  cachedScrollTop = scrollTop;
  cachedElOffset = elOffset;

  const { top: elOffsetTop, left: elOffsetLeft } = elOffset;
  const windowHeight = window.innerHeight;
  const elHeight = affixRef.value.offsetHeight;

  const offsetTop = Number(props.offsetTop) || 0;
  const offsetBottom = Number(props.offsetBottom) || 0;

  switch (offsetType.value) {
      case 'top':
          if (elOffsetTop - offsetTop <= scrollTop && !isFixed.value) {
              setIsFixed(true, { top: `${offsetTop}px`, left: `${elOffsetLeft}px` });
          } else if (elOffsetTop - offsetTop > scrollTop && isFixed.value) {
              setIsFixed(false, {});
          }
          break;
      case 'bottom':
          if (elOffsetTop + offsetBottom + elHeight > scrollTop + windowHeight && !isFixed.value) {
              setIsFixed(true, { bottom: `${offsetBottom}px`, left: `${elOffsetLeft}px` });
          } else if (elOffsetTop + offsetBottom + elHeight < scrollTop + windowHeight && isFixed.value) {
              setIsFixed(false, {});
          }
  }
};

// 监听滚动和窗口大小变化
onMounted(() => {
  handleScroll();
  const handleResize = () => {
      if (!affixRef.value) return;
      const elOffset = getOffsetVal(affixRef.value);
      if (elOffset.top - offsetTop <= getScrollVal(targetDom, true)) {
          setIsFixed(false, {});
      }
      handleScroll();
  };

  const debouncedHandleScroll = debounce(handleScroll, 10);
  const debouncedHandleResize = debounce(handleResize, 10);

  on(targetDom, 'scroll', () => requestAnimationFrame(debouncedHandleScroll));
  on(window, 'resize', () => requestAnimationFrame(debouncedHandleResize));
});

onBeforeUnmount(() => {
  off(targetDom, 'scroll', handleScroll);
  off(window, 'resize', handleScroll);
});
</script>

<style lang="scss" scoped>
.ty-affix {
  z-index: 1500;
}

.is-fixed {
  position: fixed;
}
</style>