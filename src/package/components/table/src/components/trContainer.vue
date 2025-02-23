<template>
    <template v-for="(tr, index) in data" :key="index">

      <tr >
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

        <template v-for="(td, indx) in columns" :key="indx">
          <td
            v-if="
              (showOverflow === 'title' && td.showOverflow !== 'none') ||
              td.showOverflow === 'title'
            "
            :style="{
              minWidth: td.minWidth,
              width: td.width,
              maxWidth: td.maxWidth
            }"
            :class="getColumnOverflow(td.showOverflow)"
            :title="tr[td.key]"
          >
            {{ tr[td.key] }}
          </td>

          <td
            v-else-if="
              (showOverflow === 'tooltip' && td.showOverflow !== 'none') ||
              td.showOverflow == 'tooltip'
            "
            :style="{
              minWidth: td.minWidth,
              width: td.width,
              maxWidth: td.maxWidth
            }"
          >
            <TyTooltip :content="tr[td.key]">
              <div
                :style="{
                  minWidth: td.minWidth,
                  width: td.width,
                  maxWidth: td.maxWidth
                }"
                :class="getColumnOverflow(td.showOverflow)"
              >
                {{ tr[td.key] }}
              </div>
            </TyTooltip>
          </td>

          <td
            v-else
            :style="{
              minWidth: td.minWidth,
              width: td.width,
              maxWidth: td.maxWidth
            }"
            :class="getColumnOverflow(td.showOverflow)"
          >
            {{ tr[td.key] }}
          </td>
        </template>
        <td v-if="useSlots().operation">
          <slot name="operation" :row="tr" :index="index"></slot>
        </td>
    
      </tr>
      <template v-if="tr.children">
          <trContainer
          :rowSelection="rowSelection" 
            :data="tr.children"
            :index="index + 1"
            :columns="columns"
          ></trContainer>
      </template> 
    </template>

</template>
<script setup >
import { useSlots } from 'vue'

defineOptions({
  name: 'trContainer'
})
const props = defineProps({
  index: { type: Number, default: 0 },
  data:{
    type: Array,
    default: () => []
  },
  columns:{
    type: Array,
    default: () => []
  },
  showOverflow:{
    type:String,
    default:''
  },
  rowSelection:{
    type:Object
  },
})
const getColumnOverflow = value => {
  if (value === 'none') {
    return false
  }
  value = value ?? props.showOverflow

  if (['title', 'tooltip'].includes(value)) {
    return 'showOverflow'
  }
  if (value === 'ellipsis') {
    return 'showOverflow-ellipsis'
  }
  return ''
}
</script>
<style lang="scss" scoped>
.showOverflow {
  white-space: nowrap;
  overflow: hidden;
}

.showOverflow-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
