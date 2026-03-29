import { debounce, bind, unBind } from "robinson";
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
// 添加类型定义
import type { ExtractPropTypes } from 'vue'
import { affixProps } from './context'

export interface UseAffixReturn {
  styles: Ref<Record<string, string>>
  isFixed: Ref<boolean>
  affixRef: Ref<HTMLElement | null>
}

export default function useAffix(
  props: ExtractPropTypes<typeof affixProps>,
  emits: (event: 'fixed-change', value: boolean) => void,
  nm: ReturnType<typeof useNmSpace>
): UseAffixReturn
export default function useAffix(props: ExtractPropTypes<typeof affixProps>, emits: (event: 'fixed-change', value: boolean) => void, nm: ReturnType<typeof useNmSpace>): UseAffixReturn {

  const affixRef = ref(null);
  let isFixed = ref(false);
  let styles = ref({});
  const targetDom = props.target || window;

  // 缓存变量
  let cachedElRect = null;
  let cachedScrollTop = 0;

  // 校验并获取滚动值
  const getScrollVal = (target, top) => {
    if (!target || !(target instanceof HTMLElement || target === window)) return 0;
    if (target === window) {
      return top ? window.pageYOffset : window.pageXOffset;
    }
    return top ? target.scrollTop : target.scrollLeft;
  };

  // 校验并获取元素偏移值
  const getOffsetVal = (element) => {
    if (!element || !(element instanceof HTMLElement)) return { top: 0, left: 0 };
    if (cachedElRect && element === affixRef.value) {
      return cachedElRect;
    }
    const { top, left } = element.getBoundingClientRect();
    const { clientTop = 0, clientLeft = 0 } = window.document.body;
    cachedElRect = {
      top: top + getScrollVal(window, true) - clientTop,
      left: left + getScrollVal(window) - clientLeft
    };
    return cachedElRect;
  };

  // 计算 offset 类型
  const offsetType = computed(() => props.offsetBottom >= 0 ? 'bottom' : 'top');

  // 设置固定状态
  let pendingStyles = {};
  const applyStyles = () => {
    styles.value = pendingStyles;
    pendingStyles = {};
  };
  const setIsFixed = (value, style = {}) => {
    isFixed.value = value;
    Object.assign(pendingStyles, style);
    requestAnimationFrame(applyStyles);
  };
  const offsetTop = Number(props.offsetTop) || 0;
  const offsetBottom = Number(props.offsetBottom) || 0;
  // 处理滚动逻辑
  const handleScroll = () => {
    if (!affixRef.value) return;

    const scrollTop = getScrollVal(targetDom, true);
    const elOffset = getOffsetVal(affixRef.value);

    // 缓存滚动值和偏移值
    if (scrollTop === cachedScrollTop && elOffset.top === cachedElRect?.top) return;
    cachedScrollTop = scrollTop;
    cachedElRect = elOffset;

    const { top: elOffsetTop, left: elOffsetLeft } = elOffset;
    const windowHeight = window.innerHeight;
    const elHeight = affixRef.value.offsetHeight;



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
  const handleResize = () => {
    if (!affixRef.value) return;
    const elOffset = getOffsetVal(affixRef.value);

    if (elOffset.top - offsetTop <= getScrollVal(targetDom, true)) {
      setIsFixed(false, {});
    }
    handleScroll();
  };

  const debouncedHandleScroll = debounce(handleScroll, 50);
  const debouncedHandleResize = debounce(handleResize, 50);
  const reqDebouncedHandleScroll =() => requestAnimationFrame(debouncedHandleScroll)
  const reqDebouncedHandleResize =() => requestAnimationFrame(debouncedHandleResize)

  // 监听滚动和窗口大小变化
  onMounted(() => {
    handleScroll();


    bind(targetDom, 'scroll', reqDebouncedHandleScroll, { passive: true });
    bind(window, 'resize', reqDebouncedHandleResize, { passive: true });
  });

  onBeforeUnmount(() => {
    unBind(targetDom, 'scroll', reqDebouncedHandleScroll);
    unBind(window, 'resize', reqDebouncedHandleResize);
  });
  return {
    styles, isFixed, affixRef
  }
}