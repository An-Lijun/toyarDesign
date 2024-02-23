

<template>
  <header>
    <button @click="change">切换</button>
    <button @click="change2">状态切换</button>
  </header>
  {{ adc }}
  <TyInputNumber v-model="adc" >
    <template #outPre>
          <ty-button @click="fn">btn</ty-button>
        </template>
        <template #innerPre>
          <ty-icon icon="ty-money-cny-circle-line">
          </ty-icon>
        </template>
        <template #innerAft>
          <ty-icon icon="ty-money-cny-circle-line">
          </ty-icon>
        </template>
        <template #outAft>
          <TyButton>提交</TyButton>
        </template>
  </TyInputNumber>
  <TyInputNumber v-model="adc" :isDouble="true" >
    <template #outPre>
          <ty-button @click="fn">btn</ty-button>
        </template>
        <template #innerPre>
          <ty-icon icon="ty-money-cny-circle-line">
          </ty-icon>
        </template>
        <template #innerAft>
          <ty-icon icon="ty-money-cny-circle-line">
          </ty-icon>
        </template>
        <template #outAft>
          <TyButton>提交</TyButton>
        </template>
  </TyInputNumber>
  <br>
  <TyInput v-model="adc"  maxlength="10" outPreText="http://"
   @input="aainput"
   @blur ="aablur"
   @click ='aaClick'
   @clear ='aaclear'
   @enter="aaenter"
  >
      </TyInput>

      <TyInput v-model="adc"  maxlength="10" outPreText="http://"
      disabled
  >
      </TyInput>
      <TyInput v-model="adc"  maxlength="10" outPreText="http://"
      readonly
  >
      </TyInput>
  <Ty-Row :gutter="20">
    <Ty-Col :span="12">
      <TyInput v-model="adc"  maxlength="10" outPreText="http://">
      </TyInput>
    </Ty-Col>
    <Ty-Col :span="12">
      <TyInput v-model="adc"  maxlength="10" outAftText=".com">
      </TyInput>
    </Ty-Col>
    <Ty-Col :span="12">
      <TyInput v-model="adc"  maxlength="10" outPreText="http://" outAftText=".com">
     </TyInput>
    </Ty-Col>
    <Ty-Col :span="12">
      <TyInput v-model="adc"  maxlength="100" showLimit outPreText="http://" outAftText=".com">
      </TyInput>
    </Ty-Col>
    <Ty-Col :span="12">
      <TyInput v-model="adc" maxlength="100" showLimit outPreText="http://" outAftText=".com">
        <template #innerAft>
          <ty-icon icon="ty-money-cny-circle-line">
          </ty-icon>
        </template>
      </TyInput>
    </Ty-Col>

    <Ty-Col :span="12">
      <TyInput :disabled="boolean" v-model="dd" @input="inp" @blur="a" >
        <template #innerPre>
          <ty-icon icon="ty-money-cny-circle-line">
          </ty-icon>
        </template>
      </TyInput>
    </Ty-Col>
    <Ty-Col :span="12">
      <TyInput :disabled="boolean" v-model="dd" @input="inp" @blur="a" >
        <template #innerAft>
          <ty-icon icon="ty-money-cny-circle-line">
          </ty-icon>
        </template>
      </TyInput>
    </Ty-Col>
    <Ty-Col :span="12">
      <TyInput :disabled="boolean" v-model="dd" @input="inp" @blur="a" >

      <template #innerPre>
        <ty-icon icon="ty-money-cny-circle-line">
        </ty-icon>
      </template>
      <template #innerAft>
        <ty-icon icon="ty-money-cny-circle-line">
        </ty-icon>
      </template>

      </TyInput>
    </Ty-Col>
    <Ty-Col :span="12">
      <TyInput v-model="adc"  size="mini" :format="numberToWords" placeholder="请输入" maxlength="5" />

    </Ty-Col>
    <Ty-Col :span="12">
      <TyInput placeholder="请输入" v-model="adc"  size="small" :format="numberToWords" />
    </Ty-Col>
    <Ty-Col :span="12">
      <TyInput v-model="adc"  size="medium" placeholder="请输入" :format="numberToWords" />
    </Ty-Col>
    <Ty-Col :span="12">
      <TyInput v-model="adc"  size="large" placeholder="请输入" :format="numberToWords" />
    </Ty-Col>
    <Ty-Col :span="12">
      <TyInput :disabled="boolean" v-model="dd" @input="inp" @blur="a" >
        <template #outPre>
          <ty-button @click="fn">btn</ty-button>
        </template>
        <template #innerPre>
          <ty-icon icon="ty-money-cny-circle-line">
          </ty-icon>
        </template>
        <template #innerAft>
          <ty-icon icon="ty-money-cny-circle-line">
          </ty-icon>
        </template>
        <template #outAft>
          <TyButton>提交</TyButton>
        </template>
      </TyInput>
    </Ty-Col>
    <Ty-Col :span="12">
      <TyInput :disabled="boolean" v-model="dd" @input="inp" @blur="a" >
        <template #outPre>
          <ty-button @click="fn">btn</ty-button>
        </template>
        <template #innerPre>
          <ty-icon icon="ty-money-cny-circle-line">
          </ty-icon>
        </template>
        <template #innerAft>
          <ty-icon icon="ty-money-cny-circle-line">
          </ty-icon>
        </template>
      </TyInput>
    </Ty-Col>
    <Ty-Col :span="12">
      <TyInput :disabled="boolean" v-model="dd" @input="inp" @blur="a" >
        <template #innerPre>
          <ty-icon icon="ty-money-cny-circle-line">
          </ty-icon>
        </template>
        <template #innerAft>
          <ty-icon icon="ty-money-cny-circle-line">
          </ty-icon>
        </template>
        <template #outAft>
          <TyButton>提交</TyButton>
        </template>
      </TyInput>
    </Ty-Col>
  </Ty-Row>

