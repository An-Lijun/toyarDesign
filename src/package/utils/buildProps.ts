import { arrayToObject,isWrapperObject } from './index'
import type { propType, selfPropType, selfPropsType } from './type'

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
  // 如果是包装类类型直接返回type即可
  if(isWrapperObject(prop)){
    return {
      type:prop
    }
  }

  const { values, required, default: defVal, type, validator } = prop as propType

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
  if (defVal !== void 0) {
    props.default = defVal
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
const buildProps = (props: selfPropsType) =>
  arrayToObject(
    Object.entries(props).map(([key, option]) =>
      [key, buildProp(option)]
    )
  )


export default buildProps