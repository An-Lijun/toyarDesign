import useNmSpace from '../hooks/useBem'
import buildProps from './buildProps'
import type { ExtractPropTypes } from 'vue'
import type { CreateComponentContextOptions, ComponentContext, selfPropsType } from './type'

/**
 * 组件上下文工厂函数
 * 统一处理 props 定义、nm 创建和 emits 定义，减少样板代码
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
  Props extends selfPropsType,
  Emits extends Record<string, any> | string[] = Record<string, any>
>(options: CreateComponentContextOptions): ComponentContext<ExtractPropTypes<Props>, Emits> {
  const { name, props, emits } = options

  return {
    staticProps: props,
    useProps:  buildProps(props) as ExtractPropTypes<Props>,
    nm : useNmSpace(name),
    useEmits: emits as Emits
  }
}

export default createComponentContext