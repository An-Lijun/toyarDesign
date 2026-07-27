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
                <td colspan="1" v-if="layout === 'column'" :key="td.label">
                  <div :class="nm.e('item')">
                    <div :class="nm.e('label')">{{ td.label }}</div>
                    <div :class="nm.e('value')">{{ td.value }}</div>
                  </div>
                </td>
                <template v-else>
                  <td :class="nm.e('label')" :key="'label-' + td.label">{{ td.label }}</td>
                  <td colspan="1" :class="nm.e('value')" :key="'value-' + td.label">{{ td.value }}</td>
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
import { nm, useProps } from './context'
import useDescriptions from './use-descriptions'

defineOptions({
  name: 'TyDescriptions'
})

const props = defineProps(useProps)
const { relData } = useDescriptions(props)
</script>
