import { unref, nextTick,onUnmounted } from 'vue'
import { arrow, createPopper } from '@popperjs/core';


export function usePopJs( containerRef, popRef, placement,arrowRef, offset,onWindowClick ) {
  const popperInstance = createPopper(unref(containerRef), unref(popRef), {
    placement: placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          // 偏移值 左右，上下
          offset: offset
        }
      },
      {
        name: 'arrow',
        options: {
          element: unref(arrowRef),
        }
      }
    ]
  });
  nextTick(() => {
    // 异步更新
    popperInstance.update()
  })
  window.addEventListener('click', onWindowClick)
  onUnmounted(() => {
    window.removeEventListener('click', onWindowClick)
  })
  return popperInstance
}