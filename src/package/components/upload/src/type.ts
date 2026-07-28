import TyUpload from './upload.vue'
import { type Ref } from 'vue'

export type TyUploadInstance = InstanceType<typeof TyUpload>

export interface UseUploadReturn {
  uploadRef: Ref<any>
  uploadClick: () => void
  uploadChange: (e: Event) => void
  dragover: (e: DragEvent) => void
  drop: (e: DragEvent) => void
}