<br>
  <button @click="fnnn">111</button>
  <TyButton @dblclick="fnn">提交1</TyButton>
  <TyButton @click="visible = true">onpen</TyButton>
  <TyTable :columns="[
    { title: '姓名', key: 'name' },
    { title: '年龄', key: 'age' },
    { title: '地址', key: 'address' },
  ]" :data="[
  {
    name: '张三',
    age: '18',
    address: '南京'
  },
  {
    name: '李四',
    age: '18',
    address: '上海'
  },
  {
    name: '张二麻子',
    age: '18',
    address: '长春'
  },
]">
    <template #operation="scroped">
      <TyButton @click="fnner(scroped.row)">{{ scroped.row.name }}</TyButton>
    </template>
  </TyTable>
  <br>
  <br>
  <br>
  <TyCard>
    .com
  </TyCard>
  <br>
  <TyCard>
    <template #header>
      <div>
        12345
      </div>
    </template>
    <TyCalendar v-model="date1" />
    <br>
    <TySelect v-model="ee" style="margin-bottom: 20px;">
      <TyOption v-for="(item, index) in [1, 2, 3]" :key="index" :label="item + '66'" :value="item">
      </TyOption>
    </TySelect>
  </TyCard>
  <br>
  <TyDialog v-model:visible="visible" width="500px">
    <div style="width:400px">
      {{ date1 }}
      <TyCalendar v-model="date1" />
    </div>
    <template #footer>
      <TyButton>取消</TyButton>
      <TyButton>确定</TyButton>
    </template>
  </TyDialog>
  <hr>
  <div style="width:400px">
    {{ date1 }}
    <TyCalendar v-model="date1" />

  </div>
  <hr>
  <div>
    {{ ee }}
  </div>
  <TySelect v-model="ee" style="margin-bottom: 20px;">
    <TyOption v-for="(item, index) in [1, 2, 3]" :key="index" :label="item + '66'" :value="item">
    </TyOption>
  </TySelect>
  {{ isT }}
  <TyChcekBox v-model="isT" :value="1">123</TyChcekBox>
  <TyChcekBox v-model="isT" :value="2">456</TyChcekBox>
  <TyChcekBox v-model="isT" :value="3">456</TyChcekBox>
  <TyChcekBox v-model="isT" :value="4">456</TyChcekBox>
  {{ isC }}
  <TyRadio v-model="isC" :value="2">123</TyRadio>
  <TyRadio v-model="isC" :value="3">456</TyRadio>

  <TyForm ref="form1" :formData="formData" :rules="rules">
    <TyRow :gutter="num">
      <TyCol :span="12">
        <TyFormItem prop="dd">
          <template #label>
            金额
          </template>

          <TyInput v-model="formData.dd" @input="inp" @blur="a">
            <template #outPre>
              <ty-button @click="fn" disabled>btn</ty-button>
            </template>
            <template #innerPre>
              <ty-icon icon="ty-money-cny-circle-line">
              </ty-icon>
            </template>
            <template #outAft>
              <TyButton>提交</TyButton>
            </template>
          </TyInput>
        </TyFormItem>
      </TyCol>
      <TyCol :span="12">

        <TyFormItem prop="cc">
          <template #label>
            el
          </template>
          <TyInput v-model="formData.cc" />
        </TyFormItem>
      </TyCol>
    </TyRow>

  </TyForm>

  {{ formData.dd }}
  <hr>
  {{ cd }}
  <div>
    <ty-button @click="fn" :disabled="boolean">btn</ty-button>
  </div>
  <ty-button @click="submit">submit</ty-button>
  <ty-button @click="reset">reset</ty-button>
  <!-- <div style="height: 500px; max-height: 500px;overflow: auto;"> -->
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <TyBackTop />
  <TyBackTop type="square" :right="100" />

  <!-- </div> -->
