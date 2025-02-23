<template>
  <table :class="[
    nm.b(),
    nm.m(size),
    borders.length && borders.map(item => nm.m(item)),
    nm.m(align),
    nm.is('stripe', stripe)
  ]">
    <thead>
      <tr>
        <th v-if="rowSelection" style="width: 12px"></th>
        <th v-for="(item, index) in columns" :key="index" :style="{
          minWidth: item.minWidth,
          width: item.width,
          maxWidth: item.maxWidth
        }">

          {{ item.title }}
        </th>
        <th v-if="useSlots().operation">操作</th>
      </tr>
    </thead>
    <tbody v-if="data.length">
      <trContainer :rowSelection="rowSelection" :data="data" :columns="columns" :showOverflow="showOverflow">
        <template #operation="{ row, index }" v-if="useSlots().operation">
          <slot name="operation" :row="row"></slot>
        </template>
      </trContainer>
    </tbody>

    <tbody v-else>
      <tr style="position: relative; height: 120px">
        <td>
          <TyEmpty style="
              position: absolute;

              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            " />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { useSlots } from 'vue'
import { tableProps, nm } from './context'
import trContainer from './components/trContainer.vue'
defineOptions({
  name: 'TyTable'
})
const props = defineProps(tableProps)


</script>
<style lang="scss" scoped>
.ty-table {
  // overflow: hidden;
  display: table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 4px;
  box-sizing: border-box;
  table-layout: auto;
  tr {
    border-radius: inherit;

    th,
    td {
      // padding: var(--padding-2);
      color: var(--text-1);
    }

    td {
      background-color: var(--color-bg-5);
      color: var(--text-2);
    }

    &:first-child {
      th {
        &:first-child {}
      }
    }
  }

  thead {
    tr {
      background-color: var(--toyar-gray-2);

      th {
        margin: 0 -5px;
        font-weight: var(--font-weight-4);
      }

      th:last-child {
        border-right: unset !important;
      }
    }
  }

  tbody {
    // :deep(tr) {
    //   &:last-child {
    //     td {
    //       border-bottom: unset !important;
    //     }
    //   }

    //   :deep(td):last-child {
    //     border-right: unset !important;
    //   }
    // }
  }

  $tableSize: (
    mini: 1,
    small: 5,
    medium: 9,
    large: 13
  );

@mixin addTableSize($size, $value) {
  &--#{$size} {
    :deep(tr) {

      th,
      td {
        padding: #{$value}px 10px;
      }
    }

    // height: var(--size-#{$size});
    // line-height: var(--size-#{$size});
  }
}

@each $size, $value in $tableSize {
  @include addTableSize($size, $value);
}

&--out {
  border: 1px solid var(--border-color-2);
}

&--row {

  :deep(th),
  :deep(td) {
    border-bottom: 1px solid var(--border-color-2);
  }
}

&--column {

  :deep(th),
  :deep(td) {
    border-right: 1px solid var(--border-color-2);
  }
}

$tableAlign: (
  'left',
  'right',
  'center'
);

@mixin addTableAlign($aign) {
  &--#{$aign} {
    td {
      text-align: #{$aign};
    }
  }
}

@each $aign in $tableAlign {
  @include addTableAlign($aign);
}
}

.is-stripe {
  tbody {
    tr:nth-child(odd) {
      background-color: var(--toyar-gray-6);
    }
  }
}
</style>
