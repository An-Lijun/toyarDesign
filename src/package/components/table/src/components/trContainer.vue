<template>
  <template v-for="(tr, index) in selfData" :key="index">

    <tr>
      <td v-if="rowSelection">
        <TyRadio :value="tr[rowKey]" size="mini" v-if="rowSelection.type === 'radio'"
          v-model="rowSelection.selectedRows">
        </TyRadio>
        <TyCheckBox :value="tr[rowKey]" v-model="rowSelection.selectedRows" v-else>
        </TyCheckBox>
      </td>

      <template v-for="(td, indx) in columns" :key="indx">
        <td v-if="
          (showOverflow === 'title' && td.showOverflow !== 'none') ||
          td.showOverflow === 'title'
        " :style="{
          minWidth: td.minWidth,
          width: td.width,
          maxWidth: td.maxWidth
        }" :class="getColumnOverflow(td.showOverflow)" :title="tr[td.key]">

<template v-if=" indx == 0">
            <span class="td__index" v-for="item in tdDndex"></span>
            <TyIcon v-if="tr.children" icon="ty-arrow-right-s-line" @click="handleClick(tr)" :class="{
              action: tr.isShowChildren
            }"></TyIcon>
          </template>
          {{ tr[td.key] }}
        </td>

        <td v-else-if="
          (showOverflow === 'tooltip' && td.showOverflow !== 'none') ||
          td.showOverflow == 'tooltip'
        " :style="{
          minWidth: td.minWidth,
          width: td.width,
          maxWidth: td.maxWidth
        }">

          <template v-if="indx == 0">
            <span class="td__index" v-for="item in tdDndex"></span>
            <TyIcon v-if="tr.children" icon="ty-arrow-right-s-line" @click="handleClick(tr)" :class="{
              action: tr.isShowChildren
            }"></TyIcon>
          </template>
          <TyTooltip :content="tr[td.key]">
            <div :style="{
              minWidth: td.minWidth,
              width: td.width,
              maxWidth: td.maxWidth
            }" :class="getColumnOverflow(td.showOverflow)">
              {{ tr[td.key] }}
            </div>
          </TyTooltip>
        </td>

        <td v-else :style="{
          minWidth: td.minWidth,
          width: td.width,
          maxWidth: td.maxWidth
        }" :class="getColumnOverflow(td.showOverflow)">
          <template v-if="indx == 0">
            <span class="td__index" v-for="item in tdDndex"></span>
            <TyIcon  v-if="tr.children" icon="ty-arrow-right-s-line" @click="handleClick(tr)" :class="{
              action: tr.isShowChildren
            }"></TyIcon>
          </template>
          {{ tr[td.key] }}
        </td>
      </template>
      <td v-if="useSlots().operation">
        <slot name="operation" :row="tr" :index="index"></slot>
      </td>

    </tr>
    <template v-if="tr.children">
      <trContainer v-if="tr.isShowChildren" :rowSelection="rowSelection" :data="tr.children" :tdDndex="tdDndex + 1"
        :columns="columns">
        <template #operation="{ row, index }" v-if="useSlots().operation">
          <slot name="operation" :row="row"></slot>
        </template>
      </trContainer>
    </template>
  </template>

</template>
<script setup>
import { useSlots } from 'vue'

defineOptions({
  name: 'trContainer'
})
const props = defineProps({
  tdDndex: { type: Number, default: 0 },
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
  showOverflow: {
    type: String,
    default: ''
  },
  rowSelection: {
    type: Object
  },
})

const handleClick = (val) => {
  console.log('111111111111111');

  val.isShowChildren = !val.isShowChildren
}
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
const selfData = ref([])
selfData.value = props.data.map(item => {
  item.isShowChildren = false
  return item
})
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

.action {
  transform: rotate(90deg);
}

.td__index {
  display: inline-block;
  height: 100%;
  width: 10px;

  &:hover {
    cursor: pointer;
  }
}
</style>