</template>
<script setup lang="ts">


import { ref, onMounted } from 'vue';
import { TyCalendar, TyInput } from './package';

function aainput(value){
  console.log(value,123456);
}
function aainputChange(value){
  console.log(value,'change');
}
function aablur(value){
  console.log(value,"666");
}
function aaClick(value){
  console.log('click');
  
}
function aaenter(a){
  console.log("123456",a);
  
}
function aaclear(){
  console.log("123456");
}
function numberToWords(input: string | number): string {
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

const date1 = ref('')
const form1 = ref()
const formData = ref({
  dd: ''
})
const isT = ref([1])
let cd = ref('2')
let boolean = ref(true)
let boolean1 = ref(true)
let ee = ref(1);
let dd = ref('111')
let num = ref(10)
let isC = ref('3')
const visible = ref(false)
const change = () => {
  boolean1.value = !boolean1.value
  let html = document.getElementsByTagName('html');
  html[0].setAttribute('toyar-theme', boolean1.value ? 'light' : 'dark')
}
const change2 = () => {
  boolean.value = !boolean.value
}
const data1 = { labelWidth: 50 }
const fn = () => {
  num.value++
  data1.labelWidth++
}
const fnner = (row) => {
  console.log(row);

}
const rules = {
  'dd': [
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
    { min: 2, max: 5 }
  ],
  'cc': [

    { required: true, message: `cc 是必填字段`, trigger: ['blur'] }, 
    {
      validate: val
    }
  ]
}
function val(data, cb) {
  if (data.length < 2) {
    return cb('length must >2')
  }
  cb()
}
function submit() {
  form1.value.validateAll().then(res => {
    console.log('success', res);
  }).catch(err => {
    console.log(err, "err");
  })
}
function fnn() {
  isT.value = [1, 2]
  console.log("666");
  isC.value = '2'

}
function inp() {
  console.log("61");

}
function a() {
  console.log('blur');
}
let adc = ref('')
function fnnn() {
  adc.value = "6456"
  dd.value = "777"
}

function reset() {
  form1.value.clearValidateAll()
}
onMounted(() => {
  console.log(form1.value.validateAll);
})

</script>
<style >
body {
  height: 100%;
  overflow: hidden;
}

#app {
  height: 500px;
  max-height: 500px;
  border: 1px solid #000;
  overflow-y: scroll;
}
.ty-col{
  margin-top: 15px;
}
</style>
