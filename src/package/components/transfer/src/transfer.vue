<template>
  <div :class="nm.b()">
    <div :class="nm.e('left')">
      <header>
        <TyCheckBox
          @change="handleLfAllChange"
          :disabled="leftDisabled"
          :canHarf="leftHarf"
          :style="checkBoxStyle"
          v-model="leftAllCheck"
          :value="1"
          size="mini"
          >源数据</TyCheckBox
        >
      </header>
      <div :class="nm.e('container')" v-if="data.length">
        <div :class="nm.e('item')" v-for="item in data" :key="item.value">
          <TyCheckBox
            @change="handleLfChange"
            :disabled="leftDisabled"
            :style="checkBoxStyle"
            v-model="leftCheck"
            :value="item.value"
            size="mini"
            >{{ item.label }}</TyCheckBox
          >
        </div>
      </div>
      <div v-else style="height: 200px">
        <TyEmpty></TyEmpty>
      </div>
    </div>
    <div :class="nm.e('center')">
      <span :class="nm.is('rightDisabled', rightDiabeld)">
        <TyiArrowRightSLine
          :size="25"
          @click="handleToRight"
        ></TyiArrowRightSLine>
      </span>
      <span :class="nm.is('leftDisabled', leftDisabled)">
        <TyiArrowLeftSLine
          :size="25"
          @click="handleToLeft"
        ></TyiArrowLeftSLine>
      </span>
    </div>
    <div :class="nm.e('right')">
      <header>
        <TyCheckBox
          @change="handleRtAllChange"
          :disabled="rightDiabeld"
          :canHarf="rightHarf"
          :style="checkBoxStyle"
          v-model="rightAllCheck"
          :value="1"
          size="mini"
          >选中数据</TyCheckBox
        >
      </header>
      <div :class="nm.e('container')" v-if="model.length">
        <div :class="nm.e('item')" v-for="item in model" :key="item.value">
          <TyCheckBox
            @change="handleRtChange"
            :disabled="rightDiabeld"
            :style="checkBoxStyle"
            v-model="rightCheck"
            :value="item.value"
            size="mini"
            >{{ item.label }}</TyCheckBox
          >
        </div>
      </div>
      <div v-else style="height: 200px">
        <TyEmpty></TyEmpty>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TyiArrowLeftSLine, TyiArrowRightSLine } from 'toyaricon'
import { TyCheckBox } from '../../check-box'
import TyEmpty from '../../empty'
import { nm, useProps, useEmits } from './context'
import useTransfer from './use-transfer'

defineOptions({
  name: 'TyTransfer'
})

const checkBoxStyle = {
  '--border-radius-4': '2px',
  '--size-mini': '15px',
  '--fill-2': 'var(--fill-4)'
}

const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const model = defineModel('modelValue', {
  type: Array,
  default: () => []
})

const {
  data,
  leftCheck,
  rightCheck,
  leftDisabled,
  rightDiabeld,
  leftAllCheck,
  rightAllCheck,
  leftHarf,
  rightHarf,
  handleToRight,
  handleToLeft,
  handleLfChange,
  handleRtChange,
  handleLfAllChange,
  handleRtAllChange
} = useTransfer(props, model)
</script>
