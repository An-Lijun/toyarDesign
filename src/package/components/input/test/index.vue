<template>
  <div class="divRoot">
    <div>
      {{ inp }}
    </div>
    <TyInput v-model="inp" 
    :format="()=>{}"
    @blur="()=>{console.log('blur')}"
    @focus="()=>{console.log('focus')}"
    @enter="()=>{console.log('enter')}"
    @clear="()=>{console.log('clear')}"
    @input="(v)=>{console.log('input',v)}"

    />

    <hr>
    <TyInput v-model="inp" :clearable="false"/>
    <hr>
    <TyInput v-model="inp"  size="mini" :showLimit="true" maxlength="10" />
    <hr>
    <TyInput v-model="inp"  size="mini" />

    <hr>
    <TyInput v-model="inp"  size="small" />
    <hr>
    <TyInput v-model="inp"  size="medium" />
    <hr>
    <TyInput v-model="inp"  size="large" />
    <hr>
    <TyInput v-model="inp"  outPreText="http" size="large" />
    <hr />
    <TyInput v-model="inp" >
  <template #outPre>
    <TyButton>btn</TyButton>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp"  disabled>
  <template #outPre>
    <TyButton>btn</TyButton>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp"  outAftText=".com" size="large" />
<hr />
<TyInput v-model="inp" size="mini">
  <template #outAft>
    <TyButton>
      <ty-icon color="#FFF" icon="ty-search-line" />
    </TyButton>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp" >
  <template #outAft>
    <TyButton>
      <ty-icon color="#FFF" icon="ty-search-line" />
    </TyButton>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp" size="medium" >
  <template #outAft>
    <TyButton  style="height: 100%;">
      <ty-icon color="#FFF" icon="ty-search-line" />
    </TyButton>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp"  size="large"  
  :format="numberToWords"
>
  <template #outAft>
    <TyButton style="height: 100%;">
      <ty-icon color="#FFF" icon="ty-search-line" />
    </TyButton>
  </template>
</TyInput>
<TyInput  v-model="inp2" @blur="inpBlur" @input="inpInput"
  @focus="inpFocus"
  @enter="inpEnter"
  @clear="inpClear"
  clearable
> 

</TyInput>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const inp = ref('')
const inp2 = ref('')

function numberToWords(input) {
  let dotArr = ['角', '分'] //, '厘', '毫', '丝'
  let digitArr = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unitArr = [
    ['', '拾', '佰', '仟'],
    ['', '万', '亿', '兆']
  ]
  let num = String(input).trim()
  let intStr = '',
    dotStr = '' //记录整数字符串 记录小数字符串
  let head = '';
  if (num[0] == '-') {
    head = "负";
    num = num.slice(1);
  }
  let [int = '', dot = ''] = num.split('.')
  int = int.slice(-12).split('').reverse().join('')
  dot = dot.slice(0, 2)
  if (!(int + dot).replace(/0+/g, '')) return '零元整'
  for (let i = 0; i < int.length; i++) {
    let unitIndex = Math.floor(i / 4) //获取 空万亿的索引
    let decadeIndex = i % 4 //获取个十百千的索引
    let cash = digitArr[int[i]]
    let unit = ''
    if (cash !== '零') {
      unit = unitArr[0][decadeIndex]
      if (intStr.indexOf(unitArr[1][unitIndex]) == -1) {
        unit += unitArr[1][unitIndex]
      }
    }
    intStr = cash + unit + intStr
  }
  intStr = intStr.replace(/零+/g, '零') + '元'
  intStr == '零元' ? (intStr = intStr.replace(/零元/, '')) : (intStr = intStr.replace(/零元/, '元'))
  if (dot.length > 0) {
    for (let i = 0; i < dotArr.length && dot[i]; i++) {
      if (intStr.length == 0 && i == 0 && dot[i] == '0') continue
      dotStr += digitArr[dot[i]]
      if (dot[i] != '0') {
        dotStr += dotArr[i]
      }
    }
  }
  dotStr = (dotStr.replace(/零+/g, '零') == '零' ? '' : dotStr.replace(/零+/g, '零')) || '整'
  return head + intStr + dotStr
}

const inpBlur=(data)=>{
  console.log('blur');
  
}
const inpInput=(data)=>{
  console.log('inpInput',data);
  
}
const inpFocus=(data)=>{
  console.log('inpFocus');
  
}
const inpEnter=(data)=>{
  console.log('inpEnter');
}
const inpClear=(data)=>{
  console.log('inpClear');
}

</script>
<style lang="less" scoped>
</style>
