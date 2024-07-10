/**
 * @description 函数“getStringType”以字符串形式返回输入值的类型。
 * @param {any} value - “value”参数可以是任何数据类型或您想要确定其类型的值。
 * @returns 返回输入值类型的字符串表示形式 如 [object object]。
 * @example
 * ```JavaScript
 *    let num =123; getStringType(num) => '[object number]'
 *    let obj ={}; getStringType(obj) => '[object object]'
 * ```
 */
export function getStringType (value:any):String {
  return Object.prototype.toString.call(value).toLowerCase();
}
export function is (value:any, type:string):boolean {
  return getStringType(value) === `[object ${type.toLowerCase()}]`;
}

/**
 * 该函数检查给定值的类型是否存在于给定类型数组中。
 * @param {any} value - “value”参数是您要检查其类型的值。它可以是任何类型，例如数字、字符串、对象等。
 * @param types - 表示要检查的类型的字符串数组。
 * @returns 一个布尔值。
 * @example
 * ```JavaScript
*     let a ="123"; isTypeIn(a,['number','array','string']) => true
*     let a ={}; isTypeIn(a,['number','array','string']) => false
 * ```
 */
export function hasTypeIn (value:any, types:Array<string>):boolean {
  return types.some(item => is(value, item));
}