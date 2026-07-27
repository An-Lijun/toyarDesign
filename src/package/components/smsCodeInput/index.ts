import { installComp } from '../../utils'
import TySmsCodeInput from './src/smsCodeInput.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useSmsCodeInput } from './src/use-smsCodeInput'
import type { TySmsCodeInputInstance, UseSmsCodeInputReturn } from './src/type'

export const useTySmsCodeInput = {
  useProps,
  nm,
  useEmits,
  useSmsCodeInput,
  staticProps
}

export type { TySmsCodeInputInstance, UseSmsCodeInputReturn }

export default installComp(TySmsCodeInput)
