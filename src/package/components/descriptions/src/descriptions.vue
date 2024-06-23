<template>
  <div :class="[nm.b(),nm.m(layout,true)]">
    <div :class="nm.e('title')">
      {{ title }}
    </div>
    <div :class="nm.e('body')">
        <table :class="nm.e('table')">
          <template v-for="row in relData">
            <tr :class="nm.e('row')">
                <td  v-for="td in row" colspan="1">
                  <div :class="nm.e('item')">

                    <div :class="nm.e('label')">{{ td.label }}</div>
                    <div :class="nm.e('value')">{{ td.value }}</div>
                  </div>
                </td>
            </tr>
          </template>
        </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { descProp, nm } from './context'
const props = defineProps(descProp)

const getChunkArray= (array:Array<any>, size:number = 1):Array<Array<any>> =>{
  if (!Array.isArray(array)) {throw new TypeError('params is not a array');}
  let newArr:Array<any> = [];
  array.forEach((element, index) => {
    if (index % size === 0) {
      return newArr.push([element]);
    }
    return newArr.at(-1).push(element);
  });
  return newArr;
}
const relData  = getChunkArray(props.data,props.column)

</script>
<style lang="scss" scoped>
.ty-descriptions {
  color: var(--text-2);
  font-size: 14px;
  background-color: var(--color-bg-1);
  &__table{
    width: 100%;
  }
  &__title{
    color: var(--text-1);
    font-weight: 500;
    line-height: 1.5715;
    font-size: var(--font-title-1);
    margin-bottom: var(--margin-12);
  }
  &__item{
    box-sizing: border-box;
    line-height: 1.5715;
    text-align: left;
  }
  &__label{
    color: var(--text-3);
    font-weight: 500;
    margin-right: var(--margin-4);
  }
  &__value{
    color: var(--text-1);
    font-weight: 400;
  }
}
.ty-descriptions--row{
  .ty-descriptions__item{
    display: inline-flex;
  }
}
</style>
