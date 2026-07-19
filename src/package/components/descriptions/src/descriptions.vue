<template>
  <div :class="[nm.b(), nm.m(size), nm.m(layout), nm.m(align), nm.is('border', border)]">
    <div :class="nm.e('title')">
      {{ title }}
    </div>
    <div :class="nm.e('body')">
      <table :class="nm.e('table')">
        <tbody>

          <template v-for="row in relData">
          <tr :class="nm.e('row')">
            <template v-for="td in row">
              <td colspan="1" v-if="layout === 'column'">
                <div :class="nm.e('item')">
                  <div :class="nm.e('label')">{{ td.label }}</div>
                  <div :class="nm.e('value')">{{ td.value }}</div>
                </div>
              </td>

              <template v-else>
                <td :class="nm.e('label')">{{ td.label }}</td>
                <td colspan="1" :class="nm.e('value')">{{ td.value }}</td>
              </template>
            </template>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { descProp, nm } from './context'
defineOptions({
  name: 'TyDescriptions'
})
const props = defineProps(descProp)

const getChunkArray = (
  array: Array<any>,
  size: number = 1
): Array<Array<any>> => {
  if (!Array.isArray(array)) {
    throw new TypeError('params is not a array')
  }
  let newArr: Array<any> = []
  array.forEach((element, index) => {
    if (index % size === 0) {
      return newArr.push([element])
    }
    return newArr.at(-1).push(element)
  })
  return newArr
}
const relData = getChunkArray(props.data, props.column)
</script>
