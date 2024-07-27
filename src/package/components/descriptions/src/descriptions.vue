<template>
  <div :class="[nm.b(), nm.m(size), nm.m(layout), nm.m(align), nm.is('border', border)]">
    <div :class="nm.e('title')">
      {{ title }}
    </div>
    <div :class="nm.e('body')">
      <table :class="nm.e('table')">
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
<style lang="scss" scoped>
.ty-descriptions {
  color: var(--text-2);
  font-size: 14px;
  background-color: var(--color-bg-1);

  &__table {
    width: 100%;
  }

  &__title {
    color: var(--text-1);
    font-weight: 500;
    line-height: 1.5715;
    font-size: var(--font-title-1);
    margin-bottom: var(--margin-4);
  }

  &__item {
    box-sizing: border-box;
    line-height: 1.5715;
  }

  &__label {
    color: var(--text-3);
    font-weight: 500;
  }

  &__value {
    color: var(--text-1);
    font-weight: 400;
  }
}

.ty-descriptions--row {
  .ty-descriptions__item {
    display: inline-flex;
  }

  &.ty-descriptions--mini {

    .ty-descriptions__label,
    .ty-descriptions__value {
      padding: 0 20px 3px 0;
      font-size: 12px;
    }
  }

  &.ty-descriptions--small {

    .ty-descriptions__label,
    .ty-descriptions__value {
      padding: 0 20px 3px 0;
      font-size: 14px;

    }
  }

  &.ty-descriptions--medium {

    .ty-descriptions__label,
    .ty-descriptions__value {
      padding: 0 20px 5px 0;
      font-size: 16px;
    }
  }

  &.ty-descriptions--large {

    .ty-descriptions__label,
    .ty-descriptions__value {
      padding: 0 20px 9px 0;
      font-size: 18px;
    }
  }
}

.ty-descriptions--left {
  .ty-descriptions__label {
    text-align: left;
  }
}

.ty-descriptions--right {
  .ty-descriptions__label {
    text-align: right;
  }
}

.ty-descriptions--center {
  .ty-descriptions__label {
    text-align: center;
  }
}

.is-border {

  table {
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid var(--border-color-2);

    .ty-descriptions__label {
      background-color: var(--fill-2);

    }
  }

  td {
    border-right: 1px solid var(--border-color-2);
    border-bottom: 1px solid var(--border-color-2);
    box-sizing: border-box;
  }

  td:last-child {
    border-right: unset;
  }

  tr:last-child {
    td {
      border-bottom: unset;
    }
  }



  .ty-descriptions--left {
    .ty-descriptions__label {
      text-align: left;
    }
  }

  .ty-descriptions--right {
    .ty-descriptions__label {
      text-align: right;
    }
  }

  .ty-descriptions--center {
    .ty-descriptions__label {
      text-align: center;
    }
  }











  &.ty-descriptions--row {

    &.ty-descriptions--mini {

      .ty-descriptions__label,
      .ty-descriptions__value {
        padding: 3px 20px;
      }
    }

    &.ty-descriptions--small {

      .ty-descriptions__label,
      .ty-descriptions__value {
        padding: 3px 20px;
        font-size: 14px;

      }
    }

    &.ty-descriptions--medium {

      .ty-descriptions__label,
      .ty-descriptions__value {
        padding: 5px 20px;
        font-size: 16px;
      }
    }

    &.ty-descriptions--large {

      .ty-descriptions__label,
      .ty-descriptions__value {
        padding: 9px 20px;
        font-size: 18px;
      }
    }
  }
}
</style>
