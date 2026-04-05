import { computed, useSlots, type ComputedRef, h } from 'vue'
import TyAvatar from '../../avatar'

export interface UseAvatarGroupReturn {
  avatars: ComputedRef<Array<any>>
}

export default function useAvatarGroup(props, nm): UseAvatarGroupReturn {
  const slots = useSlots()

  const avatars = computed(() => {
    const defaultSlot = slots.default?.() || []
    if (defaultSlot.length === 0) {
      console.warn('TyAvatarGroup: No children found in default slot.')
      return []
    }

    let avatarsList = []
    
    // 处理插槽中的每个头像
    for (let i = 0; i < defaultSlot.length; i++) {
      const item = defaultSlot[i]
      const zIndex = defaultSlot.length - i
      
      // 克隆 VNode 并添加样式
      const clonedVNode = h(item.type, {
        ...item.props,
        style: {
          ...item.props?.style,
          zIndex: zIndex.toString(),
          marginLeft: `-${props.offset}px`,
          border: '2px solid var(--color-bg-1)',
        }
      }, item.children)
      
      avatarsList.push(clonedVNode)
    }

    // 处理 max 属性
    if (props.max && props.max < avatarsList.length) {
      avatarsList = avatarsList.slice(0, props.max)
      
      // 添加 "+N" 头像
      const moreAvatar = h(TyAvatar, {
        style: {
          zIndex: '1',
          marginLeft: `-${props.offset}px`,
          border: '2px solid var(--color-bg-1)',
        }
      }, `+${defaultSlot.length - props.max}`)
      
      avatarsList.push(moreAvatar)
    }

    return avatarsList
  })

  return { avatars }
}
