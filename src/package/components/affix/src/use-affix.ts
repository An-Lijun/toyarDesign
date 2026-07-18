import { onBeforeUnmount, onMounted, ref, computed, watch } from "vue";
import type { ExtractPropTypes } from 'vue'
import { affixProps } from './context'
import useNmSpace from '../../../hooks/useBem'
import { debounce } from 'robinson'
import { type UseAffixReturn } from './type.ts'


/**
 * Affix 组件的核心逻辑 Hook
 * 使用 IntersectionObserver 实现元素的固定定位功能
 * @param props - 组件属性
 * @param emits - 事件发射器
 * @param nm - BEM 命名空间函数
 * @returns {UseAffixReturn} 返回样式、固定状态和元素引用
 */
export default function useAffix(
  props: ExtractPropTypes<typeof affixProps>,
  emits: (event: 'fixed-change', value: boolean) => void,
  nm: ReturnType<typeof useNmSpace>
): UseAffixReturn {

  const affixRef = ref<HTMLElement | null>(null);
  const isFixed = ref(false);
  const styles = ref<Record<string, string>>({});
  const targetDom = props.target || window;

  let observer: IntersectionObserver | null = null;
  let placeholder: HTMLElement | null = null;

  const offsetType = computed(() => props.offsetBottom !== undefined && props.offsetBottom >= 0 ? 'bottom' : 'top');
  const offsetTop = computed(() => Number(props.offsetTop) || 0);
  const offsetBottom = computed(() => Number(props.offsetBottom) || 0);

  const isStyleEqual = (a: Record<string, string>, b: Record<string, string>): boolean => {
    if (Object.keys(a).length !== Object.keys(b).length) return false;
    for (const key in a) {
      if (a[key] !== b[key]) return false;
    }
    return true;
  };

  /**
   * 设置元素的固定状态
   * @param value - 是否固定
   * @param style - 固定时的样式
   */
  const setIsFixed = (value: boolean, style: Record<string, string> = {}) => {
    if (isFixed.value !== value) {
      isFixed.value = value;
      emits('fixed-change', value);
    }
    if (!isStyleEqual(styles.value, style)) {
      styles.value = style;
    }
  };

  let cachedElSize: { width: number; height: number } | null = null;
  let cachedElPosition: { left: number } | null = null;
  let isPlaceholderCreated = false;

  /**
   * 获取元素尺寸，带缓存机制
   * @returns {Object} 元素的宽度和高度
   */
  const getElementSize = () => {
    if (!affixRef.value) return { width: 0, height: 0 };
    if (cachedElSize) return cachedElSize;
    cachedElSize = {
      width: affixRef.value.offsetWidth,
      height: affixRef.value.offsetHeight
    };
    return cachedElSize;
  };

  /**
   * 清除尺寸缓存
   */
  const clearSizeCache = () => {
    cachedElSize = null;
  };

  /**
   * 创建占位元素，保持布局稳定
   * 当元素固定时，占位元素会占据原位置，防止页面跳动
   */
  const createPlaceholder = () => {
    if (!affixRef.value || isPlaceholderCreated) return;

    const { width, height } = getElementSize();
    placeholder = document.createElement('div');
    placeholder.style.width = `${width}px`;
    placeholder.style.height = `${height}px`;
    placeholder.style.visibility = 'hidden';

    if (affixRef.value.parentNode) {
      affixRef.value.parentNode.insertBefore(placeholder, affixRef.value);
      isPlaceholderCreated = true;
    }
  };

  /**
   * 移除占位元素
   */
  const removePlaceholder = () => {
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder);
      placeholder = null;
      isPlaceholderCreated = false;
    }
  };
  const updateDom = (value: boolean, style: Record<string, string> = {}, position: { left: number } | null, isRemove: Boolean) => {
    if (isRemove) {
      removePlaceholder();
    } else {
      createPlaceholder();
    }
    setIsFixed(value, style)
    cachedElPosition = position
  }

  const initObserver = () => {
    if (!affixRef.value) return;

    if (observer) {
      observer.disconnect();
    }

    clearSizeCache();
    isPlaceholderCreated = false;



    observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { top, left } = entry.boundingClientRect;
      const windowHeight = window.innerHeight;
      const { height: elHeight, width } = getElementSize();
      let fixedValue = false, fixedObject, position = null, isRemove = false;
      switch (offsetType.value) {
        case 'top':
          if (top <= offsetTop.value && !isFixed.value) {
            fixedValue = true;
            fixedObject = {
              position: 'fixed',
              top: `${offsetTop.value}px`,
              left: `${left}px`,
              width: `${width}px`,
              zIndex: 'var(--zindex-affix)'
            };
            position = { left }
            isRemove = false

          } else if (top > offsetTop.value && isFixed.value) {
            fixedValue = false;
            fixedObject = {};
            position = null
            isRemove = true
          }
          break;
        case 'bottom':
          if (!isFixed.value) {
            if (windowHeight - top - elHeight <= offsetBottom.value) {
              fixedValue = true;
              fixedObject = {
                position: 'fixed',
                bottom: `${offsetBottom.value}px`,
                left: `${left}px`,
                width: `${width}px`,
                zIndex: 'var(--zindex-affix)'
              };
              position = { left }
              isRemove = false
            }
          } else {
            if (placeholder) {
              const placeholderTop = placeholder.getBoundingClientRect().top;
              if (windowHeight - placeholderTop - elHeight > offsetBottom.value) {
                fixedValue = false;
                fixedObject = {};
                position = null
                isRemove = true
              }
            }
          }
          break;
      }
      updateDom(fixedValue, fixedObject, position, isRemove)
    }, {
      root: targetDom === window ? null : targetDom,
      rootMargin: offsetType.value === 'top'
        ? `-${offsetTop.value}px 0px 0px 0px`
        : `0px 0px -${offsetBottom.value}px 0px`,
      threshold: 0
    });

    observer.observe(affixRef.value);
  };

  /**
   * 处理窗口大小变化
   * 当窗口尺寸改变时，重新计算固定元素的位置和尺寸
   */
  const handleResize = () => {
    if (isFixed.value && affixRef.value) {
      clearSizeCache();
      const { width } = getElementSize();
      const { left } = affixRef.value.getBoundingClientRect();

      if (left !== cachedElPosition?.left || width+'px' !== styles.value.width) {
        setIsFixed(true, {
          ...styles.value,
          left: `${left}px`,
          width: `${width}px`
        });
        cachedElPosition = { left };
      }
    }
  };

  /**
   * 防抖处理的 resize 函数
   * 延迟 150ms 执行，避免高频触发
   */
  const debouncedResize = debounce(handleResize, 150);

  watch(
    () => [props.offsetTop, props.offsetBottom, props.target],
    () => {
      initObserver();
    },
    { deep: true }
  );

  onMounted(() => {
    initObserver();
    window.addEventListener('resize', debouncedResize, { passive: true });
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    }
    removePlaceholder();
    window.removeEventListener('resize', debouncedResize);
  });

  return {
    styles, isFixed, affixRef
  }
}