import { createVNode, render, nextTick, h, type VNode } from 'vue'
import { is } from 'robinson'
import dialog from '../../dialog/src/dialog.vue'
import TyButton from '../../button/src/button.vue'
import { TY_MOOD } from '../../../constant/index'
import type { IOption } from './type'
import { defaultDialogOptions, dialogIconMap } from './content'

export interface UseAlertReturn {
  vnode: VNode
  destroy: () => void
}

export default function useAlert(
  info: string,
  options: IOption
): UseAlertReturn {
  const div = document.createElement('div')
  const mergedOptions = Object.assign({}, defaultDialogOptions, options)

  const genOptions = (opts: IOption) => {
    let footerBtn = []
    if (opts.sure) {
      footerBtn.push(
        h(
          TyButton,
          {
            state: TY_MOOD[opts.type],
            onClick: () => {
              opts?.sure?.code && is(opts.sure.code, 'function') && opts.sure.code()
            }
          },
          opts.sure.text || '确认'
        )
      )
    }
    if (opts.cancel) {
      footerBtn.push(
        h(
          TyButton,
          {
            type: 'secondary',
            state: TY_MOOD[opts.type],
            onClick: () => {
              opts?.cancel?.code && is(opts.cancel.code, 'function') && opts.cancel.code()
            }
          },
          opts.cancel.text || '取消'
        )
      )
    }
    return footerBtn.length ? h(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      },
      footerBtn
    ) : null
  }

  const footer = genOptions(mergedOptions) || null

  const vnode = createVNode(
    dialog,
    {
      isUnderLine: mergedOptions.isUnderLine,
      modelValue: true,
      isTeleport: false,
      'onUpdate:modelValue': () => {
        document.body.removeChild(div)
      }
    },
    {
      title: () => h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        },
        [
          h(dialogIconMap[mergedOptions.type], {
            style: {
              color: `var(--${TY_MOOD[mergedOptions.type]}-6)`,
              fontSize: '24px',
              marginRight: '10px'
            },
            size: 24
          }),
          mergedOptions.title
        ]
      ),
      default: () => info,
      footer: () => footer
    }
  )

  render(vnode, div)
  document.body.appendChild(div)

  nextTick(() => {
    vnode!.component!.exposed!.showValue.value = true
  })

  const destroy = () => {
    document.body.removeChild(div)
  }

  return {
    vnode,
    destroy
  }
}