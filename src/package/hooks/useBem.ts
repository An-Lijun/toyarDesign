export const defaultNamespace = "ty";

const statePrefix = "is-";

/**
 * 定义useNameSpace返回值的TS类型（方便外部复用）
 */
export interface UseNameSpaceReturn {
  /** 生成状态类名（is-xxx） */
  is: (stateNm: string, isAddNm?: boolean) => string;
  /** 生成基础块类名 */
  b: () => string;
  /** 生成元素类名（block__element） */
  e: (elNm: string) => string;
  /** 生成修饰符类名（block--modifier） */
  m: (modifierNm: string) => string;
  /** 生成完整BEM类名（block-blockSuffix__element--modifier） */
  bem: (blockSuffix: string, elNm?: string, modifierNm?: string) => string;
}

/**
 * BEM类名核心生成器
 * @param block 块名（必填）.ElementNm
 * @param blockSuffix 块后缀（可选，对应 .ElementNm-xxx）
 * @param element 元素名（可选，对应 .ElementNm__element）
 * @param modifier 修饰符（可选，对应 .ElementNm--state）
 *   对于布尔开启状态使用 is-xxx 来表示状态
 * @returns 拼接完成的BEM类名
 */

const genBem = (
  block: string,
  blockSuffix: string = "",
  element: string = "",
  modifier: string = "",
): string => {
  // 生成basename
  let cls = `${defaultNamespace}-${block}`;
  // 拼接块后缀：namespace-block-blockSuffix
  if (blockSuffix) cls += `-${blockSuffix}`;
  // 拼接元素：namespace-block__element
  if (element) cls += `__${element}`;
  // 拼接修饰符：namespace-block--modifier
  if (modifier) cls += `--${modifier}`;

  return cls;
};

export default function useNmSpace(blockNm: string): UseNameSpaceReturn {
  const is = (stateNm: string, isAddNm: boolean = true) =>
    isAddNm ? `${statePrefix}${stateNm}` : "";

  const b = () => (blockNm && blockNm ? genBem(blockNm) : "");
  const e = (elNm: string): string =>
    elNm && elNm ? genBem(blockNm, "", elNm) : "";
  const m = (modifierNm: string) =>
    modifierNm && modifierNm ? genBem(blockNm, "", "", modifierNm) : "";
  const bem = (blockSuffix: string, elNm?: string, modifierNm?: string) =>
    genBem(blockNm, blockSuffix, elNm, modifierNm);

  return {
    is,
    b,
    e,
    m,
    bem,
  };
}