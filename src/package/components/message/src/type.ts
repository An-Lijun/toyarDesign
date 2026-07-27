import TyMessage from './message.vue'
import { type Ref } from 'vue'

export type TyMessageInstance = InstanceType<typeof TyMessage>

export interface UseMessageReturn {
  messageRef: Ref<HTMLElement | undefined>
  visible: Ref<boolean>
  topValue: Ref<number | string>
  height: Ref<number>
  type: string
  getCompHeight: () => void
  close: () => void
  floatMsg: (value: number) => void
}
