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
