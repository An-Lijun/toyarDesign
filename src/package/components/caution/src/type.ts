import TyCaution from './caution.vue'

export type TyCautionInstance = InstanceType<typeof TyCaution>

export interface UseCautionReturn {
  cauIconObj: Record<string, any>
  colorObj: Record<string, string>
}
