import { createComponentContext } from '@/package/utils/createComponentContext'

export interface AffixEmits {
  'fixed-change': (value: boolean) => boolean
}

const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'affix',
  props: {
    tag: { type: String, default: 'div' },
    offsetTop: { type: Number, default: 0 },
    offsetBottom: { type: Number },
    target: { type: Element },
  },
  emits: {
    'fixed-change': (value: boolean) => true
  }
})

export { staticProps, useProps, nm, useEmits  }

