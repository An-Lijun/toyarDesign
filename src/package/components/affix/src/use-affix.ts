import { onBeforeUnmount, onMounted, ref, computed, type Ref, watch } from "vue";
// 添加类型定义
import type { ExtractPropTypes } from 'vue'
import { affixProps } from './context'
import useNmSpace from '../../../hooks/useBem'

export interface UseAffixReturn {
  styles: Ref<Record<string, string>>
  isFixed: Ref<boolean>
  affixRef: Ref<HTMLElement | null>
}

export default function useAffix(
  props: ExtractPropTypes<typeof affixProps>,
  emits: (event: 'fixed-change', value: boolean) => void,
  nm: ReturnType<typeof useNmSpace>
): UseAffixReturn {

  const affixRef = ref<HTMLElement | null>(null);
  const isFixed = ref(false);
  const styles = ref<Record<string, string>>({});
  const targetDom = props.target || window;

  // 缓存变量
  let cachedElRect: { top: number; left: number } | null = null;
  let observer: IntersectionObserver | null = null;
  let placeholder: HTMLElement | null = null;

  // 计算 offset 类型
  const offsetType = computed(() => props.offsetBottom !== undefined && props.offsetBottom >= 0 ? 'bottom' : 'top');
  const offsetTop = Number(props.offsetTop) || 0;
  const offsetBottom = Number(props.offsetBottom) || 0;

  // 设置固定状态
  const setIsFixed = (value: boolean, style: Record<string, string> = {}) => {
    if (isFixed.value !== value) {
      isFixed.value = value;
      emits('fixed-change', value);
    }
    // 只有当样式发生变化时才更新
    if (JSON.stringify(styles.value) !== JSON.stringify(style)) {
      styles.value = style;
    }
  };

  // 缓存元素尺寸和位置信息
  let cachedElSize: { width: number; height: number } | null = null;
  let cachedElPosition: { left: number } | null = null;
  let isPlaceholderCreated = false;

  // 获取元素尺寸
  const getElementSize = () => {
    if (!affixRef.value) return { width: 0, height: 0 };
    if (cachedElSize) return cachedElSize;
    cachedElSize = {
      width: affixRef.value.offsetWidth,
      height: affixRef.value.offsetHeight
    };
    return cachedElSize;
  };

  // 清除尺寸缓存
  const clearSizeCache = () => {
    cachedElSize = null;
  };

  // 创建占位元素，保持布局稳定
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

  // 移除占位元素
  const removePlaceholder = () => {
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder);
      placeholder = null;
      isPlaceholderCreated = false;
    }
  };

  // 初始化 IntersectionObserver
  const initObserver = () => {
    if (!affixRef.value) return;

    // 清理之前的观察者
    if (observer) {
      observer.disconnect();
    }

    // 清除缓存
    clearSizeCache();
    isPlaceholderCreated = false;

    // 预计算尺寸
    getElementSize();

    // 创建观察器
    observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { top, left } = entry.boundingClientRect;
      const windowHeight = window.innerHeight;
      const { height: elHeight } = getElementSize();

      switch (offsetType.value) {
        case 'top':
          if (top <= offsetTop && !isFixed.value) {
            const { width } = getElementSize();
            createPlaceholder();
            setIsFixed(true, { 
              position: 'fixed',
              top: `${offsetTop}px`, 
              left: `${left}px`,
              width: `${width}px`,
              zIndex: '1000'
            });
            cachedElPosition = { left };
          } else if (top > offsetTop && isFixed.value) {
            removePlaceholder();
            setIsFixed(false, {});
            cachedElPosition = null;
          }
          break;
        case 'bottom':
          if (windowHeight - top - elHeight <= offsetBottom && !isFixed.value) {
            const { width } = getElementSize();
            createPlaceholder();
            setIsFixed(true, { 
              position: 'fixed',
              bottom: `${offsetBottom}px`, 
              left: `${left}px`,
              width: `${width}px`,
              zIndex: '1000'
            });
            cachedElPosition = { left };
          } else if (windowHeight - top - elHeight > offsetBottom && isFixed.value) {
            removePlaceholder();
            setIsFixed(false, {});
            cachedElPosition = null;
          }
          break;
      }
    }, {
      root: targetDom === window ? null : targetDom,
      rootMargin: offsetType.value === 'top' 
        ? `-${offsetTop}px 0px 0px 0px` 
        : `0px 0px -${offsetBottom}px 0px`,
      threshold: 0
    });

    // 开始观察
    observer.observe(affixRef.value);
  };

  // 处理窗口大小变化
  const handleResize = () => {
    if (isFixed.value && affixRef.value) {
      clearSizeCache();
      const { width } = getElementSize();
      const { left } = affixRef.value.getBoundingClientRect();
      
      // 只有当位置或尺寸发生变化时才更新样式
      if (left !== cachedElPosition?.left || width !== styles.value.width) {
        setIsFixed(true, {
          ...styles.value,
          left: `${left}px`,
          width: `${width}px`
        });
        cachedElPosition = { left };
      }
    }
  };

  // 监听 props 变化
  watch(
    () => [props.offsetTop, props.offsetBottom, props.target],
    () => {
      initObserver();
    },
    { deep: true }
  );

  // 生命周期
  onMounted(() => {
    initObserver();
    window.addEventListener('resize', handleResize, { passive: true });
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    }
    removePlaceholder();
    window.removeEventListener('resize', handleResize);
  });

  return {
    styles, isFixed, affixRef
  }
}