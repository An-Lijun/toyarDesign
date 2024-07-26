import { hasTypeIn } from "./is"

const arrayToObject = (arr: any[]) => {
  const obj: any = {}
  arr.forEach(([key, value]) => {
    obj[key] = value
  })
  return obj
}

const buildProp = prop => {
  const { values, required, default:defVal, type, validator } = prop
  let defaultValue = defVal ;
  if (hasTypeIn(defaultValue, ['object', 'array'])) {
    defaultValue = () => (defaultValue)
  }
  const initValidator = () => {
    if (validator) return validator
    if (values && Array.isArray(values)) return (value: any) => values.includes(value)
    return
  }

  return {
    type,
    required,
    default: defaultValue,
    validator: initValidator()
  }
}
export const buildProps = props => {
  return arrayToObject(Object.entries(props).map(([key, option]) => [key, buildProp(option)]))
}