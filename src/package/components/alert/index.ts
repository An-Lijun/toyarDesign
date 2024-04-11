import { createVNode, ref, render, nextTick, h } from 'vue'
import dialog from '../dialog/src/dialog.vue'
import TyIcon from '../icon'
import TyButton from '../button'

interface IOption {
  title: String,
  type: String,
  sure: {
    text: String,
    code: Function
  },
  concel: {
    text: String,
    code: Function
  },
}

let visible = ref(false)
let doc = document || null

const genOptions = (options) => {
  const footerObj = {}
  let footerBtn = []

  if (options.sure) {
    footerBtn.push(
      h(TyButton, {
        state:options.type,
        onClick:options.sure.code||(()=>{})
      }, options.sure.text || '确认')
    )
  }
  if (options.concel) {
    footerBtn.push(
      h(TyButton, {
        type: 'secondary',
        state:options.type,
        onClick:options.concel.code||(()=>{})
      }, options.concel.text || '取消')
    )
  }
  if (options.sure || options.concel) {
    footerObj.footer = h(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      },
      [
        ...footerBtn
      ]
    )
  }
  return footerObj
    
}

const createAlert = (info: String, options: IOption, div: HTMLDivElement) => {
  const msgIconObj = {
    info: 'ty-information-fill',
    success: 'ty-checkbox-circle-fill',
    warning: 'ty-information-fill',
    error: 'ty-close-circle-fill'
  }
  const colorObj = {
    info: 'primary',
    success: 'success',
    warning: 'warning',
    error: 'danger'
  }
  const footerObj = genOptions(options)
  const instance = createVNode(
    dialog,
    {
      info,
      modelValue: visible,
      isUnderLine: false,
      'onUpdate:modelValue': () => {
        visible.value = false
        if (doc) {
          doc?.body.removeChild(div)
        }
      }
    },
    {
      title: h('div', {
        style:{
          display:'flex',
          alignItems: 'center'
        }
      }, [
        h(TyIcon, {
          icon: msgIconObj[options.type] || msgIconObj['info'],
          style: {
            color: `var(--${colorObj[options.type]}-6)`,
            fontSize:'24px',
            marginRight: '10px'
          }
        }),
        info
      ]),
      ...footerObj
    }
  )
  return instance
}

export default function AlertJs(
  info: String,
  options = {
    title: '提示'
  }
) {
  if (doc) {
    const div = doc?.createElement('div')
    if (div) {
      const instance = createAlert(info, options, div)
      render(instance, div)
      doc?.body.appendChild(div)
      nextTick(() => {
        visible.value = true
      })
    }
  }
}
