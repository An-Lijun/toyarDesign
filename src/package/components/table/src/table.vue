<template>
  <table
    :class="[
      nm.b(),
      nm.m(size),
      borders.length && borders.map(item => nm.m(item)),
      nm.m(align)
    ]"
  >
    <thead>
      <tr>
        <th v-if="rowSelection" style="width: 12px"></th>
        <th v-for="(item, index) in columns" :key="index">
          {{ item.title }}
        </th>
        <th v-if="useSlots().operation">操作</th>
      </tr>
    </thead>
    <tbody v-if="data.length">
      <tr v-for="(tr, index) in data" :key="index">
        <td v-if="rowSelection">
          <TyRadio
            :value="tr[rowKey]"
            size="mini"
            v-if="rowSelection.type === 'radio'"
            v-model="rowSelection.selectedRows"
          >
          </TyRadio>
          <TyCheckBox
            :value="tr[rowKey]"
            v-model="rowSelection.selectedRows"
            v-else
          >
          </TyCheckBox>
        </td>
        
        <template  v-for="(td, indx) in columns" :key="indx" >
          <td 
            v-if="(showOverflow ==='title' && td.showOverflow !=='none') || td.showOverflow ==='title'"
            :style="{
              minWidth:td.minWidth,
              width:td.width,
              maxWidth:td.maxWidth
            }"
            :class="getColumnOverflow(td.showOverflow)"
            :title="tr[td.key] "
          >{{ tr[td.key] }}</td>


          
            <td 
             v-else-if="(showOverflow ==='tooltip' && td.showOverflow !=='none') || td.showOverflow =='tooltip'"
            :style="{
              minWidth:td.minWidth,
              width:td.width,
              maxWidth:td.maxWidth
            }"
          >
          <TyTooltip
            :content="tr[td.key] "
            >
            <div 
            :style="{
              minWidth:td.minWidth,
              width:td.width,
              maxWidth:td.maxWidth
            }"
            :class="getColumnOverflow(td.showOverflow)">
              {{ tr[td.key] }}
            </div>
          </TyTooltip>
        </td>
          
         

          <td 
            v-else
            :style="{
              minWidth:td.minWidth,
              width:td.width,
              maxWidth:td.maxWidth
            }"
            :class="getColumnOverflow(td.showOverflow)"
          >{{ tr[td.key] }}</td>

        </template>

        
        
        <td v-if="useSlots().operation">
          <slot name="operation" :row="tr" :index="index"></slot>
        </td>
      </tr>
    </tbody>

    <tbody v-else>
      <tr style="position: relative; height: 120px">
        <td>
          <TyEmpty
            style="
              position: absolute;

              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            "
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { useSlots } from 'vue'
import { tableProps, nm } from './context'
defineOptions({
  name: 'TyTable'
})
const props = defineProps(tableProps)

const getColumnOverflow =(value)=>{

  if (value === 'none') {
      return false
  }
   value = value ?? props.showOverflow
  
  if(['title','tooltip'].includes(value)){
    return 'showOverflow'
  }
  if(value ==='ellipsis'){
    return 'showOverflow-ellipsis'
  }
  return ''
}

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
        &:first-child {
        }
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
    tr {
      &:last-child {
        td {
          border-bottom: unset !important;
        }
      }

      td:last-child {
        border-right: unset !important;
      }
    }
  }

  $tableSize: (
    mini: 1,
    small: 5,
    medium: 9,
    large: 13
  );

  @mixin addTableSize($size, $value) {
    &--#{$size} {
      tr {
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
    th,
    td {
      border-bottom: 1px solid var(--border-color-2);
    }
  }

  &--column {
    th,
    td {
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

.showOverflow{
  white-space:nowrap;
   overflow:hidden;
}
.showOverflow-ellipsis{
  white-space:nowrap;
   overflow:hidden;
   text-overflow:ellipsis;
}
</style>
