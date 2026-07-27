import TyDescriptions from './descriptions.vue'

export type TyDescriptionsInstance = InstanceType<typeof TyDescriptions>

export interface UseDescriptionsReturn {
  relData: Array<Array<any>>
}
