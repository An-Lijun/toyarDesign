<template>
  <div :class="[nm.b(),props.type,props.position]" ref="tab">
    <header>
      <div :class="nm.e('inner')">
        <div v-if="props.type === 'normal'" :class="nm.e('active-bar')" :style="style"></div>
        <span
          style="margin: 0 10px"
          v-for="item in header"
          @[getTrigger(props.trigger)]="itemChange(item.name)"
          :ref="item.name"
          :class="{
            select: item.name === props.modelValue
          }"
        >
          {{ item.title }}
        </span>
      </div>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>
<script setup>
import { provide, watch, ref, nextTick, computed,onMounted} from 'vue'
import tabHeader from './tab-header.vue'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import {tabsEmits,tabsProps ,nm} from './context'

defineOptions({
  name:'TyTabs'
})
const props = defineProps(tabsProps)
const emit = defineEmits(tabsEmits)

const tab = ref()
const header = ref([])

const { model } = useCompMvalue(props, emit)
const itemChange = value => {
  emit('update:modelValue', value)
}
const getTrigger =(item)=>{
  switch(item){
    case 'click':
      return 'click'
    case 'hover':
      return 'mouseenter'
    default:
      return 'click'
  }
}
const setHeader = value => {
  header.value.push(value)
}
let offset = ref({
  left: 0,
  width: 0,
  height: 0,
  top: 0
})
const baseValue = ref({ top: 0, left: 0 })
onMounted(() => {
  if (!props.modelValue && header.value.length > 0 && !props.modelValue) {
    emit('update:modelValue', header.value[0].name)
  }
})
const style = computed(() => {
  switch (props.position) {
    case 'top':
      return {
        left: offset.value.left + 'px',
        height: '2px',
        width: offset.value.width+'px'
      }
    case 'left':
      return {
        right: '0px',
        height: offset.value.height + 'px',
        width: '2px',
        top: offset.value.top + 'px'
      }
    case 'right':
      return {
        left: '0px',
        height: offset.value.height + 'px',
        width: '2px',
        top: offset.value.top + 'px'
      }
  }
})
watch(
  model,
  (newVal, oldVal) => {
    nextTick(() => {
      baseValue.value = {
        left: tab.value.getBoundingClientRect().left,
        top: tab.value.getBoundingClientRect().top
      }
      let select = tab.value.querySelector('.select')
      if (select) {
        const activeTabBounding = select.getBoundingClientRect()
        offset.value.left = activeTabBounding.left - baseValue.value.left
        offset.value.width = activeTabBounding.width
        offset.value.height = activeTabBounding.height
        offset.value.top = activeTabBounding.top - baseValue.value.top
      }
    })
  },
  { immediate: true }
)

provide('tabValue', {
  model,
  itemChange,
  setHeader
})
</script>

<style lang="scss" scoped>
.ty-tabs.normal {
  border: 1px solid var(--border-color-3);
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--border-color-3);
    background-color: var(--color-bg-2);
    transition: background-color 0.5s;

    .ty-tabs__inner {
      margin-bottom: -1;
      position: relative;
      .ty-tabs__active-bar {
        position: absolute;
        height: 2px;
        background-color: var(--primary-5);
        bottom: 0px;
        transition: all 0.2s;
      }
    }

    span {
      display: inline-block;
      height: 40px;
      padding: 0 25px;
      // border: 1px solid var(--border-color-3);
      box-sizing: border-box;
      margin: unset !important;
      color: var(--text-1);
      user-select: none;
      cursor: pointer;
      transition: background-color 0.5s;
    }
    span.select {
      color: var(--primary-5);
    }
    span:first-child {
      border-left: unset;
    }
  }
  main {
    padding: 20px;
    color: var(--text-2);
    background-color: var(--color-bg-1);
    transition: background-color 0.5s;
  }
  &.left {
    display: flex;
    header {
      min-width: 50px;
      width: unset;
      height: auto;
      border: unset;
      border-right: 1px solid var(--border-color-3);
      .ty-tabs__inner {
        display: flex;
        flex-direction: column;
        margin-right: -1px;
        .ty-tabs__active-bar {
          position: absolute;
          width: 2px;
          background-color: var(--primary-5);
          right: 0px;
          transition: all 0.2s;
        }
        span.select {
          border: unset;
        }
        span:first-child {
          border-top: unset;
        }
        span:last-child {
          border-bottom: unset;
        }
      }
    }
    main {
      flex: 1;
    }
  }
  &.right {
    display: flex;
    flex-flow: row-reverse;
    header {
      min-width: 50px;
      width: unset;
      height: auto;
      border: unset;
      border-right: 1px solid var(--border-color-3);
      .ty-tabs__inner {
        display: flex;
        flex-direction: column;
        margin-right: -1px;
        .ty-tabs__active-bar {
          position: absolute;
          width: 2px;
          background-color: var(--primary-5);
          right: 0px;
          transition: all 0.2s;
        }
        span.select {
          border: unset;
        }
        span:first-child {
          border-top: unset;
        }
        span:last-child {
          border-bottom: unset;
        }
      }
    }
    main {
      flex: 1;
    }
  }
}

.ty-tabs.card {
  border: 1px solid var(--border-color-3);
  header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--border-color-3);
    background-color: var(--color-bg-2);
    transition: background-color 0.5s;

    .ty-tabs__inner {
      margin-bottom: -1;
    }

    span {
      display: inline-block;
      height: 40px;
      padding: 0 25px;
      // border: 1px solid var(--border-color-3);
      box-sizing: border-box;
      margin: unset !important;
      color: var(--text-1);
      user-select: none;
      cursor: pointer;
      transition: background-color 0.5s;
    }
    span.select {
      border-left: 1px solid var(--border-color-3);
      border-right: 1px solid var(--border-color-3);
      background-color: var(--color-bg-1);
      color: var(--primary-5);
    }
    span:first-child {
      border-left: unset;
    }
  }
  main {
    padding: 20px;
    color: var(--text-2);
    background-color: var(--color-bg-1);
    transition: background-color 0.5s;
  }

  &.left {
    display: flex;
    header {
      min-width: 50px;
      width: unset;
      height: auto;
      border: unset;
      border-right: 1px solid var(--border-color-3);
      .ty-tabs__inner {
        display: flex;
        flex-direction: column;
        margin-right: -1px;
        span.select {
          border: unset;
          border-top: 1px solid var(--border-color-3);
          border-bottom: 1px solid var(--border-color-3);
        }
        span:first-child {
          border-top: unset;
        }
        span:last-child {
          border-bottom: unset;
        }
      }
    }
    main {
      flex: 1;
    }
  }
  &.right {
    display: flex;
    flex-flow: row-reverse;
    header {
      min-width: 50px;
      width: unset;
      height: auto;
      border: unset;
      border-left: 1px solid var(--border-color-3);
      .ty-tabs__inner{
        display: flex;
        flex-direction: column;
        margin-left: -1px;
      }
      span.select {
        border: unset;
        border-top: 1px solid var(--border-color-3);
        border-bottom: 1px solid var(--border-color-3);
      }
      span:first-child {
        border-top: unset;
      }
      span:last-child {
        border-bottom: unset;
      }
    }
    main {
      flex: 1;
    }
  }
}


</style>
