<template>
  <div :class="inputClass">
    <!-- 前置元素 -->
    <div :class="nm.e('outPre')" ref="outPre" v-if="useSlots().outPre">
      <slot name="outPre"> </slot>
    </div>
    <!-- 前置内容 -->
    <span :class="nm.e('innerPre')" v-if="useSlots().innerPre" ref="innerPre" :style="{
      color: disabled ? 'var(--text-4)' : 'var(--text-1)',
      transform: `translateX(${outPreWidth}px)`,
    }">
      <slot name="innerPre"> </slot>
    </span>
    <!-- 输入框 -->
    <input v-bind="attrs" v-if="format" v-show="isShowFormat" :class="[
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

    <!-- 后置内容 -->
    <!-- && !isShowClearBtn -->
    <span ref="innerAft" :class="nm.e('innerAft')" v-if="useSlots().innerAft" :style="{
      transform: `translateX(-${limitBlockWidth > 0 ? limitBlockWidth + outAftWidth - 10 : outAftWidth
        }px)`,
    }">
      <slot name="innerAft"></slot>
    </span>
    <!-- clearAble -->
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
    <!-- 后置元素 -->
    <div :class="nm.e('outAft')" ref="outAft" v-if="useSlots().outAft">
      <slot name="outAft"> </slot>
    </div>
  </div>
</template>
<script setup>
import { inputProps, inputEmits, nm } from "./context";
import {
  formContent,
  formItemContent,
  configProviderDisabled,
} from "../../../hooks/symbolNm";
import { useCompMvalue } from "../../../hooks/useCompMvalue";
import {
  ref,
  onMounted,
  computed,
  toRefs,
  reactive,
  useSlots,
  useAttrs,
  watch,
  inject,
  provide,
} from "vue";

import { TyiCloseLine, TyiCloseCircleLine } from "toyaricon";

defineOptions({
  name: "TyInput",
});
const model = defineModel("modelValue", {
  required: true,
  type: String,
});

// 属性
const attrs = useAttrs();
const props = defineProps(inputProps);
const emit = defineEmits(inputEmits);
const tyForm = inject(formContent, null);
const tyFormItem = inject(formItemContent, null);

// ref
const limitBlock = ref();
const nativeInp = ref();
const outPre = ref();
const innerPre = ref();
const outAft = ref();
const innerAft = ref();
const nativeFormatInp = ref();
const focus = ref(false);
let outPreWidth = ref(0);
const formatValue = ref("");
let limitBlockWidth = ref(0);
let innerPreWidth = ref(0);
let outAftWidth = ref(0);
let innerAftWidth = ref(0);
let isShowFormatSelf = ref(true);

const isShowFormat = computed(() => {
  return props.format && isShowFormatSelf.value;
});

// computed 继承属性
const disabled = computed(() => {
  return props.disabled || tyFormItem?.disabled || tyForm?.disabled || false;
});
const readonly = computed(() => {
  return props.readonly || tyFormItem?.readonly || tyForm?.readonly || false;
});
const size = computed(() => {
  return props.size || tyFormItem?.size || tyForm?.size || "small";
});

const provideInp = reactive({ disabled, readonly });
provide(configProviderDisabled, provideInp);

onMounted(() => {
  outPreWidth.value = outPre?.value?.offsetWidth;
  innerPreWidth.value = innerPre?.value?.offsetWidth;
  outAftWidth.value = outAft?.value?.offsetWidth;
  innerAftWidth.value = innerAft?.value?.offsetWidth;
  limitBlockWidth.value = limitBlock?.value?.offsetWidth || 0;
});

function handleInput(event) {
  limitBlockWidth.value = limitBlock?.value?.offsetWidth || 0;
  // emit('update:modelValue', event.target.value)
  emit("input", event.target.value);
}

function handleToFocus() {
  emit("focus");
  focus.value = true;
  isShowFormatSelf.value = false;
  setTimeout(() => {
    nativeInp.value.focus();
  });
}

function handleBlur(event) {
  if (tyForm && tyFormItem && tyFormItem.prop) {
    tyForm.validate(tyFormItem.prop, "blur");
  }
  emit("blur", event);
  isShowFormatSelf.value = true;
  focus.value = false;
  if (nativeFormatInp?.value) {
    nativeFormatInp.value.blur();
  }
}

function handleClear() {
  focus.value = false;
  emit("update:modelValue", "");
  emit("clear");
}

function handleEnter() {
  emit("enter", model.value);
}

let isShowClearBtn = computed(() => {
  return (
    props.modelValue !== "" &&
    props.clearable &&
    !disabled.value &&
    !readonly.value
  );
});

if (props.format) {
  watch(
    model,
    (newVal, oldVal) => {
      if (newVal) {
        if (props?.format) {
          formatValue.value = props.format(newVal);
        } else {
          formatValue.value = "";
        }
      } else {
        formatValue.value = "";
      }
    },
    { immediate: true },
  );
}



const inputClass = computed(() => [
  nm.b(),
  nm.m(size.value),
  nm.is('focus', focus.value),
  nm.is('disabled', disabled.value),
  nm.is('readonly', readonly.value),
  nm.is('error', tyFormItem && tyFormItem.formItemError.isShowErrorMsg),
])

</script>


