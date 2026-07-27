import TySpace from './space.vue'
import { type VNode } from 'vue'

export type TySpaceInstance = InstanceType<typeof TySpace>

export interface UseSpaceReturn {
  getChildren: () => VNode[]
  containerStyle: Record<string, string>
}
