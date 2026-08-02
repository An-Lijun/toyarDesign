import useNmSpace from '../hooks/useBem'
import buildProps from './buildProps'
import type { ExtractPropTypes } from 'vue'
import type { CreateComponentContextOptions, ComponentContext, selfPropsType } from './type'

/**
 * 所有组件共享的公共属性
 * 通过 createComponentContext 自动注入，对所有组件生效
 */
const commonProps = {
  /** 自定义类名，将追加到组件根节点 */
  customClass: {
    type: [String, Array, Object],
    default: ''
  }
}

/**
 * 组件上下文工厂函数
 * 统一处理 props 定义、nm 创建和 emits 定义，减少样板代码
 * 自动注入 customClass 等公共属性，对所有组件生效
 *
 * @example
 * // 基础用法
 * export const { staticProps, badgeProps, nm, badgeEmits } = createComponentContext({
 *   name: 'badge',
 *   props: {
 *     text: { type: String, default: '' },
 *     max: { type: Number, default: 99 }
 *   },
 *   emits: {}
 * })
 *
 * @param options 组件配置
 * @returns 组件上下文对象
 */
export function createComponentContext<
  T extends selfPropsType,
  E extends Record<string, any> | string[] = Record<string, any>
>(options: { name: string; props: T; emits?: E }): ComponentContext<ExtractPropTypes<T & typeof commonProps>, E> {
  const { name, props, emits } = options

  // 合并公共属性（组件自定义属性优先，确保 customClass 对所有组件生效）
  const mergedProps = { ...commonProps, ...props } as selfPropsType

  return {
    staticProps: mergedProps,
    useProps: buildProps(mergedProps) as ExtractPropTypes<T & typeof commonProps>,
    nm: useNmSpace(name),
    useEmits: emits as E
  }
}

export default createComponentContext
