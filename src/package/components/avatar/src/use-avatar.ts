import { onMounted, ref } from "vue";
import type { ExtractPropTypes } from 'vue'
import { avatarProps } from './context'
import useNmSpace from '../../../hooks/useBem'
import { type UseAvatarReturn } from './type.ts'

export default function useAvatar(
  props: ExtractPropTypes<typeof avatarProps>,
  emits: (event: 'trigger') => void,
  nm: ReturnType<typeof useNmSpace>
): UseAvatarReturn {

  const avatarRef = ref<HTMLElement | null>(null);
  const textRef = ref<HTMLElement | null>(null);
  const textTransform = ref('');

  const getTextTransform = () => {
    if (!avatarRef.value || !textRef.value) return '';

    const avatarWidth = avatarRef.value.offsetWidth;
    const textWidth = textRef.value.clientWidth;

    if (avatarWidth === 0 || textWidth === 0) return '';

    const scale = avatarWidth / (textWidth + 8);
    if (scale < 1) {
      return `scale(${scale})`;
    }

    return '';
  };

  onMounted(() => {
    if (props.autoSize) {
      textTransform.value = getTextTransform();
    }
  });

  return {
    avatarRef,
    textRef,
    textTransform
  };
}