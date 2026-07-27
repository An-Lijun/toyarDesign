import TyResult from './result.vue'
import type { Component } from 'vue'

export type TyResultInstance = InstanceType<typeof TyResult>

export interface UseResultReturn {
  msgIconObj: Record<string, Component>
  colorObj: Record<string, string>
}
