import TyBadge from './badge.vue'
import { type ComputedRef } from 'vue'

export type TyBadgeInstance = InstanceType<typeof TyBadge>
export interface UseBadgeReturn {
  text: ComputedRef<string | number>
}