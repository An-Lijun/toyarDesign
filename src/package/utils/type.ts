import useNmSpace from '../hooks/useBem'

export type propType = {
  type: any, required?: Boolean,
  validator?: Function | undefined,
  default?: any, values?: Array<any>
}

export type WrapperObject = Object | Array<any> | Number | String | Boolean | BigInt

export type selfPropType = {
  values?: Array<any>,
  required?: Boolean,
  default?: any,
  type?: any,
  validator?: Function,
} | WrapperObject

export type selfPropsType = {
  [key: string]: selfPropType | WrapperObject
}

export interface CreateComponentContextOptions {
  name: string
  props: selfPropsType
  emits?: Record<string, any> | string[]
}

export interface ComponentContext<Props = any, Emits = any> {
  staticProps: selfPropsType
  useProps: Props
  nm: ReturnType<typeof useNmSpace>
  useEmits: Emits
}

export type ExtractEmitsFn<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => any
    ? (event: K, ...args: Args) => void
    : never
}[keyof T]