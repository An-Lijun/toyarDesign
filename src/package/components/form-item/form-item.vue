<template>
  <div class="ty-form-item">
    <label class="ty-form-label" :style="{
      display: 'block',
      wordBreak: 'break-all',
      width: `${tyForm.labelWidth}px`,

    }">
      <template v-if="tyForm.label">
        {{ tyForm.label }}
      </template>
      <slot name="label" v-else></slot>
    </label>
    <div class="ty-form-item-content">
      <slot></slot>
      <div v-show="isShowErrorMsg" class="ty-form-item-tip">
        {{errorMsg  }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { formContent } from '@/package/hooks/symbolNm'
import { inject, onMounted, toRefs } from "vue";
const tyForm = inject(formContent);
let isShowErrorMsg = ref(false);
let errorMsg = ref('')
const props = defineProps({
  prop: String,
})

const { prop } = toRefs(props)

const generatorValidata = (arr) => {
  const fnArr = [];
  arr.forEach(element => {
    let keys = Object.keys(element);
    if (keys.includes('required')){
    fnArr.push(
      (data) => {
        return new Promise((resolve, reject) => {
          console.log(tyForm.formData);
          if (!tyForm.formData[data.value]) {
            isShowErrorMsg.value = true
            errorMsg.value = element.message || `${data} is required`
            return reject(new Error('123'))
          }
          isShowErrorMsg.value = false
          resolve()
        })
      }
    )
  }
});
return fnArr
}

onMounted(() => {
  if (prop && Object.keys(tyForm.rules).includes(prop.value)) {
    tyForm.addField({
      prop,
      fns:generatorValidata(tyForm.rules[prop.value])
    })
  }
})
</script>
<style lang="scss" scoped>
.ty-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .ty-form-label {
    width: 100px;
    text-align: right;
    height: 100%;

    &:before {
      content: '*';
      color: var(--toyar-red-6);
      line-height: 100%;
    }

    &:after {
      content: ': ';
      margin-right: 5px;
    }
  }

  .ty-form-item-content {
    flex: 1;

    .ty-form-item-tip {
      color: var(--toyar-red-6);
      font-size: 12px;
      position: absolute;
    }
  }
}
</style>
