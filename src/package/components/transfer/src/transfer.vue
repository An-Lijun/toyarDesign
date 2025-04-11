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
        <TyIcon
          :size="25"
          icon="ty-arrow-right-s-line"
          @click="handleToRight"
        ></TyIcon>
      </span>
      <span :class="nm.is('leftDisabled', leftDisabled)">
        <TyIcon
          :size="25"
          icon="ty-arrow-left-s-line"
          @click="handleToLeft"
        ></TyIcon>
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
import { ref, computed } from 'vue'
import TyIcon from '../../icon'
import { TyCheckBox } from '../../check-box'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import TyEmpty from '../../empty'
import { transProps, transEmits, nm } from './context'

defineOptions({
  name: 'TyTransfer'
})
// 动态样式
const checkBoxStyle = {
  '--border-radius-4': '2px',
  '--size-mini': '15px',
  '--fill-2': 'var(--fill-4)'
}
const props = defineProps(transProps)
const emit = defineEmits(transEmits)
const model = defineModel('modelValue', {
  type: Array,
  default: () => []
})

// 初始化数据并确保为数组
const data = ref(Array.isArray(props.data) ? props.data : [])

// 左右两侧的选择状态
const leftCheck = ref([])
const rightCheck = ref([])

let leftDisabled = ref(false)
let rightDiabeld = ref(false)



// 移动数据到右侧
const handleToRight = () => {
  const selectedItems = data.value.filter(item => leftCheck.value.includes(item.value))
  data.value = data.value.filter(item => !leftCheck.value.includes(item.value))
  model.value.push(...selectedItems)
  leftCheck.value = []
  rightDiabeld.value = false
}

// 移动数据到左侧
const handleToLeft = () => {
  const selectedItems = model.value.filter(item => rightCheck.value.includes(item.value))
  model.value = model.value.filter(item => !rightCheck.value.includes(item.value))
  data.value.push(...selectedItems)
  rightCheck.value = []
  leftDisabled.value = false
}

// 左侧单个选择变化
const handleLfChange = (val) => {
  if (val.length) {
    rightDiabeld.value = true
  } else {
    rightDiabeld.value = false
  }
}

// 右侧单个选择变化
const handleRtChange = (val) => {
  if (val.length) {
    leftDisabled.value = true
  } else {
    leftDisabled.value = false
  }
}

// 左侧全选变化
const handleLfAllChange = (val) => {
  if (val.length) {
    leftCheck.value = data.value.map(item => item.value)
    rightDiabeld.value = true
  } else {
    leftCheck.value = []
    rightDiabeld.value = false
  }
}

// 右侧全选变化
const handleRtAllChange = (val) => {
  if (val.length) {
    rightCheck.value = model.value.map(item => item.value)
    leftDisabled.value = true
  } else {
    rightCheck.value = []
    leftDisabled.value = false
  }
}

// 计算半选状态的通用函数
const computeHalfState = (total, checked, disabled, allCheck) => {
  if (disabled.value) {
    allCheck.value = []
    return false
  }
  const isFullChecked = total.length === checked.value.length
  if (checked.value.length) {
    allCheck.value = [1]
  }
  if (isFullChecked) {
    allCheck.value = [1]
  }
  if (!checked.value.length) {
    allCheck.value = []
  }
  return !isFullChecked
}

// 左侧半选状态
const leftAllCheck = ref([])
const leftHarf = computed(() =>
  computeHalfState(data.value, leftCheck, leftDisabled, leftAllCheck)
)

// 右侧半选状态
const rightAllCheck = ref([])
const rightHarf = computed(() =>
  computeHalfState(model.value, rightCheck, rightDiabeld, rightAllCheck)
)
</script>

<style lang="scss" scoped>
.ty-transfer {
  display: inline-flex;
  align-items: center;
  &__left,
  &__right {
    min-height: 250px;
    min-width: 180px;
    border: 1px solid var(--border-color-2);
    box-sizing: border-box;
    header {
      height: 30px;
      line-height: 30px;
      padding: 0 5px;
      background-color: var(--fill-2);
    }
    .ty-transfer__item {
      height: 30px;
      line-height: 30px;
      padding: 0 5px;
    }
  }
  &__center {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    span {
      font-size: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      background-color: var(--fill-2);
      color: var(--text-4);
      margin: 5px 0;

      &.is-rightDisabled{
        background-color: var(--fill-2);
        color:var(--toyar-gray-10);

        &:hover {
        cursor: pointer;
      }
      }
      &.is-leftDisabled{
        background-color: var(--fill-2);
        color:var(--toyar-gray-10);

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  :deep(.ty-check-box) {
    .ty-check-box__input {
      border-width: 1px;
    }
  }
}
</style>