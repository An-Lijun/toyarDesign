import TyAffix from './src/affix.vue'
import {  type Ref  } from "vue";

export type TyAffixInstance =InstanceType<typeof TyAffix>
export interface UseAffixReturn {
  styles: Ref<Record<string, string>>
  isFixed: Ref<boolean>
  affixRef: Ref<HTMLElement | null>
}
