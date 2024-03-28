<template>
  <table class="ty-table">
      <thead>
        <tr>
          <th v-for="(item, index) in columns" :key="index">
            {{ item.title }}
          </th>
          <th v-if="useSlots().operation">
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tr,index) in data" :key="index">
          <td v-for="(td,indx) in columns" :key="indx"> {{ tr[td.key] }}</td>
          <td  v-if="useSlots().operation">
            <slot name="operation" :row="tr" :index="index"></slot>
          </td>
        </tr>
      </tbody>
  </table>
</template>
<script setup>
import {useSlots} from 'vue'
const props = defineProps({
  columns:{
    type:Array,
    default:()=>{
      return []
    },
  },
  data:Array,
    default:()=>{
      return []
    },
})
</script>
<style lang="scss" scoped>

.ty-table{
  overflow:hidden;
  display: table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid var(--border-color-2);
  tr{
    border-radius: inherit;
    border-bottom: 1px solid var(--border-color-2);
    th,td{
      padding: var(--padding-2);
      color: var(--text-1);
      border-bottom: 1px solid var(--border-color-2);
    }
    td{
      background-color: var(--color-bg-5);
      color: var(--text-2);
    }
    &:first-child{
      th{
        &:first-child{
        }
      }
    }
  }
  thead{
    tr{
      background-color: var(--toyar-gray-2);
      th{
        margin: 0 -5px;
        border: 0px;
        font-weight: var(--font-weight-4);
      }
    }
  }
  th,td{
    text-align: left;
  }
  tbody{

    tr{
      &:last-child{
        td{
          border-bottom: unset !important;
        }
      }
    }
  }
}
</style>
