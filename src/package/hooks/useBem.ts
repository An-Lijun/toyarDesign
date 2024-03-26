
export const defaultNamespace = 'ty'

const statePrefix = 'is-'
/**
命名规则如下

  .ElementNm // 表示一个块
  .ElementNm__element //表示块中的一个元素
  .ElementNm-xxx //表示一个后缀
  .ElementNm--state //表示块中的一种样式

  对于布尔开启状态使用 is-xxx 来表示状态

 */
const genBem = (
  block: string,
  blockSuffix?: string,
  element?: string,
  modifier?: string
) => {

  // 生成basename
  let cls = `${defaultNamespace}-${block}`
  // 生成后缀
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  // 生成元素
  if (element) {
    cls += `__${element}`
  }
  //生成修饰符
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export  default function useNmSpace(blockNm:string){

  const is =(stateNm:string,isAddNm:boolean=true)=>  isAddNm ? `${statePrefix}${stateNm}` : ''
  
  const b =()=>blockNm && blockNm ? genBem(blockNm) : ''
  const e =(elNm:string)=> elNm&& elNm? genBem( blockNm, '', elNm):'' 
  const m =(modifierNm:string)=>modifierNm&& modifierNm? genBem(blockNm,'','',modifierNm):''
  const bem = (blockSuffix:string,elNm:string,modifierNm:string)=>genBem(blockNm,blockSuffix,elNm,modifierNm)

  return {
    is,
    b,
    e,
    m,
    bem
  }
}