

<template>
  
    <header>
    <button @click="change">切换</button>
    <button @click="change2">状态切换</button>
  </header>
  <button @click="fnnn">111</button>
  <TyButton @dblclick="fnn">提交1</TyButton>
  <TyButton @click="visible = true">onpen</TyButton>
  <TyTable :columns="[
    {title:'姓名',key:'name'},
    {title:'年龄',key:'age'},
    {title:'地址',key:'address'},
]"
  :data="[
    {
      name:'张三',
      age:'18',
      address:'南京'
    },  
    {
      name:'李四',
      age:'18',
      address:'上海'
    },
    {
      name:'张二麻子',
      age:'18',
      address:'长春'
    },
  ]"
>
    <template #operation="scroped">
      <TyButton @click="fnner(scroped.row)">{{ scroped.row.name }}</TyButton>
    </template>
</TyTable>
  <br>
<br>
<br>

  <TyCard>
      123456
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
  <TyInput :disabled="boolean" v-model="dd" @input="inp" @blur="a" style="width:500px">
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
  {{ formData.dd }}
  <hr>
  {{ cd }}
  <input type="radio" v-model="cd" value="2" id="">
  <input type="radio" v-model="cd" value="3" id="">
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
    <TyBackTop type="square" :right="100"/>

  <!-- </div> -->
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TyCalendar } from './package';
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
const fnner=(row)=>{
  console.log(row);
  
}
const rules = {
  'dd': [
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
    { min: 2, max: 5 }
  ],
  'cc': [
    { required: true, message: `cc 是必填字段`, trigger: ['blur'] }, {
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
function fnnn() {
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
</style>
