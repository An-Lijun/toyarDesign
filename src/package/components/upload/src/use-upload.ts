import { ref } from 'vue'
import type { UseUploadReturn } from './type'

export default function useUpload(
  props: Record<string, any>,
  emit: (e: string, ...args: any[]) => void
): UseUploadReturn {
  const uploadRef = ref()

  const uploadClick = () => {
    if (!props.disabled) {
      uploadRef.value.click()
    }
  }

  const uploadChange = (e: Event) => {
    if (!props.disabled) {
      emit('change', (e.target as HTMLInputElement).files?.[0])
    }
  }

  const dragover = (e: DragEvent) => {
    if (!props.disabled && props.drag) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  const drop = (e: DragEvent) => {
    if (!props.disabled && !props.dragger) {
      e.stopPropagation()
      e.preventDefault()
      emit('change', e.dataTransfer?.files?.[0])
    }
  }

  return {
    uploadRef,
    uploadClick,
    uploadChange,
    dragover,
    drop
  }
}
