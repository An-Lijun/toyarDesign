import installComp from "./src/installComp";
export const arrayToObject = (arr: any[]) => {
  const propsObj: any = {}
  arr.forEach(([key, value]) => {
    propsObj[key] = value
  })
  return propsObj
}
export function isWrapperObject(value:any) {
  return (value instanceof String ||
          value instanceof Number ||
          value instanceof Boolean ||
          value instanceof Symbol ||
          value instanceof BigInt);
}
export{
  installComp
}
 