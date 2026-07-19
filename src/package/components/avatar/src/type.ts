import TyAvatar from './avatar.vue'
import { type Ref } from "vue";

export type TyAvatarInstance = InstanceType<typeof TyAvatar>

export interface UseAvatarReturn {
  avatarRef: Ref<HTMLElement | null>
  textRef: Ref<HTMLElement | null>
  textTransform: Ref<string>
}