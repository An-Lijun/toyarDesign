export interface IfieldList{
  [index: string]: {
    fns:Array<Function>,
    clearValidate:Function
  }
}
export type TerrList =Array<{[index: string]:string}>
