import { createVNode, render, nextTick, h } from 'vue'

import dialog from '../dialog/src/dialog.vue'
import TyButton from '../button/src/button.vue'
import TyIcon from '../icon/src/icon.vue'
import { TY_MOOD } from '@/package/constant/index'

import type { IOption, strObj } from './type'


const msgIconObj: strObj = {
  info: 'ty-information-fill',
  success: 'ty-checkbox-circle-fill',
  warning: 'ty-information-fill',
  error: 'ty-close-circle-fill',
}
const defOptions = {
  title: '提示',
  type: 'info',
  isUnderLine: false
}

const genOptions = (options: IOption) => {
  let footerBtn = []
  if (options.sure) {
    footerBtn.push(
      h(
        TyButton,
        {
          state: options.type,
          onClick: options.sure.code || (() => { })
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
          state: options.type,
          onClick: options.cancel.code || (() => { })
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
      info,
      isUnderLine: options.isUnderLine,
      modelValue: true,
      'onUpdate:modelValue': () => {
        document.body.removeChild(div)
      }
    },
    {
      title: h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        },
        [h(TyIcon, {
          icon: msgIconObj[options.type],
          style: {
            color: `var(--${TY_MOOD[options.type]}-6)`,
            fontSize: '24px',
            marginRight: '10px'
          }
        }),
          info]
      ),
      footer
    }
  )
}

export default function AlertJs(
  info: string,
  options: IOption
) {
    const div = document.createElement('div')
    if (div) {
      const instance = createAlert(info,options, div)
      render(instance, div)
      document.body.appendChild(div)
      nextTick(() => {
        instance!.component!.exposed!.showValue.value = true
      })
    }
}



