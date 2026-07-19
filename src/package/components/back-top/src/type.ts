import TyBackTop from './back-top.vue'
import { type Ref, type ComputedRef } from "vue";

export type TyBackTopInstance = InstanceType<typeof TyBackTop>

export interface UseBackTopReturn {
  backTopRef: Ref<HTMLElement | null>
  scrollHeight: Ref<number>
  isVisible: ComputedRef<boolean>
  styles: Ref<Record<string, string>>
  back: () => void
}