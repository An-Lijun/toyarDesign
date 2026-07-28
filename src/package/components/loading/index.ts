import { installComp } from '../../utils'
import TyLoading from './src/loading.vue'
import { createVNode, render } from 'vue'
import TyLoadingDirc from './src/loading'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useLoading } from './src/use-loading'
import type { TyLoadingInstance, UseLoadingReturn } from './src/type'

const doc = document || {}

const createLoading = (div: any) => {
  const instance = createVNode(TyLoading, {
    isFixed: true
  })
  function close() {
    doc?.body?.removeChild(div)
  }
  return {
    close,
    instance
  }
}

export function LoadingJs(el: any = doc.body) {
  if (doc) {
    const div = doc?.createElement('div')
    const { instance, close } = createLoading(div)
    render(instance, div)
    el.appendChild(div)
    return close
  }
}

TyLoadingDirc.install = (app: any) => {
  app.directive('Loading', TyLoadingDirc)
}

export const useTyLoading = {
  useProps,
  nm,
  useEmits,
  useLoading,
  staticProps
}

export type { TyLoadingInstance, UseLoadingReturn }

export default installComp(TyLoading)
