<template>
  <div :class="inputClass">
    <div :class="nm.e('outPre')" ref="outPre" v-if="useSlots().outPre">
      <slot name="outPre"> </slot>
    </div>
    <span :class="nm.e('innerPre')" v-if="useSlots().innerPre" ref="innerPre" :style="{
      color: disabled ? 'var(--text-4)' : 'var(--text-1)',
      transform: `translateX(${outPreWidth}px)`,
    }">
      <slot name="innerPre"> </slot>
    </span>
    <input v-bind="attrs" v-if="isShowFormat" v-show="isShowFormat" :class="[
      nm.is('outPre', outPreWidth > 0),
      nm.is('outAft', outAftWidth > 0),
    ]" :style="[
        {
          paddingLeft: `${innerPreWidth + 20}px`,
          paddingRight: `${(innerAftWidth > 0 ? innerAftWidth : 16) +
            (limitBlockWidth > 0 ? limitBlockWidth - 10 : 0) +
            20
            }px`,
        },
      ]" :disabled="disabled" :readonly="readonly" :value="formatValue" @click="handleToFocus" ref="nativeFormatInp" />

    <input :type="attrs.type || 'text'" v-bind="attrs" ref="nativeInp" v-show="!isShowFormat" v-model="model" :class="[
      nm.is('outPre', outPreWidth > 0),
      nm.is('outAft', outAftWidth > 0),
    ]" :style="[
        {
          paddingLeft: `${innerPreWidth + 20}px`,
          paddingRight: `${(innerAftWidth > 0 ? innerAftWidth : 16) +
            (limitBlockWidth > 0 ? limitBlockWidth - 10 : 0) +
            20
            }px`,
        },
      ]" :disabled="disabled" :readonly="readonly" @input="handleInput" @blur="handleBlur" @click="handleToFocus"
      @keydown.enter="handleEnter" />

    <span ref="innerAft" :class="nm.e('innerAft')" v-if="useSlots().innerAft" :style="{
      transform: `translateX(-${limitBlockWidth > 0 ? limitBlockWidth + outAftWidth - 10 : outAftWidth
        }px)`,
    }">
      <slot name="innerAft"></slot>
    </span>
    <span v-if="isShowClearBtn" :class="[nm.is('clear')]" :style="{
      position: 'absolute',
      right: '10px',
      top: '2px',
      transform: `translateX(-${limitBlockWidth > 0 ? limitBlockWidth + outAftWidth - 10 : outAftWidth
        }px)`,
    }" @click.stop="handleClear">
      <TyiCloseLine class="close" size="14"></TyiCloseLine>
      <TyiCloseCircleLine class="closeCircle" size="14"></TyiCloseCircleLine>
    </span>

    <span :class="nm.is('limit')" v-if="showLimit" ref="limitBlock" :style="{
      transform: `translateX(-${outAftWidth || 18}px)`,
    }">
      {{ model.length }}/{{ attrs.maxlength }}
    </span>
    <div :class="nm.e('outAft')" ref="outAft" v-if="useSlots().outAft">
      <slot name="outAft"> </slot>
    </div>
  </div>
</template>
<script setup>
import { useSlots } from 'vue'
import { TyiCloseLine, TyiCloseCircleLine } from 'toyaricon'
import { useProps, nm, useEmits } from './context'
import useInput from './use-input'

defineOptions({
  name: 'TyInput'
})

const model = defineModel('modelValue')
const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const {
  attrs,
  limitBlock,
  nativeInp,
  outPre,
  innerPre,
  outAft,
  innerAft,
  nativeFormatInp,
  outPreWidth,
  formatValue,
  limitBlockWidth,
  innerPreWidth,
  outAftWidth,
  innerAftWidth,
  isShowFormat,
  disabled,
  readonly,
  isShowClearBtn,
  inputClass,
  tyFormItem,
  handleInput,
  handleToFocus,
  handleBlur,
  handleClear,
  handleEnter
} = useInput(props, emit, model)
</script>
