import type {Ref} from 'vue'

export interface IfieldList{
  [index: string]: {
    formItemData:{
      formItemError:Ref
      validateFnLs:Array<Function>
    },
    clearValidate:Function
  }
}
export type TerrList =Array<{[index: string]:string}>
