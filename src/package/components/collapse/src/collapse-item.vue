<template>
  <div :class="{
    'ty-collapse-item':true,
    'ty-collapse-item-disabled':disabled,
    'ty-collapse-item-position':position==='left'

  }">
    <header @dblclick="changeFlg()">
      <span>{{ title }}</span>
      <div v-if="!hide" class="ty-collapse-button"  @click="changeFlg()" :class="{ rotate: isOpen }">
        <TyIcon 
          :color="disabled?'var(--text-4)':''"
          icon="ty-arrow-right-s-line" ></TyIcon>
      </div>
    </header>
    <div :class="['content', { opend: isOpen }]"
      v-if="destroy && isOpen"
    >
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  title: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
})
const { model, itemChange,disabled,accordion,hide,position,destroy } = inject('collapseValue',null)
const changeFlg = () => {
  if(disabled){
    return
  }
  if(accordion){
    if(model.value.includes(props.name)){
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
  if(disabled){
    return
  }
  return model.value.includes(props.name)
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
    span{
      flex: 1;
    }
    .ty-collapse-button {
      transition: transform 0.2s;
    }
    .rotate {
      transform: rotate(90deg);
    }
  }
  .content {
    display: grid;
    grid-template-rows: 0fr;
    transition: 0.3s;
    overflow: hidden;
    div {
      min-height: 0;
    }
    &.opend {
      grid-template-rows: 1fr;
      padding: 10px;
    }
  }
}
.ty-collapse-item-disabled{
  header{
    color: var(--text-4);
    &:hover{
      cursor: not-allowed;
    }
  }
}
.ty-collapse-item-position{
  header{
    flex-direction: row-reverse;
    text-align: left;
    span{
      margin-left: 10px;
    }
  }
}
</style>
