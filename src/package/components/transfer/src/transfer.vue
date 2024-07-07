<template>
  <div :class="nm.b()">
    <div :class="nm.e('left')">
      <header>
        <TyCheckBox
          @change="handleLfAllChange"
          :disabled="leftDiabeld"
          :canHarf="leftHarf"
          :style="style"
          v-model="leftAllCheck"
          :value="1"
          size="mini"
          >源数据</TyCheckBox
        >
      </header>
      <div :class="nm.e('container')" v-if="data.length">
        <div :class="nm.e('item')" v-for="item in data">
          <TyCheckBox
            @change="handleLfChange"
            :disabled="leftDiabeld"
            :style="style"
            v-model="check"
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
      <span>
        <TyIcon
          :size="25"
          icon="ty-arrow-right-s-line"
          @click="handleToRight"
        ></TyIcon>
      </span>
      <span>
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
          :style="style"
          v-model="rightAllCheck"
          :value="1"
          size="mini"
          >选中数据</TyCheckBox
        >
      </header>
      <div :class="nm.e('container')" v-if="model.length">
        <div :class="nm.e('item')" v-for="item in model">
          <TyCheckBox
          @change="handleRtChange"
            :disabled="rightDiabeld"
            :style="style"
            v-model="check"
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
import { ref,computed } from 'vue'
import TyIcon from '../../icon'
import {TyCheckBox} from '../../check-box'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import TyEmpty from '../../empty'
import {transProps,transEmits,nm}from './context'

defineOptions({
  name:'TyTransfer'
})
const props = defineProps(transProps)
const emit = defineEmits(transEmits)
const model = defineModel('modelValue',{
  type:Array
})

const style = '--size-mini:15px;--fill-2:var(--fill-4)'

const data = ref(props.data)

let check = ref([])

let leftDiabeld = ref(false)
let rightDiabeld = ref(false)

const handleToRight = () => {
  let arr = data.value.filter(item => check.value.includes(item.value))
  data.value = data.value.filter(item => !check.value.includes(item.value))
  model.value.push(...arr)
  check.value = []
  rightDiabeld.value = false
}
const handleToLeft = () => {
  let arr = model.value.filter(item => check.value.includes(item.value))
  model.value = model.value.filter(item => !check.value.includes(item.value))
  data.value.push(...arr)
  check.value = []
  leftDiabeld.value = false
}

const handleLfChange=(val)=>{
  if(val.length){
    return rightDiabeld.value = true
  }
    rightDiabeld.value = false
}
const handleRtChange=(val)=>{
  if(val.length){
    return leftDiabeld.value = true
  }
  leftDiabeld.value = false
}
const handleLfAllChange=(val)=>{
  if(val.length){
    check.value=data.value.map(item=> item.value)
    return rightDiabeld.value = true
  }
  rightDiabeld.value = false
  check.value=[]
}
const handleRtAllChange=(val)=>{
  if(val.length){
    check.value=model.value.map(item=> item.value)
    return leftDiabeld.value = true
  }
  check.value=[]
  leftDiabeld.value = false
}
// ty-arrow-right-s-line
// ty-arrow-left-s-line
let leftAllCheck = ref([])
let rightAllCheck = ref([])

const leftHarf = computed(() => {
  if( leftDiabeld.value){
    leftAllCheck.value=[]
    return
  }
  const flag = check.value.length === data.value.length
  if(check.value.length){
    leftAllCheck.value=[1]
  }
  if(flag){
    leftAllCheck.value=[1]
  }
  if(!check.value.length){
    leftAllCheck.value=[]
  }
  return !flag
})
const rightHarf = computed(() => {
  if(rightDiabeld.value){
    rightAllCheck.value=[]
    return
  }
  const flag = model.value.length === check.value.length
  if(check.value.length){
    rightAllCheck.value=[1]
  }
  if(flag){
    rightAllCheck.value=[1]
  }
  if(!check.value.length){
    rightAllCheck.value=[]
  }
  return !flag
})
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
      margin: 5px 0;
    }
  }
}
</style>
