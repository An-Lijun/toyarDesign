import TyNotification from './notification.vue'
import { type Ref } from 'vue'

export type TyNotificationInstance = InstanceType<typeof TyNotification>

export interface UseNotificationReturn {
  topValue: Ref<number | string>
  visible: Ref<boolean>
  notificationRef: Ref<HTMLElement | undefined>
  height: Ref<number>
  getCompHeight: () => void
  close: () => void
  floatNoti: (value: number) => void
}
