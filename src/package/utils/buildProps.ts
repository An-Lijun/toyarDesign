
const arrayToObject=(arr:any[])=>{
  const obj:any = {}
  arr.forEach(([key, value]) => {
    obj[key] = value
  })
  return obj
}

const buildProp = prop=>{
  const { values, required, default: defaultValue, type, validator } = prop

  const initValidator = ()=>{
    if(validator) return validator
    if(values) return (value:any)=>values.includes(value)
    return
  }

  return {
    type,
    required,
    default:defaultValue,
    validator: initValidator()
  }
}
export const buildProps = props=>{
  return arrayToObject(Object.entries(props).map(([key, option]) => [key, buildProp(option)]))
}