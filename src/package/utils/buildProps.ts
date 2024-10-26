import { hasTypeIn } from "./is"
type propType = { type: any, required?: Boolean, validator?: Function | undefined, default?: any }
type selfPropType = {
  values?: Array<any>,
  required?: Boolean,
  default?: any,
  type: any,
  validator?: Function
}
type selfPropsType = {
  [key: string]: selfPropType
}


const arrayToObject = (arr: any[]) => {
  const propsObj: any = {}
  arr.forEach(([key, value]) => {
    propsObj[key] = value
  })
  return propsObj
}


/**
 * 处理组件属性的配置函数
 * 
 * @param {Object} prop - 属性配置对象
 * @param {Array} [prop.values] - 可选值列表
 * @param {boolean} [prop.required] - 是否必填
 * @param {*} [prop.default] - 默认值
 * @param {Function|Array} [prop.type] - 属性类型
 * @param {Function} [prop.validator] - 自定义验证函数
 * 
 * @returns {Object} 处理后的属性配置对象
 */
const buildProp = (prop: selfPropType) => {
  const { values, required, default: defVal, type, validator } = prop
  let defaultValue = defVal;
  if (hasTypeIn(defaultValue, ['object', 'array'])) {
    defaultValue = () => (JSON.parse(JSON.stringify(defVal)))
  }
  const initValidator = () => {
    if (validator) return validator
    if (values && Array.isArray(values)) return (value: any) => values.includes(value)
    return
  }
  const props: propType = {
    type,  // 类型
    validator: initValidator()
  }
  if (required) {
    props.required = required
  }
  if (defaultValue !== void 0) {
    props.default = defaultValue
  }
  if (!props.validator) {
    delete props.validator
  }
  
  return props
}



/**
 * 将传入的属性对象转换为 vue props需要的对象。
 * @param props - 需要转换的属性对象
 * @returns 转换后的新对象，其中每个属性值都经过 buildProp 处理
 */
export const buildProps = (props: selfPropsType) => {
  return arrayToObject(Object.entries(props).map(([key, option]) => [key, buildProp(option)]))
}