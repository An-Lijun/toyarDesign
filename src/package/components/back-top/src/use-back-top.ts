import { onBeforeUnmount, onMounted, ref, computed, shallowRef } from "vue";
import type { ExtractPropTypes } from 'vue'
import { backTopProps } from './context'
import useNmSpace from '../../../hooks/useBem'
import { type UseBackTopReturn } from './type.ts'

export default function useBackTop(
  props: ExtractPropTypes<typeof backTopProps>,
  emits: (event: 'click') => void,
  nm: ReturnType<typeof useNmSpace>
): UseBackTopReturn {

  const backTopRef = ref<HTMLElement | null>(null);
  const scrollHeight = ref(0);
  const el = shallowRef<HTMLElement | null>(null);

  const styles = computed(() => ({
    right: `${props.right}px`,
    bottom: `${props.bottom}px`
  }));

  const isVisible = computed(() => scrollHeight.value >= props.vHeight);

  const scrollFn = () => {
    scrollHeight.value = el.value?.scrollTop || 0;
  };

  const back = () => {
    emits('click');
    el.value?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  onMounted(() => {
    el.value = document.querySelector(props.target) as HTMLElement | null;
    if (!el.value) {
      throw new Error('target is not found');
    }

    if (el.value) {
      el.value.addEventListener('scroll', scrollFn);
    }
  });

  onBeforeUnmount(() => {
    el.value?.removeEventListener('scroll', scrollFn);
  });

  return {
    backTopRef,
    scrollHeight,
    isVisible,
    styles,
    back
  }
}