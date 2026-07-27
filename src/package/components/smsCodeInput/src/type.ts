import TySmsCodeInput from './smsCodeInput.vue'
import { type Ref } from 'vue'

export type TySmsCodeInputInstance = InstanceType<typeof TySmsCodeInput>

export interface UseSmsCodeInputReturn {
  inputList: Ref<string[]>
  hiddenInputRef: Ref<HTMLInputElement | null>
  hiddenInputValue: Ref<string>
  focusedIndex: Ref<number>
  focusInput: (index?: number) => void
  handleInput: (e: Event) => void
  handleKeydown: (e: KeyboardEvent) => void
  handleBlur: () => void
  handlePaste: (e: ClipboardEvent) => void
}
