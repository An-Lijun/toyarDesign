<template>
  <section :class="[nm.b(), nm.is('fold', isFold),getTheme]">
    <header>
      <slot name="header"></slot>
    </header>
    <div :class="nm.e('inner')">
      <slot v-if="!option"> </slot>
      <optionsRender v-else :option="option"/>
    </div>
  </section>
</template>
<script setup>
import optionsRender from './optionsRender'
import { provideLevel } from './hooks/level.ts'
import { nm, menuProps ,emits} from './context'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import {nowTheme} from '../../../hooks/changeTheme'
import {ref,computed,provide,watch} from 'vue'
defineOptions({
  name: 'TyMenu'
})
const props = defineProps(menuProps)
const emit = defineEmits(emits)
const { model } = useCompMvalue(props, emit,{
  setFn:(value)=> {
    emit('change',value)
    return value
  }
})
const openId = ref('')
const getTheme = computed(()=>{
  switch (props.theme) {
    case 'design':
      return ''
    case 'dark':
      return 'ty-dark'
    case 'light':
      return 'ty-light'
    case 'rDesign':
      return nowTheme.value==='dark'?'ty-light':'ty-dark'
    default:
      break;
  }
}) 

// 给menu 注入层级
provide('menu', {
  isFold: computed(() => props.isFold),
  lastMenuFn: null,
  setOpenId: value => {
    openId.value = value
  },
  openId,
  model:computed(()=>{
    return model.value
  }),
  setModel:(val)=>{
    model.value = val
  },
  clickMenu:(menu)=>{
    emit('open',menu)
  },
  clickSubMenu:(subMenu)=>{
    emit('subOpen',subMenu)
  }
})

watch(
  () => props.isFold,
  newVal => {
    openId.value = ''
  },
  {
    deep: true
  }
)

</script>
<style lang="scss" scoped>
.ty-menu {
  height: 100%;
  width: 250px;
  background: var(--color-bg-2);
  padding: 0 5px;
  overflow: auto;
  transition: background-color 1s;
  box-sizing: border-box;
  transition: all 0.5s;
  position: relative;
  overflow: hidden;
  &.is-fold {
    width: 50px;
    transition: all 0.5s;
  }
}
</style>
