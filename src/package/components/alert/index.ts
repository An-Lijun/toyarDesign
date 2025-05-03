import { createVNode, render, nextTick, h } from 'vue'

import {is} from '../../utils/is'
import dialog from '../dialog/src/dialog.vue'
import TyButton from '../button/src/button.vue'
import TyIcon from '../icon/src/icon.vue'
import { TY_MOOD } from '../../constant/index'

import type { IOption} from './type'
import {defaultDialogOptions, dialogIconMap} from './content'

const genOptions = (options: IOption) => {
  let footerBtn = []
  if (options.sure) {
    footerBtn.push(
      h(
        TyButton,
        {
          state: TY_MOOD[options.type],
          onClick:  () => { 
            options?.sure?.code && is(options.sure.code,'function') && options.sure.code()
          }
        },
        options.sure.text || '确认'
      )
    )
  }
  if (options.cancel) {
    footerBtn.push(
      h(
        TyButton,
        {
          type: 'secondary',
          state: TY_MOOD[options.type],
          onClick: () => { 
            options?.cancel?.code && is(options.cancel.code,'function') && options.cancel.code()
          }
        },
        options.cancel.text || '取消'
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

const createAlert = (info: string, options: IOption, div: HTMLDivElement) => {
  const footer = genOptions(options) || null

  return createVNode(
    dialog,
    {
      isUnderLine: options.isUnderLine,
      modelValue: true,
      isTeleport:false,
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
          h(dialogIconMap[options.type], {
            style: {
              color: `var(--${TY_MOOD[options.type]}-6)`,
              fontSize: '24px',
              marginRight: '10px'
            },
            size: 24
          }),
          options.title
        ],
      ),
      default: () => info,
      footer: () => footer,
    }
  )
}

export default function AlertJs(
  info: string,
  options: IOption
) {
  const div = document.createElement('div')
    const instance = createAlert(info, Object.assign(defaultDialogOptions, options), div)
    render(instance, div)
    document.body.appendChild(div)

    nextTick(() => {
      instance!.component!.exposed!.showValue.value = true
    })
  return {
    distroy: ()=>{ 
      document.body.removeChild(div)
    }
  }
}



