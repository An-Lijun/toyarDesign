import TyDrawer from './drawer.vue'

export type TyDrawerInstance = InstanceType<typeof TyDrawer>

export interface UseDrawerReturn {
  close: () => void
}
