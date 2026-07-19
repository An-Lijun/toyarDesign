<template>
  <div
    :class="[
      nm.bem('item'),
      nm.is('disabled', disabled),
      nm.is('left', position)
    ]"
  >
    <header @dblclick="changeFlg()">
      <span>{{ title }}</span>
      <div
        v-if="!hide"
        @click="changeFlg()"
        :class="[nm.e('button'), { rotate: isOpen }]"
      >
        <TyiArrowRightSLine
          :color="disabled ? 'var(--text-4)' : ''"
        ></TyiArrowRightSLine>
      </div>
    </header>
    <div
      :class="[nm.bem('item', 'content'), nm.is('open', isOpen)]"
      v-if="isDestroy"
    >
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="TyCollapseItem">
import { computed, inject } from 'vue'
import { nm, itemProp } from './context'
import {TyiArrowRightSLine} from 'toyaricon'
defineOptions({
  name: 'TyCollapseItem'
})

const props = defineProps(itemProp)
const { model, itemChange, disabled, accordion, hide, position, destroy } =
  inject('collapseValue', null)

const changeFlg = () => {
  if (disabled) {
    return
  }
  if (accordion) {
    if (model.value.includes(props.name)) {
      return itemChange([])
    }
    return itemChange([props.name])
  }
  const arr = model.value.includes(props.name)
    ? model.value.filter(item => item !== props.name)
    : [...model.value, props.name]
  itemChange(arr)
}
const isOpen = computed(() => {
  if (disabled) {
    return
  }
  return model.value.includes(props.name)
})
const isDestroy = computed(() => {
  if (destroy) {
    if (disabled) {
      return
    }
    return model.value.includes(props.name)
  } else {
    return true
  }
})
</script>

