import TyScrollBar from './scrollbar.vue'
import { type Ref } from 'vue'

export type TyScrollBarInstance = InstanceType<typeof TyScrollBar>

export interface UseScrollBarReturn {
  rightTopV: Ref<string>
  bottomV: Ref<string>
  rightBarHeight: Ref<string>
  bottomBarWidth: Ref<string>
  isShowRight: Ref<boolean>
  isShowBottom: Ref<boolean>
  container: Ref<HTMLElement | null>
  rightBar: Ref<HTMLElement | null>
  bottomBar: Ref<HTMLElement | null>
  handleScroll: (ev: Event) => void
  rightBarContainerClick: (e: MouseEvent) => void
  bottomBarContainerClick: (e: MouseEvent) => void
  rightMouseDown: (e: MouseEvent) => void
  bottomMouseDown: (e: MouseEvent) => void
  resetScrollBar: () => void
}
