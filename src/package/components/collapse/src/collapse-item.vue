<template>
  <div :class="[nm.bem('item'), nm.is('disabled', disabled), nm.is('left', position)]">
    <header @dblclick="changeFlg()">
      <span>{{ title }}</span>
      <div
        v-if="!hide"
        @click="changeFlg()"
        :class="[nm.e('button'), { rotate: isOpen }]"
      >
        <TyIcon
          :color="disabled ? 'var(--text-4)' : ''"
          icon="ty-arrow-right-s-line"
        ></TyIcon>
      </div>
    </header>
    <div :class="[nm.bem('item','content'), nm.is('open',isOpen) ]" v-if="isDestroy">
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="TyCollapseItem">
import { computed, inject } from 'vue'
import { nm, itemProp } from './context'


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
<style lang="scss" scoped>
.ty-collapse-item {
  width: 100%;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    align-items: center;
    padding: 5px 10px;
    border-bottom: 1px solid var(--border-color-2);
    box-sizing: border-box;

    span {
      flex: 1;
    }

    .ty-collapse__button {
      transition: transform 0.2s;
    }

    .rotate {
      transform: rotate(90deg);
    }
  }

  &__content {
    display: grid;
    grid-template-rows: 0fr;
    transition: 0.3s;
    overflow: hidden;

    div {
      min-height: 0;
    }

    &.is-open {
      grid-template-rows: 1fr;
      padding: 10px;
    }
  }
  &.is-disabled {
    header {
      color: var(--text-4);
      &:hover {
        cursor: not-allowed;
      }
    }
  }
  &.is-left {
    header {
      flex-direction: row-reverse;
      text-align: left;

      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
