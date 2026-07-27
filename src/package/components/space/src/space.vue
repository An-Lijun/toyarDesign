<template>
  <div :class="nm.b()" :style="containerStyle">
    <template v-for="(item, index) in defaultSlot" :key="index">
      <template v-if="Array.isArray(item.children)">
        <template v-for="(child, childIndex) in item.children" :key="childIndex">
          <div :style="getChildStyle(childIndex, item.children.length)">
            <component :is="child" />
          </div>
          <div :style="getSplitStyle" v-if="splitSlot && childIndex < item.children.length - 1">
            <slot name="split" />
          </div>
        </template>
      </template>
      <template v-else>
        <div :style="getChildStyle(index, defaultSlot.length)">
          <component :is="item" />
        </div>
      </template>
      <div :style="getSplitStyle" v-if="splitSlot && index < defaultSlot.length - 1">
        <slot name="split" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { nm, useProps } from './context'
import { useSlots, computed } from 'vue'
import { type VNode } from 'vue'

defineOptions({
  name: 'TySpace'
})

const props = defineProps(useProps)
const slots = useSlots()

const defaultSlot = computed(() => slots.default ? slots.default() : [])
const splitSlot = computed(() => slots.split ? slots.split() : null)

const sizeValue: Record<string, string> = {
  mini: '4px',
  small: '8px',
  medium: '12px',
  large: '16px'
}

const getMarginKey = () => props.direction === 'row' ? 'marginRight' : 'marginBottom'
const getMarginValue = () => sizeValue[String(props.size)] || `${props.size}px`

const getChildStyle = (index: number, length: number) => ({
  display: 'flex',
  alignItems: 'center',
  [getMarginKey()]: index < length - 1 ? getMarginValue() : '0px'
})

const getSplitStyle = computed(() => ({
  display: 'flex',
  alignItems: 'center',
  [getMarginKey()]: getMarginValue()
}))

const containerStyle = computed(() => ({
  display: props.direction === 'row' ? 'inline-flex' : 'flex',
  alignItems: props.align,
  justifyContent: props.justify,
  flexDirection: props.direction,
  width: '100%'
}))
</script>
