import TyPopconfirm from './popconfirm.vue'
import { type Ref } from 'vue'

export type TyPopconfirmInstance = InstanceType<typeof TyPopconfirm>

export interface UsePopconfirmReturn {
  isShowConfirm: Ref<boolean>
  popRef: Ref<any>
  arrowRef: Ref<any>
  containerRef: Ref<any>
  handleReslove: () => void
  handleReject: () => void
  handleShow: () => void
}
