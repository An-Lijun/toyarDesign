import { ref, computed, watch, useAttrs } from 'vue'
import { is } from 'robinson'
import type { UseInputNumberReturn } from './type'

export default function useInputNumber(
  props: Record<string, any>,
  emit: (e: string, ...args: any[]) => void,
  model: { value: number }
): UseInputNumberReturn {
  const attrs = useAttrs()()

  function fomatFloat(value: number, n: number) {
    let per = Math.pow(10, n)
    let f = Math.round(value * per) / per
    let s = f.toString()
    let rs = s.indexOf('.')
    if (rs < 0) {
      s += '.'
    }
    for (let i = s.length - s.indexOf('.'); i <= n; i++) {
      s += '0'
    }
    return s
  }

  function handleFocus() {
    emit('focus')
  }

  function handleClear() {
    emit('clear')
  }

  function handleBlur(bo: boolean) {
    let value = model.value
    if (props.stepStrictly) {
      let coun = parseInt(String(value / props.step))
      let left = value - coun * props.step
      let right = (coun + 1) * props.step - value
      let noCoun = left < right ? coun : coun + 1
      emit('update:modelValue', noCoun * props.step)
    }
    if (props.precision === 0) {
      emit('update:modelValue', Math.round(value))
    }
    if (props.precision) {
      emit('update:modelValue', fomatFloat(value, props.precision))
    }
    if (!bo) {
      emit('blur')
    }
  }

  const handleMinus = () => {
    model.value -= props.step
    setTimeout(() => {
      handleBlur(true)
      emit('change', model.value)
    })
  }

  const handleAdd = () => {
    model.value = Number(model.value) + Number(props.step)
    setTimeout(() => {
      handleBlur(true)
      emit('change', model.value)
    })
  }

  function handleInput(value: number) {
    emit('change', value)
  }

  const maxlength = computed(() => {
    if (!props.maxlength) {
      return Number.MAX_VALUE
    }
    return props.maxlength
  })

  if (is(props.maxlength, 'object')) {
    let lastRealData: any
    let timmer: any = null
    watch(
      () => model.value,
      (newV: any) => {
        clearTimeout(timmer)
        let reg = new RegExp(
          `^(0|[1-9]\\d{0,${props.maxlength.int - 1}})(\\.\\d{1,${
            props.maxlength.doub
          }})?$`
        )
        if (reg.test(newV)) {
          lastRealData = newV
        }
        timmer = setTimeout(() => {
          emit('update:modelValue', lastRealData)
        }, 500)
      }
    )
  }

  return {
    attrs,
    maxlength,
    handleFocus,
    handleClear,
    handleBlur,
    handleMinus,
    handleAdd,
    handleInput
  }
}
